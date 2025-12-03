import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, useSpring, useTransform } from 'framer-motion';
import { Rocket, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { cn } from '../lib/utils';

interface ProjectGridProps {
  projects: any[];
  onProjectClick: (project: any) => void;
  isPaused?: boolean;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectClick, isPaused = false }) => {
  // Tripling projects for seamless loop
  const seamlessProjects = [...projects, ...projects, ...projects];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  
  // Physics Engine
  const baseX = useMotionValue(0);
  const BOOST_SPEED = 3.5;
  const CRUISE_SPEED = 0.5; // Positive/Negative determines direction
  const [targetSpeed, setTargetSpeed] = useState(-CRUISE_SPEED); 
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
    if (!contentWidth || isPaused) return;

    const moveBy = smoothSpeed.get() * (delta / 16);
    let currentX = baseX.get() + moveBy;

    if (currentX <= -contentWidth * 2) {
        currentX += contentWidth;
    } else if (currentX > 0) {
        currentX -= contentWidth;
    }

    baseX.set(currentX);
  });

  const toggleBoostLeft = () => {
      setTargetSpeed(prev => prev === BOOST_SPEED ? -CRUISE_SPEED : BOOST_SPEED);
  };

  const toggleBoostRight = () => {
      setTargetSpeed(prev => prev === -BOOST_SPEED ? -CRUISE_SPEED : -BOOST_SPEED);
  };

  return (
    <div className="w-full py-2 md:py-10 relative">
       {/* ... Title Section (Unchanged) ... */}
       <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between relative z-10">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
            >
                <Rocket className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Featured Work</h2>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-2 text-xs text-muted uppercase tracking-widest bg-secondary/5 px-4 py-2 rounded-full border border-primary/5">
                <ChevronsLeft size={14} />
                <span>Control Flow</span>
                <ChevronsRight size={14} />
            </div>
       </div>

      {/* The Stream - Full Width Expansion */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden select-none">
          <motion.div 
            className="flex gap-3 md:gap-6 pl-[max(1rem,calc((100vw-80rem)/2))] items-stretch py-8 will-change-transform"
            ref={containerRef}
            style={{ x: baseX, width: "max-content" }}
          >
            {seamlessProjects.map((project, idx) => (
                <div 
                    key={`${project.id}-${idx}`} 
                    className={cn(
                        "relative w-[220px] md:w-[300px] flex-shrink-0",
                        idx % projects.length === 0 && idx !== 0 ? "border-l-2 border-dashed border-primary/20 pl-6" : ""
                    )}
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
      <div className="max-w-md mx-auto mt-4 flex items-center justify-center gap-6 relative z-20 select-none">
          <button
            onClick={toggleBoostLeft}
            className={cn(
                "group p-4 rounded-full border transition-all shadow-sm active:scale-95",
                targetSpeed > 0 
                    ? "bg-primary text-white border-primary shadow-xl scale-110" 
                    : "bg-card border-primary/10 hover:bg-primary hover:text-white hover:border-primary hover:shadow-xl hover:scale-110"
            )}
            aria-label="Toggle Scroll Left"
          >
              <ChevronLeft size={24} className={targetSpeed > 0 ? "animate-pulse" : ""} />
          </button>

          <div className="h-1 w-12 bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                style={{ 
                    width: "100%",
                    opacity: useTransform(smoothSpeed, [-BOOST_SPEED, 0, BOOST_SPEED], [1, 0.2, 1])
                }} 
              />
          </div>

          <button
            onClick={toggleBoostRight}
            className={cn(
                "group p-4 rounded-full border transition-all shadow-sm active:scale-95",
                targetSpeed < -1 
                    ? "bg-primary text-white border-primary shadow-xl scale-110" 
                    : "bg-card border-primary/10 hover:bg-primary hover:text-white hover:border-primary hover:shadow-xl hover:scale-110"
            )}
            aria-label="Toggle Scroll Right"
          >
              <ChevronRight size={24} className={targetSpeed < -1 ? "animate-pulse" : ""} />
          </button>
      </div>
    </div>
  );
};

export default ProjectGrid;
