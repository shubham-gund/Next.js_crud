import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  name: string;
  description: string;
  onClose: () => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  name,
  description,
  onClose,
  onNameChange,
  onDescriptionChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <input
          className="border-2 border-black-700 rounded-md w-full px-4 py-2 mb-2"
          type="text"
          placeholder="Title"
          value={name}
          onChange={onNameChange}
          required
        />
        <input
          className="border-2 border-black-700 rounded-md w-full px-4 py-2 mb-4"
          type="text"
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
        />
        <div className="flex justify-between">
          <button 
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm w-5/12 px-4 py-2"
            onClick={onSubmit}
          >
            Submit
          </button>
          <button 
            type="button" 
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm w-5/12 px-4 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
