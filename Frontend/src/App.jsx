
// // import React, { useState } from 'react';
// // import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// // import BookList from './BookList';
// // import BookCard from './BookCard';
// // import Login from './Login';
// // import Navbar from './Navbar';
// // import Profile from './Profile';
// // import Authors from './Authors';
// // import SearchResults from './Search';
// // import './App.css';

// // function App() {
// //   const location = useLocation();
// //   const isLoginPage = location.pathname === '/';
// //   const [profile, setProfile] = useState(() => {
// //     const storedProfile = localStorage.getItem("profile");
// //     return storedProfile ? JSON.parse(storedProfile) : {};
// //   });
// //   const [profileBooks, setProfileBooks] = useState(() => {
// //     const storedBooks = localStorage.getItem("profileBooks");
// //     return storedBooks ? JSON.parse(storedBooks) : [];
// //   });

// //   const handleDeleteBook = (bookId) => {
// //     setProfileBooks((prevBooks) => {
// //       const updatedBooks = prevBooks.filter((book) => book.id !== bookId);
// //       localStorage.setItem("profileBooks", JSON.stringify(updatedBooks));
// //       return updatedBooks;
// //     });
    
// //   };

// //   return (
// //     <div className="App">
// //       {!isLoginPage && <Navbar />}
// //       <Routes>
// //         <Route path="/" element={<Login setProfile={setProfile} />} />
// //         <Route path="/profile" element={<Profile profile={profile} profileBooks={profileBooks} handleDeleteBook={handleDeleteBook} />} />
// //         <Route path="/books" element={<BookList setProfileBooks={setProfileBooks} profileBooks={profileBooks} />} />
// //         <Route path="/books/:id" element={<BookCard />} />
// //         <Route path="/authors" element={<Authors />} />
// //         <Route path="/search" element={<SearchResults />} />
// //       </Routes>
// //     </div>
// //   );
// // }

// // export default App;
// // App.js
// import React, { useState } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import BookList from './BookList';
// import BookCard from './BookCard';
// import Login from './Login';
// import Navbar from './Navbar';
// import Profile from './Profile';
// import Authors from './Authors';
// import SearchResults from './Search';

// import Admin from './Admin';
// import AdminCategories from './AdminCategories';



// function App() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === '/';
//   const [profile, setProfile] = useState(() => {
//     const storedProfile = localStorage.getItem("profile");
//     return storedProfile ? JSON.parse(storedProfile) : {};
//   });
//   const [profileBooks, setProfileBooks] = useState(() => {
//     const storedBooks = localStorage.getItem("profileBooks");
//     return storedBooks ? JSON.parse(storedBooks) : [];
//   });

//   const handleDeleteBook = (bookId) => {
//     setProfileBooks((prevBooks) => {
//       const updatedBooks = prevBooks.filter((book) => book.id !== bookId);
//       localStorage.setItem("profileBooks", JSON.stringify(updatedBooks));
//       return updatedBooks;
//     });
//   };

//   return (
//     <div className="App">
//       {!isLoginPage && <Navbar />}
//       <Routes>
//         <Route path="/admin" element={<Admin />} />
//         <Route path="/" element={<Login setProfile={setProfile} />} />
//         <Route path="/profile" element={<Profile profile={profile} profileBooks={profileBooks} handleDeleteBook={handleDeleteBook} />} />
//         <Route path="/books" element={<BookList setProfileBooks={setProfileBooks} profileBooks={profileBooks} />} />
//         <Route path="/books/:id" element={<BookCard />} />
//         <Route path="/authors" element={<Authors />} />
//         <Route path="/search" element={<SearchResults />} />
//         <Route path="/admin/categories" element={<AdminCategories />} />

//       </Routes>
//     </div>
//   );
// }

// export default App;
// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import BookList from './BookList';
import BookCard from './BookCard';
import Login from './Login';
import Navbar from './Navbar';
import Profile from './Profile';
import SearchResults from './Search';
import CategoryList from './CategoryList';  // Ensure this path is correct
import CategoryDetail from './CategoryPage';
import AuthorsList from './AuthorsList';  // New import
import AuthorDetailPage from './AuthorDetailPage';
import Admin from './Admin';
import AdminCategories from './AdminCategories';



function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("profile");
    return storedProfile ? JSON.parse(storedProfile) : {};
  });
  const [profileBooks, setProfileBooks] = useState(() => {
    const storedBooks = localStorage.getItem("profileBooks");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const handleDeleteBook = (bookId) => {
    setProfileBooks((prevBooks) => {
      const updatedBooks = prevBooks.filter((book) => book.id !== bookId);
      localStorage.setItem("profileBooks", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  return (
    <div className="App">
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Login setProfile={setProfile} />} />
        <Route path="/profile" element={<Profile profile={profile} profileBooks={profileBooks} handleDeleteBook={handleDeleteBook} />} />
        <Route path="/books" element={<BookList setProfileBooks={setProfileBooks} profileBooks={profileBooks} />} />
        <Route path="/books/:id" element={<BookCard />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/$" element={<CategoryList />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/author" element={<AuthorsList/>} />
        <Route path="/author/:name" element={<AuthorDetailPage/>} />
      </Routes>
    </div>
  );
}

export default App;
