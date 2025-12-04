import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';
import { cn } from '../lib/utils';

interface ProjectProps {
  project: {
    id: string;
    title: string;
    shortDescription: string;
    technologies: string[];
    links: {
      demo: string;
      github: string;
    };
  };
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectProps> = ({ project, onClick }) => {
  const [imageError, setImageError] = useState(false);
  // Handle file extension & naming differences
  const imageUrl = project.id === 'budget-db' ? '/images/budget-db.jpg' : project.id === 'doc-automation' ? '/images/docfiller.png' : project.id === 'friends-go-together' ? '/images/friendsgotogether.png' : `/images/${project.id}.png`;

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation(); // Prevent modal opening when clicking a link
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group bg-card rounded-2xl overflow-hidden border border-primary/5 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all flex flex-col h-full cursor-pointer relative"
    >
      {/* Image Area */}
      <div className="aspect-video w-full bg-secondary/10 relative overflow-hidden border-b border-primary/5">
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
            src={imageError ? "/images/placeholder.jpg" : imageUrl}
            alt={project.title}
            onError={(e) => {
                if (!imageError) {
                    setImageError(true);
                } else {
                    // If placeholder also fails, hide image and show icon
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }
            }}
            className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95] group-hover:brightness-100 grayscale-[10%] group-hover:grayscale-0"
        />
        {/* Fallback Icon (Hidden by default) */}
        <div className="fallback-icon hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10 transition-colors absolute inset-0">
            <Folder className="w-12 h-12 text-primary/20" />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                {project.title}
            </h3>
            
            {/* Quick Links - Always Visible */}
            <div className="flex gap-2">
                <button
                    onClick={(e) => handleLinkClick(e, project.links.github)}
                    disabled={!project.links.github}
                    className={cn(
                        "p-1.5 rounded-full transition-all",
                        project.links.github 
                            ? "text-muted hover:text-primary hover:bg-primary/10" 
                            : "text-muted/20 cursor-not-allowed"
                    )}
                    title={project.links.github ? "View Code" : "Source Private"}
                >
                    <Github size={16} />
                </button>
                <button
                    onClick={(e) => handleLinkClick(e, project.links.demo)}
                    disabled={!project.links.demo}
                    className={cn(
                        "p-1.5 rounded-full transition-all",
                        project.links.demo 
                            ? "text-muted hover:text-primary hover:bg-primary/10" 
                            : "text-muted/20 cursor-not-allowed"
                    )}
                    title={project.links.demo ? "Live Demo" : "Demo Unavailable"}
                >
                    <ExternalLink size={16} />
                </button>
            </div>
        </div>

        <p className="text-muted text-sm leading-relaxed mb-3 flex-grow line-clamp-2 md:line-clamp-3">
            {project.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-primary/5">
            {project.technologies.slice(0, 3).map(tech => (
                <span key={tech} className="text-[11px] font-medium text-primary/80 bg-primary/5 px-2 py-0.5 rounded whitespace-nowrap max-w-[110px] truncate">
                    {tech}
                </span>
            ))}
            {project.technologies.length > 3 && (
                <span className="text-[11px] font-medium text-muted px-2 py-0.5">
                    +{project.technologies.length - 3}
                </span>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
