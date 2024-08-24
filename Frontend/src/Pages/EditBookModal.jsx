import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditBookModal = ({ book, onClose, onUpdate }) => {
  const [bookName, setBookName] = useState(book.name);
  const [bookAuthor, setBookAuthor] = useState(book.author ? book.author._id : '');
  const [bookCategory, setBookCategory] = useState(book.category ? book.category._id : '');
  const [bookImage, setBookImage] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch authors and categories for dropdown options
    const fetchOptions = async () => {
      try {
        const [authorsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:5000/admin/author', {
            withCredentials: true,
          }),
          axios.get('http://localhost:5000/admin/category', {
            withCredentials: true,
          }),
        ]);
        setAuthors(authorsResponse.data.data.authors);
        setCategories(categoriesResponse.data.data.categories);
      } catch (err) {
        console.error('Failed to fetch options:', err);
      }
    };

    fetchOptions();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(!bookAuthor){
      setBookAuthor(book.author)
    }
    if(!bookCategory){
      setBookCategory(book.category)
    }
    const formData = new FormData();
    formData.append('name', bookName);
    formData.append('author', bookAuthor);
    formData.append('category', bookCategory);
    if (bookImage) {
      formData.append('image', bookImage);
    }
    try {
      const response = await axios.patch(
        `http://localhost:5000/admin/book/${book.id}/edit`, 
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      if (response.data.status === 'success') {
        onUpdate(response.data.data.book); 
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); 
      } else {
        setError('Failed to update book. Please try again.');
      }
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <h2>Edit Book</h2>
        {error && <p className="edit-error-message">{error}</p>}
        <form onSubmit={handleUpdate}>
          <div className="edit-input-group">
            <label htmlFor="bookName">Book Name</label>
            <input
              type="text"
              id="bookName"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Enter Book Name"
            />
          </div>
          <div className="edit-input-group">
            <label htmlFor="bookAuthor">Author</label>
            <select
              id="bookAuthor"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
            >
              <option value="" disabled>Select an author</option>
              {authors.map(author => (
                <option key={author._id} value={author._id}>
                  {author.firstName} {author.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-input-group">
            <label htmlFor="bookCategory">Category</label>
            <select
              id="bookCategory"
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="edit-input-group">
            <label htmlFor="bookImage">Book Image</label>
            <input
              type="file"
              id="bookImage"
              accept="image/*"
              onChange={(e) => setBookImage(e.target.files[0])}
            />
            {book.image && <img src={`http://localhost:5000/uploads/${book.image}`} alt={book.name} style={{ width: '50px', height: 'auto' }} />}
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

export default EditBookModal;
