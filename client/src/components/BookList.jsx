import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {getBooks} from "../GraphQL/Queries";

export const BookList = () => {
  const {loading, error, data} = useQuery(getBooks);
  const [books, setBooks] = useState();

  useEffect(() => {
    setBooks(data.books);
  }, [data]);

  console.log(books);

  return (
    <div>
      {books.map((book) => {
        return (
          <div>
            <p>Book: {book.title}</p>
            <p>author: {book.author.name}</p>
            <br />
          </div>
        );
      })}
    </div>
  );
};
