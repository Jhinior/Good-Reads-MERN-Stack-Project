
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './index.css'; 

// function BookCard(){
//     const { id } = useParams();
//     const [book, setBook] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [rating, setRating] = useState(0);
//     const [comments, setComments] = useState([]);

//     useEffect(() => {
//         // Replace with the correct API endpoint
//         axios.get(`https://freetestapi.com/api/v1/books/${id}`) 
//             .then(response => {
//                 setBook(response.data); 
//                 setLoading(false);
//             })
//             .catch(error => {
//                 setError(error);
//                 setLoading(false);
//             });

//         // Fetch rating and comments
//         axios.get(`https://freetestapi.com/api/v1/books/${id}/ratings`)
//             .then(response => {
//                 setRating(response.data.rating);
//                 setComments(response.data.comments);
//             })
//             .catch(error => {
//                 console.error("Error fetching rating and comments", error);
//             });
//     }, [id]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;
//     if (!book) return <div>No book found</div>;

//     return (
//         <>
//         <h2 className='details-header'>Here all the details</h2>
//       <div className='center-container-details'>        
//         <div className="book-details">
//           <h1>{book.title}</h1>
//           <p>Author: {book.author}</p>
//           <p>Publish Year: {book.publication_year}</p>
//           <p>Description: {book.description}</p>
//           <p>Genre: {book.genre}</p>
//         </div>
//         <div className="rating-section">
//           <h3>Rating: {rating}</h3>
//           <div>
//               {[1, 2, 3, 4, 5].map(star => (
//                   <span key={star}>
//                       {star <= rating ? '★' : '☆'}
//                   </span>
//               ))}
//           </div>
//         </div>
//         <div className="comments-section">
//           <h3>Comments</h3>
//           <ul>
//               {comments.map((comment, index) => (
//                   <li key={index}>{comment.text}</li>
//               ))}
//           </ul>
//         </div>
//       </div>
//       </>
//     );
// };

// // export default BookCard;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './index.css';

// // StarRating Component
// function StarRating({ bookId, currentRating, onRatingSubmit }) {
//   const [rating, setRating] = useState(currentRating);

//   const handleClick = (value) => {
//     setRating(value);
//     onRatingSubmit(bookId, value); // Submit the rating
//   };

//   return (
//     <div className="star-rating">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           className={`star ${star <= rating ? 'filled' : ''}`}
//           onClick={() => handleClick(star)}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }

// // CommentForm Component
// function CommentForm({ bookId, onCommentSubmit }) {
//   const [comment, setComment] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (comment) {
//       onCommentSubmit(bookId, comment); // Submit the comment
//       setComment('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="comment-form">
//       <textarea
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="Add your comment here..."
//       />
//       <button type="submit">Submit Comment</button>
//     </form>
//   );
// }

// function BookCard() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [rating, setRating] = useState(0);
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     // Fetch book details
//     axios.get(`https://freetestapi.com/api/v1/books/${id}`)
//       .then(response => {
//         setBook(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error);
//         setLoading(false);
//       });

//     // Fetch book rating and comments
//     axios.get(`https://freetestapi.com/api/v1/books/${id}/ratings`)
//       .then(response => {
//         setRating(response.data.rating);
//         setComments(response.data.comments);
//       })
//       .catch(error => {
//         console.error("Error fetching rating and comments", error);
//       });
//   }, [id]);

//   const handleRatingSubmit = (bookId, rating) => {
//     axios.post(`https://freetestapi.com/api/v1/books/${bookId}/ratings`, { rating })
//       .then(response => {
//         console.log('Rating submitted successfully', response.data);
//         setRating(rating); // Update local state
//       })
//       .catch(error => {
//         console.error('Error submitting rating:', error);
//       });
//   };

//   const handleCommentSubmit = (bookId, comment) => {
//     axios.post(`https://freetestapi.com/api/v1/books/${bookId}/comments`, { comment })
//       .then(response => {
//         console.log('Comment submitted successfully', response.data);
//         setComments((prevComments) => [...prevComments, { text: comment }]); // Update local state
//       })
//       .catch(error => {
//         console.error('Error submitting comment:', error);
//       });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//   if (!book) return <div>No book found</div>;

//   return (
//     <>
//       <h2 className='details-header'>Here are all the details</h2>
//       <div className='center-container-details'>
//         <div className="book-details">
//           <h1>{book.title}</h1>
//           <p>Author: {book.author}</p>
//           <p>Publish Year: {book.publication_year}</p>
//           <p>Description: {book.description}</p>
//           <p>Genre: {book.genre}</p>
//         </div>
//         <div className="rating-section">
//           <h3>Rating: {rating}</h3>
//           <StarRating bookId={id} currentRating={rating} onRatingSubmit={handleRatingSubmit} />
//         </div>
//         <div className="comments-section">
//           <h3>Comments</h3>
//           <ul>
//             {comments.map((comment, index) => (
//               <li key={index}>{comment.text}</li>
//             ))}
//           </ul>
//           <CommentForm bookId={id} onCommentSubmit={handleCommentSubmit} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default BookCard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BookCard.css';

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

  useEffect(() => {
    // Fetch book details
    axios.get(`https://freetestapi.com/api/v1/books/${id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    // Fetch book rating and comments
    axios.get(`https://freetestapi.com/api/v1/books/${id}/ratings`)
      .then(response => {
        setRating(response.data.rating);
      })
      .catch(error => {
        console.error("Error fetching rating", error);
      });

    axios.get(`https://freetestapi.com/api/v1/books/${id}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("Error fetching comments", error);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!book) return <div>No book found</div>;

  return (
    <>
      <h2 className='details-header'>Here are all the details</h2>
      <div className='center-container-details'>
        <div className="book-details">
          <h1>{book.title}</h1>
          <p>Author: {book.author}</p>
          <p>Publish Year: {book.publication_year}</p>
          <p>Description: {book.description}</p>
          <p>Genre: {book.genre}</p>
        </div>
        <div className="rating-section">
          <h3>Rating: {rating}</h3>
          <StarRating rating={rating} />
        </div>
        <div className="comments-section">
          <h3>Comments</h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default BookCard;
