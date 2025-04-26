// deleteShayari.js

import { doc, deleteDoc } from "firebase/firestore";
import { db } from './firebase'; // Import Firebase setup

// Function to delete a shayari by its document ID
export const deleteShayari = async (id) => {
  try {
    const shayariDocRef = doc(db, "shayaris", id); // Reference to the shayari document
    await deleteDoc(shayariDocRef); // Perform delete
    console.log(`Shayari with ID ${id} deleted successfully!`);
  } catch (error) {
    console.error("Error deleting shayari: ", error);
  }
};
