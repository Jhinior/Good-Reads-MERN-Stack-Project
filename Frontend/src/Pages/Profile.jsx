import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line, RiCheckboxCircleLine } from "react-icons/ri";
import axios from "axios";
import "react-perfect-scrollbar/dist/css/styles.css";
import '../Styles/Profile.css';

// StarRating Component
function StarRating({ rating, bookId, onRatingSubmit }) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (value) => {
    setCurrentRating(value);

    // Send the rating to the server
    axios
      .post(`https://freetestapi.com/api/v1/books/${bookId}/rating`, { rating: value })
      .then((response) => {
        console.log("Rating submitted successfully", response.data);
        if (onRatingSubmit) {
          onRatingSubmit(value);  // Callback to parent if needed
        }
      })
      .catch((error) => {
        console.error("Error submitting rating", error);
      });
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= currentRating ? "filled" : ""}`}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const Profile = ({ profile, profileBooks, setProfileBooks, handleDeleteBook }) => {
  const { email, profilePicture, birthDate, gender } = profile;
  const [newComments, setNewComments] = useState({});
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [currentReadingBooks, setCurrentReadingBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readBooks, setReadBooks] = useState([]);

  // Handle comment changes
  const handleCommentChange = (bookId, comment) => {
    setNewComments((prevComments) => ({
      ...prevComments,
      [bookId]: comment,
    }));
  };

  // Submit comment to the server
  const handleAddComment = (bookId) => {
    const commentData = { text: newComments[bookId] };
    setLoading(true);

    axios
      .post(`https://freetestapi.com/api/v1/books/${bookId}/comments`, commentData)
      .then((response) => {
        const updatedBooks = profileBooks.map((book) => {
          if (book.id === bookId) {
            return { ...book, comments: [...book.comments, response.data] };
          }
          return book;
        });
        setProfileBooks(updatedBooks);
        setNewComments((prevComments) => ({
          ...prevComments,
          [bookId]: "",
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error adding comment", error);
        setError(error);
        setLoading(false);
      });
  };

  // Submit book status to the server
  const handleAddToCurrentReading = (book) => {
    setCurrentReadingBooks((prevBooks) => [...prevBooks, book]);

    axios
      .post(`https://freetestapi.com/api/v1/books/${book.id}/status`, { status: 'Currently Reading' })
      .then((response) => {
        console.log("Book status updated to Currently Reading");
      })
      .catch((error) => {
        console.error("Error updating book status", error);
      });
  };

  const handleAddToWantToRead = (book) => {
    setWantToReadBooks((prevBooks) => [...prevBooks, book]);

    axios
      .post(`https://freetestapi.com/api/v1/books/${book.id}/status`, { status: 'Want to Read' })
      .then((response) => {
        console.log("Book status updated to Want to Read");
      })
      .catch((error) => {
        console.error("Error updating book status", error);
      });
  };

  const handleAddToAlreadyRead = (book) => {
    setReadBooks((prevBooks) => [...prevBooks, book]);

    axios
      .post(`https://freetestapi.com/api/v1/books/${book.id}/status`, { status: 'Already Read' })
      .then((response) => {
        console.log("Book status updated to Already Read");
      })
      .catch((error) => {
        console.error("Error updating book status", error);
      });
  };

  // Remove book from respective lists
  const handleRemoveFromWantToRead = (bookId) => {
    setWantToReadBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  const handleRemoveFromCurrentReading = (bookId) => {
    setCurrentReadingBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  const handleRemoveFromRead = (id) => {
    setReadBooks(readBooks.filter(book => book.id !== id));
  };

  // Fetch book statuses from the server
  useEffect(() => {
    axios
      .get("https://freetestapi.com/api/v1/user/books-status")
      .then((response) => {
        const booksStatus = response.data;
        const wantToRead = booksStatus.filter(book => book.status === 'Want to Read');
        const currentlyReading = booksStatus.filter(book => book.status === 'Currently Reading');
        const alreadyRead = booksStatus.filter(book => book.status === 'Already Read');

        setWantToReadBooks(wantToRead);
        setCurrentReadingBooks(currentlyReading);
        setReadBooks(alreadyRead);
      })
      .catch((error) => {
        console.error("Error fetching book statuses", error);
        setError(error);
      });
  }, []);

  return (
    <>
      <h1 className="profile-head">Your Profile</h1>
      <div className="profile-info">
        <div className="profile-picture">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="profile-img" />
          ) : (
            <div className="placeholder-img">No Profile Picture</div>
          )}
        </div>
        <div className="profile-details">
          <p>Email: {email}</p>
          <p>Birth Date: {birthDate}</p>
          <p>Gender: {gender}</p>
        </div>
      </div>

      <h2 className="books-head">Your Books</h2>
      <div className="profile-center-container">
        <div className="profile-books">
          {profileBooks.map((book) => (
            <div key={book.id} className="book-card-profile">
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Publish Year: {book.publication_year}</p>
              <p>Description: {book.description}</p>
              <p>Genre: {book.genre}</p>
              <div className="rating-section">
                <h3>Rating: {book.rating}</h3>
                <StarRating rating={book.rating} bookId={book.id} />
                <textarea
                  value={newComments[book.id] || ""}
                  onChange={(e) => handleCommentChange(book.id, e.target.value)}
                  placeholder="Add a comment"
                />
                <button
                  className="profile-btn"
                  onClick={() => handleAddComment(book.id)}
                  disabled={loading}
                >
                  <RiCheckboxCircleLine size={24} />
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  className="profile-btn"
                  onClick={() => handleAddToWantToRead(book)}
                >
                  Add to Want to Read
                </button>
                <button
                  className="profile-btn"
                  onClick={() => handleAddToCurrentReading(book)}
                >
                  Add to Current Reading
                </button>
                <button
                  className="profile-btn"
                  onClick={() => handleAddToAlreadyRead(book)}
                >
                  Already Read
                </button>
                {error && <p>Error adding comment: {error.message}</p>}
              </div>
              <button
                onClick={() => handleDeleteBook(book.id)}
                className="remove-btn"
              >
                <RiDeleteBin6Line /> Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="side-elements">
        <div className="side-elements-content">
          <a href="#popup1">
            <p>Want to Read</p>
          </a>
          <a href="#popup2">
            <p>Current Reading</p>
          </a>
          <a href="#popup3">
            <p>Read</p>
          </a>
        </div>
      </div>

      {/* Want to Read Popup */}
      <div id="popup1" className="popup">
        <div className="popup-content">
          <h2>Want to Read</h2>
          {wantToReadBooks.length === 0 ? (
            <p>No books in Want to Read list.</p>
          ) : (
            wantToReadBooks.map((book) => (
              <div key={book.id} className="book-card-popup">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <button
                  onClick={() => handleRemoveFromWantToRead(book.id)}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line /> Remove
                </button>
              </div>
            ))
          )}
          <a href="#" className="close-btn">
            Close
          </a>
        </div>
      </div>

      {/* Current Reading Popup */}
      <div id="popup2" className="popup">
        <div className="popup-content">
          <h2>Currently Reading</h2>
          {currentReadingBooks.length === 0 ? (
            <p>No books in Currently Reading list.</p>
          ) : (
            currentReadingBooks.map((book) => (
              <div key={book.id} className="book-card-popup">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <button
                  onClick={() => handleRemoveFromCurrentReading(book.id)}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line /> Remove
                </button>
              </div>
            ))
          )}
          <a href="#" className="close-btn">
            Close
          </a>
        </div>
      </div>

      {/* Already Read Popup */}
      <div id="popup3" className="popup">
        <div className="popup-content">
          <h2>Already Read</h2>
          {readBooks.length === 0 ? (
            <p>No books in Already Read list.</p>
          ) : (
            readBooks.map((book) => (
              <div key={book.id} className="book-card-popup">
                <h2>{book.title}</h2>
                <p>Author: {book.author}</p>
                <button
                  onClick={() => handleRemoveFromRead(book.id)}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line /> Remove
                </button>
              </div>
            ))
          )}
          <a href="#" className="close-btn">
            Close
          </a>
        </div>
      </div>
    </>
  );
};

export default Profile;
