import React from "react";
import {gql, useQuery} from "@apollo/client";

const getBooksQuery = gql`
  query books {
    name
    id
  }
`;

export const BookList = () => {
  const {loading, error, data} = useQuery(getBooksQuery);

  if (loading) return <p>loading..</p>;
  if (error) return <p>Error..</p>;

  return data.map(({name, id}) => (
    <div>
      <p>Book: {name}</p>
      <p>id: {id}</p>
    </div>
  ));
};
