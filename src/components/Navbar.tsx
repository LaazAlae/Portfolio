import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, User, Code2, Briefcase, Folder } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  data: {
    name: string;
    github: string;
    linkedin: string;
    email: string;
  };
  scrollContainerRef?: React.RefObject<HTMLDivElement>;
}

const Navbar: React.FC<NavbarProps> = ({ data, scrollContainerRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef?.current || window;
    
    const handleScroll = () => {
       const scrollTop = container instanceof Window ? container.scrollY : (container as HTMLElement).scrollTop;
       setIsScrolled(scrollTop > 20);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, { 
        root: scrollContainerRef?.current || null,
        rootMargin: "-40% 0px -60% 0px"
    });

    handleScroll();
    
    container.addEventListener('scroll', handleScroll);
    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });

    return () => {
        container.removeEventListener('scroll', handleScroll);
        observer.disconnect();
    };
  }, [scrollContainerRef]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element && scrollContainerRef?.current) {
          const container = scrollContainerRef.current;
          const topPos = element.offsetTop;
          container.scrollTo({ top: topPos, behavior: 'smooth' });
          setActiveSection(targetId);
      } else if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const navLinks = [
    { name: 'About', href: '#about', icon: User },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: Folder },
    { name: 'Skills', href: '#skills', icon: Code2 },
  ];

  // Calculate the target scale based on desired final width vs current viewport
  // Keep scale ratios above 0.65 to prevent subpixel rendering conflicts
  const getTargetScale = () => {
    if (!isScrolled) return 1;

    // Use viewport-relative scaling that maintains reasonable ratios
    // Mobile: 95% (scale ≈ 0.95)
    // Desktop: 85% (scale ≈ 0.85) - safe threshold above 0.65, looks natural
    const targetScale = isMobile ? 0.95 : 0.85;

    return targetScale;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={false}
        animate={{
            borderRadius: isScrolled ? "50px" : "0px",
            marginTop: isScrolled ? "1rem" : "0px",
            scale: getTargetScale(),
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0)",
            backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
            boxShadow: isScrolled ? "inset 0px 1px 0px 0px rgba(255,255,255,0.4), inset 0px -1px 0px 0px rgba(255,255,255,0.1), 0px 8px 32px -4px rgba(0,0,0,0.1)" : "none"
        }}
        transition={{
            duration: 0.6,
            ease: [0.32, 0.72, 0, 1]
        }}
        style={{
            width: '100vw',
            transformOrigin: 'center center'
        }}
        className="pointer-events-auto relative flex items-center justify-between px-4 md:px-8 py-3 overflow-hidden whitespace-nowrap"
      >
        {/* Left: Logo - Uses flex-1 to push center to middle */}
        <motion.div className="flex-1 basis-0 flex justify-start min-w-0">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-10 w-auto object-contain" />
        </motion.div>

        {/* Center: Nav Links - Fixed/Shrinkable */}
        <motion.div className="shrink-0 flex items-center justify-center gap-1 bg-white/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-full px-2 md:px-0 py-1 md:py-0 border border-white/20 md:border-none shadow-sm md:shadow-none">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                  "relative px-3 md:px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 flex items-center gap-2",
                  activeSection === link.href.replace('#', '') 
                    ? "text-primary" 
                    : "text-primary/60 hover:text-primary"
              )}
            >
              <link.icon size={16} className="md:hidden" />
              <span className="relative z-10 hidden md:block">{link.name}</span>
              
              {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/50 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_2px_6px_rgba(0,0,0,0.05)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
              )}
            </a>
          ))}
        </motion.div>

        {/* Right: Socials - Mirrors Left to maintain center balance */}
        <motion.div className="flex-1 basis-0 flex justify-end items-center gap-1 min-w-0">
           <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="p-2 text-primary/60 hover:text-primary hover:bg-white/20 rounded-full transition-colors" aria-label="GitHub">
             <Github size={18} />
           </a>
           <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="p-2 text-primary/60 hover:text-primary hover:bg-white/20 rounded-full transition-colors" aria-label="LinkedIn">
             <Linkedin size={18} />
           </a>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Navbar;