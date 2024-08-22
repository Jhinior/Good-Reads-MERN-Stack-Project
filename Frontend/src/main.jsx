// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './index.css';

// Create a root to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
