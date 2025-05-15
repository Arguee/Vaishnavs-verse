"use client";

import { useState, useEffect } from "react";
import ShayariCard from "@/components/ShayariCard";
import AudioShayari from "@/components/AudioShayari";
import { Cherry, Mic, Type } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "@/firebase"; // Adjusted for your Firebase initialization
import { uploadAudio } from "@/lib/cloudinary";
import Cookies from 'js-cookie';

interface Shayari {
  title: string;
  content: string;
  type: 'text' | 'audio';
  audioUrl?: string;
}

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [sampleShayaris, setSampleShayaris] = useState<Shayari[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [shayariType, setShayariType] = useState<'text' | 'audio'>('text');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const db = getFirestore(app);

  // Check for admin cookie on component mount
  useEffect(() => {
    const adminCookie = Cookies.get('admin');
    if (adminCookie === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Fetch shayaris from Firestore when the component mounts
  useEffect(() => {
    const fetchShayaris = async () => {
      try {
        console.log("Fetching shayaris...");
        const querySnapshot = await getDocs(collection(db, "shayaris"));
        const shayarisArray: Shayari[] = [];
        querySnapshot.forEach((doc) => {
          const shayari = doc.data() as Shayari;
          console.log("Fetched shayari:", shayari);
          shayarisArray.push(shayari);
        });
        console.log("All shayaris:", shayarisArray);
        setSampleShayaris(shayarisArray);
      } catch (error) {
        console.error("Error fetching shayaris:", error);
      }
    };
    fetchShayaris();
  }, []);

  // Add console log for rendering
  console.log("Current sampleShayaris:", sampleShayaris);

  // Handle admin login
  const handleLogin = () => {
    if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true);
      Cookies.set('admin', 'true', { expires: 7 });
    } else {
      alert("Incorrect password");
    }
  };

  // Handle admin logout
  const handleLogout = () => {
    setIsAdmin(false);
    Cookies.remove('admin');
  };

  // Handle adding a new shayari to Firestore
  const handleAddShayari = async () => {
    if (newTitle.trim() === "") {
      alert("Please add a title!");
      return;
    }

    if (shayariType === 'text' && newContent.trim() === "") {
      alert("Please add content!");
      return;
    }

    if (shayariType === 'audio' && !audioFile) {
      alert("Please upload an audio file!");
      return;
    }

    setUploading(true);
    let audioUrl = '';

    if (shayariType === 'audio' && audioFile) {
      try {
        audioUrl = await uploadAudio(audioFile);
      } catch (error) {
        console.error("Error uploading audio:", error);
        alert("Error uploading audio file. Please try again.");
        setUploading(false);
        return;
      }
    }

    const newShayari = {
      title: newTitle,
      content: shayariType === 'text' ? newContent : '',
      type: shayariType,
      audioUrl: shayariType === 'audio' ? audioUrl : undefined,
      createdAt: new Date().toISOString()
    };

    try {
      // Add new shayari to Firestore
      await addDoc(collection(db, "shayaris"), newShayari);

      // Update local state to reflect the new shayari
      setSampleShayaris((prev) => [newShayari, ...prev]);

      // Clear the input fields
      setNewTitle("");
      setNewContent("");
      setAudioFile(null);
      setShayariType('text');
    } catch (error) {
      console.error("Error adding shayari:", error);
      alert("Error adding shayari. Please try again.");
    } finally {
      setUploading(false);
    }
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
              <AvatarFallback className="bg-cherry/20 text-cherry">VD</AvatarFallback>
            </Avatar>
            <p className="text-cherry-light/80 text-lg italic max-w-md">
            Where Vaishnav's words weave emotions into timeless whispers.
            </p>
          </div>
        </div>

        {/* Admin Section */}
        {!isAdmin ? (
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
        ) : (
          <div className="mb-16 p-6 border border-cherry/30 rounded-lg bg-secondary/30 backdrop-blur-md max-w-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl text-cherry font-light">Add New Shayari</h2>
              <button
                onClick={handleLogout}
                className="bg-cherry/20 text-cherry px-4 py-2 rounded-full text-sm hover:bg-cherry/30 transition-all"
              >
                Logout
              </button>
            </div>
            
            {/* Type Toggle */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setShayariType('text')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  shayariType === 'text' 
                    ? 'bg-cherry text-background' 
                    : 'bg-background/50 text-cherry border border-cherry/20'
                }`}
              >
                <Type className="h-4 w-4" />
                Text
              </button>
              <button
                onClick={() => setShayariType('audio')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  shayariType === 'audio' 
                    ? 'bg-cherry text-background' 
                    : 'bg-background/50 text-cherry border border-cherry/20'
                }`}
              >
                <Mic className="h-4 w-4" />
                Audio
              </button>
            </div>

            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 rounded-md bg-background border border-cherry/20 text-cherry focus:border-cherry-light"
            />

            {shayariType === 'text' ? (
              <textarea
                placeholder="Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-md bg-background border border-cherry/20 text-cherry focus:border-cherry-light"
              />
            ) : (
              <div className="space-y-2">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="w-full p-3 rounded-md bg-background border border-cherry/20 text-cherry focus:border-cherry-light"
                />
                {audioFile && (
                  <p className="text-cherry-light/80 text-sm">
                    Selected: {audioFile.name}
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleAddShayari}
              disabled={uploading}
              className="w-full bg-cherry text-background py-3 rounded-md hover:bg-cherry-light transition-all disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : '➕ Add Shayari'}
            </button>
          </div>
        )}

        {/* Written Shayaris */}
        <div className="mb-16">
          <h2 className="text-3xl text-cherry mb-8 text-center font-light">Written Collection</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {sampleShayaris
              .filter(shayari => !shayari.type || shayari.type === 'text')
              .map((shayari, index) => (
                <div key={index} className="break-inside-avoid">
                  <ShayariCard
                    title={shayari.title}
                    content={shayari.content}
                    type="text"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Audio Shayaris */}
        <div className="mb-16">
          <h2 className="text-3xl text-cherry mb-8 text-center font-light">Voice Collection</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {sampleShayaris
              .filter(shayari => shayari.type === 'audio')
              .map((shayari, index) => (
                <div key={index} className="break-inside-avoid">
                  <ShayariCard
                    title={shayari.title}
                    content=""
                    type="audio"
                    audioUrl={shayari.audioUrl}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-6 text-center text-cherry-light/70 text-sm">
          © {new Date().getFullYear()} Crafted with ❤️ by Vaishnav. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Index;
