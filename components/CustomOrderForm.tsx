
import React, { useState, useRef } from 'react';
import { Send, Pencil, ArrowLeft, Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { db, storage, isFirebaseReady, collection, addDoc, serverTimestamp, ref, uploadBytes, getDownloadURL } from '../services/firebase';

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

  const triggerEmailClient = (imageUrl: string = '') => {
    const subject = encodeURIComponent(`Custom Order Request: ${formData.type}`);
    const bodyParts = [
        `Hi Sassynary Team,\n\nI'm interested in a custom order!\n`,
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone}`,
        `Type: ${formData.type}\n`,
        `Details:\n${formData.message}\n`
    ];
    if (imageUrl) bodyParts.push(`Reference Image URL: ${imageUrl}`);
    const body = encodeURIComponent(bodyParts.join('\n'));
    window.location.href = `mailto:sassynary@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let uploadedImageUrl = '';
    try {
        if (isFirebaseReady && db && storage) {
            if (selectedFile) {
                try {
                    const storageRef = ref(storage, `custom-orders/${Date.now()}-${selectedFile.name}`);
                    const snapshot = await uploadBytes(storageRef, selectedFile);
                    uploadedImageUrl = await getDownloadURL(snapshot.ref);
                } catch (storageErr) {
                    console.error("Storage upload failed", storageErr);
                }
            }
            try {
                // Ensure writing to 'custom_orders' collection
                await addDoc(collection(db, "custom_orders"), {
                    ...formData,
                    imageUrl: uploadedImageUrl,
                    status: 'new',
                    createdAt: serverTimestamp()
                });
            } catch (dbErr) {
                console.error("Firestore save failed", dbErr);
            }
        }
    } catch (error) {
        console.error("General error:", error);
    } finally {
        triggerEmailClient(uploadedImageUrl);
        setIsSubmitting(false);
        setIsSubmitted(true);
    }
  };

  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {onBack && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-pink-700 transition-colors text-xs font-bold uppercase tracking-widest"
            >
            <ArrowLeft size={16} />
            Back to Home
            </button>
        </div>
      )}

      <div className="bg-pink-50 py-16 lg:py-24 border-b border-pink-100">
         <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-pink-600 font-bold tracking-widest text-[10px] uppercase mb-4 block">Bespoke & Bulk</span>
            <h1 className="font-serif text-5xl md:text-7xl mb-4 text-gray-900">Custom Orders</h1>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                From corporate retreats to wedding favors, we bring the sass to your specific needs.
            </p>
         </div>
      </div>

      <section id="custom-orders" className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            <div className="order-1 lg:order-1 pt-8">
                <h2 className="font-serif text-4xl lg:text-5xl text-gray-900 mb-6">
                Made Just For <span className="text-pink-700 italic">You.</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 font-light leading-relaxed">
                Need 500 notebooks for your corporate retreat that don't suck? Or wedding favors that your guests will actually keep? 
                </p>
                <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed">
                We specialize in custom orders for bulk gifting, corporate events, and special occasions.
                </p>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-5">
                        <div className="bg-pink-50 p-3 rounded-xl text-pink-700 border border-pink-100 shadow-sm">
                            <Pencil size={20} />
                        </div>
                        <div>
                            <h4 className="font-serif text-xl text-gray-900 mb-1">Personalization</h4>
                            <p className="text-gray-500 text-sm font-light">Monograms, logos, and custom sass levels available.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-5">
                        <div className="bg-pink-50 p-3 rounded-xl text-pink-700 border border-pink-100 shadow-sm">
                            <ImageIcon size={20} />
                        </div>
                        <div>
                            <h4 className="font-serif text-xl text-gray-900 mb-1">Your Vision</h4>
                            <p className="text-gray-500 text-sm font-light">Upload your mood board or logo directly for review.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-2 lg:order-2">
                <div className="bg-[#FAF9F6] p-8 md:p-12 border border-gray-100 rounded-2xl shadow-sm">
                {isSubmitted ? (
                    <div className="text-center py-12 animate-fade-in">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 border border-green-100">
                            <Send size={24} />
                        </div>
                        <h3 className="font-serif text-3xl text-gray-900 mb-4">Drafting Email...</h3>
                        <p className="text-gray-600 mb-8 font-light">
                            Please hit <strong>SEND</strong> in your email app to finish the request!
                        </p>
                        <button 
                            onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', type: 'corporate', message: '' }); removeFile(); }}
                            className="text-pink-700 font-bold uppercase tracking-widest text-[10px] hover:text-pink-900 transition-colors"
                        >
                            Start New Request
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="font-serif text-2xl text-gray-900 mb-6">Start Your Inquiry</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Name</label>
                            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-gray-100 px-4 py-3 rounded-lg focus:border-pink-600 focus:outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Phone</label>
                            <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-gray-100 px-4 py-3 rounded-lg focus:border-pink-600 focus:outline-none transition-colors" />
                        </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Email</label>
                                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-gray-100 px-4 py-3 rounded-lg focus:border-pink-600 focus:outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Type</label>
                                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-white border border-gray-100 px-4 py-3 rounded-lg focus:border-pink-600 focus:outline-none transition-colors">
                                    <option value="corporate">Corporate Gifting</option>
                                    <option value="wedding">Wedding / Events</option>
                                    <option value="bulk">Bulk Order</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Details</label>
                            <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Quantities, design ideas, deadlines..." className="w-full bg-white border border-gray-100 px-4 py-3 rounded-lg focus:border-pink-600 focus:outline-none transition-colors resize-none" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Reference Image (Optional)</label>
                          {!selectedFile ? (
                            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition-all group">
                              <Upload className="mx-auto text-gray-300 group-hover:text-pink-600 mb-3" size={24} />
                              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-pink-700">Upload Image</p>
                              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </div>
                          ) : (
                            <div className="relative border border-pink-100 rounded-xl p-3 bg-white flex items-center gap-4 shadow-sm animate-fade-in">
                              <div className="h-14 w-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-50 flex-shrink-0">
                                {previewUrl && <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />}
                              </div>
                              <div className="flex-1 min-w-0"><p className="text-xs font-bold text-gray-900 truncate">{selectedFile.name}</p></div>
                              <button type="button" onClick={removeFile} className="p-2 text-gray-300 hover:text-pink-600 transition-colors"><X size={18} /></button>
                            </div>
                          )}
                        </div>
                        <div className="pt-2">
                             <button type="submit" disabled={isSubmitting} className="w-full bg-pink-700 text-white py-4 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-pink-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-100">
                                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <><span>Proceed to Email</span><Send size={16} /></>}
                            </button>
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
