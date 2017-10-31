const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = require('graphql');

const linkType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        url: { type: GraphQLString },
    }),
});

module.exports = db =>
    new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                links: {
                    type: new GraphQLList(linkType),
                    resolve: () =>
                        db
                            .collection('links')
                            .find({})
                            .toArray(),
                },
            }),
        }),
    });
