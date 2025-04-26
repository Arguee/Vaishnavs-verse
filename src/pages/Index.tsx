"use client";

import { useState, useEffect } from "react";
import ShayariCard from "@/components/ShayariCard";
import AudioShayari from "@/components/AudioShayari";
import { Cherry } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "@/firebase"; // Adjusted for your Firebase initialization

interface Shayari {
  title: string;
  content: string;
}

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [sampleShayaris, setSampleShayaris] = useState<Shayari[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const db = getFirestore(app);

  // Fetch shayaris from Firestore when the component mounts
  useEffect(() => {
    const fetchShayaris = async () => {
      const querySnapshot = await getDocs(collection(db, "shayaris"));
      const shayarisArray: Shayari[] = [];
      querySnapshot.forEach((doc) => {
        const shayari = doc.data() as Shayari; // Type assertion
        shayarisArray.push(shayari);
      });
      setSampleShayaris(shayarisArray);
    };
    fetchShayaris();
  }, []);

  // Handle admin login
  const handleLogin = () => {
    if (passwordInput === "vaishnav6655") { // Custom admin password
      setIsAdmin(true);
    } else {
      alert("Wrong password!");
    }
  };

  // Handle adding a new shayari to Firestore
  const handleAddShayari = async () => {
    if (newTitle.trim() === "" || newContent.trim() === "") {
      alert("Please fill both title and content!");
      return;
    }

    const newShayari = {
      title: newTitle,
      content: newContent,
    };

    // Add new shayari to Firestore
    await addDoc(collection(db, "shayaris"), newShayari);

    // Update local state to reflect the new shayari
    setSampleShayaris((prev) => [newShayari, ...prev]);

    // Clear the input fields
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="min-h-screen bg-background animate-gradient-xy bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-float">
          <div className="inline-flex items-center gap-3 mb-6">
            <Cherry className="h-8 w-8 text-cherry animate-pulse" />
            <h1 className="text-5xl md:text-6xl text-cherry font-light">
            Vaishnav's Verse
            </h1>
            <Cherry className="h-8 w-8 text-cherry animate-pulse" />
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-32 h-32 border-4 border-cherry/50 hover:border-cherry transition-all duration-300">
              <AvatarImage 
                src="https://iili.io/3VcbqKJ.jpg" 
                alt="Your Profile" 
                className="object-cover transform scale-140"
              />
              <AvatarFallback className="bg-cherry/20 text-cherry">YP</AvatarFallback>
            </Avatar>
            <p className="text-cherry-light/80 text-lg italic max-w-md">
            Where Vaishnav’s words weave emotions into timeless whispers.
            </p>
          </div>
        </div>

        {/* Admin Section */}
        {!isAdmin && (
          <div className="mb-16 p-6 border border-cherry/30 rounded-lg bg-secondary/30 backdrop-blur-md max-w-md mx-auto">
            {!showPasswordField ? (
              <button
                onClick={() => setShowPasswordField(true)}
                className="mx-auto block bg-cherry text-background px-4 py-2 rounded-full text-sm hover:bg-cherry-light transition-all"
              >
                🔒 Admin
              </button>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl text-cherry mb-4 text-center font-light">Admin Login</h2>
                <input
                  type="password"
                  placeholder="Enter Admin Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full p-3 rounded-md bg-background border border-cherry/20 text-cherry focus:border-cherry-light"
                />
                <button
                  onClick={handleLogin}
                  className="w-full mt-2 bg-cherry text-background py-3 rounded-md hover:bg-cherry-light transition-all"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add Shayari Form */}
        {isAdmin && (
          <div className="mb-16 p-6 border border-cherry/30 rounded-lg bg-secondary/30 backdrop-blur-md max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl text-cherry mb-4 text-center font-light">Add New Shayari</h2>
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 rounded-md bg-background border border-cherry/20 text-cherry focus:border-cherry-light"
            />
            <textarea
              placeholder="Content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-md bg-background border border-cherry/20 text-cherry focus:border-cherry-light"
            />
            <button
              onClick={handleAddShayari}
              className="w-full bg-cherry text-background py-3 rounded-md hover:bg-cherry-light transition-all"
            >
              ➕ Add Shayari
            </button>
          </div>
        )}

        {/* Written Shayaris */}
        <div className="mb-16">
          <h2 className="text-3xl text-cherry mb-8 text-center font-light">Written Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleShayaris.map((shayari, index) => (
              <ShayariCard
                key={index}
                title={shayari.title}
                content={shayari.content}
              />
            ))}
          </div>
        </div>

        {/* Audio Shayaris */}
        <div className="mt-16">
          <AudioShayari />
        </div>
      </div>
    </div>
  );
};

export default Index;
