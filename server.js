import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import cors from 'cors';

import models from './models';
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

app.use('/graphql', graphqlExpress({
    schema,
    context: {
        models,
        user: {
            id: 2,
        },
        SECRET,
        SECRET2
    }
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

// models.sequelize.sync({ force: true }).then(() -- to clear db before remaking
models.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`\n\nLive on port ${PORT}`);
    });
});


