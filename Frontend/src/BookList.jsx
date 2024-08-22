import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiCheckboxCircleLine, RiFileList3Line   } from 'react-icons/ri';
import { Link, useNavigate } from "react-router-dom";
import "./BookList.css"; // Import CSS for styling

function BookList({ profileBooks, setProfileBooks }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddToProfile = (book) => {
    // Add the book to profileBooks state
    setProfileBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, book];
      localStorage.setItem("profileBooks", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
    // Navigate to the profile page
    navigate("/profile");
  };

  const handleDeleteBook = (bookId) => {
    // Remove the book from profileBooks
    const updatedBooks = profileBooks.filter((book) => book.id !== bookId);
    setProfileBooks(updatedBooks);
    // Update localStorage
    localStorage.setItem("profileBooks", JSON.stringify(updatedBooks));
  };

useEffect(() => {
    axios
      .get('https://freetestapi.com/api/v1/books') // Ensure this endpoint is correct
      .then((response) => {
        const booksData = response.data;
  
        const ratingsPromises = booksData.map((book) => 
          axios
            .get(`https://freetestapi.com/api/v1/books/${book.id}/ratings`)
            .then((ratingResponse) => ({
              ...book,
              rating: ratingResponse.data.rating,
            }))
            .catch(() => ({
              ...book,
              rating: 'No rating available', // Fallback if rating endpoint fails
            }))
        );
  
        Promise.all(ratingsPromises)
          .then((booksWithRatings) => {
            setBooks(booksWithRatings);
            setLoading(false);
          })
          .catch((ratingError) => {
            setError(ratingError);
            setLoading(false);
          });
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <div className="title">
        <h1>
          "Step into a world where every page whispers a tale, and every book is
          a portal to dreams untold. Welcome to a sanctuary of stories, where
          imagination takes flight and adventures begin anew."
        </h1>
      </div>
    
    <div className="main-books-list">
      
      <div className="books-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Publish Year: {book.publication_year}</p>
            <p>Rating: {book.rating}</p>
            <button
              onClick={() => handleAddToProfile(book)}
              className="add-btn"
            >
             <RiCheckboxCircleLine size={24} /> Add to profile
            </button>
            <Link to={`/books/${book.id}`}>
              <button className="details-btn"> <RiFileList3Line size={24} />Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default BookList;



