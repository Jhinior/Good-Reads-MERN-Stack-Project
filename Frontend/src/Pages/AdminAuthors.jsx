import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditAuthorModal from './EditAuthorModal'; 
import '../Styles/AdminAuthors.css'

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [isAddAuthorModalOpen, setIsAddAuthorModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ firstName: '', lastName: '', dob: '', image: null });
  const [isEditAuthorModalOpen, setIsEditAuthorModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/author', {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setAuthors(response.data.data.authors);
      }
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

 
  const handleDelete = async (authorId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this author and all associated books?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/admin/author/${authorId}/delete`);
        setAuthors(authors.filter(author => author.id !== authorId));
      } catch (error) {
        console.error('Failed to delete author:', error);
      }
    }
  };

  const formatDateToMDY = (date) => {
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
  };

  const handleAddAuthor = async (e) => {
    e.preventDefault();
  
    if (!newAuthor.firstName || !newAuthor.lastName || !newAuthor.image) {
      alert('Please provide all required fields.');
      return;
    }
  
    const formData = new FormData();
    formData.append('firstName', newAuthor.firstName);
    formData.append('lastName', newAuthor.lastName);
    newAuthor.dob = formatDateToMDY(newAuthor.dob)
    formData.append('dob', newAuthor.dob);
    formData.append('image', newAuthor.image);
  
    try {
      const response = await axios.post('http://localhost:5000/admin/author/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        fetchAuthors(); 
        setNewAuthor({ firstName: '', lastName: '', dob: '', image: null });
        setIsAddAuthorModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to add author:', error); 
      alert('Failed to add author: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleEdit = (author) => {
    setSelectedAuthor(author);
    setIsEditAuthorModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditAuthorModalOpen(false);
    setSelectedAuthor(null);
  };

  return (
    <div className="authors-container">
      <div className="tabs">
        <Link to="/admin/categories"><button>Categories</button></Link>
        <Link to="/admin/books"><button>Books</button></Link>
        <Link to="/admin/authors"><button className='active'>Authors</button></Link>
      </div>

      <button 
        className="add-author-btn" 
        onClick={() => setIsAddAuthorModalOpen(true)}
      >
        Add Author
      </button>

      <table className="authors-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id}>
              <td>{index + 1}</td>
              <td>
                {author.image ? <img src={`http://localhost:5000/uploads/${author.image}`} alt={author.firstName} style={{ width: '50px', height: 'auto' }} /> : 'N/A'}
              </td>
              <td>{author.firstName}</td>
              <td>{author.lastName}</td>
              <td>{new Date(author.dob).toLocaleDateString()}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(author)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(author.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddAuthorModalOpen && (
        <div className="add-author-modal">
          <div className="modal-content">
            <h2>Add Author</h2>
            <form onSubmit={handleAddAuthor}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={newAuthor.firstName}
                onChange={(e) => setNewAuthor({ ...newAuthor, firstName: e.target.value })}
                required
              />

              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={newAuthor.lastName}
                onChange={(e) => setNewAuthor({ ...newAuthor, lastName: e.target.value })}
                required
              />

              <label htmlFor="dob">Birth Date</label>
              <input
                type="date"
                id="dob"
                value={newAuthor.dob}
                onChange={(e) => setNewAuthor({ ...newAuthor, dob: e.target.value })}
               requir ed
              />

              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setNewAuthor({ ...newAuthor, image: e.target.files[0] })}
                required
              />
              <button type="submit">Add Author</button>
              <button type="button" onClick={() => setIsAddAuthorModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {isEditAuthorModalOpen && selectedAuthor && (
        <EditAuthorModal
          author={selectedAuthor}
          onClose={closeEditModal}
          onUpdate={(author) => {
            setAuthors((prevAuthors) =>
              prevAuthors.map((au) =>
                au.id === author.id ? author : au
              )
            );
            fetchAuthors();
            closeEditModal();
          }}
        />
      )}
    </div>
  );
};

export default AuthorsPage;
