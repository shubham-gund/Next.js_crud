"use client"
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "@/components/PostCard";
import Modal from "@/components/Modal";
import { PlusIcon } from '@heroicons/react/24/solid';

interface Item {
  _id: string;
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get('/api/items');
      setItems(res.data.data);
      setLoading(false);
    };

    fetchItems();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setName('');
    setDescription('');
    setEditId(null);
    setIsModalOpen(false);
  };

  const addItem = async () => {
    if (editId) {
      await axios.put(`/api/items/${editId}`, { name, description });
      setItems(items.map(item => 
        item._id === editId ? { ...item, name, description } : item
      ));
    } else {
      const res = await axios.post('/api/items', { name, description });
      setItems([...items, res.data.data]);
    }
    handleCloseModal();
  };

  const deleteItem = async (id: string) => {
    await axios.delete(`/api/items/${id}`);
    setItems(items.filter(item => item._id !== id));
  };

  const startEditing = (item: Item) => {
    setName(item.name);
    setDescription(item.description);
    setEditId(item._id);
    setIsModalOpen(true);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
        <p className="px-2">Loading... </p>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-4 px-4 py-10 ">
        {items.length === 0 ? (
          <p className="text-gray-500 ">No posts available. Enter the first post!</p>
        ) : (
          items.map(item => (
            <PostCard
              key={item._id}
              title={item.name}
              description={item.description}
              onEdit={() => startEditing(item)}
              onDelete={() => deleteItem(item._id)}
            />
          ))
        )}
      </div>
      <button
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={handleOpenModal}
        aria-label="Add Item"
      >
        <PlusIcon className="h-6 w-6 sm:h-10 sm:w-10" />
      </button>
      <Modal
        isOpen={isModalOpen}
        title={editId ? "Update Item" : "Add Item"}
        name={name}
        description={description}
        onClose={handleCloseModal}
        onNameChange={(e) => setName(e.target.value)}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onSubmit={addItem}
      />
    </div>
  );
}
