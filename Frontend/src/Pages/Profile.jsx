
// import React, { useState } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import axios from 'axios';
// import "react-perfect-scrollbar/dist/css/styles.css";
// import "./index.css";

// const Profile = ({ profile, profileBooks, setProfileBooks, handleDeleteBook }) => {
//   const { email, profilePicture, birthDate, gender } = profile;
//   const [newComments, setNewComments] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleCommentChange = (bookId, comment) => {
//     setNewComments((prevComments) => ({
//       ...prevComments,
//       [bookId]: comment,
//     }));
//   };

//   const handleAddComment = (bookId) => {
//     const commentData = { text: newComments[bookId] };
//     setLoading(true);
//     axios.post(`https://freetestapi.com/api/v1/books/${bookId}/comments`, commentData)
//       .then(response => {
//         const updatedBooks = profileBooks.map(book => {
//           if (book.id === bookId) {
//             return { ...book, comments: [...book.comments, response.data] };
//           }
//           return book;
//         });
//         setProfileBooks(updatedBooks);
//         setNewComments((prevComments) => ({
//           ...prevComments,
//           [bookId]: '',
//         }));
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error adding comment", error);
//         setError(error);
//         setLoading(false);
//       });
//   };

//   if (profileBooks.length === 0) {
//     return <div className="profile">No books added to your profile yet.</div>;
//   }

//   return (
//     <>
//       <h1 className="profile-head">Your Profile</h1>
//       <div className="profile-info">
//         <div className="profile-picture">
//           {profilePicture ? (
//             <img src={profilePicture} alt="Profile" className="profile-img" />
//           ) : (
//             <div className="placeholder-img">No Profile Picture</div>
//           )}
//         </div>
//         <div className="profile-details">
//           <p>Email: {email}</p>
//           <p>Birth Date: {birthDate}</p>
//           <p>Gender: {gender}</p>
//         </div>
//       </div>
//       <h2 className="books-head">Your Books</h2>
//       <div className="profile-center-container">
//         <div className="profile-books">
//           {profileBooks.map((book) => (
//             <div key={book.id} className="book-card-profile">
//               <h2>{book.title}</h2>
//               <p>Author: {book.author}</p>
//               <p>Publish Year: {book.publication_year}</p>
//               <p>Description: {book.description}</p>
//               <p>Genre: {book.genre}</p>
//               <div className="rating-section">
//                 <h3>Rating: {book.rating}</h3>
//                 <div>
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <span key={star}>
//                       {star <= book.rating ? '★' : '☆'}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="comments-section">
//                 <h3>Comments</h3>
//                 <ul>
//                   {book.comments && book.comments.map((comment, index) => (
//                     <li key={index}>{comment.text}</li>
//                   ))}
//                 </ul>
//                 <textarea
//                   value={newComments[book.id] || ''}
//                   onChange={(e) => handleCommentChange(book.id, e.target.value)}
//                   placeholder="Add a comment"
//                 />
//                 <button onClick={() => handleAddComment(book.id)} disabled={loading}>
//                   {loading ? 'Submitting...' : 'Submit'}
//                 </button>
//                 {error && <p>Error adding comment: {error.message}</p>}
//               </div>
//               <button
//                 onClick={() => handleDeleteBook(book.id)}
//                 className="remove-btn"
//               >
//                 <RiDeleteBin6Line /> Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
import React, { useState } from "react";
import { RiDeleteBin6Line, RiCheckboxCircleLine } from "react-icons/ri";
import axios from 'axios';
import "react-perfect-scrollbar/dist/css/styles.css";
import "../Styles/Profile.css";

// StarRating Component
function StarRating({ rating, onRatingSubmit }) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (value) => {
    setCurrentRating(value);
    if (onRatingSubmit) {
      onRatingSubmit(value);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= currentRating ? 'filled' : ''}`}
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
  const [newRatings, setNewRatings] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCommentChange = (bookId, comment) => {
    setNewComments((prevComments) => ({
      ...prevComments,
      [bookId]: comment,
    }));
  };

  const handleAddComment = (bookId) => {
    const commentData = { text: newComments[bookId] };
    setLoading(true);
    axios.post(`https://freetestapi.com/api/v1/books/${bookId}/comments`, commentData)
      .then(response => {
        const updatedBooks = profileBooks.map(book => {
          if (book.id === bookId) {
            return { ...book, comments: [...book.comments, response.data] };
          }
          return book;
        });
        setProfileBooks(updatedBooks);
        setNewComments((prevComments) => ({
          ...prevComments,
          [bookId]: '',
        }));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error adding comment", error);
        setError(error);
        setLoading(false);
      });
  };

  const handleAddToWantToRead = (book) => {
    setWantToReadBooks((prevBooks) => [...prevBooks, book]);
  };

  const handleAddToCurrentReading = (book) => {
    setCurrentReadingBooks((prevBooks) => [...prevBooks, book]);
  };

  const handleRemoveFromWantToRead = (bookId) => {
    setWantToReadBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  const handleRemoveFromCurrentReading = (bookId) => {
    setCurrentReadingBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  const handleAddRating = (bookId, rating) => {
    setLoading(true);
    axios.post(`https://freetestapi.com/api/v1/books/${bookId}/ratings`, { rating })
      .then(response => {
        const updatedBooks = profileBooks.map(book => {
          if (book.id === bookId) {
            return { ...book, rating: response.data.rating };
          }
          return book;
        });
        setProfileBooks(updatedBooks);
        setNewRatings((prevRatings) => ({
          ...prevRatings,
          [bookId]: '',
        }));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error adding rating", error);
        setError(error);
        setLoading(false);
      });
  };

  if (profileBooks.length === 0) {
    return <div className="profile">No books added to your profile yet.</div>;
  }

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
                <StarRating
                  rating={book.rating}
                />
                {profileBooks.find(b => b.id === book.id) && (
                  <>
                    <textarea
                      value={newComments[book.id] || ''}
                      onChange={(e) => handleCommentChange(book.id, e.target.value)}
                      placeholder="Add a comment"
                    />
                    <button className="profile-btn" onClick={() => handleAddComment(book.id)} disabled={loading}>
                    <RiCheckboxCircleLine size={24}/>
                      {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {error && <p>Error adding comment: {error.message}</p>}
                  </>
                )}
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
          <a href="#" className="close-popup">
            Close
          </a>
        </div>
      </div>

      {/* Current Reading Popup */}
      <div id="popup2" className="popup">
        <div className="popup-content">
          <h2>Current Reading</h2>
          {currentReadingBooks.length === 0 ? (
            <p>No books in Current Reading list.</p>
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
          <a href="#" className="close-popup">
            Close
          </a>
        </div>
      </div>
    </>
  );
};

export default Profile;
