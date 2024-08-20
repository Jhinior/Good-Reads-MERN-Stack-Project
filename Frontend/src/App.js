import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksList from './BooksList';  // Ensure this path is correct
import CategoryList from './CategoryList';  // Ensure this path is correct
import CategoryDetail from './CategoryPage';
import AuthorsList from './AuthorsList';  // New import
import AuthorDetailPage from './AuthorDetailPage';
import Admin from './Admin';
import AdminCategories from './AdminCategories';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/author" element={<AuthorsList/>} />
          <Route path="/author/:name" element={<AuthorDetailPage/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
