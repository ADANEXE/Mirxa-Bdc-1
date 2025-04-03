
import './App.css'
import { auth, provider } from './firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'

export default function App() {
  const [user, setUser] = useState(null);
  const [minedBDC, setMinedBDC] = useState(0);
  const [isMining, setIsMining] = useState(false);

  useEffect(() => {
    let miningInterval;
    
    if (isMining) {
      miningInterval = setInterval(() => {
        console.log("Mining BDC...");
        setMinedBDC(prevAmount => prevAmount + 1);
      }, 5 * 60 * 60 * 1000); // 5 hours
    }

    return () => {
      if (miningInterval) {
        clearInterval(miningInterval);
      }
    };
  }, [isMining]);

  const toggleMining = () => {
    setIsMining(!isMining);
  };

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
      <h1>Banana Dog Coin (BDC) Mining</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <p>You have mined: {minedBDC} BDC</p>
          <button onClick={toggleMining}>
            {isMining ? 'Stop Mining' : 'Start Mining'}
          </button>
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
