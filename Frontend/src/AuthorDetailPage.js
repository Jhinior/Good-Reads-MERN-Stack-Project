import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AuthorDetailPage() {
  const { name } = useParams(); // Destructure the `name` from URL parameters
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorAndBooks = async () => {
      try {
        // Fetch author details
        const authorResponse = await axios.get(`http://localhost:5000/admin/author/name/${encodeURIComponent(name)}`);
        console.log(authorResponse.data.data.author);
        const authorData = authorResponse.data.data.author;
        setAuthor(authorData);

        // Fetch books for the fetched author
        if (authorData._id) {
          const booksResponse = await axios.get(`http://localhost:5000/admin/books/author/${authorData._id}`);
          setBooks(booksResponse.data.data.books);
        } else {
          setError('Author ID not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching author or books');
      }
    };

    fetchAuthorAndBooks();
  }, [name]);

  const imageStyle = {
    width: '350px', // Adjusted width to match CategoryPage
    height: '600px', // Adjusted height to match CategoryPage
  };

  return (
    <div className="container">
      {error ? (
        <p className="text-danger">{error}</p>
      ) : author ? (
        <>
          <h1 className="my-4">{author.firstName} {author.lastName}</h1>
          {author.dateOfBirth && (
            <p className="mb-4">Born: {new Date(author.dateOfBirth).toLocaleDateString()}</p>
          )}

          <h2>Books by {author.firstName} {author.lastName}:</h2>
          {books.length > 0 ? (
            <div className="row">
              {books.map(book => (
                <div className="col-md-4 mb-4" key={book._id}>
                  <div className="card mb-4 shadow-sm">
                    <img
                      src={`http://localhost:5000${book.image}`}
                      className="card-img-top"
                      alt={book.name}
                      style={imageStyle}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/350x600'}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{book.name}</h5>
                      <p className="card-text">Average Rating: {book.avgRating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No books found for this author.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AuthorDetailPage;
