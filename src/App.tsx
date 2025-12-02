import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Skills from './components/Skills';
import ProjectGrid from './components/ProjectGrid';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Modal from './components/Modal';
import portfolioData from './data.json';
import { Github, ExternalLink, Folder } from 'lucide-react';

// Helper to parse text and replace **bold** with pill components
const RichTextRenderer = ({ text }: { text: string }) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <span>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    const content = part.slice(2, -2);
                    return (
                        <span key={i} className="inline-block px-2 py-0.5 mx-1 text-xs font-medium bg-primary/10 text-primary rounded border border-primary/20 translate-y-[-1px]">
                            {content}
                        </span>
                    );
                }
                return part;
            })}
        </span>
    );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [modalImageError, setModalImageError] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset modal image error when project changes
  useEffect(() => {
      if (selectedProject) setModalImageError(false);
  }, [selectedProject]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Robust Matching System
  const getProjectsBySkill = (skill: string) => {
    const normalizedSkill = skill.toLowerCase().trim();
    return portfolioData.projects.filter(p => 
        p.technologies.some((t: string) => t.toLowerCase().trim() === normalizedSkill)
    );
  };

  // Advanced Section Layout System
  const Section = ({ id, children, className, bgImage = '/images/placeholder.jpg', title }: { id: string, children: React.ReactNode, className?: string, bgImage?: string, title?: string }) => (
    <section id={id} className={`min-h-[100dvh] h-[100dvh] snap-start snap-always flex flex-col relative overflow-hidden ${className || ''}`}>
        <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: `url(${bgImage})` }} />
        
        {/* Content Wrapper - Flex Grow to fill space minus header/title */}
        <div className="flex-1 flex flex-col w-full h-full relative">
            {/* Title Zone - Fixed at Top */}
            {title && (
                <div className="absolute top-[12vh] left-0 right-0 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto z-20 pointer-events-none">
                    {/* Title rendering is handled by components usually, but this reserves the slot */}
                </div>
            )}

            {/* Main Content Zone - Centered in remaining space */}
            <div className={`flex-1 flex flex-col justify-center w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 ${title ? 'pt-[10vh]' : ''}`}>
                {children}
            </div>
        </div>
    </section>
  );

  if (isLoading) {
    return <div className="bg-background min-h-screen"></div>;
  }

  return (
    <div 
        ref={scrollContainerRef}
        className="h-screen bg-background text-primary font-sans selection:bg-primary selection:text-white overflow-x-hidden overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <Navbar data={portfolioData.personal} scrollContainerRef={scrollContainerRef} />
      
      <main>
        {/* Hero - Full Centered */}
        <Section id="home" className="justify-center pt-0">
            <Hero data={portfolioData.personal} />
        </Section>
        
        <Section id="about">
          <BentoGrid about={portfolioData.about} education={portfolioData.education} />
        </Section>

        {/* Experience - Uses flex layout to center content */}
        <Section id="experience">
            <Experience experience={portfolioData.experience} />
        </Section>
        
        {/* Projects - Full Width Stream */}
        <Section id="projects">
          <ProjectGrid 
            projects={portfolioData.projects} 
            onProjectClick={(project) => setSelectedProject(project)}
          />
        </Section>

        <Section id="skills">
          <Skills 
            skills={portfolioData.skills} 
            onSkillClick={(skill) => setSelectedSkill(skill)}
          />
        </Section>
      </main>

      <div className="snap-start">
        <Footer personal={portfolioData.personal} />
      </div>

      {/* Project Detail Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
            <div className="space-y-6">
                <div className="aspect-video w-full bg-secondary/10 rounded-xl overflow-hidden border border-primary/10 relative">
                    <img 
                        src={modalImageError ? "/images/placeholder.jpg" : `/images/${selectedProject.id}.png`} 
                        onError={(e) => {
                            if (!modalImageError) {
                                setModalImageError(true);
                            } else {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                            }
                        }}
                        className="w-full h-full object-cover" 
                        alt={selectedProject.title} 
                    />
                    <div className="fallback-icon hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10 absolute inset-0">
                        <Folder className="w-16 h-16 text-primary/20" />
                    </div>
                </div>
                
                <div className="flex gap-3">
                    {selectedProject.links.github && (
                         <a href={selectedProject.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
                             <Github size={16} /> View Code
                         </a>
                    )}
                    {selectedProject.links.demo && (
                         <a href={selectedProject.links.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-card border border-primary/20 text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium text-sm">
                             <ExternalLink size={16} /> Live Demo
                         </a>
                    )}
                </div>

                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-primary border-l-4 border-accent pl-3">Project Overview</h4>
                    <p className="text-muted leading-relaxed text-base">
                        <RichTextRenderer text={selectedProject.longDescription} />
                    </p>
                </div>

                <div className="space-y-3">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Technical Arsenal</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string) => (
                            <span key={tech} className="px-3 py-1 text-sm bg-primary/5 text-primary font-medium rounded-full border border-primary/10">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </Modal>

      {/* Skill Filter Modal */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        title={`Projects using ${selectedSkill}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedSkill && getProjectsBySkill(selectedSkill).map(project => (
                <div 
                    key={project.id}
                    onClick={() => {
                        setSelectedSkill(null);
                        setTimeout(() => setSelectedProject(project), 150); // Smooth transition
                    }}
                    className="group p-4 rounded-xl border border-primary/10 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all flex flex-col gap-2"
                >
                    <h4 className="font-bold text-primary group-hover:text-accent">{project.title}</h4>
                    <p className="text-sm text-muted line-clamp-2">{project.shortDescription}</p>
                    <div className="flex gap-2 mt-2">
                        <span className="text-xs font-mono bg-background px-2 py-0.5 rounded border border-primary/10 text-primary">
                            {selectedSkill}
                        </span>
                    </div>
                </div>
            ))}
            {selectedSkill && getProjectsBySkill(selectedSkill).length === 0 && (
                <div className="col-span-2 text-center py-12 text-muted">
                    No specific featured projects tagged with this skill yet.
                </div>
            )}
        </div>
      </Modal>
    </div>
  );
}

export default App;
