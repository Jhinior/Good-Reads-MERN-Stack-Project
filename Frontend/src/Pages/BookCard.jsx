import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import '../Styles/BookCard.css';


 
// StarRating Component for display only
function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

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
  const token = Cookies.get('token'); 
  useEffect(() => {
    // Fetch book details
    axios.get(`http://localhost:5000/admin/book/${id}`)
      .then(response => {
        setBook(response.data.data.book);
        console.log(response.data.data.book)
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  // Submit book status to the server
  const handleAddToCurrentReading = (book) => {
    if(token){
         setCurrentReadingBooks((prevBooks) => [...prevBooks, book]);

          axios
            .patch(`http://localhost:5000/user/userBooks/edit`, {bookName: book.name ,  status: 'reading' } , { withCredentials: true })
            .then((response) => {
              alert("Book status updated to Currently Reading");
            })
            .catch((error) => {
              console.error("Error updating book status", error);
            });
    }else{
      alert("please Login first")
    }
   
  };

  const handleAddToWantToRead = (book) => {
    if(token){
          axios
        .patch(`http://localhost:5000/user/userBooks/edit`, {bookName: book.name ,  status: 'want to read' } , { withCredentials: true })
        .then((response) => {
          alert("Book status updated to Want To Reading");
        })
        .catch((error) => {
          console.error("Error updating book status", error);
        });
    }else{
      alert("please Login first")
    }
    setWantToReadBooks((prevBooks) => [...prevBooks, book]);

    
  };

  const handleAddToAlreadyRead = (book) => {
    if(token){
        setReadBooks((prevBooks) => [...prevBooks, book]);

        axios
          .patch(`http://localhost:5000/user/userBooks/edit`, {bookName: book.name ,  status: 'read' } , { withCredentials: true })
          .then((response) => {
            alert("Book status updated to Want To read");
          })
          .catch((error) => {
            console.error("Error updating book status", error);
          });
    }else{
      alert("please Login first")
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
                    <p>Author: {book.author.firstName+" "+ book.author.lastName}</p>
                    <p>Category: {book.category.name}</p>
                </div>
                <div className='button-container'>
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
                </div>
        </div>
        <div className="rating-section">
          <h3>Rating: {book.rating}</h3>
          <StarRating rating={book.rating} />
        </div>
        <div className="comments-section">
          <h3>Comments</h3>
          <ul>
            {book.reviews.map((comment, index) => (
              <li key={index}> 
                <div>
                    <h5>{comment.name}</h5>
                    <h5>{comment.email}</h5>
                    <p>{comment.review}</p>
                    <h6>posted At :{comment.date}</h6>
                </div> 
              </li>
            ))}
          </ul>
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
        </div>
      </div>
    </>
  );
}

export default BookCard;
