import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SEARCH_BOOKS } from '../utils/queries';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, data } = useQuery(SEARCH_BOOKS, {
    variables: { query: searchTerm },
  });
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSaveBook = async (bookId) => {
    try {
      await saveBook({
        variables: { bookId: bookId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const renderBooks = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data || !data.books) {
      return <div>No books found.</div>;
    }

    return (
      <ul className="list-group">
        {data.books.map((book) => (
          <li className="list-group-item" key={book.bookId}>
            <div className="card mb-3">
              <h5 className="card-header">{book.title}</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    {book.image && (
                      <img
                        src={book.image}
                        alt={`Cover for ${book.title}`}
                        className="img-thumbnail"
                      />
                    )}
                  </div>
                  <div className="col-md-10">
                    <p className="card-text">{book.description}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      Save Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Search for Books</h1>
      <form>
        <input
          type="text"
          placeholder="Search term"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {renderBooks()}
    </div>
  );
};

export default SearchBooks;
