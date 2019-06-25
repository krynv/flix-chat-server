import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import cors from 'cors';
import jwt from 'jsonwebtoken';

import models from './models';
import { refreshTokens } from './auth';

const SECRET = 'meme';
const SECRET2 = 'ayyLmao';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const PORT = process.env.PORT || 1337;

const app = express();
app.use(cors()); // enable cors
app.use(bodyParser.json());

app.use('/graphql', graphqlExpress(req => ({
    schema,
    context: {
        models,
        user: req.user,
        SECRET,
        SECRET2,
    },
})),
);

const addUser = async (req, res, next) => {
    const token = req.headers['x-token'];
    if (token) {
        try {
            const { user } = jwt.verify(token, SECRET);
            req.user = user;
        } catch (err) {
            const refreshToken = req / headers['x-refresh-token'];
            const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);

            if (newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTOkens.refreshToken);
            }
            req.user = newTokens.user;
        }
    }
    next();
}

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

// models.sequelize.sync({ force: true }).then(() -- to clear db before remaking
models.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`\n\nLive on port ${PORT}`);
    });
});


