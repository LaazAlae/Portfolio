import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import Skills from './components/Skills';
import ProjectGrid from './components/ProjectGrid';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { Section } from './components/Section';
import { RichTextRenderer } from './components/RichTextRenderer';
import portfolioData from './data.json';
import { Github, ExternalLink, Folder } from 'lucide-react';

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

  if (isLoading) {
    return <div className="bg-background min-h-screen"></div>;
  }

  return (
    <div 
        className="min-h-screen w-full bg-background text-primary font-sans selection:bg-primary selection:text-white overflow-x-hidden scroll-smooth"
    >
      {/* Mobile Landscape Warning Overlay */}
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center hidden landscape:flex md:landscape:hidden text-center p-6">
          <div className="animate-bounce mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-primary mb-2">Please Rotate Your Device</h2>
          <p className="text-muted">This portfolio is optimized for portrait mode on mobile devices.</p>
      </div>

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
            isPaused={!!selectedProject || !!selectedSkill}
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
      >
        {selectedProject && (
            <div>
                {/* Hero Image Section - Clean, no text overlay */}
                <div className="relative w-full h-56 md:h-80 bg-secondary/10 group overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                        src={modalImageError ? "/images/placeholder.jpg" : (selectedProject.id === 'budget-db' ? '/images/budget-db.jpg' : selectedProject.id === 'doc-automation' ? '/images/docfiller.png' : selectedProject.id === 'friends-go-together' ? '/images/friendsgotogether.png' : `/images/${selectedProject.id}.png`)}
                        onError={(e) => {
                            if (!modalImageError) {
                                setModalImageError(true);
                            } else {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                            }
                        }}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                        alt={selectedProject.title} 
                    />
                    <div className="fallback-icon hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10 absolute inset-0">
                        <Folder className="w-20 h-20 text-primary/20" />
                    </div>
                </div>

                <div className="bg-background p-5 md:p-8 space-y-5 md:space-y-6">
                    {/* Header: Title & Short Desc */}
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-primary mb-2 md:mb-3">{selectedProject.title}</h2>
                        <p className="text-base md:text-lg text-muted leading-relaxed">{selectedProject.shortDescription}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string) => (
                            <span key={tech} className="px-2.5 py-1 md:px-3 md:py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm font-medium border border-primary/20">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-3 py-1">
                        {selectedProject.links.demo && (
                             <a href={selectedProject.links.demo} target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-semibold text-sm md:text-base hover:-translate-y-0.5">
                                 <ExternalLink size={18} /> Live Demo
                             </a>
                        )}
                        {selectedProject.links.github && (
                             <a href={selectedProject.links.github} target="_blank" rel="noreferrer" className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-card border border-primary/10 text-primary rounded-xl hover:bg-primary/5 transition-all font-semibold text-sm md:text-base hover:-translate-y-0.5">
                                 <Github size={18} /> Source Code
                             </a>
                        )}
                    </div>

                    <div className="h-px w-full bg-primary/10 my-2 md:my-4" />

                    {/* Description */}
                    <div className="space-y-3 md:space-y-4">
                        <h4 className="text-lg md:text-xl font-bold text-primary">Deep Dive</h4>
                        <div className="text-muted leading-relaxed text-sm md:text-base md:text-lg">
                            <RichTextRenderer 
                                text={selectedProject.longDescription} 
                                highlights={selectedProject.technologies} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}
      </Modal>

      {/* Skill Filter Modal */}
      <Modal
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
      >
        <div className="bg-background min-h-full">
            <div className="p-6 border-b border-primary/10 bg-primary/5">
                <h3 className="text-2xl font-bold text-primary">Projects using <span className="text-accent">{selectedSkill}</span></h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSkill && getProjectsBySkill(selectedSkill).map(project => (
                    <div 
                        key={project.id}
                        onClick={() => {
                            setSelectedSkill(null);
                            setTimeout(() => setSelectedProject(project), 150); // Smooth transition
                        }}
                        className="group p-4 rounded-xl border border-primary/10 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all flex flex-col gap-2"
                    >
                        <h4 className="font-bold text-primary group-hover:text-accent text-lg">{project.title}</h4>
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
        </div>
      </Modal>
    </div>
  );
}

export default App;