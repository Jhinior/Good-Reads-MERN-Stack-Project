import React, { useState } from 'react';
import axios from 'axios';

const EditCategoryModal = ({ category, onClose, onUpdate }) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5000/admin/category/${category.id}/edit`, {
        name: categoryName,
      });
      if (response.data.status === 'success') {
        onUpdate(response.data.data.updatedCategory); 
      } 
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); 
      } else {
        setError('Failed to update category. Please try again.');
      }
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <h2>Edit Category</h2>
        {error && <p className="edit-error-message">{error}</p>}
        <form onSubmit={handleUpdate}>
          <div className="edit-input-group">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter New Category Name"
            />
          </div>
          <div className="edit-modal-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
