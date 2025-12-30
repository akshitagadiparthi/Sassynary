
import React, { useState, useRef } from 'react';
import { Send, Pencil, ArrowLeft, Upload, X, Image as ImageIcon, Loader2, Mail } from 'lucide-react';
import { db, storage, isFirebaseReady } from '../services/firebase';
// Fix: Import firestore as namespace and destructure to resolve "no exported member" errors
import * as firebaseFirestore from 'firebase/firestore';
const { collection, addDoc, serverTimestamp } = firebaseFirestore as any;
// Fix: Import storage as namespace and cast to any to resolve "no exported member" type errors
import * as firebaseStorage from 'firebase/storage';
const { ref, uploadBytes, getDownloadURL } = firebaseStorage as any;

interface CustomOrderFormProps {
    onBack?: () => void;
}

export const CustomOrderForm: React.FC<CustomOrderFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'corporate',
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Helper to open email client
  const triggerEmailClient = (imageUrl: string = '') => {
    const subject = encodeURIComponent(`Custom Order Request: ${formData.type}`);
            
    // Construct body cleanly
    const bodyParts = [
        `Hi Sassynary Team,\n\nI'm interested in a custom order!\n`,
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone}`,
        `Type: ${formData.type}\n`,
        `Details:\n${formData.message}\n`
    ];
    
    if (imageUrl) {
        bodyParts.push(`Reference Image URL: ${imageUrl}`);
    } else if (selectedFile) {
        bodyParts.push(`[Attached: ${selectedFile.name}]`);
    }

    const body = encodeURIComponent(bodyParts.join('\n'));
    
    // Use window.location.href for robust opening of mail client
    window.location.href = `mailto:sassynary@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let uploadedImageUrl = '';

    try {
        // 1. Try to Save to Firebase (Shadow Backup)
        if (isFirebaseReady && db && storage) {
            
            // Upload Image if exists
            if (selectedFile) {
                try {
                    const storageRef = ref(storage, `custom-orders/${Date.now()}-${selectedFile.name}`);
                    const snapshot = await uploadBytes(storageRef, selectedFile);
                    uploadedImageUrl = await getDownloadURL(snapshot.ref);
                } catch (storageErr) {
                    console.error("Storage upload failed (likely permission issues). Continuing...", storageErr);
                }
            }

            // Save Data to Firestore
            try {
                await addDoc(collection(db, "custom_orders"), {
                    ...formData,
                    imageUrl: uploadedImageUrl,
                    status: 'new',
                    createdAt: serverTimestamp()
                });
            } catch (dbErr) {
                console.error("Firestore save failed. Continuing to email...", dbErr);
            }
        }
    } catch (error) {
        console.error("General Firebase error:", error);
    } finally {
        // 2. ALWAYS Trigger Email (Primary Method)
        // We do this in finally to ensure the user always gets the email prompt
        triggerEmailClient(uploadedImageUrl);
        setIsSubmitting(false);
        setIsSubmitted(true);
    }
  };

  return (
    <div className="animate-fade-in bg-white min-h-screen">
      
      {/* Back Nav */}
      {onBack && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-pink-700 transition-colors text-sm font-medium"
            >
            <ArrowLeft size={16} />
            Back to Home
            </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#2D2D2D] text-white py-16 lg:py-24">
         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-6xl mb-4">Custom Orders</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                From corporate retreats to wedding favors, we bring the sass to your specific needs.
            </p>
         </div>
      </div>

      <section id="custom-orders" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Info Section */}
            <div className="order-1 lg:order-1 pt-8">
                <span className="text-pink-600 font-bold tracking-widest text-xs uppercase mb-4 block">
                Bespoke & Bulk
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 mb-6">
                Made Just For You.
                </h2>
                <p className="text-lg text-gray-600 mb-6 font-light leading-relaxed">
                Need 500 notebooks for your corporate retreat that don't suck? Or wedding favors that your guests will actually keep? 
                </p>
                <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed">
                We specialize in custom orders for bulk gifting, corporate events, and special occasions. Tell us your wildest dreams (or just your budget), and we'll make it happen.
                </p>
                
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="bg-pink-50 p-3 rounded-full text-pink-700">
                            <Pencil size={20} />
                        </div>
                        <div>
                            <h4 className="font-serif text-xl text-gray-900 mb-1">Personalization</h4>
                            <p className="text-gray-500 text-sm">Monograms, logos, and custom sass levels available.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-pink-50 p-3 rounded-full text-pink-700">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h4 className="font-serif text-xl text-gray-900 mb-1">Your Vision</h4>
                            <p className="text-gray-500 text-sm">Upload your mood board or logo directly.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="order-2 lg:order-2">
                <div className="bg-[#FAF9F6] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100/50">
                {isSubmitted ? (
                    <div className="text-center py-12 animate-fade-in">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <Send size={24} />
                        </div>
                        <h3 className="font-serif text-3xl text-gray-900 mb-4">Opening Email...</h3>
                        <p className="text-gray-600 mb-8">
                            We've prepared an email draft for you. Please hit <strong>SEND</strong> in your email app to finish the request!
                        </p>
                        <div className="p-4 bg-white border border-gray-200 rounded text-sm text-gray-500 mb-8">
                            <p className="mb-2 font-bold">Didn't open?</p>
                            <button 
                                onClick={() => triggerEmailClient()}
                                className="text-pink-700 underline font-bold"
                            >
                                Click here to try again
                            </button>
                        </div>
                        <button 
                            onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', type: 'corporate', message: '' }); removeFile(); }}
                            className="text-gray-400 font-bold uppercase tracking-widest text-xs hover:text-gray-600"
                        >
                            Start New Request
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="font-serif text-2xl text-gray-900 mb-6">Start Your Custom Order</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                            <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-pink-600 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Phone</label>
                            <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-pink-600 focus:outline-none transition-colors"
                            />
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                                <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-pink-600 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-pink-600 focus:outline-none transition-colors"
                                >
                                    <option value="corporate">Corporate Gifting</option>
                                    <option value="wedding">Wedding / Events</option>
                                    <option value="bulk">Bulk Order</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Details</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                placeholder="Tell us about quantities, design ideas, or specific deadlines..."
                                className="w-full bg-white border border-gray-200 px-4 py-3 focus:border-pink-600 focus:outline-none transition-colors resize-none"
                            ></textarea>
                        </div>

                        {/* Image Upload Section */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Reference Image (Optional)</label>
                          {!selectedFile ? (
                            <div 
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all group"
                            >
                              <div className="flex justify-center mb-3">
                                <Upload className="text-gray-400 group-hover:text-pink-600 transition-colors" size={24} />
                              </div>
                              <p className="text-sm text-gray-500 font-medium group-hover:text-pink-700">Click to upload reference image</p>
                              <p className="text-xs text-gray-400 mt-1">JPG, PNG up to 5MB</p>
                              <input 
                                ref={fileInputRef}
                                type="file" 
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </div>
                          ) : (
                            <div className="relative border border-gray-200 rounded-lg p-2 bg-white flex items-center gap-4">
                              <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                {previewUrl && (
                                  <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                              </div>
                              <button 
                                type="button"
                                onClick={removeFile}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="pt-2">
                             <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-[#2D2D2D] text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Processing...</span>
                                </>
                                ) : (
                                <>
                                    <span>Proceed to Email</span>
                                    <Send size={16} />
                                </>
                                )}
                            </button>
                            <p className="text-center text-[10px] uppercase text-gray-400 mt-2">
                                Clicking this will save a backup and open your email app.
                            </p>
                        </div>
                    </form>
                )}
                </div>
            </div>

            </div>
        </div>
      </section>
    </div>
  );
};
