import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAuthorModal = ({ author, onClose, onUpdate }) => {
  const [firstName, setFirstName] = useState(author.firstName);
  const [lastName, setLastName] = useState(author.lastName);
  const [birthDate, setBirthDate] = useState(author.dob);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('dob', birthDate);
    if (photo) {
      formData.append('photo', photo);
    }
    
    try {
      const response = await axios.patch(
        `http://localhost:5000/admin/author/${author.id}/edit`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (response.data.status === 'success') {
        onUpdate(response.data.data.author); 
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update author. Please try again.');
      }
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <h2>Edit Author</h2>
        {error && <p className="edit-error-message">{error}</p>}
        <form onSubmit={handleUpdate}>
          <div className="edit-input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
            />
          </div>
          <div className="edit-input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
            />
          </div>
          <div className="edit-input-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="edit-input-group">
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            {author.photo && <img src={`http://localhost:5000/uploads/${author.photo}`} alt={author.firstName} style={{ width: '50px', height: 'auto' }} />}
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

export default EditAuthorModal;
