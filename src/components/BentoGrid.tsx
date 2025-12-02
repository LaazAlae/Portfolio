import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, MapPin, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface BentoGridProps {
  about: {
    description: string;
    stats: Array<{ label: string; value: string }>;
  };
  education: {
    primary: {
        institution: string;
        degree: string;
        period: string;
        details: string;
    };
    secondary: {
        institution: string;
        degree: string;
        period: string;
        details: string;
    };
  };
}

const Card = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={cn("bg-card rounded-3xl p-8 border border-primary/5 hover:border-primary/10 transition-colors shadow-sm hover:shadow-md overflow-hidden relative", className)}
  >
    {children}
  </motion.div>
);

const BentoGrid: React.FC<BentoGridProps> = ({ about, education }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
      {/* Bio Card - Spans 2 columns */}
      <Card className="md:col-span-2 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-primary mb-4">About Me</h3>
        <p className="text-lg text-muted leading-relaxed text-balance">
          {about.description}
        </p>
      </Card>

      {/* JHU Card - Primary Education (Highlight) */}
      <Card className="md:col-span-1 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden group" delay={0.1}>
        <div className="absolute right-4 bottom-4 opacity-5 group-hover:opacity-10 transition-opacity z-0 pointer-events-none">
            <ShieldCheck size={100} />
        </div>
        <div className="h-full flex flex-col justify-start relative z-10">
          <GraduationCap className="text-primary w-8 h-8 mb-4" />
          <div>
            <h4 className="text-sm text-accent font-semibold uppercase tracking-wider mb-2">Education</h4>
            <p className="font-bold text-primary text-lg leading-tight mb-1">{education.primary.institution}</p>
            <p className="text-muted text-sm mb-3">{education.primary.degree}</p>
            <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs text-muted/80">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded border border-primary/10 whitespace-nowrap font-medium">
                    {education.primary.period}
                </span>
                <span className="bg-secondary/5 px-2 py-1 rounded border border-secondary/10">{education.primary.details}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Card */}
      <Card className="md:col-span-1" delay={0.2}>
         <div className="flex flex-col justify-between h-full">
             <Code2 className="text-primary w-8 h-8 mb-4" />
             <div className="space-y-4">
                 {about.stats.map((stat, idx) => (
                     <div key={idx} className="flex justify-between items-end border-b border-primary/5 pb-2 last:border-0 last:pb-0">
                         <span className="text-muted text-sm">{stat.label}</span>
                         <span className="text-2xl font-bold text-primary">{stat.value}</span>
                     </div>
                 ))}
             </div>
         </div>
      </Card>

      {/* SUNY UB Card - Secondary Education */}
      <Card className="md:col-span-1 flex flex-col justify-start" delay={0.3}>
          <div className="relative z-10">
            <h4 className="text-sm text-accent font-semibold uppercase tracking-wider mb-2">Undergraduate</h4>
            <p className="font-bold text-primary text-lg leading-tight mb-1">{education.secondary.institution}</p>
            <p className="text-muted text-sm mb-3">{education.secondary.degree}</p>
            <div className="flex flex-wrap gap-x-2 gap-y-2 text-xs text-muted/80">
                <span className="bg-secondary/5 px-2 py-1 rounded border border-secondary/10 whitespace-nowrap">{education.secondary.period}</span>
            </div>
          </div>
      </Card>

      {/* Location/Interest Card */}
      <Card className="md:col-span-1 min-h-[160px] relative group" delay={0.4}>
          <div className="h-full flex flex-col justify-start relative z-10 max-w-md">
              <h3 className="text-xl font-bold text-primary mb-1">Based in New York</h3>
              <p className="text-muted text-balance text-sm">Available for global remote work & relocation.</p>
          </div>
          <div className="absolute right-4 bottom-4 opacity-5 group-hover:opacity-10 transition-opacity z-0 pointer-events-none">
             <MapPin size={80} />
          </div>
      </Card>
    </div>
  );
};

export default BentoGrid;
