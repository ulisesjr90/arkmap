import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentInputProps {
  onSubmit: (comment: string) => void;
  disabled?: boolean;
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit, disabled }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && !disabled) {
      onSubmit(comment.trim());
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        disabled={disabled}
        className="w-full bg-gray-800 rounded-lg pl-4 pr-12 py-3 text-sm resize-none min-h-[80px]
          focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!comment.trim() || disabled}
        className="absolute right-2 bottom-2 p-2 text-blue-400 hover:text-blue-300 
          disabled:opacity-50 disabled:hover:text-blue-400"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
};

export default CommentInput;