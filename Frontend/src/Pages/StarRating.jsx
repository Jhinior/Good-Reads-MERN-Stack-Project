import React, { useState } from 'react';
import '../index.css'; 

function StarRating({ onRatingSubmit }) {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRatingSubmit(value);
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
