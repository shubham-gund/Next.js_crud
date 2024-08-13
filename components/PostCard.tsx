import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface PostCardProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ title, description, onEdit, onDelete }) => {
  return (
    <div className="flex items-start border-2 border-black-900 p-4 rounded-xl mb-4 w-full max-w-sm shadow-lg">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="mb-4">{description}</p>
      </div>
      <div className="flex space-x-2 ml-4">
        <div className='w-9 h-9 bg-red-300 hover:bg-red-500 rounded-full flex justify-center items-center'>
          <button
            onClick={onDelete}
            aria-label="Delete"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
        <div className='w-9 h-9 bg-green-300 hover:bg-green-500 rounded-full flex justify-center items-center'>
          <button
            onClick={onEdit}
            aria-label="Edit"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
