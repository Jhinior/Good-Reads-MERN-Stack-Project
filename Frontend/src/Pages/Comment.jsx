import React, { useState } from 'react';

function CommentForm({onCommentSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure comment is treated as a string
    const commentText = String(comment).trim(); // Convert to string and trim whitespace
    if (commentText) {
      onCommentSubmit(commentText); // Submit the comment
      setComment(''); // Clear input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment here..."
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
}

export default CommentForm;