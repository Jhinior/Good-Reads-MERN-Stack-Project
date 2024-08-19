import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend API
    axios.get('http://localhost:5000/admin/category')
      .then(response => {
        setCategories(response.data.data.categories);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Categories</h1>
      <div className="row">
        {categories.map(category => (
          <div className="col-md-4 mb-4" key={category._id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
                {/* Navigate to category page when clicked */}
                <Link to={`/category/${category.name}`} className="btn btn-primary">
                  View Books
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
