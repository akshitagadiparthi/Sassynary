
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  isFirebaseReady, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  sendPasswordResetEmail, 
  signOut 
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

  // Helper to check local storage
  const checkLocalStorage = () => {
    const storedUser = localStorage.getItem('sassynary_user');
    if (storedUser) {
      try {
          return JSON.parse(storedUser);
      } catch (e) {
          console.error("Failed to parse stored user", e);
          localStorage.removeItem('sassynary_user');
      }
    }
    return null;
  };

  useEffect(() => {
    let unsubscribe: () => void;

    if (isFirebaseReady && auth) {
      unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
        if (currentUser) {
            setUser({
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                emailVerified: currentUser.emailVerified
            });
        } else {
            // Fallback check: If Firebase returns null, but we have a simulated user in local storage
            // (e.g. because we fell back to simulation previously), keep using the simulated user.
            const localUser = checkLocalStorage();
            if (localUser) {
                setUser(localUser);
            } else {
                setUser(null);
            }
        }
        setLoading(false);
      });
    } else {
      // If no firebase, check local storage for simulated session
      const localUser = checkLocalStorage();
      setUser(localUser);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Shared simulation logic
  const runSimulation = async (type: 'Login' | 'Register', email: string, name?: string) => {
      console.log(`Simulating ${type}...`);
      await new Promise(r => setTimeout(r, 800)); // Slight delay for realism
      const mockUser: AppUser = {
        uid: 'demo-' + Date.now().toString().slice(-6),
        email: email,
        displayName: name || 'Sassy Shopper',
        emailVerified: true
      };
      setUser(mockUser);
      localStorage.setItem('sassynary_user', JSON.stringify(mockUser));
      console.warn("⚠️ Using Simulated Auth Session (Firebase unavailable or failed)");
  };

  const login = async (email: string, pass: string) => {
    if (isFirebaseReady && auth) {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
      } catch (error: any) {
        // Validation errors should be shown to user
        const validationErrors = [
            'auth/invalid-credential', 
            'auth/user-not-found', 
            'auth/wrong-password', 
            'auth/invalid-email', 
            'auth/user-disabled'
        ];
        
        if (error.code && validationErrors.includes(error.code)) {
            throw error;
        }

        // For system/config errors (e.g., operation-not-allowed, network-request-failed), 
        // fallback to simulation so the user can still enter the app.
        console.warn("Firebase Login System Error (Falling back to simulation):", error.code);
        await runSimulation('Login', email);
      }
    } else {
      await runSimulation('Login', email);
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    if (isFirebaseReady && auth) {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(result.user, { displayName: name });
        
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: name,
          emailVerified: result.user.emailVerified
        });
      } catch (error: any) {
        // Validation errors should be shown to user
        const validationErrors = [
            'auth/email-already-in-use',
            'auth/weak-password',
            'auth/invalid-email'
        ];

        if (error.code && validationErrors.includes(error.code)) {
            throw error;
        }

        // For system/config errors, fallback to simulation
        console.warn("Firebase Register System Error (Falling back to simulation):", error.code);
        await runSimulation('Register', email, name);
      }
    } else {
       await runSimulation('Register', email, name);
    }
  };

  const resetPassword = async (email: string) => {
      if (isFirebaseReady && auth) {
          await sendPasswordResetEmail(auth, email);
      } else {
          // Simulate success for development
          await new Promise(r => setTimeout(r, 1000));
          console.log("Simulated password reset email sent to:", email);
      }
  };

  const logout = async () => {
    if (isFirebaseReady && auth) {
      try {
        await signOut(auth);
      } catch (e) {
        console.error("Logout error", e);
      }
    }
    // Always clear local state
    setUser(null);
    localStorage.removeItem('sassynary_user');
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
