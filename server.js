import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import cors from 'cors';

import typeDefs from './schema.graphql';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const PORT = process.env.PORT || 1337;

const app = express();
app.use(cors()); // enable cors
app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({
    schema
}));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

app.listen(PORT, () => {
    console.log(`Live on port ${PORT}`);
});
