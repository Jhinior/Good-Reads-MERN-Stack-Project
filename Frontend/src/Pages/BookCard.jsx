import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import StarRating from './StarRating';
import CommentForm from './Comment';
import '../Styles/BookCard.css';

function BookCard() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0); // Added to keep track of user's rating
  const token = Cookies.get('token');

  useEffect(() => {
    // Fetch book details, comments, and rating all in one API call
    axios.get(`http://localhost:5000/admin/book/${id}`)
      .then(response => {
        const fetchedBook = response.data.data.book;
        setBook(fetchedBook);
        setComments(fetchedBook.reviews); // Assuming reviews include comments
        setRating(fetchedBook.rating); // Set initial rating from fetched book
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleRatingSubmit = (ratingValue) => {
    if (token) {
      axios
        .patch(`http://localhost:5000/user/userBooks/edit`, { bookId: id, rating: ratingValue }, { withCredentials: true })
        .then(response => {
          alert("Rating submitted successfully");
          setRating(ratingValue); // Update the displayed rating after submission
        })
        .catch(error => {
          console.error("Error submitting rating", error);
        });
    } else {
      alert("Please log in to submit a rating.");
    }
  };

  const handleCommentSubmit = (commentText) => {
    if (token) {
      axios
        .patch(`http://localhost:5000/user/userBooks/comment`, { bookId: id, comment: commentText }, { withCredentials: true })
        .then(response => {
          alert("Comment submitted successfully");
          setComments((prevComments) => [...prevComments, response.data.comment]); // Append new comment to the list
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
            <p>Author: {book.author.firstName + " " + book.author.lastName}</p>
            <p>Category: {book.category.name}</p>
          </div>
        </div>

        <div className="rating-section">
          <h3>Rating: {rating}</h3>
          <StarRating rating={rating} onRatingSubmit={handleRatingSubmit} />
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <div>
                  <h5>{comment.name}</h5>
                  <h5>{comment.email}</h5>
                  <p>{comment.review}</p>
                  <h6>Posted at: {comment.date}</h6>
                </div>
              </li>
            ))}
          </ul>

          {/* Only logged-in users can submit a comment */}
          {token && (
            <div>
              <h4>Leave a Comment:</h4>
              <CommentForm bookId={id} onCommentSubmit={handleCommentSubmit} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookCard;
