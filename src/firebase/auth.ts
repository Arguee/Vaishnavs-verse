// src/firebase/auth.ts

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase";  // Import the app instance

// Initialize Firebase Auth
const auth = getAuth(app);

// Sign up function
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error(error.message);
  }
};

// Sign in function
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error(error.message);
  }
};

// Logout function
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// Listener for auth state changes
export const onAuthStateChangedListener = (callback: (user: any) => void) => {
  onAuthStateChanged(auth, callback);
};
