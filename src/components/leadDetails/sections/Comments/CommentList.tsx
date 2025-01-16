// CommentList.tsx
import React from 'react';

interface Comment {
  id: string;
  date: string;
  user: string;
  content: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        No comments yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium">{comment.user}</div>
            <div className="text-sm text-gray-400">
              {new Date(comment.date).toLocaleDateString()}
            </div>
          </div>
          <div className="text-gray-300 whitespace-pre-wrap">
            {comment.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
