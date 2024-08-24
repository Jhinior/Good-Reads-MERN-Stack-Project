import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/AdminCategories.css';
import EditCategoryModal from './EditCategoryModal';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/category', {
          withCredentials: true,
        });
        if (response.data.status === 'success') {
          setCategories(response.data.data.categories);
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setAuthorized(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!authorized) {
      navigate('/admin'); 
    }
  }, [authorized, navigate]);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/admin/category/${categoryId}/delete`);
        setCategories(categories.filter((category) => category.id !== categoryId));
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/category/add',{
        name: newCategoryName,
      });

      if (response.data.status === 'success') {
        setCategories([...categories, response.data.data.category]);
        setNewCategoryName('');
        setIsAddCategoryModalOpen(false);
      }
    } catch (error) {
      alert(`Category ${newCategoryName} already exists`);
    }
  };

  if (!authorized) {
    return null; 
  }

  return (
    <div className="admin-categories-container">
      <div className="admin-tabs">
        <Link to="/admin/categories">
          <button className="active">Categories</button>
        </Link>
        <Link to="/admin/books">
          <button>Books</button>
        </Link>
        <Link to="/admin/authors">
          <button>Authors</button>
        </Link>
      </div>
      <button
        className="admin-add-category-btn"
        onClick={() => setIsAddCategoryModalOpen(true)}
      >
        Add Category
      </button>
      <table className="admin-categories-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <button className="admin-edit-btn" onClick={() => handleEdit(category)}>
                  ✏️
                </button>
                <button className="admin-delete-btn" onClick={() => handleDelete(category.id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={closeModal}
          onUpdate={(updatedCategory) => {
            setCategories((prevCategories) =>
              prevCategories.map((cat) =>
                cat._id === updatedCategory._id ? updatedCategory : cat
              )
            );
            closeModal();
          }}
        />
      )}

      {isAddCategoryModalOpen && (
        <div className="admin-add-category-modal">
          <div className="admin-modal-content">
            <h2>Add Category</h2>
            <form onSubmit={handleAddCategory}>
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
              <button type="submit">Add Category</button>
              <button type="button" onClick={() => setIsAddCategoryModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
