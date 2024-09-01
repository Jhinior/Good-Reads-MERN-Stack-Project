import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/AdminBooks.css';
import { Link } from 'react-router-dom';
import EditBookModal from './EditBookModal'; 

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ name: '', author: '', category: '', image: null });
  const [isEditBookModalOpen, setIsEditBookModalOpen] = useState(false); 
  const [selectedBook, setSelectedBook] = useState(null); 
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/book', {
        withCredentials: true,
      });
      const responseCategory = await axios.get('http://localhost:5000/admin/category', {
        withCredentials: true,
      });
      const responseAuthor = await axios.get('http://localhost:5000/admin/author', {
        withCredentials: true,
      });
      if (response.data.status === 'success') {
        setBooks(response.data.data.books);
        setAuthors(responseAuthor.data.data.authors);
        setCategories(responseCategory.data.data.categories);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/admin/book/${bookId}/delete`);
        setBooks(books.filter(book => book.id !== bookId));
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!newBook.image) {
      alert('Please upload an image for the book.');
      return; 
    }

    const formData = new FormData();
    formData.append('name', newBook.name);
    formData.append('author', newBook.author);
    formData.append('category', newBook.category);
    formData.append('image', newBook.image); 

    try {
      const response = await axios.post('http://localhost:5000/admin/book/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.status === 'success') {
        fetchBooks();
        setNewBook({ name: '', author: '', category: '', image: null });
        setIsAddBookModalOpen(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditBookModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditBookModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="books-container">
      <div className="tabs">
        <Link to="/admin/categories"><button>Categories</button></Link>
        <Link to="/admin/books"><button className='active'>Books</button></Link>
        <Link to="/admin/authors"><button>Authors</button></Link>
      </div>

      <button 
        className="add-book-btn" 
        onClick={() => setIsAddBookModalOpen(true)}
      >
        Add Book
      </button>

      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>
                {book.image ? <img src={`http://localhost:5000/uploads/${book.image}`} alt={book.name} style={{ width: '50px', height: 'auto' }} /> : 'N/A'}
              </td>
              <td>{book.name}</td>
              <td>{book.author ? `${book.author.firstName} ${book.author.lastName}` : 'N/A'}</td>
              <td>{book.category ? book.category.name : 'N/A'}</td>
              <td>{book.rating}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(book)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(book.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddBookModalOpen && (
        <div className="add-book-modal">
          <div className="modal-content">
            <h2>Add Book</h2>
            <form onSubmit={handleAddBook}>
              <label htmlFor="bookName">Book Name</label>
              <input
                type="text"
                id="bookName"
                value={newBook.name}
                onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
                required
              />
              <label htmlFor="bookAuthor">Author</label>
              <select
                id="bookAuthor"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              >
                <option value="" disabled>Select an author</option>
                {authors.map(author => (
                  <option key={author._id} value={author._id}>
                    {author.firstName} {author.lastName}
                  </option>
                ))}
              </select>
              <label htmlFor="bookCategory">Category</label>
              <select
                id="bookCategory"
                value={newBook.category}
                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <label htmlFor="bookImage">Book Image</label>
              <input
                type="file"
                id="bookImage"
                accept="image/*"
                onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
                required
              />
              <button type="submit">Add Book</button>
              <button type="button" onClick={() => setIsAddBookModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {isEditBookModalOpen && selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={closeEditModal}
          onUpdate={(book) => {
            setBooks((prevBooks) =>
              prevBooks.map((bk) =>
               bk.id === book.id ? book : bk
            )
          );
            fetchBooks()
            closeEditModal();
          }}
        />
      )}
    </div>
  );
};

export default BooksPage;
