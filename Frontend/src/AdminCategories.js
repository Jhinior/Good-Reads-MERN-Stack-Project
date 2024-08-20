// src/components/Categories.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminCategories.css';
import EditCategoryModal from './EditCategoryModal';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/category');
        if (response.data.status === 'success') {
          setCategories(response.data.data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (categoryId) => {
    try {
      // Add delete logic here if needed
      console.log(`Deleting category with ID: ${categoryId}`);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="categories-container">
      <div className="tabs">
        <button>Categories</button>
        <button>Books</button>
        <button>Authors</button>
      </div>
      <table className="categories-table">
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
                <button className="edit-btn" onClick={() => handleEdit(category)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(category._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={closeModal}
          onUpdate={(updatedCategory) => {
            // Update the category list with the newly updated category
            setCategories((prevCategories) =>
              prevCategories.map((cat) =>
                cat._id === updatedCategory._id ? updatedCategory : cat
              )
            );
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default Categories;
