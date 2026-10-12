import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartPulse,
  Brain,
  Activity,
  Baby,
  Dna,
  Bone,
  Droplets,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { soundFX } from '../utils/sound';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface Specialty {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface SpecialtiesSectionProps {
  onSelectSpecialty: (specialtyName: string) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ onSelectSpecialty }) => {
  const [activeSpecialtyId, setActiveSpecialtyId] = useState<string>('cardiology');

  const specialties: Specialty[] = [
    {
      id: 'oncology',
      name: 'Oncology',
      icon: <Activity className="w-6 h-6 text-[#0d7e79]" />,
    },
    {
      id: 'cardiology',
      name: 'Cardiology',
      icon: <HeartPulse className="w-6 h-6 text-[#0d7e79]" />,
    },
    {
      id: 'orthopedics',
      name: 'Orthopedics',
      icon: <Bone className="w-6 h-6 text-[#0d7e79]" />,
    },
    {
      id: 'ivf',
      name: 'IVF & Fertility Care',
      icon: <Dna className="w-6 h-6 text-[#0d7e79]" />,
    },
    {
      id: 'neurology',
      name: 'Neurology & Neurosciences',
      icon: <Brain className="w-6 h-6 text-[#0d7e79]" />,
    },
    {
      id: 'nephrology',
      name: 'Nephrology',
      icon: <Droplets className="w-6 h-6 text-[#0d7e79]" />,
    },
    {
      id: 'pediatrics',
      name: 'Pediatrics',
      icon: <Baby className="w-6 h-6 text-[#0d7e79]" />,
    },
    {
      id: 'other',
      name: 'Other Medical Specialties',
      icon: <Stethoscope className="w-6 h-6 text-[#0d7e79]" />,
    },
  ];

  const currentSpecialty = specialties.find((s) => s.id === activeSpecialtyId) || specialties[0];

  return (
    <section id="specialties" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto font-body overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#1dbcb5]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[#0d7e79] text-xs font-heading tracking-widest uppercase mb-3.5 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0d7e79]" />
          <span>Clinical Network</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 font-heading">
          CLINICAL <span className="text-gradient-cyan">SPECIALTIES</span>
        </h2>
        <p className="max-w-xl text-slate-600 text-sm sm:text-base font-normal leading-relaxed font-body">
          Doctor-guided coordination across specialized fields of medicine in Chennai.
        </p>
      </div>

      {/* Grid of 8 Specialties */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8 relative z-10">
        {specialties.map((item) => {
          const isSelected = item.id === activeSpecialtyId;
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -3 }}
              onClick={() => {
                soundFX.playSubtleClick();
                setActiveSpecialtyId(item.id);
              }}
              onMouseEnter={() => soundFX.playGlassHover()}
              className={`p-3.5 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-2 border-[#1dbcb5] shadow-[0_8px_25px_rgba(29,188,181,0.22)]'
                  : 'glass-card hover:border-[#1dbcb5]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#1dbcb5]/20 text-[#0d7e79]'
                      : 'bg-[#1dbcb5]/10 text-slate-700'
                  }`}
                >
                  {item.icon}
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[#1dbcb5] shadow-[0_0_8px_#1dbcb5]" />
                )}
              </div>

              <h3 className="text-xs sm:text-base font-bold text-slate-900 tracking-tight font-heading leading-tight">
                {item.name}
              </h3>
            </motion.div>
          );
        })}
      </div>

      {/* Active Specialty Clean Glass Action Strip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSpecialty.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-3xl p-4 sm:p-7 glass-panel border border-[#1dbcb5]/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 font-body relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#1dbcb5]/15 border border-[#1dbcb5]/35 flex items-center justify-center shrink-0">
              {currentSpecialty.icon}
            </div>
            <div>
              <div className="text-[10px] font-heading uppercase tracking-wider text-[#0d7e79] font-bold">
                Selected Specialty
              </div>
              <h4 className="text-lg sm:text-2xl font-bold text-slate-900 font-heading">
                {currentSpecialty.name}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm font-body">
                Clinical review and tertiary hospital coordination led by Dr. Mussadiq Ahmed, MD.
              </p>
            </div>
          </div>

          <LiquidButton
            size="lg"
            onClick={() => {
              soundFX.playSubtleClick();
              onSelectSpecialty(currentSpecialty.name);
            }}
            onMouseEnter={() => soundFX.playGlassHover()}
            className="w-full sm:w-auto h-[50px] px-7 rounded-full bg-gradient-to-r from-[#1dbcb5] to-[#158a85] text-slate-950 font-bold font-body text-sm tracking-wide shadow-[0_4px_18px_rgba(29,188,181,0.35)] hover:shadow-[0_6px_25px_rgba(29,188,181,0.55)] cursor-pointer border-none shrink-0 flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              <span>Consult for {currentSpecialty.name}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </LiquidButton>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
