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
  const images: string[] = Array.from({ length: 8 }, (_, i) => `/images/profile/${i + 1}.jpg`);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 1,
      zIndex: 1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 1,
    }),
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prev = () => {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-4/5 max-w-[260px] md:max-w-md lg:max-w-lg aspect-square mx-auto lg:mr-0 rounded-full overflow-hidden group cursor-pointer shadow-2xl border-4 border-primary/5">
      <AnimatePresence initial={false} custom={direction}>
        {images.length > 0 ? (
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Profile"
            onError={(e) => {
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full text-primary opacity-0 group-hover:opacity-100 hover:bg-white transition-all transform hover:scale-110 z-20 shadow-lg"><ChevronLeft size={24} /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full text-primary opacity-0 group-hover:opacity-100 hover:bg-white transition-all transform hover:scale-110 z-20 shadow-lg"><ChevronRight size={24} /></button>
        </>
      )}
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="min-h-[calc(100vh-100px)] flex flex-col justify-center relative pb-24 pt-12 lg:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center flex-grow">
      
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
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] sm:leading-[0.9] bg-clip-text text-transparent"
                style={{
                    // Large gradient field: Mostly green corners, with a wandering Red/Brown core in the middle
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #8B4513 0%, #5c1c1c 15%, #1e4d2b 50%, #1e4d2b 100%)',
                    backgroundSize: '200% 200%', // Double size to allow wandering
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                }}
                initial={{ opacity: 0, y: 20, backgroundPosition: "50% 50%" }}
                animate={{ 
                    opacity: 1, 
                    y: 0,
                    // Wander through the corners and center in a non-linear path
                    backgroundPosition: [
                        "0% 0%",   // Top Left
                        "100% 0%", // Top Right
                        "100% 100%", // Bottom Right
                        "0% 100%",   // Bottom Left
                        "50% 50%",   // Center
                        "0% 0%"      // Loop back
                    ]
                }}
                transition={{ 
                    opacity: { delay: 0.2, duration: 0.8, ease: "easeOut" },
                    y: { delay: 0.2, duration: 0.8, ease: "easeOut" },
                    backgroundPosition: {
                        duration: 20, // Very slow drift (20s)
                        repeat: Infinity,
                        ease: "easeInOut", // Smooth floating
                        repeatType: "mirror" // Ping pong effect for randomness
                    }
                }}
            >
            {data.name}
            </motion.h1>
            
            <motion.p
                className="text-lg md:text-2xl text-muted font-light max-w-lg leading-relaxed mx-auto lg:mx-0 text-balance"
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
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-xs md:text-sm text-muted/80 justify-center lg:justify-start"
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
        className="order-1 lg:order-2 w-full h-full flex justify-end items-center"
      >
          <Carousel />
      </motion.div>
      </div>

      {/* Arrow Down - Visible on ALL screens, pinned to bottom */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted/30 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;