import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/AdminBooks.css' // Make sure this CSS file exists and is styled as needed
// import EditBookModal from './EditBookModal'; // Create this component similarly to EditCategoryModal
import { Link } from 'react-router-dom';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ name: '', author: '', category: '', rating: '' });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/book');
        if (response.data.status === 'success') {
          setBooks(response.data.data.books);
        }
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/admin/book/${bookId}/delete`);
        // Remove the deleted book from the UI
        setBooks(books.filter(book => book._id !== bookId));
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/admin/book/add', newBook);

      if (response.data.status === 'success') {
        setBooks([...books, response.data.data.book]);
        setNewBook({ name: '', author: '', category: '', rating: '' });
        setIsAddBookModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to add book:', error);
    }
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
            <th>Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id}>
              <td>{index + 1}</td>
              <td>{book.name}</td>
              <td>{book.author ? `${book.author.firstName} ${book.author.lastName}` : 'N/A'}</td>
              <td>{book.category ? book.category.name : 'N/A'}</td>
              <td>{book.rating}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(book)}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(book._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Book Modal */}
      {isModalOpen && (
        <EditBookModal
          book={selectedBook}
          onClose={closeModal}
          onUpdate={(updatedBook) => {
            // Update the book list with the newly updated book
            setBooks((prevBooks) =>
              prevBooks.map((bk) =>
                bk._id === updatedBook._id ? updatedBook : bk
              )
            );
            closeModal();
          }}
        />
      )}

      {/* Add Book Modal */}
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
              <input
                type="text"
                id="bookAuthor"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              />
              <label htmlFor="bookCategory">Category</label>
              <input
                type="text"
                id="bookCategory"
                value={newBook.category}
                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                required
              />
              <label htmlFor="bookRating">Rating</label>
              <input
                type="text"
                id="bookRating"
                value={newBook.rating}
                onChange={(e) => setNewBook({ ...newBook, rating: e.target.value })}
                required
              />
              <button type="submit">Add Book</button>
              <button type="button" onClick={() => setIsAddBookModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
