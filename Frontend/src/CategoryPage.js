import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryPage() {
  const { id: categoryName } = useParams(); // Get the category name from URL
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchCategoryAndBooks = async () => {
      try {
        // Fetch category details based on name
        const categoryResponse = await axios.get(`http://localhost:5000/admin/categories/name/${categoryName}`);
        const categoryData = categoryResponse.data.data.category;
        setCategory(categoryData);

        // Fetch books for the fetched category
        if (categoryData._id) {     
          const booksResponse = await axios.get(`http://localhost:5000/admin/books/category/${categoryData._id}`);
          setBooks(booksResponse.data.data.books);   
        } else {
          setError('Category ID not found');
        }
      } catch (error) {
        // Handle errors
        console.error('There was an error fetching the data!', error);
        setError('Error fetching category or books');
      }
    };

    fetchCategoryAndBooks();
  }, [categoryName]);

  // Inline style for image
  const imageStyle = {
    width: '350px', // Fixed width for book cover size
    height: '600px', // Fixed height for book cover size
  };

  return (
    <div className="container">
      {error ? (
        <p className="text-danger">{error}</p>
      ) : category ? (
        <>
          <h1 className="my-4">{category.name}</h1>
          <p>{category.description}</p>

          <h2>Books in this Category:</h2>
          {books.length > 0 ? (
            <div className="row">
              {books.map(book => (
                <div className="col-md-4 mb-4" key={book._id}>
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
                      <p className="card-text">Category: {category.name}</p>
                      {/* <p className="card-text">Author: {book.author.firstName}</p> */}
                      {/* <p className="card-text">Average Rating: {book.avgRating}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No books added yet.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CategoryPage;
