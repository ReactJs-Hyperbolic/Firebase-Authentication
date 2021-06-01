import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase';

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    //   Returns a promise
    return auth.createUserWithEmailAndPassword(email, password);
  }

  //   Place in a useEffect() so it only runs once.
  useEffect(() => {
    //   Firebase method to set user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  // Pass our context(s)
  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
