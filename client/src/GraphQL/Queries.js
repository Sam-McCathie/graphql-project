import {gql} from "@apollo/client";

export const getBooks = gql`
  query {
    books {
      title
      author {
        name
      }
    }
  }
`;
