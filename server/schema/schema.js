const graphql = require("graphql");
const _ = require("lodash");

// Below is object destructuring
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
const books = [
  {name: "Bookie wookie", genre: "Fantasy", id: "1", authorId: "1"},
  {name: "book book", genre: "Fantasy", id: "2", authorId: "1"},
  {name: "strawberry", genre: "Sci-Fi", id: "3", authorId: "2"},
];

const authors = [
  {name: "Sammy", age: 26, id: "1"},
  {name: "Acacia", age: 23, id: "2"},
  {name: "Hugo", age: 1, id: "3"},
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId});
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id});
      },
    },
  }),
});

// RootQuery => how you get into the graph
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // code to get data from db/ other source
        return _.find(books, {id: args.id});
      },
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id});
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
