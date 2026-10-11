import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Building2, Workflow, HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface WhyAmrizaCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const TiltCard: React.FC<WhyAmrizaCardProps> = ({ number, title, description, icon, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => {
        setIsHovered(true);
        soundFX.playGlassHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-3xl p-7 glass-card group cursor-pointer flex flex-col justify-between overflow-hidden font-body"
      data-cursor="card"
    >
      {/* Top Glass Glow Reflection */}
      <div
        className={`absolute -top-20 -left-20 w-40 h-40 bg-[#1dbcb5]/20 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div>
        {/* Header: Icon & Big Stylized Number */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#1dbcb5]/12 border border-[#1dbcb5]/30 flex items-center justify-center text-[#0d7e79] group-hover:scale-105 transition-transform duration-200 mt-1">
            {icon}
          </div>
          <span className="font-heading text-5xl sm:text-6xl font-extrabold tracking-tight text-[#1dbcb5]/30 group-hover:text-[#1dbcb5]/50 transition-colors select-none leading-none -mr-1 -mt-1">
            {number}
          </span>
        </div>

        {/* Title: Space Grotesk */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 tracking-tight group-hover:text-[#0d7e79] transition-colors font-heading">
          {title}
        </h3>

        {/* Concise Description: DM Sans */}
        <p className="text-slate-600 text-sm leading-relaxed font-normal font-body">
          {description}
        </p>
      </div>

      {/* Bottom Accent */}
      <div className="mt-6 pt-3.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-heading text-[#0d7e79]">
        <span className="tracking-wider uppercase font-semibold">AMRIZA PILLAR</span>
        <Sparkles className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity text-[#1dbcb5]" />
      </div>
    </motion.div>
  );
};

export const WhyAmriza: React.FC = () => {
  const cards = [
    {
      number: '01',
      title: 'Doctor-Led Advantage',
      description: 'Clinical guidance and medical-file review led by Dr. Mussadiq Ahmed, MD.',
      icon: <Stethoscope className="w-6 h-6" />,
      delay: 0.05,
    },
    {
      number: '02',
      title: 'Chennai Healthcare Access',
      description: 'Coordination with accredited tertiary hospitals and leading specialists.',
      icon: <Building2 className="w-6 h-6" />,
      delay: 0.1,
    },
    {
      number: '03',
      title: 'End-to-End Care',
      description: 'Complete support from virtual consultation to treatment and recovery.',
      icon: <Workflow className="w-6 h-6" />,
      delay: 0.15,
    },
    {
      number: '04',
      title: 'Patient-Centred Support',
      description: 'Dedicated logistics, language assistance, and personal concierge.',
      icon: <HeartHandshake className="w-6 h-6" />,
      delay: 0.2,
    },
  ];

  return (
    <section id="why-amriza" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto font-body">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#1dbcb5]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[#0d7e79] text-xs font-heading tracking-widest uppercase mb-3.5 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0d7e79]" />
          <span>Core Advantages</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 font-heading">
          WHY <span className="text-gradient-cyan">AMRIZA?</span>
        </h2>

        <p className="max-w-xl text-slate-600 text-sm sm:text-base font-normal leading-relaxed font-body">
          Doctor-led coordination, tertiary hospital access, and dedicated patient advocacy in Chennai.
        </p>
      </div>

      {/* 4 Glass Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10 font-body">
        {cards.map((card) => (
          <TiltCard key={card.number} {...card} />
        ))}
      </div>
    </section>
  );
};
