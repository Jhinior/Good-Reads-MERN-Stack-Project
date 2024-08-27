# Good-Reads-MERN-Stack-Project

Good Reads is a comprehensive web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that serves as a platform for managing and exploring books, authors, and categories. It offers both user-facing and admin interfaces, each designed to optimize the experience for their respective users.

## Features

### User Interface
- **Home Page:** Provides access to popular categories, books, and authors, as well as quick links to register or log in.
- **Book Management:** Users can view books categorized under "All," "Read," "Currently Reading," and "Want to Read." They can also view book details, average ratings, and user reviews.
- **Author Profiles:** Displays detailed author information, including their books and average ratings.
- **Category Browsing:** Users can explore books by category, filtering results based on their preferences.

### Admin Panel
- **Login System:** Secure admin login to access the control panel.
- **Category Management:** Admins can create, edit, and delete categories efficiently.
- **Book Management:** Allows admins to manage book listings, including adding new books with associated categories and authors.
- **Author Management:** Admins can add, update, and delete author profiles.

## Strong Points
- **Robust Admin Panel:** The admin dashboard provides easy access to manage categories, books, and authors with intuitive options for adding, editing, or deleting records.
- **User-Centric Design:** The user interface is designed to deliver a seamless experience, enabling easy navigation and quick access to relevant information.
- **Efficient Book Shelving System:** Users can organize books into different shelves (Read, Currently Reading, Want to Read) and view ratings for informed reading decisions.
- **Scalable Architecture:** The MERN stack allows for easy scalability, making the application ready for future enhancements and feature additions.
- **Responsive Design:** The application is fully responsive, ensuring a smooth experience across various devices.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jhinior/Good-Reads-MERN-Stack-Project.git
   cd good-reads
   ```
2. Install dependencies for both the frontend and backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Set up your environment variables:
   - Create a `.env` file in the `backend` directory and include your MongoDB URI, port, and any other required variables.

4. Run the application:
   ```bash
   cd backend
   npm run dev
   cd ../frontend
   npm start
   ```

### Usage
- Navigate to `http://localhost:5000` to access the user interface.
- Navigate to `http://localhost:5000/admin` to access the admin panel.

## Future Enhancements
- **Advanced Search:** Implementing filters to search books by category, author, or rating.
- **User Reviews:** Allow users to leave detailed reviews along with their ratings.
- **Social Features:** Adding options for users to share book recommendations or follow authors.

## Contributing
This project is developed under the Information Technology Institute (ITI) and is still in progress.
