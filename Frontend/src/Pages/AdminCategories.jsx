// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import './AdminCategories.css';
// import EditCategoryModal from './EditCategoryModal';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState('');

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/admin/category');
//         if (response.data.status === 'success') {
//           setCategories(response.data.data.categories);
//         }
//       } catch (error) {
//         console.error('Failed to fetch categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleEdit = (category) => {
//     setSelectedCategory(category);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCategory(null);
//   };

//   const handleDelete = async (categoryId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this category?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:5000/admin/category/${categoryId}/delete`);
//         // Remove the deleted category from the UI
//         setCategories(categories.filter(category => category.id !== categoryId));
//       } catch (error) {
//         console.error('Failed to delete category:', error);
//       }
//     }
//   };

//   const handleAddCategory = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/admin/category/add', {
//         name: newCategoryName,
//       });

//       if (response.data.status === 'success') {
//         setCategories([...categories, response.data.data.category]);
//         setNewCategoryName('');
//         setIsAddCategoryModalOpen(false);
//       }
//     } catch (error) {
//       console.error('Failed to add category:', error);
//     }
//   };

//   return (
//     <div className="categories-container">
//       <div className="tabs">
//         <button>Categories</button>
//         <button>Books</button>
//         <button>Authors</button>
//       </div>

//       <button 
//         className="add-category-btn" 
//         onClick={() => setIsAddCategoryModalOpen(true)}
//       >
//         Add Category
//       </button>

//       <table className="categories-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category, index) => (
//             <tr key={category._id}>
//               <td>{index + 1}</td>
//               <td>{category.name}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => handleEdit(category)}>✏️</button>
//                 <button className="delete-btn" onClick={() => handleDelete(category.id)}>🗑️</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Edit Category Modal */}
//       {isModalOpen && (
//         <EditCategoryModal
//           category={selectedCategory}
//           onClose={closeModal}
//           onUpdate={(updatedCategory) => {
//             // Update the category list with the newly updated category
//             setCategories((prevCategories) =>
//               prevCategories.map((cat) =>
//                 cat._id === updatedCategory._id ? updatedCategory : cat
//               )
//             );
//             closeModal();
//           }}
//         />
//       )}

//       {/* Add Category Modal */}
//       {isAddCategoryModalOpen && (
//         <div className="add-category-modal">
//           <div className="modal-content">
//             <h2>Add Category</h2>
//             <form onSubmit={handleAddCategory}>
//               <label htmlFor="categoryName">Category Name</label>
//               <input
//                 type="text"
//                 id="categoryName"
//                 value={newCategoryName}
//                 onChange={(e) => setNewCategoryName(e.target.value)}
//                 required
//               />
//               <button type="submit">Add Category</button>
//               <button type="button" onClick={() => setIsAddCategoryModalOpen(false)}>Cancel</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Categories;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/AdminCategories.css';
import EditCategoryModal from './EditCategoryModal';
import { Link } from 'react-router-dom';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

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
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/admin/category/${categoryId}/delete`);
        setCategories(categories.filter(category => category.id !== categoryId));
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/admin/category/add', {
        name: newCategoryName,
      });

      if (response.data.status === 'success') {
        setCategories([...categories, response.data.data.category]);
        setNewCategoryName('');
        setIsAddCategoryModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  return (
    <div className="admin-categories-container">
      <div className="admin-tabs">
        <Link to="/admin/categories"><button className='active'>Categories</button></Link>
        <Link to="/admin/books"><button>Books</button></Link>
        <Link to="/admin/authors"><button>Authors</button></Link>
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
                <button className="admin-edit-btn" onClick={() => handleEdit(category)}>✏️</button>
                <button className="admin-delete-btn" onClick={() => handleDelete(category.id)}>🗑️</button>
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
              <button type="button" onClick={() => setIsAddCategoryModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
