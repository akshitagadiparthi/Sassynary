
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User as UserIcon, MapPin, ArrowLeft, Plus, X, Trash2, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { db, isFirebaseReady, collection, addDoc, deleteDoc, doc, serverTimestamp, onSnapshot, query } from '../services/firebase';

interface Address {
    id: string;
    label: string;
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
    createdAt?: any;
}

interface UserProfileProps {
    onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    if (!user) return;

    let unsubscribe: () => void;

    if (isFirebaseReady && db) {
        setLoading(true);
        try {
            // Correctly query the subcollection 'addresses' under the specific user document
            const q = query(collection(db, 'users', user.uid, 'addresses'));
            unsubscribe = onSnapshot(q, (snap: any) => {
                const list = snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Address));
                list.sort((a, b) => {
                    const timeA = a.createdAt?.seconds || 0;
                    const timeB = b.createdAt?.seconds || 0;
                    return timeB - timeA;
                });
                setAddresses(list);
                setLoading(false);
            }, (err: any) => {
                console.error("Firestore Address Listener Error:", err);
                // If listener fails (e.g. permission denied), fall back to local storage
                const local = localStorage.getItem(`sassynary_addresses_${user.uid}`);
                if (local) setAddresses(JSON.parse(local));
                setLoading(false);
            });
        } catch (e) {
            console.error("Setup listener error:", e);
            setLoading(false);
        }
    } else {
        const local = localStorage.getItem(`sassynary_addresses_${user.uid}`);
        if (local) setAddresses(JSON.parse(local));
        setLoading(false);
    }

    return () => {
        if (unsubscribe) unsubscribe();
    };
  }, [user]);

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setError(null);

    try {
        if (isFirebaseReady && db) {
            try {
                // Save to 'users/{uid}/addresses' collection
                await addDoc(collection(db, 'users', user.uid, 'addresses'), {
                    ...newAddress,
                    createdAt: serverTimestamp()
                });
            } catch (firestoreError) {
                console.warn("Firestore write failed, falling back to local storage", firestoreError);
                throw new Error("Fallback needed");
            }
        } else {
             throw new Error("Firebase not ready");
        }
    } catch (e) {
        // Fallback to Local Storage so the user can ALWAYS add an address
        const newItem = { id: Date.now().toString(), ...newAddress, createdAt: { seconds: Date.now() / 1000 } };
        const updated = [newItem, ...addresses];
        setAddresses(updated);
        localStorage.setItem(`sassynary_addresses_${user.uid}`, JSON.stringify(updated));
    } finally {
        setSaving(false);
        setIsAdding(false);
        setNewAddress({ label: 'Home', fullName: '', phone: '', street: '', city: '', pincode: '' });
    }
  };

  const handleDeleteAddress = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!user) return;
    if (!confirm("Remove this address?")) return;
    
    try {
        if (isFirebaseReady && db) {
            try {
                await deleteDoc(doc(db, 'users', user.uid, 'addresses', id));
            } catch {
                throw new Error("Fallback needed");
            }
        } else {
            throw new Error("Fallback needed");
        }
    } catch (e) {
        const updated = addresses.filter(a => a.id !== id);
        setAddresses(updated);
        localStorage.setItem(`sassynary_addresses_${user.uid}`, JSON.stringify(updated));
    }
  };

  const handleLogout = async () => {
    await logout();
    onBack();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 animate-fade-in text-gray-900">
        <div className="bg-white border-b border-gray-100 py-12 md:py-20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <button 
                          onClick={onBack}
                          className="flex items-center gap-2 text-gray-400 hover:text-pink-700 transition-colors text-xs font-bold uppercase tracking-widest mb-6"
                        >
                          <ArrowLeft size={14} /> Back to Shop
                        </button>
                        <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-2 block">
                            Member Profile
                        </span>
                        <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-2">
                            Hello, <span className="text-pink-700">{user.displayName?.split(' ')[0] || 'Sassy Human'}</span>.
                        </h1>
                        <div className="flex items-center gap-4 text-gray-500 font-light">
                            <span className="bg-gray-50 px-3 py-1 rounded-full text-xs border border-gray-100">{user.email}</span>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-pink-700 transition-colors border border-gray-100 px-6 py-3 rounded-lg bg-white shadow-sm"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Account Details */}
                <div className="lg:col-span-4 bg-white p-8 md:p-10 shadow-sm border border-gray-100 rounded-xl h-fit">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                        <div className="bg-pink-50 p-2 rounded-lg text-pink-700">
                           <UserIcon size={20} />
                        </div>
                        <h3 className="font-serif text-2xl text-gray-900">My Details</h3>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Full Name</label>
                            <p className="text-gray-900 font-medium text-xl">{user.displayName || 'Sassynary Guest'}</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email Address</label>
                            <p className="text-gray-900 font-medium text-xl break-all">{user.email}</p>
                        </div>
                        <div className="pt-4">
                            <button className="text-[10px] font-bold uppercase tracking-widest text-pink-700 hover:text-pink-900 border-b-2 border-pink-700/20 hover:border-pink-700 pb-1 transition-all">
                                Update Account Settings
                            </button>
                        </div>
                    </div>
                </div>

                {/* Saved Addresses */}
                <div className="lg:col-span-8 bg-white p-8 md:p-10 shadow-sm border border-gray-100 rounded-xl">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-pink-50 p-2 rounded-lg text-pink-700">
                               <MapPin size={20} />
                            </div>
                            <h3 className="font-serif text-2xl text-gray-900">Saved Addresses</h3>
                        </div>
                        <button 
                            onClick={() => setIsAdding(!isAdding)}
                            className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${isAdding ? 'bg-gray-100 text-gray-600' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'}`}
                        >
                            {isAdding ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add New</>}
                        </button>
                    </div>

                    {isAdding && (
                        <div className="mb-10 p-8 bg-[#FAF9F6] border border-gray-100 rounded-xl animate-fade-in shadow-inner">
                            <form onSubmit={handleSaveAddress} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Label</label>
                                    <input required type="text" value={newAddress.label} onChange={e => setNewAddress({...newAddress, label: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg text-sm text-gray-900 focus:border-pink-600 outline-none shadow-sm" placeholder="Home" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Receiver Name</label>
                                    <input required type="text" value={newAddress.fullName} onChange={e => setNewAddress({...newAddress, fullName: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg text-sm text-gray-900 focus:border-pink-600 outline-none shadow-sm" placeholder="Jane Doe" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Phone Number</label>
                                    <input required type="tel" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg text-sm text-gray-900 focus:border-pink-600 outline-none shadow-sm" placeholder="+91 00000 00000" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Street Address</label>
                                    <textarea required rows={2} value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg text-sm text-gray-900 focus:border-pink-600 outline-none resize-none shadow-sm" placeholder="House no, Building, Street" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">City / State</label>
                                    <input required type="text" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg text-sm text-gray-900 focus:border-pink-600 outline-none shadow-sm" placeholder="e.g. Vijayawada, AP" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Pincode</label>
                                    <input required type="text" value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} className="w-full bg-white border border-gray-200 px-4 py-3 rounded-lg text-sm text-gray-900 focus:border-pink-600 outline-none shadow-sm" placeholder="520001" />
                                </div>
                                
                                {error && (
                                    <div className="md:col-span-2 flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded-lg border border-red-100">
                                        <AlertCircle size={14} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="md:col-span-2 pt-2">
                                    <button type="submit" disabled={saving} className="w-full bg-pink-700 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-pink-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-100 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <>Confirm & Save Address <CheckCircle2 size={16} /></>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="space-y-4">
                        {loading ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="animate-spin text-pink-300" size={40} />
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Synchronizing...</p>
                            </div>
                        ) : addresses.length === 0 && !isAdding ? (
                            <div className="flex flex-col justify-center items-center text-center p-16 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                                <div className="bg-white p-4 rounded-full shadow-sm mb-6">
                                    <MapPin size={40} className="text-gray-200" />
                                </div>
                                <h4 className="font-serif text-xl text-gray-900 mb-2">No addresses yet</h4>
                                <p className="text-sm text-gray-400 italic mb-8 max-w-[280px] leading-relaxed">
                                    You haven't saved any locations. Add one now to speed up your future checkouts!
                                </p>
                                <button 
                                    onClick={() => { setIsAdding(true); }}
                                    className="bg-white border border-pink-100 text-pink-700 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-pink-700 hover:text-white transition-all shadow-sm"
                                >
                                    + Add Shipping Address
                                </button>
                            </div>
                        ) : addresses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {addresses.map((addr) => (
                                    <div key={addr.id} className="p-6 border border-gray-100 rounded-2xl bg-white hover:border-pink-200 transition-all group relative shadow-sm hover:shadow-md">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="bg-pink-50 text-pink-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-pink-100/50">
                                                {addr.label}
                                            </span>
                                            <button 
                                                onClick={(e) => handleDeleteAddress(e, addr.id)}
                                                className="text-gray-200 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                                title="Delete Address"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="font-bold text-gray-900 text-base mb-1">{addr.fullName}</p>
                                        <p className="text-xs text-gray-500 mb-4 font-medium">{addr.phone}</p>
                                        <div className="text-xs text-gray-600 font-light leading-relaxed border-t border-gray-50 pt-4">
                                            <p>{addr.street}</p>
                                            <p className="font-medium text-gray-900 mt-1">{addr.city} - {addr.pincode}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>

            </div>

             <div className="mt-20 text-center">
                <button onClick={onBack} className="bg-gray-900 text-white px-16 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-pink-700 transition-all shadow-xl shadow-gray-200 active:scale-95">
                    Continue Shopping
                </button>
            </div>
        </div>
    </div>
  );
};
