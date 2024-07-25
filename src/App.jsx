import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Login from './components/sessions/Login';
import Signup from './components/sessions/Signup'; // Ensure the correct path
import ListAllNumbers from './components/phonebook/ListAllNumbers';
import AddNumber from './components/phonebook/AddNumber';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const signOut = () => {
    auth.signOut()
      .catch(error => {
        console.error('Sign out error', error);
      });
  };

  return (
    <div className="App">
      <Router>
        {!isLoggedIn ? (
          <>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} /> {/* Default to login */}
            </Routes>
            <Link to="/signup">Don't have an account? Sign Up</Link>
          </>
        ) : (
          <>
            <span onClick={signOut}><a href="#">Sign Out</a></span>
            <Routes>
              <Route path="/" element={<ListAllNumbers />} />
              <Route path="/add-number" element={<AddNumber />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
