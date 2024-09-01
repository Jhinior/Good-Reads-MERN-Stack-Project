import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/BookList.css';
import Navbar from './Navbar';

function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/book')
      .then(response => {
        console.log(response.data.data.books)
        setBooks(response.data.data.books);  
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  return (
    <>
    <Navbar />
    <div className="title">
        <h1 className='title-text'>
          "Step into a world where every page whispers a tale, <br></br>and every book is
          a portal to dreams untold.<br></br> Welcome to a sanctuary of stories,<br></br> where
          imagination takes flight and adventures begin anew."
        </h1>
      </div>
    <div className="container my-5">
      <h1 className="text-center mb-5">Books Collection</h1>
      <div className="row">
        {books.map(book => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={`http://localhost:5000/uploads/${book.image}`}
                className="card-img-top book-img"
                alt={book.name}
                onError={(e) => e.target.src = 'https://via.placeholder.com/350x600'}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{book.name}</h5>
                <p className="card-text"><strong>Category:</strong> {book.category.name}</p>
                <p className="card-text"><strong>Author:</strong> {book.author.firstName}</p>
                <a href={`/books/${book.id}`} className="btn btn-primary mt-auto">View Details</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default BooksList;
