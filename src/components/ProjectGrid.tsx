import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, useSpring, useTransform } from 'framer-motion';
import { Rocket, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: any[];
  onProjectClick: (project: any) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectClick }) => {
  // Tripling projects for seamless loop
  const seamlessProjects = [...projects, ...projects, ...projects];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  
  // Physics Engine
  const baseX = useMotionValue(0);
  const [targetSpeed, setTargetSpeed] = useState(-0.5); 
  const smoothSpeed = useSpring(targetSpeed, { damping: 40, stiffness: 200, mass: 2 });

  useEffect(() => {
    if (containerRef.current) {
      const singleSetWidth = containerRef.current.scrollWidth / 3;
      setContentWidth(singleSetWidth);
    }
  }, [projects]);

  useEffect(() => {
      smoothSpeed.set(targetSpeed);
  }, [targetSpeed, smoothSpeed]);

  useAnimationFrame((_, delta) => {
    if (!contentWidth) return;

    const moveBy = smoothSpeed.get() * (delta / 16);
    let currentX = baseX.get() + moveBy;

    if (currentX <= -contentWidth * 2) {
        currentX += contentWidth;
    } else if (currentX > 0) {
        currentX -= contentWidth;
    }

    baseX.set(currentX);
  });

  const handleBoostLeft = () => setTargetSpeed(2.5);
  const handleBoostRight = () => setTargetSpeed(-2.5);
  const handleCruise = () => setTargetSpeed(-0.5);

  return (
    <div className="w-full py-20 relative">
       <div className="max-w-7xl mx-auto px-4 mb-12 flex items-center justify-between relative z-10">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
            >
                <Rocket className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold text-primary">Featured Work</h2>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-2 text-xs text-muted uppercase tracking-widest bg-secondary/5 px-4 py-2 rounded-full border border-primary/5">
                <ChevronsLeft size={14} />
                <span>Control Flow</span>
                <ChevronsRight size={14} />
            </div>
       </div>

      {/* The Stream - Full Width Expansion */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
          <motion.div 
            className="flex gap-6 md:gap-10 pl-[max(1rem,calc((100vw-80rem)/2))] items-stretch py-4"
            ref={containerRef}
            style={{ x: baseX, width: "max-content" }}
          >
            {seamlessProjects.map((project, idx) => (
                <div 
                    key={`${project.id}-${idx}`} 
                    className="relative w-[300px] md:w-[380px] flex-shrink-0"
                >
                    <ProjectCard 
                        project={project} 
                        onClick={() => onProjectClick(project)}
                    />
                </div>
            ))}
          </motion.div>
      </div>

      {/* Control Deck */}
      <div className="max-w-md mx-auto mt-12 flex items-center justify-center gap-6 relative z-20">
          <button
            onMouseDown={handleBoostLeft}
            onMouseUp={handleCruise}
            onMouseLeave={handleCruise}
            onTouchStart={handleBoostLeft}
            onTouchEnd={handleCruise}
            className="group p-4 rounded-full border border-primary/10 bg-card hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm hover:shadow-xl hover:scale-110 active:scale-95"
            aria-label="Scroll Left Fast"
          >
              <ChevronLeft size={24} />
          </button>

          <div className="h-1 w-12 bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                style={{ 
                    width: "100%",
                    opacity: useTransform(smoothSpeed, [-3, 0, 3], [1, 0.2, 1])
                }} 
              />
          </div>

          <button
            onMouseDown={handleBoostRight}
            onMouseUp={handleCruise}
            onMouseLeave={handleCruise}
            onTouchStart={handleBoostRight}
            onTouchEnd={handleCruise}
            className="group p-4 rounded-full border border-primary/10 bg-card hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm hover:shadow-xl hover:scale-110 active:scale-95"
            aria-label="Scroll Right Fast"
          >
              <ChevronRight size={24} />
          </button>
      </div>
    </div>
  );
};

export default ProjectGrid;
