
import './App.css'
import { auth, provider } from './firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in: ", user);
      })
      .catch((error) => {
        console.error("Error signing in: ", error);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <main>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please sign in</p>
          <button onClick={login}>Login with Google</button>
        </div>
      )}
    </main>
  )
}
