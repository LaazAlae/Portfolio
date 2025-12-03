import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import { cn } from '../lib/utils';

interface SkillsProps {
  skills: Record<string, string[]>;
  onSkillClick: (skill: string) => void;
}

const Skills: React.FC<SkillsProps> = ({ skills, onSkillClick }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-12"
      >
        <Cpu className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-primary">Technical Arsenal</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, skillList]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className={cn(
                "bg-card rounded-2xl border border-primary/5 hover:border-primary/20 transition-colors shadow-sm flex flex-col items-center text-center",
                category === "Languages" ? "md:col-span-2 p-4" : "p-6"
            )}
          >
            <h3 className="text-lg font-semibold text-primary mb-4 border-b border-primary/10 pb-2 inline-block">
              {category}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skillList.map((skill) => (
                <button
                  key={skill}
                  onClick={() => onSkillClick(skill)}
                  className="px-3 py-1.5 text-sm bg-background text-muted font-medium rounded-lg border border-primary/5 hover:bg-primary hover:text-white hover:border-primary transition-colors active:scale-95"
                >
                  {skill.replace(/ \(Native\/Fluent\)/g, '')}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;