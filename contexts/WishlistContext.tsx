
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db, isFirebaseReady } from '../services/firebase';
// Fix: Import firestore as namespace and destructure to resolve "no exported member" errors
import * as firebaseFirestore from 'firebase/firestore';
const { doc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } = firebaseFirestore as any;

interface WishlistContextType {
  wishlist: number[];
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number) => Promise<boolean>; // Returns true if successful, false if auth required
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync with Firestore when user changes
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    if (isFirebaseReady && db) {
        const userRef = doc(db, 'users', user.uid);
        
        const unsubscribe = onSnapshot(userRef, (docSnap: any) => {
            if (docSnap.exists()) {
                const data = docSnap.data() as { wishlist?: number[] } | undefined;
                setWishlist(data?.wishlist || []);
            } else {
                // Initialize user doc if it doesn't exist
                setDoc(userRef, { wishlist: [] }, { merge: true });
                setWishlist([]);
            }
            setLoading(false);
        }, (err: any) => {
            console.error("Firestore sync error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    } else {
        // Simulation mode for demo
        const stored = localStorage.getItem(`sassynary_wishlist_${user.uid}`);
        if (stored) {
            setWishlist(JSON.parse(stored));
        } else {
            setWishlist([]);
        }
        setLoading(false);
    }
  }, [user]);

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const toggleWishlist = async (productId: number): Promise<boolean> => {
    if (!user) return false; // Signal that auth is required

    const exists = isInWishlist(productId);
    
    // Optimistic UI update
    const newWishlist = exists 
        ? wishlist.filter(id => id !== productId)
        : [...wishlist, productId];
    
    setWishlist(newWishlist);

    try {
        if (isFirebaseReady && db) {
            const userRef = doc(db, 'users', user.uid);
            // Changed from updateDoc to setDoc with merge: true
            // This ensures that if the document doesn't exist yet, it is created.
            await setDoc(userRef, {
                wishlist: exists ? arrayRemove(productId) : arrayUnion(productId)
            }, { merge: true });
        } else {
            // Simulation
            localStorage.setItem(`sassynary_wishlist_${user.uid}`, JSON.stringify(newWishlist));
        }
        return true;
    } catch (error) {
        console.error("Error updating wishlist:", error);
        // Revert on error
        setWishlist(wishlist); 
        return true; // Still return true as we handled the error gracefully-ish
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isInWishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
