// AddShayari.tsx (Admin Panel for adding shayaris)

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase"; // Import Firebase db

const AddShayari = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill out both fields!");
      return;
    }

    try {
      // Add new shayari to Firestore
      await addDoc(collection(db, "shayaris"), {
        title,
        content,
      });
      alert("Shayari added successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding shayari:", error);
      alert("Something went wrong, try again!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card backdrop-blur-lg border border-cherry/20 rounded-lg p-6">
      <h2 className="text-2xl text-cherry mb-6 font-light">Add New Shayari</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Shayari Title"
              className="w-full p-2 border border-cherry/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cherry"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Enter Shayari Content"
              className="w-full p-2 border border-cherry/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cherry"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cherry text-white py-2 rounded-md hover:bg-cherry/80 transition-all duration-300"
          >
            Add Shayari
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShayari;
