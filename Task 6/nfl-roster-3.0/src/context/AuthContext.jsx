
import { createContext, useContext, useEffect, useState } from 'react';

import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { auth } from '../firebase';

const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    let unsubscribe;

    async function initializeAuth() {
      try {
        await setPersistence(auth, browserLocalPersistence);

        if (!active) return;

        unsubscribe = onAuthStateChanged(
          auth,
          (currentUser) => {
            if (!active) return;
            setUser(currentUser);
            setLoading(false);
          },
          (err) => {
            if (!active) return;
            setError(err.message);
            setLoading(false);
          }
        );
      } catch (err) {
        if (!active) return;
        setError(err.message);
        setLoading(false);
      }
    }

    initializeAuth();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  async function signup(email, password) {
    setError('');
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function login(email, password) {
    setError('');
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function loginWithGoogle() {
    setError('');
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  async function logout() {
    setError('');
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  function clearError() {
    setError('');
  }

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
