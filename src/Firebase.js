import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZPe0e6CEqH7CZmFn2_XppwaYEMQeRqXs",
  authDomain: "movie-app-bb72f.firebaseapp.com",
  projectId: "movie-app-bb72f",
  storageBucket: "movie-app-bb72f.firebasestorage.app",
  messagingSenderId: "403166164798",
  appId: "1:403166164798:web:eb7e78f290fcdc0ec25e6f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
