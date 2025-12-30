import React, { useState, useEffect, Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
const SassyGenerator = React.lazy(() => import('./components/SassyGenerator').then(module => ({ default: module.SassyGenerator })));
import { CustomOrderForm } from './components/CustomOrderForm';
import { AnnouncementSection } from './components/AnnouncementSection';
import { AboutPage } from './components/AboutPage';
import { GiftCardPage } from './components/GiftCardPage';
import { Footer } from './components/Footer';
import { CategoryShowcase } from './components/CategoryShowcase';
import { UserProfile } from './components/UserProfile';
import { WishlistPage } from './components/WishlistPage';
import { AuthModal } from './components/AuthModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { Product } from './types';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

function SassynaryContent() {
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'product' | 'about' | 'custom-orders' | 'gift-cards' | 'profile' | 'wishlist' | 'checkout' | 'order-success'>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | undefined>(undefined);
  const [showNewArrivalsOnly, setShowNewArrivalsOnly] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categorySubtitle, setCategorySubtitle] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrderId, setLastOrderId] = useState('');
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleOrderSuccess = (orderId: string) => {
    setLastOrderId(orderId);
    setCurrentView('order-success');
  };

  const handleNavigate = (id: string) => {
    if (id === 'about') { setCurrentView('about'); return; }
    if (id === 'custom-orders') { setCurrentView('custom-orders'); return; }
    if (id === 'gift-cards') { setCurrentView('gift-cards'); return; }
    if (id === 'wishlist') { setCurrentView('wishlist'); return; }
    if (id === 'account') {
        if (user) setCurrentView('profile');
        else setIsAuthModalOpen(true);
        return;
    }

    if (id.startsWith('shop-')) {
      setCurrentView('category');
      setSelectedProduct(null);
      setShowNewArrivalsOnly(false);
      
      let category = '';
      let subCategory = undefined;

      if (id === 'shop-new') {
        setShowNewArrivalsOnly(true);
        setCategoryTitle('New Arrivals');
        setCategorySubtitle('Fresh from the printer.');
      } else if (id === 'shop-notebooks-pinned') {
        category = 'notebooks';
        subCategory = 'pinned';
        setCategoryTitle('Pinned Notebooks');
      } else if (id === 'shop-notebooks-spiral') {
        category = 'notebooks';
        subCategory = 'spiral';
        setCategoryTitle('Spiral Notebooks');
      } else {
        category = id.replace('shop-', '');
        setCategoryTitle(`Shop ${category.charAt(0).toUpperCase() + category.slice(1)}`);
      }

      setActiveCategory(category || null);
      setActiveSubCategory(subCategory);
    } else {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {currentView !== 'checkout' && currentView !== 'order-success' && (
        <Header onNavigate={handleNavigate} onAuthReq={() => setIsAuthModalOpen(true)} />
      )}
      
      <main className="flex-grow relative">
        <CartDrawer onCheckout={() => setCurrentView('checkout')} />
        
        {currentView === 'checkout' ? (
            <CheckoutView onBack={() => setCurrentView('home')} onSuccess={handleOrderSuccess} />
        ) : currentView === 'order-success' ? (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF9F6]">
                <div className="max-w-md w-full bg-white p-12 text-center shadow-xl border border-gray-100 animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 className="font-serif text-4xl text-gray-900 mb-4">Order Confirmed!</h1>
                    <p className="text-gray-500 mb-2 uppercase text-[10px] font-bold tracking-[0.2em]">Order #{lastOrderId}</p>
                    <p className="text-gray-600 mb-8 font-light">We've received your order and we're already judging your choices (in a good way). Expect tracking info shortly!</p>
                    <button onClick={() => setCurrentView('home')} className="w-full bg-[#2D2D2D] text-white py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-black transition-all">Back To Shop</button>
                </div>
            </div>
        ) : currentView === 'profile' ? (
            <UserProfile onBack={() => setCurrentView('home')} />
        ) : currentView === 'wishlist' ? (
            <WishlistPage onBack={() => setCurrentView('home')} onProductClick={handleProductClick} />
        ) : currentView === 'product' && selectedProduct ? (
           <ProductDetail product={selectedProduct} onBack={() => setCurrentView('home')} onProductClick={handleProductClick} onAuthReq={() => setIsAuthModalOpen(true)} />
        ) : currentView === 'home' ? (
          <>
            <Hero onCtaClick={() => handleNavigate('shop-notebooks')} onLookbookClick={() => handleNavigate('shop-new')} />
            <CategoryShowcase onNavigate={handleNavigate} />
            <ProductGrid viewMode="carousel" onProductClick={handleProductClick} onAuthReq={() => setIsAuthModalOpen(true)} />
            <TestimonialsSection />
            <AnnouncementSection />
            <Suspense fallback={<div className="py-24 text-center">Loading AI...</div>}><SassyGenerator /></Suspense>
          </>
        ) : (
          <ProductGrid category={activeCategory || undefined} subCategory={activeSubCategory} title={categoryTitle} subtitle={categorySubtitle} viewMode="grid" onProductClick={handleProductClick} showAll={true} onlyNew={showNewArrivalsOnly} onAuthReq={() => setIsAuthModalOpen(true)} />
        )}
      </main>

      {currentView !== 'checkout' && currentView !== 'order-success' && (
        <Footer onNavigate={handleNavigate} />
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                  <SassynaryContent />
              </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;