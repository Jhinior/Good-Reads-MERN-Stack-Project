import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as jwt_decode from 'jwt-decode';
import Cookies from "js-cookie";
import "../Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token'); 
    if (token) {
      try {
        const decodedToken = jwt_decode.jwtDecode(token);
        setUser(decodedToken); 
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    navigate("/login");
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
        <form action="/search">
        <li className="search-bar">
          <input
            type="text"
            placeholder="Search"
            name="searchQuery"
          />
          <button>Search</button>
        </li>
        </form>
      </ul>
      <ul className="right-nav">
        {user ? (
          <>
            <li>
             <Link to="/profile">{user.firstName}</Link>
            </li> 
            <li>
              <button onClick={handleLogout}>Logout</button> 
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link> 
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
