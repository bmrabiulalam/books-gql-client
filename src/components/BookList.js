import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <ul id="book-list">
        {
          data.books.map(book => (
            <li key={book.id} onClick={e => { setSelected(book.id) }}>
              {book.name}
            </li>)
          )
        }
      </ul>
      <div id="book-details">
        {
          selected
            ?
            <BookDetails bookId={selected} />
            :
            <p>No book selected...</p>
        }
      </div>
    </div>
  );
}

export default BookList;
