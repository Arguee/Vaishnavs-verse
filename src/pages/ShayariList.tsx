import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase'; // Ensure correct Firebase import

const ShayariList = () => {
  const [shayaris, setShayaris] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Shayaris from Firestore
  const fetchShayaris = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shayaris"));
      const shayariData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setShayaris(shayariData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shayaris: ", error);
      setLoading(false);
    }
  };

  // Function to delete Shayari
  const deleteShayari = async (id: string) => {
    try {
      await deleteDoc(doc(db, "shayaris", id)); // Deletes the Shayari by ID
      setShayaris(shayaris.filter(shayari => shayari.id !== id)); // Remove the deleted Shayari from the state
    } catch (error) {
      console.error("Error deleting shayari: ", error);
    }
  };

  useEffect(() => {
    fetchShayaris();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Shayari List</h1>
      {shayaris.length > 0 ? (
        <div>
          {shayaris.map(shayari => (
            <div key={shayari.id}>
              <p>{shayari.text}</p>
              <button onClick={() => deleteShayari(shayari.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <div>No shayaris available</div>
      )}
    </div>
  );
};

export default ShayariList;
