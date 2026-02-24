
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "interviewiq-7f34e.firebaseapp.com",
    projectId: "interviewiq-7f34e",
    storageBucket: "interviewiq-7f34e.firebasestorage.app",
    messagingSenderId: "659207075823",
    appId: "1:659207075823:web:de6fbaa980e29039b6a81a"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider }