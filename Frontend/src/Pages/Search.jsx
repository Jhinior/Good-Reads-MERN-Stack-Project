
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const searchQuery = query.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Add useNavigate for programmatic navigation

  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery) {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(`https://freetestapi.com/api/v1/books?search=${encodeURIComponent(searchQuery)}`);
          console.log('API Response:', response.data); // Debugging
          setResults(response.data); // Adjust based on actual response
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
      {results.length > 0 ? (
        <ul>
          {results.map(result => (
            <li key={result.id}>
              <button onClick={() => navigate(`/books/${result.id}`)}>{result.title}</button>
              {/* Adjust based on actual data structure */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;