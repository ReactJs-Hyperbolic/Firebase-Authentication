import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

// Create context to use in other components
export const AuthContext = React.createContext();

// Create custom useAuth hook to use the context in child components by destructuring the object 'value'
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // State to set and store currently authenticated user (bundled into value object below)
  const [currentUser, setCurrentUser] = useState();

  // State to determine if we're currently loading or not - default to true
  const [isLoading, setIsLoading] = useState(true);

  // Create a method using Firebase 'auth' method to register a user (bundle into value object with currentUser to be passed in context)
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }

  // useEffect() so it only runs once when we mount our component
  useEffect(() => {
    // Firebase method to set user after createUserWithEmailAndPassword
    // Stored method in new variable called unsubscribe to be called when (AuthContext) component is unmounted
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Value object to store currentUser state variable and signup method
  // which can then be passed through children components
  const value = {
    currentUser,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render the children if we're NOT loading (isLoading = false) */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
