import React, { useState } from 'react';

function CommentForm({onCommentSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentText = String(comment).trim(); 
    if (commentText) {
      onCommentSubmit(commentText); 
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      {/* <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment here..."
      />
      <button type="submit">Submit Comment</button> */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment here..."
        style={{
          width: '100%',
          height: '100px',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ddd',
          fontSize: '14px',
          fontFamily: 'Arial, sans-serif',
          marginBottom: '10px',
          resize: 'vertical', // Allows vertical resizing
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: '#C5705D',
          width:'10%',
          color: 'white',
          padding: '10px 20px',
          marginLeft: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Submit Comment
      </button>

    </form>
  );
}

export default CommentForm;