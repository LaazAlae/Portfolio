import React, { useState } from 'react';
import { Github, Linkedin, Mail, ArrowUp, Check } from 'lucide-react';

interface FooterProps {
  personal: {
    name: string;
    github: string;
    linkedin: string;
    email: string;
  };
}

const Footer: React.FC<FooterProps> = ({ personal }) => {
  const [emailCopied, setEmailCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailClick = (e: React.MouseEvent) => {
      e.preventDefault();
      navigator.clipboard.writeText(personal.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-primary/5 py-12 mt-0 snap-start min-h-[50vh] flex flex-col justify-center">
      <div className="container mx-auto px-4 flex flex-col items-center gap-8">
        
        <div className="flex gap-6">
             <a 
                href={`https://${personal.github}`} 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 text-muted hover:text-primary hover:bg-background rounded-full transition-all"
                aria-label="GitHub"
             >
               <Github size={20} />
             </a>
             <a 
                href={`https://${personal.linkedin}`} 
                target="_blank" 
                rel="noreferrer" 
                className="p-3 text-muted hover:text-primary hover:bg-background rounded-full transition-all"
                aria-label="LinkedIn"
             >
               <Linkedin size={20} />
             </a>
             <button 
                onClick={handleEmailClick}
                className="p-3 text-muted hover:text-primary hover:bg-background rounded-full transition-all relative group"
                aria-label="Copy Email"
             >
               {emailCopied ? <Check size={20} className="text-green-600" /> : <Mail size={20} />}
               
               {/* Tooltip */}
               <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex flex-col items-center gap-0.5 shadow-lg z-10 min-w-max">
                   {emailCopied ? (
                       <span className="font-bold">Copied!</span>
                   ) : (
                       <>
                           <span className="font-semibold">{personal.email}</span>
                           <span className="text-[10px] opacity-80 font-light">Click to copy</span>
                       </>
                   )}
                   {/* Triangle Arrow */}
                   <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-primary"></span>
               </span>
             </button>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-primary font-semibold text-lg">{personal.name}</p>
            <p className="text-muted text-sm">
                &copy; {currentYear} All rights reserved.
            </p>
        </div>

        <button 
            onClick={scrollToTop}
            className="p-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-full transition-colors mt-4"
            aria-label="Scroll to top"
        >
            <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
