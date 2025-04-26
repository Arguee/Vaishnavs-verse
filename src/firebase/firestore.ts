// src/firebase/firestore.ts
import { db } from "@/firebase"; // Import db from firebase.ts
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";

// Add Shayari to Firestore
export const addShayari = async (title: string, content: string) => {
  try {
    await addDoc(collection(db, "shayaris"), {
      title: title,
      content: content,
      timestamp: serverTimestamp(),
    });
    console.log("Shayari added successfully");
  } catch (e) {
    console.error("Error adding Shayari: ", e);
  }
};

// Get all Shayaris from Firestore
export const getShayaris = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "shayaris"), orderBy("timestamp", "desc"))
    );
    const shayaris: { title: string; content: string }[] = [];
    querySnapshot.forEach((doc) => {
      shayaris.push(doc.data() as { title: string; content: string });
    });
    return shayaris;
  } catch (e) {
    console.error("Error getting Shayaris: ", e);
    return [];
  }
};



