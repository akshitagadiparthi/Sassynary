
import React, { useState, useEffect, Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
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
import { ValentinesPopup } from './components/ValentinesPopup';
import { ReviewModal } from './components/ReviewModal';
import { Product } from './types';
import { CheckCircle2, Instagram, ArrowRight, Heart, PenTool } from 'lucide-react';

function SassynaryContent() {
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'product' | 'about' | 'custom-orders' | 'gift-cards' | 'profile' | 'wishlist' | 'checkout' | 'order-success' | 'search'>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | undefined>(undefined);
  const [showNewArrivalsOnly, setShowNewArrivalsOnly] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categorySubtitle, setCategorySubtitle] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrderId, setLastOrderId] = useState('');
  const [aboutAnchor, setAboutAnchor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [hasPromotedRegister, setHasPromotedRegister] = useState(false);
  
  // Valentine's Popup State
  const [showValentines, setShowValentines] = useState(false);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { user, loading } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct]);

  // Valentine's Popup Trigger
  useEffect(() => {
    // Show popup after 2 seconds on home screen
    const timer = setTimeout(() => {
      // Logic to not show if already seen in session could be added here
      if (!sessionStorage.getItem('seen_vday_popup')) {
          setShowValentines(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseValentines = () => {
    setShowValentines(false);
    sessionStorage.setItem('seen_vday_popup', 'true');
  };

  // Prompt user to register immediately on entry if not logged in, then every 5 minutes
  useEffect(() => {
    if (loading || user) return;

    // Trigger immediate prompt only once per session
    if (!hasPromotedRegister) {
        // Wait a bit if valentines popup is showing to avoid clutter
        const delay = showValentines ? 10000 : 5000;
        const timer = setTimeout(() => {
            if(!user) {
                setAuthView('register');
                setIsAuthModalOpen(true);
                setHasPromotedRegister(true);
            }
        }, delay);
        return () => clearTimeout(timer);
    }

    // Recurring timer (resets if modal is interacted with/closed due to dependency)
    const interval = setInterval(() => {
      if (!isAuthModalOpen && !showValentines) {
        setAuthView('register');
        setIsAuthModalOpen(true);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [user, loading, isAuthModalOpen, hasPromotedRegister, showValentines]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const handleOrderSuccess = (orderId: string) => {
    setLastOrderId(orderId);
    setCurrentView('order-success');
  };

  const openAuthModal = (view: 'login' | 'register' = 'login') => {
      setAuthView(view);
      setIsAuthModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory(null);
    setActiveSubCategory(undefined);
    setShowNewArrivalsOnly(false);
    setCategoryTitle('Search Results');
    setCategorySubtitle('');
    setCurrentView('search');
  };

  const handleNavigate = (id: string) => {
    // Explicit Page Navigation
    if (id === 'about' || id.startsWith('about-')) {
        setAboutAnchor(id === 'about' ? null : id);
        setCurrentView('about');
        return;
    }
    if (id === 'custom-orders') { 
        setCurrentView('custom-orders'); 
        return; 
    }
    if (id === 'gift-cards') { 
        setCurrentView('gift-cards'); 
        return; 
    }
    if (id === 'wishlist') { 
        setCurrentView('wishlist'); 
        return; 
    }
    if (id === 'account') {
        if (user) {
            setCurrentView('profile');
        } else {
            openAuthModal('login');
        }
        return;
    }

    // Category / Shop Navigation
    if (id.startsWith('shop-')) {
      setCurrentView('category');
      setSelectedProduct(null);
      setShowNewArrivalsOnly(false);
      setSearchQuery(''); // Clear search when navigating to category
      
      let category = '';
      let subCategory = undefined;

      if (id === 'shop-new') {
        setShowNewArrivalsOnly(true);
        setCategoryTitle('New Arrivals');
        setCategorySubtitle('Fresh from the printer.');
      } else if (id === 'shop-valentines') {
        setSearchQuery('valentine');
        setCategoryTitle("Valentine's Collection");
        setCategorySubtitle("Love notes & sweet things for your favorite person.");
        setCurrentView('search');
        return;
      } else if (id === 'shop-notebooks-pinned') {
        category = 'notebooks';
        subCategory = 'pinned';
        setCategoryTitle('Pinned Notebooks');
        setCategorySubtitle('Elegant lay-flat designs.');
      } else if (id === 'shop-notebooks-spiral') {
        category = 'notebooks';
        subCategory = 'spiral';
        setCategoryTitle('Spiral Notebooks');
        setCategorySubtitle('Perfect for quick notes and sketches.');
      } else if (id === 'shop-planners-small') {
        category = 'planners';
        subCategory = 'small';
        setCategoryTitle('Small Planners');
        setCategorySubtitle('Compact A6 size for on-the-go planning.');
      } else if (id === 'shop-planners-large') {
        category = 'planners';
        subCategory = 'large';
        setCategoryTitle('Large Planners');
        setCategorySubtitle('Spacious A5 layouts for maximum productivity.');
      } else {
        category = id.replace('shop-', '');
        setCategoryTitle(`Shop ${category.charAt(0).toUpperCase() + category.slice(1)}`);
        setCategorySubtitle(`Our premium collection of ${category}.`);
      }

      setActiveCategory(category || null);
      setActiveSubCategory(subCategory);
    } 
    // Home / Anchor Navigation
    else if (id === 'home' || id === 'hero') {
        setCurrentView('home');
        setActiveCategory(null);
        setActiveSubCategory(undefined);
        setShowNewArrivalsOnly(false);
        setSearchQuery('');
    }
    else {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'checkout':
        return <CheckoutView onBack={() => setCurrentView('home')} onSuccess={handleOrderSuccess} />;
      case 'order-success':
        return (
          <div className="min-h-screen flex items-center justify-center p-4 bg-pink-lux">
              <div className="max-w-md w-full bg-white p-12 text-center shadow-2xl border border-pink-100 rounded-2xl animate-fade-in">
                  <div className="w-20 h-20 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-pink-100">
                      <CheckCircle2 size={40} />
                  </div>
                  <h1 className="font-serif text-4xl text-gray-900 mb-4">Request Sent!</h1>
                  <p className="text-gray-500 mb-2 uppercase text-[10px] font-bold tracking-[0.2em]">Order #{lastOrderId}</p>
                  <p className="text-gray-600 mb-8 font-light leading-relaxed">
                    We've saved your order details. To finalize everything, please message us on Instagram. We've copied the summary to your clipboard!
                  </p>
                  
                  <div className="space-y-4">
                    <a 
                      href="https://ig.me/m/sassynary" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-pink-700 text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-100"
                    >
                      <Instagram size={18} /> Open Instagram DM
                    </a>
                    
                    <button 
                      onClick={() => setCurrentView('home')} 
                      className="w-full bg-white border border-gray-200 text-gray-400 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:text-gray-900 transition-all flex items-center justify-center gap-2"
                    >
                      Return to Shop <ArrowRight size={14} />
                    </button>
                  </div>
              </div>
          </div>
        );
      case 'profile':
        return <UserProfile onBack={() => setCurrentView('home')} />;
      case 'wishlist':
        return <WishlistPage onBack={() => setCurrentView('home')} onProductClick={handleProductClick} />;
      case 'product':
        return selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => {
              if (searchQuery) {
                setCurrentView('search');
              } else if (activeCategory || showNewArrivalsOnly) {
                setCurrentView('category');
              } else if (selectedProduct) {
                  handleNavigate(`shop-${selectedProduct.category}`);
              } else {
                setCurrentView('home');
              }
            }} 
            onProductClick={handleProductClick} 
            onAuthReq={() => openAuthModal('login')} 
          />
        ) : <Hero onCtaClick={() => handleNavigate('shop-notebooks')} onLookbookClick={() => handleNavigate('shop-new')} />;
      case 'about':
        return <AboutPage onBack={() => setCurrentView('home')} initialSection={aboutAnchor} />;
      case 'gift-cards':
        return <GiftCardPage onBack={() => setCurrentView('home')} />;
      case 'custom-orders':
        return <CustomOrderForm onBack={() => setCurrentView('home')} />;
      case 'search':
        return (
          <ProductGrid 
            searchQuery={searchQuery}
            title={categoryTitle || "Search Results"} 
            subtitle={categorySubtitle || ""} 
            viewMode="grid" 
            onProductClick={handleProductClick} 
            showAll={true} 
            onAuthReq={() => openAuthModal('login')} 
          />
        );
      case 'category':
        return (
          <ProductGrid 
            category={activeCategory || undefined} 
            subCategory={activeSubCategory} 
            title={categoryTitle} 
            subtitle={categorySubtitle} 
            viewMode="grid" 
            onProductClick={handleProductClick} 
            showAll={true} 
            onlyNew={showNewArrivalsOnly} 
            onAuthReq={() => openAuthModal('login')} 
          />
        );
      case 'home':
      default:
        return (
          <>
            <Hero onCtaClick={() => handleNavigate('shop-notebooks')} onLookbookClick={() => handleNavigate('shop-new')} />
            <CategoryShowcase onNavigate={handleNavigate} />
            <ProductGrid 
              viewMode="carousel" 
              onProductClick={handleProductClick} 
              onAuthReq={() => openAuthModal('login')} 
              limit={10} 
            />
            {/* Pass Review Modal Trigger */}
            <TestimonialsSection onWriteReview={() => setIsReviewModalOpen(true)} />
            <AnnouncementSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-pink-lux flex flex-col">
      {currentView !== 'checkout' && currentView !== 'order-success' && (
        <Header onNavigate={handleNavigate} onAuthReq={() => openAuthModal('login')} onSearch={handleSearch} />
      )}
      
      <main className="flex-grow relative">
        <CartDrawer onCheckout={() => setCurrentView('checkout')} />
        {renderContent()}
      </main>

      {currentView !== 'checkout' && currentView !== 'order-success' && (
        <Footer onNavigate={handleNavigate} />
      )}
      
      {/* 1. Floating Valentine's Trigger (Left) */}
      {!showValentines && (
        <button
          onClick={() => setShowValentines(true)}
          className="fixed bottom-6 left-6 z-40 bg-[#D92525] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(217,37,37,0.4)] hover:scale-110 transition-all duration-300 animate-float border-4 border-white"
          title="Open Valentine's Special"
        >
          <Heart size={20} fill="currentColor" />
        </button>
      )}

      {/* 2. Floating Add Review Trigger (Right) - "Just like V-Day" */}
      <button
        onClick={() => setIsReviewModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white text-gray-900 p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-gray-50 hover:scale-110 transition-all duration-300 border border-gray-100 group"
        title="Write a Note"
      >
        <PenTool size={20} className="group-hover:rotate-12 transition-transform text-pink-600" />
      </button>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialView={authView}
      />
      
      <ValentinesPopup 
        isOpen={showValentines} 
        onClose={handleCloseValentines}
        onShop={() => {
            handleCloseValentines();
            handleNavigate('shop-valentines');
        }}
      />

      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
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
