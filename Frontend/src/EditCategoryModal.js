// src/components/EditCategoryModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './EditCategoryModal.css';

const EditCategoryModal = ({ category, onClose, onUpdate }) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/admin/category/${category.id}/edit`, {
        name: categoryName,
      });
      console.log(categoryName);

      if (response.data.status === 'success') {
        onUpdate(response.data.data.updatedCategory); // Pass the updated category back to the parent component
      } else {
        setError('Failed to update category. Please check your input.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display error from the server
      } else {
        setError('Failed to update category. Please try again.');
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Category</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleUpdate}>
          <div className="input-group">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter New Category Name"
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
