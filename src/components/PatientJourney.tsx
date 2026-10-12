import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  FileCheck2,
  Receipt,
  FileText,
  PlaneTakeoff,
  Building,
  Stethoscope,
  Microscope,
  Languages,
  Activity,
  HeartHandshake,
  TrendingUp,
  Smile,
  Compass,
  CheckCircle,
  Car,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ThreeJourneyOrb } from './ThreeJourneyOrb';
import { soundFX } from '../utils/sound';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface Stage {
  number: string;
  stageCode: string;
  title: string;
  progress: string;
  percent: number;
  subtitle: string;
  items: {
    icon: React.ReactNode;
    title: string;
    detail: string;
  }[];
}

interface PatientJourneyProps {
  onOpenConsultation: () => void;
}

export const PatientJourney: React.FC<PatientJourneyProps> = ({ onOpenConsultation }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages: Stage[] = [
    {
      number: '01',
      stageCode: 'STAGE 01',
      title: 'PRE-DEPARTURE',
      progress: '25%',
      percent: 25,
      subtitle: 'Virtual Assessment & Visa Clearance',
      items: [
        {
          icon: <Video className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Digital Consultation',
          detail: 'Telehealth review via Zoom with clinicians.',
        },
        {
          icon: <FileCheck2 className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Medical File Review',
          detail: 'Complete file review by Dr. Mussadiq Ahmed, MD.',
        },
        {
          icon: <Receipt className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Treatment Estimation',
          detail: 'Personalized treatment cost and time estimate.',
        },
        {
          icon: <FileText className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Visa Invitation Letter',
          detail: 'Formal medical visa processing documentation.',
        },
      ],
    },
    {
      number: '02',
      stageCode: 'STAGE 02',
      title: 'ARRIVAL & TRIAGE',
      progress: '50%',
      percent: 50,
      subtitle: 'Chennai Arrival & Clinical Baseline',
      items: [
        {
          icon: <PlaneTakeoff className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Airport Reception',
          detail: 'Pickup from Chennai International Airport (MAA).',
        },
        {
          icon: <Building className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Stay Support',
          detail: 'Check-in support at partner hotel or serviced accommodation.',
        },
        {
          icon: <Stethoscope className="w-4 h-4 text-[#0d7e79]" />,
          title: 'In-Person Triage',
          detail: 'Clinical evaluation before tertiary admission.',
        },
        {
          icon: <Microscope className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Diagnostic Screening',
          detail: 'Baseline laboratory and diagnostic screening.',
        },
      ],
    },
    {
      number: '03',
      stageCode: 'STAGE 03',
      title: 'TREATMENT & CONCIERGE',
      progress: '75%',
      percent: 75,
      subtitle: 'Specialist Intervention & Dedicated Escort',
      items: [
        {
          icon: <Languages className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Personal Care Escort',
          detail: 'Multilingual communication and care escort.',
        },
        {
          icon: <Activity className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Specialist Procedure',
          detail: 'Planned procedure with accredited specialists.',
        },
        {
          icon: <HeartHandshake className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Hospital Coordination',
          detail: 'Seamless coordination and post-op care.',
        },
        {
          icon: <TrendingUp className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Recovery Tracking',
          detail: 'Daily progress monitoring by clinical coordinators.',
        },
      ],
    },
    {
      number: '04',
      stageCode: 'STAGE 04',
      title: 'RECOVERY & FLY-BACK',
      progress: '100%',
      percent: 100,
      subtitle: 'Rehabilitation & Return Journey',
      items: [
        {
          icon: <Smile className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Rehabilitation',
          detail: 'Physiotherapy and wellness support.',
        },
        {
          icon: <Compass className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Local Sightseeing',
          detail: 'Low-exertion options when medically suitable.',
        },
        {
          icon: <CheckCircle className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Medical Clearance',
          detail: 'Final discharge clearance and documentation.',
        },
        {
          icon: <Car className="w-4 h-4 text-[#0d7e79]" />,
          title: 'Airport Drop-Off',
          detail: 'Coordinated departure back home.',
        },
      ],
    },
  ];

  const current = stages[activeStage];

  return (
    <section id="patient-journey" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden font-body">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1dbcb5]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#1dbcb5]/30 text-[#0d9488] text-xs font-heading tracking-widest uppercase mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#0d9488]" />
          <span>Care Roadmap</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 font-heading">
          PATIENT <span className="text-[#0d9488]">PATHWAY</span>
        </h2>
        <p className="max-w-xl text-slate-600 text-sm sm:text-base font-normal leading-relaxed font-body">
          A physician-guided 4-stage roadmap ensuring complete transparency from your first remote consultation to your journey home.
        </p>
      </div>

      {/* Connected Pathway Stepper */}
      <div className="mb-8 sm:mb-10 font-body relative z-10 max-w-5xl mx-auto">
        {/* Horizontal Progress Track for Desktop */}
        <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-slate-200/80 -z-0">
          <div
            className="h-full bg-gradient-to-r from-[#14b8a6] to-[#0d9488] transition-all duration-500 ease-out"
            style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 relative z-10">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            const isCompleted = activeStage > idx;
            return (
              <button
                key={stage.number}
                onClick={() => {
                  soundFX.playSubtleClick();
                  setActiveStage(idx);
                }}
                onMouseEnter={() => soundFX.playGlassHover()}
                className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-300 border cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'bg-white border-[#14b8a6] shadow-[0_8px_30px_rgba(20,184,166,0.18)] scale-[1.02]'
                    : isCompleted
                    ? 'bg-white/80 border-slate-200 hover:border-[#14b8a6]/50 shadow-xs'
                    : 'bg-white/60 backdrop-blur-md border-white/80 hover:bg-white/90 hover:border-slate-200 shadow-2xs'
                }`}
              >
                {/* Active Top Glow Line */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#14b8a6] to-[#0d9488]" />
                )}

                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold font-heading transition-colors ${
                        isActive
                          ? 'bg-[#14b8a6] text-white shadow-xs'
                          : isCompleted
                          ? 'bg-[#0d9488]/15 text-[#0d9488]'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className={`text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider ${isActive ? 'text-[#0d9488]' : 'text-slate-500'}`}>
                      {stage.stageCode}
                    </span>
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-heading px-1.5 sm:px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-[#14b8a6]/15 text-[#0d9488]' : 'text-slate-400 bg-slate-100/80'}`}>
                    {stage.progress}
                  </span>
                </div>

                <div className={`text-[10px] sm:text-xs md:text-sm font-bold font-heading transition-colors leading-tight line-clamp-2 min-h-[1.75rem] sm:min-h-0 ${isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                  {stage.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Display: 3D Interactive Orb + Stage Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10 max-w-5xl mx-auto">
        {/* Left: 3D Orb in Elegant Glass Frame */}
        <div className="lg:col-span-5 bg-white/70 backdrop-blur-xl border border-white/90 rounded-[32px] p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
          <div className="w-full flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-heading font-bold tracking-wider text-[#0d9488] uppercase">
              INTERACTIVE 3D ORB
            </span>
            <span className="text-[10px] text-slate-400 font-body">Drag to Rotate</span>
          </div>
          <ThreeJourneyOrb activeStage={activeStage} onSelectStage={(id) => setActiveStage(id)} />
          <div className="w-full mt-2 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Stage {current.number} of 04</span>
            <span className="font-semibold text-slate-800">{current.subtitle}</span>
          </div>
        </div>

        {/* Right: Stage Detail Panel with Stylized Numbers */}
        <div className="lg:col-span-7 flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full bg-white/80 backdrop-blur-xl border border-white/90 rounded-[32px] p-5 sm:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.05)] flex flex-col justify-between font-body relative overflow-hidden"
            >
              {/* Top Section */}
              <div>
                <div className="flex items-start justify-between pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-slate-200/60">
                  <div className="pr-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#14b8a6]/12 border border-[#14b8a6]/25 text-[#0d9488] text-[10px] font-heading font-bold uppercase tracking-wider mb-2">
                      <span>{current.stageCode}</span>
                      <span>·</span>
                      <span>{current.progress} Completed</span>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
                      {current.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 font-body">{current.subtitle}</p>
                  </div>

                  {/* Stylized Big Stage Number */}
                  <span className="font-heading text-4xl sm:text-6xl font-extrabold text-[#14b8a6]/25 select-none leading-none -mt-1 -mr-1 shrink-0 ml-2">
                    {current.number}
                  </span>
                </div>

                {/* 4 Clean Actionable Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {current.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/70 hover:border-[#14b8a6]/40 transition-all flex items-start gap-3 shadow-2xs group"
                    >
                      <div className="p-2.5 rounded-xl bg-[#14b8a6]/10 group-hover:bg-[#14b8a6]/20 transition-colors shrink-0 mt-0.5 text-[#0d9488]">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 mb-0.5 font-heading group-hover:text-[#0d9488] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 leading-snug font-body">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200/60">
                <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
                  Physician triage and support coordinated by Amriza
                </div>
                <LiquidButton
                  size="lg"
                  onClick={() => {
                    soundFX.playSubtleClick();
                    onOpenConsultation();
                  }}
                  onMouseEnter={() => soundFX.playGlassHover()}
                  className="w-full sm:w-auto h-[50px] px-7 rounded-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold font-body text-sm tracking-wide shadow-[0_4px_16px_rgba(20,184,166,0.35)] hover:shadow-[0_6px_22px_rgba(20,184,166,0.5)] cursor-pointer border-none flex items-center justify-center"
                >
                  <span className="flex items-center gap-2">
                    <span>Start Stage {current.number}</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </LiquidButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
