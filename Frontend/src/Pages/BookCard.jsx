import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import * as jwt_decode from 'jwt-decode';
import StarRating from './StarRating'; 
import CommentForm from './Comment';
import '../Styles/BookCard.css';

function BookCard() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0); 
  const [comments, setComments] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [currentReadingBooks, setCurrentReadingBooks] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [user, setUser] = useState(null);
  const token = Cookies.get('token');

 const fetchBook=() => {
   
    axios.get(`http://localhost:5000/admin/book/${id}`)
      .then(response => {
        const fetchedData = response.data.data.book;
        setBook(fetchedData); 
        setComments(fetchedData.reviews); 
        setRating(fetchedData.rating); 
        setLoading(false); 
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }


  useEffect(() => {
    fetchBook();
  }, []);


  const handleAddToCurrentReading = (book) => {
    if (token) {
      setCurrentReadingBooks((prevBooks) => [...prevBooks, book]);
      axios
        .patch(`http://localhost:5000/user/userBooks/edit`, { bookName: book.name, status: 'reading' }, { withCredentials: true })
        .then(() => {
          alert("Book status updated to Currently Reading");
        })
        .catch((error) => {
          console.error("Error updating book status", error);
        });
    } else {
      alert("Please log in first");
    }
  };

  const handleAddToWantToRead = (book) => {
    if (token) {
      axios
        .patch(`http://localhost:5000/user/userBooks/edit`, { bookName: book.name, status: 'want to read' }, { withCredentials: true })
        .then(() => {
          alert("Book status updated to Want To Read");
        })
        .catch((error) => {
          console.error("Error updating book status", error);
        });
    } else {
      alert("Please log in first");
    }
    setWantToReadBooks((prevBooks) => [...prevBooks, book]);
  };

  const handleAddToAlreadyRead = (book) => {
    if (token) {
      setReadBooks((prevBooks) => [...prevBooks, book]);
      axios
        .patch(`http://localhost:5000/user/userBooks/edit`, { bookName: book.name, status: 'read' }, { withCredentials: true })
        .then(() => {
          alert("Book status updated to Already Read");
        })
        .catch((error) => {
          console.error("Error updating book status", error);
        });
    } else {
      alert("Please log in first");
    }
  };

  const handleCommentSubmit = (commentText) => {
    if (token) {
      axios
        .patch(`http://localhost:5000/user/addreview/${id}`, {review: commentText}, { withCredentials: true })
        .then((response) => {
          fetchBook()
        })
        .catch(error => {
          console.error("Error submitting comment", error);
        });
    } else {
      alert("Please log in to submit a comment.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!book) return <div>No book found</div>;

  return (
    <>
      <h2 className='details-header'>Book Details</h2>
      <div className='center-container-details'>
        <div className="book-details">
          <img
            src={`http://localhost:5000/uploads/${book.image}`}
            className="card-img-top book-img"
            alt={book.name}
            onError={(e) => e.target.src = 'https://via.placeholder.com/350x600'}
          />
          <div className='info-container'>
            <h1>{book.name}</h1>
            <h3>Rating: {rating}</h3>
            <h3>Author: {book.author.firstName + " " + book.author.lastName}</h3>
            <h3>Category: {book.category.name}</h3>
          </div>
          <div className='button-container'>
            <button className="profile-btn" onClick={() => handleAddToWantToRead(book)}>Add to Want to Read</button>
            <button className="profile-btn" onClick={() => handleAddToCurrentReading(book)}>Add to Current Reading</button>
            <button className="profile-btn" onClick={() => handleAddToAlreadyRead(book)}>Already Read</button>
          </div>
        </div>

        <div className="comments-section">
         <h3 className="comments-title">Comments</h3>
            <ul className="comments-list">
              {comments.map((comment, index) => (
                <li key={index} className="comment-item">
                  <div className="comment-content">
                    <h5 className="comment-name">{comment.name}</h5>
                    <h5 className="comment-email">{comment.email}</h5>
                    <p className="comment-text">{comment.review}</p>
                    <h6 className="comment-date">Posted at: {comment.date}</h6>
                  </div>
                </li>
              ))}
            </ul>

          {token && (
            <div>
              <h4>Leave a Comment:</h4>
              <CommentForm onCommentSubmit={handleCommentSubmit} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookCard;