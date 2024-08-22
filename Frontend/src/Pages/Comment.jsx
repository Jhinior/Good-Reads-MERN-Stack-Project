import React, { useState } from 'react';

function CommentForm({ bookId, onCommentSubmit }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      onCommentSubmit(bookId, comment); // Submit the comment
      setComment('');
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
