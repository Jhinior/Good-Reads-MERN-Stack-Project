import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(`https://freetestapi.com/api/v1/books?search=${encodeURIComponent(searchQuery)}`);
        const books = response.data;
        
       
        const foundBook = books.find(book => book.title.toLowerCase() === searchQuery.toLowerCase());

        if (foundBook) {
          navigate(`/books/${foundBook.id}`);
        } else {
          
          alert('No book found with that title.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        alert('Error fetching search results');
      }
    }
  };

  return (
    <nav className="navbar">
      <ul className="left-nav">
        <li>
          <Link to="/books">Good Reads</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
        <li>
          <Link to="/author">Authors</Link>
        </li>
      </ul>
      <ul className="center-nav">
        <li className="search-bar">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </li>
      </ul>
      <ul className="right-nav">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;