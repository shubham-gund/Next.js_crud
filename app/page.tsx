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

  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get('/api/items');
      setItems(res.data.data);
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center gap-4 px-4 py-10 ">
        {items.map(item => (
          <PostCard
            key={item._id}
            title={item.name}
            description={item.description}
            onEdit={() => startEditing(item)}
            onDelete={() => deleteItem(item._id)}
          />
        ))}
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
