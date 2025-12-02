import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  data: {
    name: string;
    title: string;
    status: string;
  };
}

const Carousel = () => {
  // If no images provided, we use the placeholder.
  // User can populate this array with paths like ["/images/me1.jpg", "/images/me2.jpg"]
  const images: string[] = ["/images/placeholder.jpg"]; 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    // REDUCED SIZE: max-w-sm / lg:max-w-lg
    // MASK: Inset gradient forces transparency on all 4 outer edges
    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[3/4] md:aspect-square lg:aspect-auto lg:h-[500px] mx-auto lg:mr-0 rounded-3xl overflow-hidden" 
         style={{ 
             maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)', 
             WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)'
         }}>
      <AnimatePresence mode="wait">
        {images.length > 0 ? (
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }} 
            className="w-full h-full object-cover"
            alt="Profile"
            onError={(e) => {
                // Fallback if the placeholder itself is missing (rare)
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
             <User className="w-40 h-40 text-primary/20" />
          </div>
        )}
        <div className="fallback-icon hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10 absolute inset-0">
             <User className="w-40 h-40 text-primary/20" />
        </div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full text-primary opacity-0 group-hover:opacity-100 hover:bg-white transition-all transform hover:scale-110"><ChevronLeft size={24} /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full text-primary opacity-0 group-hover:opacity-100 hover:bg-white transition-all transform hover:scale-110"><ChevronRight size={24} /></button>
        </>
      )}
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="min-h-[50vh] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center relative">
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 z-10 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left pl-4 lg:pl-8"
      >
        <div className="space-y-4">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/10 text-accent text-xs font-bold uppercase tracking-widest"
            >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Portfolio 2025
            </motion.div>
            
            <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary leading-[0.95] sm:leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
            {data.name}
            </motion.h1>
            
            <motion.p 
                className="text-xl md:text-2xl text-muted font-light max-w-lg leading-relaxed mx-auto lg:mx-0 text-balance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
            {data.title} crafting <span className="text-primary font-medium border-b-2 border-accent/20">industry-grade</span> digital experiences.
            </motion.p>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-sm text-muted/80 justify-center lg:justify-start"
        >
            <div className="flex items-center gap-3 px-5 py-2.5 bg-card/80 backdrop-blur-sm rounded-xl border border-primary/5 shadow-sm">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                {/* Forced whitespace-nowrap on desktop to prevent breaking */}
                <span className="font-medium whitespace-normal lg:whitespace-nowrap">{data.status}</span>
            </div>
        </motion.div>
      </motion.div>

      {/* Right: Single Image Carousel - Taking up full right half */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="order-1 lg:order-2 w-full h-full flex justify-end"
      >
          <Carousel />
      </motion.div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted/30 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
