import { useState, useEffect, useRef, FC, RefObject, MouseEvent } from 'react';
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
  scrollContainerRef?: RefObject<HTMLDivElement>;
}

const Navbar: FC<NavbarProps> = ({ data, scrollContainerRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const isNavigating = useRef(false);

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
        if (isNavigating.current) return;
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

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      isNavigating.current = true;
      setActiveSection(targetId);

      if (element && scrollContainerRef?.current) {
          const container = scrollContainerRef.current;
          const topPos = element.offsetTop;
          container.scrollTo({ top: topPos, behavior: 'smooth' });
          
          setTimeout(() => {
              isNavigating.current = false;
          }, 1000);
      } else if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
              isNavigating.current = false;
          }, 1000);
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

  // Exact Liquid Glass Style Definition
  const glassStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(20px) saturate(180%)",
    boxShadow: "inset 0px 1px 0px 0px rgba(255,255,255,0.4), inset 0px -1px 0px 0px rgba(255,255,255,0.1), 0px 8px 32px -4px rgba(0,0,0,0.1)"
  };

  const transparentStyle = {
    backgroundColor: "rgba(255, 255, 255, 0)",
    backdropFilter: "blur(0px)",
    boxShadow: "none"
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={false}
        animate={{
            borderRadius: isScrolled ? "50px" : "0px",
            marginTop: isScrolled ? "1rem" : "0px",
            scale: getTargetScale(),
            ...(isScrolled ? glassStyle : transparentStyle)
        }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        style={{ width: '100vw', transformOrigin: 'center center' }}
        className="pointer-events-auto relative flex items-center justify-between px-4 md:px-8 py-3 overflow-hidden whitespace-nowrap"
      >
        {/* Left: Desktop Logo / Mobile GitHub */}
        <motion.div className="flex-1 basis-0 flex justify-start min-w-0">
            {/* Desktop: Logo */}
            <img src="/logo.png" alt="Logo" className="hidden md:block h-10 w-auto object-contain" />
            
            {/* Mobile: GitHub (Left Side) */}
            <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="md:hidden p-2 text-primary/60 hover:text-primary hover:bg-white/20 rounded-full transition-colors" aria-label="GitHub">
                <Github size={20} />
            </a>
        </motion.div>

        {/* Center: Nav Links */}
        <motion.div 
            className="shrink-0 flex items-center justify-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
                opacity: isScrolled ? 1 : 0,
                pointerEvents: isScrolled ? "auto" : "none",
                y: isScrolled ? 0 : -10
            }}
            transition={{ duration: 0.4 }}
        >
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

        {/* Right: Desktop Socials / Mobile LinkedIn */}
        <motion.div className="flex-1 basis-0 flex justify-end items-center gap-1 min-w-0">
           {/* Desktop: GitHub (Hidden on Mobile, shown on Left instead) */}
           <a href={`https://${data.github}`} target="_blank" rel="noreferrer" className="hidden md:block p-2 text-primary/60 hover:text-primary hover:bg-white/20 rounded-full transition-colors" aria-label="GitHub">
             <Github size={18} />
           </a>
           
           {/* LinkedIn (Always Right) */}
           <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="p-2 text-primary/60 hover:text-primary hover:bg-white/20 rounded-full transition-colors" aria-label="LinkedIn">
             <Linkedin size={isMobile ? 20 : 18} />
           </a>
        </motion.div>
      </motion.nav>
    </div>
  );
};

export default Navbar;