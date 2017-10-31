import { writeFile } from 'fs';
import express from 'express';
import Schema from './graphs/schema';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';
import { graphql } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';

const app = express();

app.use(express.static('public'));

(async () => {
    try {
        const db = await MongoClient.connect(process.env.MONGO_URL);
        const schema = Schema(db);

        app.use(
            '/graphql',
            GraphQLHTTP({
                schema,
                graphiql: true,
            }),
        );

        app.listen(3000, () => console.log('---', 'Listening on port 3000...'));

        // Generate schema.json
        const json = await graphql(schema, introspectionQuery);

        // Re-generate GraphQL schema
        writeFile('./graphs/schema.json', JSON.stringify(json, null, 2), err => {
            if (err) throw err;

            console.log('---', 'JSON schema created');
        });
    } catch (error) {
        console.log('---', error);
    }
})();
