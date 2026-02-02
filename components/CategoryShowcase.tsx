import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { getOptimizedImageUrl, generateImageSrcSet } from '../utils/imageUtils';

interface CategoryShowcaseProps {
  onNavigate: (id: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onNavigate }) => {
  const categories = [
    { 
      id: 'shop-notebooks-spiral', 
      label: 'Spiral Notebooks', 
      image: 'https://i.imgur.com/WvDFpxK.png',
      description: 'Fold & Rip'
    },
    { 
      id: 'shop-notebooks-pinned', 
      label: 'Pinned Notebooks', 
      image: 'https://i.imgur.com/HfPAYIZ.png', 
      description: 'Lay-flat Elegance'
    },
    { 
      id: 'shop-planners', 
      label: 'Planners', 
      image: 'https://i.imgur.com/Hxia7Ec.png',
      description: 'Get Organized' 
    },
    { 
      id: 'shop-greeting-cards', 
      label: 'Greeting Cards', 
      image: 'https://i.imgur.com/0tlVlls.png',
      description: 'Say It Louder' 
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white border-b border-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <span className="text-pink-600 font-bold tracking-widest text-[10px] uppercase mb-1 block">The Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">Browse Categories</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryCard: React.FC<{ cat: any, onNavigate: (id: string) => void }> = ({ cat, onNavigate }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imgSrc, setImgSrc] = useState(getOptimizedImageUrl(cat.image, 640));
    const srcSet = generateImageSrcSet(cat.image);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImgSrc(cat.image); 
        }
    };

    return (
        <div 
            onClick={() => onNavigate(cat.id)}
            className="group cursor-pointer relative h-64 md:h-80 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-100"
        >
            <img 
                src={imgSrc} 
                srcSet={hasError ? undefined : srcSet}
                sizes="(max-width: 768px) 50vw, 25vw"
                alt={cat.label}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={handleError}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 ${isLoaded ? 'opacity-95' : 'opacity-0'}`}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-300" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-6 text-center">
                <h3 className="font-serif text-xl md:text-3xl mb-1 group-hover:-translate-y-2 transition-transform duration-300">{cat.label}</h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 transform translate-y-2 group-hover:translate-y-0">
                        {cat.description}
                    </p>
                </div>
            </div>
        </div>
    );
};