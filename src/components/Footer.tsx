import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  personal: {
    name: string;
    github: string;
    linkedin: string;
    email: string;
  };
}

const Footer: React.FC<FooterProps> = ({ personal }) => {
  const scrollToTop = () => {
    const container = document.querySelector('.overflow-y-scroll');
    if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
             <a 
                href={`mailto:${personal.email}`} 
                className="p-3 text-muted hover:text-primary hover:bg-background rounded-full transition-all"
                aria-label="Email"
             >
               <Mail size={20} />
             </a>
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
