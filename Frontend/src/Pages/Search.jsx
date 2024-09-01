
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const params = new URLSearchParams(window.location.search);  ;
  const searchQuery = params.get('searchQuery');
  const [books,setBooks] = useState([])
  const [authors,setAuthors] = useState([])
  const [categories,setCategories] = useState([])
  const [bookResults,setBookResults] = useState([])
  const [authorResults,setAuthorResults] = useState([])
  const [categoryResults,setCategoryResults] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchResults = async () => {
      console.log(searchQuery);
      if (searchQuery) {
        setLoading(true);
        setError('');
        try {
          // Fetch all the data concurrently
          const [responseBooks, responseCategory, responseAuthor] = await Promise.all([
            axios.get('http://localhost:5000/admin/book', { withCredentials: true }),
            axios.get('http://localhost:5000/admin/category', { withCredentials: true }),
            axios.get('http://localhost:5000/admin/author', { withCredentials: true }),
          ]);
  
          // Extract the data from the responses
          const fetchedBooks = responseBooks.data.data.books;
          const fetchedAuthors = responseAuthor.data.data.authors;
          const fetchedCategories = responseCategory.data.data.categories;
  
          // Perform filtering before setting state
          const filteredBooks = fetchedBooks.filter(book =>
            book.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const filteredAuthors = fetchedAuthors.filter(author =>
            (author.firstName.toLowerCase() + " " + author.lastName.toLowerCase()).includes(searchQuery.toLowerCase())
          );
          const filteredCategories = fetchedCategories.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
  
          // Update state
          setBooks(fetchedBooks);
          setAuthors(fetchedAuthors);
          setCategories(fetchedCategories);
          setBookResults(filteredBooks);
          setAuthorResults(filteredAuthors);
          setCategoryResults(filteredCategories);
  
        } catch (err) {
          console.error('Error fetching data:', err); // Debugging
          setError('Error fetching search results');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
  
    fetchResults();
  }, [searchQuery]);
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      <h3>Books sreach results:</h3>
      <div className="row">
        {bookResults.map(book => (
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
      <hr></hr>
      <h3>Authors search results:</h3>
      <div className="row">
          {authorResults.length > 0 ? (
            authors.map(author => (
              <div className="col-md-4 mb-4" key={author.id}>
                <div className="card category-card h-100 mb-4 shadow-sm">
                  <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{author.firstName} {author.lastName}</h5>
                  <img
                       src={author.photo}
                      className="card-img-top book-img"
                      alt={author.firstName + author.lastName}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/350x600'}
                    />
                    {author.dob && (
                      <p className="card-text">
                        Born: {new Date(author.dob).toLocaleDateString()}
                      </p>
                    )}
                    <Link to={`/author/${encodeURIComponent(author.firstName + ' ' + author.lastName)}`} className="btn btn-primary mt-auto">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : ""
          }
        </div>
        <hr></hr>
      <h3>Categoreis search results:</h3>
      <div className="container">
        <div className="row">
        {categoryResults.map(category => (
          <div className="col-md-4 mb-4" key={category._id}>
            <div className="card category-card h-100 mb-4 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{category.name}</h5>
                <Link to={`/category/${category.name}`} className="btn btn-primary mt-auto">
                  View Books
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>


    </div>
  );
}

export default SearchResults;