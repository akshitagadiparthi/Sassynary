// FILE: contexts/AuthContext.tsx (FIXED)
// CHANGES:
//  1. Removed ALL simulation/mock auth fallback — if Firebase is down, user sees an error
//  2. Removed localStorage-based fake auth — no more spoofable sessions
//  3. Auth state is ONLY derived from Firebase onAuthStateChanged

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  isFirebaseReady,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from '../services/firebase';

interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified?: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: () => void;

    if (isFirebaseReady && auth) {
      unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
        if (currentUser) {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            emailVerified: currentUser.emailVerified,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
    } else {
      // Firebase not initialized — can't authenticate
      setUser(null);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string) => {
    if (!isFirebaseReady || !auth) {
      throw new Error('Authentication service is currently unavailable. Please try again later.');
    }
    await signInWithEmailAndPassword(auth, email, pass);
    // onAuthStateChanged will update user state automatically
  };

  const register = async (name: string, email: string, pass: string) => {
    if (!isFirebaseReady || !auth) {
      throw new Error('Authentication service is currently unavailable. Please try again later.');
    }
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(result.user, { displayName: name });

    // Manually update state since updateProfile doesn't trigger onAuthStateChanged
    setUser({
      uid: result.user.uid,
      email: result.user.email,
      displayName: name,
      emailVerified: result.user.emailVerified,
    });
  };

  const resetPassword = async (email: string) => {
    if (!isFirebaseReady || !auth) {
      throw new Error('Authentication service is currently unavailable. Please try again later.');
    }
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    if (isFirebaseReady && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        // signOut failed — still clear local state
      }
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
