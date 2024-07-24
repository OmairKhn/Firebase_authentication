import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Ensure the correct path
import Login from './components/sessions/Login'; // Ensure Login is imported
import { singular } from 'i/lib/inflections';
import ListAllNumbers from './components/phonebook/ListAllNumbers';

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
  console.log('logged in?', isLoggedIn);
  return (
    <div className="App">
      <Router>
      
      
          {!isLoggedIn ? (
           <Login/>
           
          ) : (
            <>
             <span onClick={singular}><a href="#">signOut</a></span>
             <Routes>
              <Route path='/' element={<ListAllNumbers/>}/>
             </Routes>
            </>
            //test
           
          )}
        
      </Router>
    </div>
  );
}

export default App;
