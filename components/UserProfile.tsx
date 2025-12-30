import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User as UserIcon, MapPin, Cloud, WifiOff } from 'lucide-react';
import { isFirebaseReady } from '../services/firebase';

interface UserProfileProps {
    onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onBack }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onBack();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 animate-fade-in">
        <div className="bg-[#2D2D2D] text-white py-16">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <span className="text-pink-500 font-bold tracking-widest text-xs uppercase mb-2 block">
                            Member Profile
                        </span>
                        <h1 className="font-serif text-4xl md:text-5xl mb-2">
                            Hello, {user.displayName || 'Sassy Human'}.
                        </h1>
                        <div className="flex items-center gap-4 text-gray-400 font-light">
                            <span>{user.email}</span>
                        </div>
                        
                        {/* Connection Status Indicator */}
                        <div className={`inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${isFirebaseReady ? 'bg-green-900/30 border-green-700 text-green-400' : 'bg-orange-900/30 border-orange-700 text-orange-400'}`}>
                            {isFirebaseReady ? (
                                <>
                                    <Cloud size={12} />
                                    <span>Cloud Synced</span>
                                </>
                            ) : (
                                <>
                                    <WifiOff size={12} />
                                    <span>Local Mode</span>
                                </>
                            )}
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-pink-500 transition-colors"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Account Details */}
                <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <UserIcon className="text-pink-700" size={24} />
                        <h3 className="font-serif text-xl">My Details</h3>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Name</label>
                            <p className="text-gray-900 font-medium text-lg">{user.displayName || 'Not set'}</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Email</label>
                            <p className="text-gray-900 font-medium text-lg">{user.email}</p>
                        </div>
                        <div className="pt-4">
                            <button className="text-xs font-bold uppercase text-pink-700 hover:text-pink-900 border-b border-pink-700 pb-0.5">
                                Edit Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* Saved Addresses */}
                <div className="bg-white p-8 shadow-sm border border-gray-100 rounded-lg flex flex-col">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                        <MapPin className="text-pink-700" size={24} />
                        <h3 className="font-serif text-xl">Saved Addresses</h3>
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                        <p className="text-sm text-gray-500 italic mb-6">You haven't saved any addresses yet. <br/>Where are we sending the goods?</p>
                        <button className="px-6 py-3 border border-dashed border-gray-300 text-gray-500 text-xs font-bold uppercase tracking-widest hover:border-pink-500 hover:text-pink-500 transition-colors rounded">
                            + Add New Address
                        </button>
                    </div>
                </div>

            </div>

             <div className="mt-12 text-center">
                <p className="text-sm text-gray-400 italic mb-4">
                    "I have too much stationery" - Said no one ever.
                </p>
                <button onClick={onBack} className="bg-[#2D2D2D] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-pink-700 transition-colors">
                    Start Shopping
                </button>
            </div>
        </div>
    </div>
  );
};