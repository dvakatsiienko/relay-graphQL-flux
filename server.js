const express = require('express');
const schema = require('./graphs/schema');
const GraphQLHTTP = require('express-graphql');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.static('public'));

(async () => {
    const db = await MongoClient.connect(process.env.MONGO_URL);

    app.use(
        '/graphql',
        GraphQLHTTP({
            schema: schema(db),
            graphiql: true,
        }),
    );

    app.listen(3000, () => console.log('---', 'Listening on port 3000...'));
})();
