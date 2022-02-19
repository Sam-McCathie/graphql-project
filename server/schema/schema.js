const graphql = require("graphql");

// Below is object destructuring
const {GraphQLObjectType, GraphQLString} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  }),
});
