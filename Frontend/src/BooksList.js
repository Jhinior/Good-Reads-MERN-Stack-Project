import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the backend API
    axios.get('http://localhost:5000/admin/book')
      .then(response => {
        setBooks(response.data.data.books);  
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  // Inline style for image
  const imageStyle = {
    width: '350px', // Fixed width for book cover size
    height: '600px', // Fixed height for book cover size
  };

  return (
    <div className="container">
      <h1 className="my-4">Books List</h1>
      <div className="row">
        {books.map(book => (
          <div className="col-md-4 mb-4" key={book.id}>
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
                <p className="card-text">Category: {book.category.name}</p>
                <p className="card-text">Author: {book.author.firstName}</p>
                {/* <p className="card-text">Average Rating: {book.avgRating}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksList;
