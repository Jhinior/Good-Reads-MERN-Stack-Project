import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/CategoryList.css'; 

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/author');
        console.log(response.data.data.authors)
        setAuthors(response.data.data.authors);
      } catch (error) {
        console.error('Error fetching authors:', error);
        setError('There was an error fetching the authors.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Authors</h1>
      {loading ? (
        <p>Loading authors...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="row">
          {authors.length > 0 ? (
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
          ) : (
            <p>No authors available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AuthorsPage;
