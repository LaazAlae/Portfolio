import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface ExperienceProps {
  experience: Array<{
    company: string;
    title: string;
    period: string;
    location: string;
    description: string[];
  }>;
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-12"
      >
        <Briefcase className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-bold text-primary">Experience</h2>
      </motion.div>

      <div className="space-y-12 relative border-l-2 border-primary/10 ml-3 md:ml-6 pl-8 md:pl-12 py-2">
        {experience.map((job, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-[41px] md:-left-[57px] top-2 h-5 w-5 rounded-full border-4 border-background bg-primary" />
            
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-xl font-bold text-primary">{job.title}</h3>
              <span className="text-sm font-mono text-muted/80 bg-secondary/5 px-2 py-1 rounded">{job.period}</span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-accent">{job.company}</h4>
              <span className="text-sm text-muted">{job.location}</span>
            </div>

            <ul className="space-y-2">
              {job.description.map((point, i) => (
                <li key={i} className="text-muted leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent/40 before:rounded-full">
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
