import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line, RiCheckboxCircleLine } from "react-icons/ri";
import axios from "axios";
import "react-perfect-scrollbar/dist/css/styles.css";
import '../Styles/Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const Profile = () => {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [newComments, setNewComments] = useState({});
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [currentReadingBooks, setCurrentReadingBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readBooks, setReadBooks] = useState([]);
  const [profileBooks, setProfileBooks] = useState([]);



  const fetchUserBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/userBooks', { withCredentials: true });
      const booksStatus = response.data.data.books;

      const wantToRead = booksStatus.filter((book) => book.status === 'WANT TO READ');
      const currentlyReading = booksStatus.filter((book) => book.status === 'READING');
      const alreadyRead = booksStatus.filter((book) => book.status === 'READ');

      setProfileBooks(booksStatus);
      setWantToReadBooks(wantToRead);
      setCurrentReadingBooks(currentlyReading);
      setReadBooks(alreadyRead);
    } catch (error) {
      console.error('Error fetching book statuses:', error);
      setError(error);
    }
  };

  useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/show', { withCredentials: true });
      const userProfile = response.data.data.user; 
      setEmail(response.data.data.user.email)
      setName(response.data.data.user.firstName + " " + response.data.data.user.lastName)
      setImage(response.data.data.user.image)
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError(error); 
    }
  };

  fetchUserProfile();
  fetchUserBooks();
}, []);

  // Submit book status to the server
  const handleAddToCurrentReading = (book) => {
    setCurrentReadingBooks((prevBooks) => [...prevBooks, book]);

    axios
      .patch(`http://localhost:5000/user/userBooks/edit`, {bookName: book.name ,  status: 'reading' } , { withCredentials: true })
      .then((response) => {
        fetchUserBooks();
        alert("Book status updated to Currently Reading");
      })
      .catch((error) => {
        console.error("Error updating book status", error);
      });
  };

  const handleAddToWantToRead = (book) => {
    setWantToReadBooks((prevBooks) => [...prevBooks, book]);

    axios
      .patch(`http://localhost:5000/user/userBooks/edit`, {bookName: book.name ,  status: 'want to read' } , { withCredentials: true })
      .then((response) => {
        fetchUserBooks();
        alert("Book status updated to Want To Reading");
      })
      .catch((error) => {
        console.error("Error updating book status", error);
      });
  };

  const handleAddToAlreadyRead = (book) => {
    setReadBooks((prevBooks) => [...prevBooks, book]);

    axios
      .patch(`http://localhost:5000/user/userBooks/edit`, {bookName: book.name ,  status: 'read' } , { withCredentials: true })
      .then((response) => {
        fetchUserBooks();
        alert("Book status updated to Want To read");
      })
      .catch((error) => {
        console.error("Error updating book status", error);
      });
  };

 
  const handleRemoveBook = (book) => {
      axios.delete('http://localhost:5000/user/userBooks/delete', {data: { bookName: book.name }, withCredentials: true})
      .then((response) => {
        fetchUserBooks();
        alert(`Book ${book.name} deleted successfully `);
      })
      .catch((error) => {
        console.error("Error Deleting book", error);
      });
  };


  // StarRating Component
function StarRating({ rating, book, onRatingSubmit }) {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (value) => {
    setCurrentRating(value);
    axios
      .patch(`http://localhost:5000/user/userBooks/rate`, {bookName: book.name , rating: value } ,  { withCredentials: true })
      .then((response) => {
        fetchUserBooks()
        if (onRatingSubmit) {
          onRatingSubmit(value);  
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



  return (
    <>
      <h1 className="profile-head">Profile</h1>
      <div className="profile-info">
        <div className="profile-picture">
          {image ? (
            <img src={`http://localhost:5000/uploads/${image}`} alt="Profile" className="profile-img"  />
          ) : (
            <div className="placeholder-img">No Profile Picture</div>
          )}
        </div>
        <div className="profile-details">
          <p>Email: {email}</p>
           <p>Name: {name}</p>
        </div>
      </div>
      <h2 className="books-head">Books</h2>
       <div className="profile-center-container">
          {profileBooks.map((book) => (
            <div className="book-card-profile">
              <h2>{book.name}</h2>
              {book.image ? (
                <img
                  src={`http://localhost:5000/uploads/${book.image}`}
                  alt={book.name}
                  style={{ width: '75%', height: '350px' }}
                />
              ) : (
                'N/A'
              )}
              <p>Author: {book.author.firstName} {book.author.lastName}</p>
              <p>Avg Rate: {book.rating}</p>
              <p>Rating: {book.userRate}</p>
              <div className="rating-section">
                <StarRating rating={book.userRate} book={book} />
                <button
                  className="profile-btn"
                  onClick={() => handleAddToWantToRead(book)}
                >
                   Want to Read
                </button>
                <button
                  className="profile-btn"
                  onClick={() => handleAddToCurrentReading(book)}
                >
                   Current Reading
                </button>
                <button
                  className="profile-btn"
                  onClick={() => handleAddToAlreadyRead(book)}
                >
                  Already Read
                </button>

                <a href={`/books/${book.id}`}>
                      <button
                        className="profile-btn"
                        onClick={() => handleAddToAlreadyRead(book)}
                      >
                        View Details
                      </button>
                </a>

                {error && <p>Error adding comment: {error.message}</p>}
               
              </div>
              <button
                onClick={() => handleRemoveBook(book)}
                className="remove-btn"
              >
                <RiDeleteBin6Line /> Remove
              </button>
            </div>
            
          ))}
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
        <h2 className="popup-header">Want to Read</h2>
        <a href="#" className="close-btn">
            Close
          </a>
        <div className="popup-content">
          {wantToReadBooks.length === 0 ? (
            <p>No books in Want to Read list.</p>
          ) : (
            wantToReadBooks.map((book) => (
                <div className="book-card-profile">
                <h2>{book.name}</h2>
                {book.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${book.image}`}
                    alt={book.name}
                    style={{ width: '250px', height: '350px' }}
                  />
                ) : (
                  'N/A'
                )}
                <p>Author: {book.author.firstName} {book.author.lastName}</p>
                <p>Avg Rate: {book.rating}</p>
                <p>Rating: {book.userRate}</p>
                <div className="rating-section">
                  <StarRating rating={book.userRate} book={book} />
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
                  <a href={`/books/${book.id}`}>
                      <button
                        className="profile-btn"
                        onClick={() => handleAddToAlreadyRead(book)}
                      >
                        View Details
                      </button>
                </a>
                  {error && <p>Error adding comment: {error.message}</p>}
                </div>
                <button
                  onClick={() => handleRemoveBook(book)}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line /> Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Current Reading Popup */}
      <div id="popup2" className="popup">
        <h2 className="popup-header">Currently Reading</h2>
          <a href="#" className="close-btn">
            Close
          </a>
        <div className="popup-content">
          {currentReadingBooks.length === 0 ? (
            <p>No books in Currently Reading list.</p>
          ) : (
            currentReadingBooks.map((book) => (
               <div className="book-card-profile">
                <h2>{book.name}</h2>
                {book.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${book.image}`}
                    alt={book.name}
                    style={{ width: '250px', height: '350px' }}
                  />
                ) : (
                  'N/A'
                )}
                <p>Author: {book.author.firstName} {book.author.lastName}</p>
                <p>Avg Rate: {book.rating}</p>
                <p>Rating: {book.userRate}</p>
                <div className="rating-section">
                  <StarRating rating={book.userRate} book={book} />
                  {/* <textarea
                    value={newComments[book.id] || ""}
                    onChange={(e) => handleCommentChange(book.id, e.target.value)}
                    placeholder="Add a comment"
                  /> */}
                  {/* <button
                    className="profile-btn"
                    onClick={() => handleAddComment(book.id)}
                    disabled={loading}
                  >
                    <RiCheckboxCircleLine size={24} />
                    {loading ? "Submitting..." : "Submit"}
                  </button> */}
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
                  <a href={`/books/${book.id}`}>
                      <button
                        className="profile-btn"
                        onClick={() => handleAddToAlreadyRead(book)}
                      >
                        View Details
                      </button>
                </a>
                  {error && <p>Error adding comment: {error.message}</p>}
                </div>
                <button
                  onClick={() => handleRemoveBook(book)}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line /> Remove
                </button>
               
              </div>
            ))
          )}
        </div>
      </div>

      {/* Already Read Popup */}
      <div id="popup3" className="popup">
        <h2 className="popup-header">Already Read</h2>
         <a href="#" className="close-btn">
            Close
          </a>
        <div className="popup-content">
          
          {readBooks.length === 0 ? (
            <p>No books in Already Read list.</p>
          ) : (
            readBooks.map((book) => (
               <div className="book-card-profile">
                <h2>{book.name}</h2>
                {book.image ? (
                  <img
                    src={`http://localhost:5000/uploads/${book.image}`}
                    alt={book.name}
                    style={{ width: '250px', height: '350px' }}
                  />
                ) : (
                  'N/A'
                )}
                <p>Author: {book.author.firstName} {book.author.lastName}</p>
                <p>Avg Rate: {book.rating}</p>
                <p>Rating: {book.userRate}</p>
                <div className="rating-section">
                  <StarRating rating={book.userRate} book={book} />
                  {/* <textarea
                    value={newComments[book.id] || ""}
                    onChange={(e) => handleCommentChange(book.id, e.target.value)}
                    placeholder="Add a comment"
                  /> */}
                  {/* <button
                    className="profile-btn"
                    onClick={() => handleAddComment(book.id)}
                    disabled={loading}
                  >
                    <RiCheckboxCircleLine size={24} />
                    {loading ? "Submitting..." : "Submit"}
                  </button> */}
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
                  <a href={`/books/${book.id}`}>
                      <button
                        className="profile-btn"
                        onClick={() => handleAddToAlreadyRead(book)}
                      >
                        View Details
                      </button>
                </a>
                  {error && <p>Error adding comment: {error.message}</p>}
                </div>
                <button
                  onClick={() => handleRemoveBook(book)}
                  className="remove-btn"
                >
                  <RiDeleteBin6Line /> Remove
                </button>
              </div>
            ))
          )}
         
        </div>
      </div>
    </>
  );
};

export default Profile;
