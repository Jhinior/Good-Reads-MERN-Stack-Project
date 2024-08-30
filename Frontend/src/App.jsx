import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import BookList from './Pages/BookList';
import BookCard from './Pages/BookCard';
import Login from './Pages/Login';
import Navbar from './Pages/Navbar';
import Profile from './Pages/Profile';
import SearchResults from './Pages/Search';
import CategoryList from './Pages/CategoryList';  
import CategoryDetail from './Pages/CategoryPage';
import AuthorsList from './Pages/AuthorsList';  
import AuthorDetailPage from './Pages/AuthorDetailPage';
import Admin from './Pages/Admin';
import AdminCategories from './Pages/AdminCategories';
import AdminBooks from './Pages/AdminBooks';
import AdminAuthors from './Pages/AdminAuthors';
import Cookies from 'js-cookie'; 
import * as jwt_decode from 'jwt-decode';



function App() {
  const location = useLocation();
  const showNavbar = !location.pathname.startsWith('/admin') && location.pathname !== '/login';

   const [profile, setProfile] = useState(() => {
    const storedProfile = Cookies.get("profile"); 
    return storedProfile ? JSON.parse(storedProfile) : {};
  });
  
  const [profileBooks, setProfileBooks] = useState(() => {
    const storedBooks = Cookies.get("profileBooks"); 
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const handleDeleteBook = (bookId) => {
    setProfileBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter((book) => book.id !== bookId);
      Cookies.set("profileBooks", JSON.stringify(updatedBooks), { expires: 7 }); 
      return updatedBooks;
    });
  };

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<BookList setProfileBooks={setProfileBooks} profileBooks={profileBooks} />} /> 
        <Route path="/profile" element={<Profile profile={profile} profileBooks={profileBooks} handleDeleteBook={handleDeleteBook} />} />
        <Route path="/login" element={<Login setProfile={setProfile} />} />
        <Route path="/books/:id" element={<BookCard />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/author" element={<AuthorsList />} />
        <Route path="/author/:name" element={<AuthorDetailPage />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/authors" element={<AdminAuthors />} />
      </Routes>
    </div>
  );
}

export default App;
