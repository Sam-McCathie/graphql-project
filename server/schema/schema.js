const graphql = require("graphql");
const _ = require("lodash");

// Below is object destructuring
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// dummy data
const books = [
  {name: "Bookie wookie", genre: "Fantasy", id: "1"},
  {name: "book book", genre: "Fantasy", id: "2"},
  {name: "strawberry", genre: "Sci-Fi", id: "3"},
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
  }),
});

// RootQuery => how you get into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        // code to get data from db/ other source
        return _.find(books, {id: args.id});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
