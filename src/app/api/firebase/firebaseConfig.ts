// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Uncomment if you need Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA25lVfAkdKrHV2GzcbF7vRcn3qPudxYBI',
  authDomain: 'david-mcewen-international.firebaseapp.com',
  projectId: 'david-mcewen-international',
  storageBucket: 'david-mcewen-international.firebasestorage.app',
  messagingSenderId: '798983432970',
  appId: '1:798983432970:web:ec07f92329a34d3c25e8f3',
  measurementId: 'G-4V5NDSBMYG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, auth, firestore };
