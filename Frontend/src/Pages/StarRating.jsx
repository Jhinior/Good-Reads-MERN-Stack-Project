import React, { useState } from 'react';
import '../Styles/index.css'; // Import CSS for styling

function StarRating({ onRatingSubmit }) {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRatingSubmit(value); // Submit the rating
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
