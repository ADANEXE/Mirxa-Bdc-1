
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIIhcBmvOHDNTkMaASlSZYgApb-3omh44",
  authDomain: "banana-dog-coin.firebaseapp.com",
  projectId: "banana-dog-coin",
  storageBucket: "banana-dog-coin.firebasestorage.app",
  messagingSenderId: "533553184967",
  appId: "1:533553184967:web:bc5297c77f2efcf5dbbee2",
  measurementId: "G-8GQTR94QW8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
