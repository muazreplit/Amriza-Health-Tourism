import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Globe, Check } from 'lucide-react';
import { soundFX } from '../utils/sound';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onExploreJourney: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onExploreJourney,
}) => {
  return (
    <section className="relative min-h-[92vh] w-full flex items-center justify-center pt-28 pb-16 px-4 md:px-8 lg:px-12 overflow-hidden font-body">
      {/* Soft Ambient Mint/Cyan Glow in Background matching reference */}
      <div className="absolute top-1/3 -left-20 w-[600px] h-[600px] bg-[#1dbcb5]/22 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-[#1dbcb5]/12 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left Column: Hero Typography, CTAs and Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          {/* Top Brand Pills side by side */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#1dbcb5]/25 text-[#0f8b84] text-[11px] font-heading font-bold uppercase tracking-wider shadow-xs">
              GLOBAL CARE
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#1dbcb5]/25 text-[#0f8b84] text-[11px] font-heading font-bold uppercase tracking-wider shadow-xs">
              TRUSTED GUIDANCE
            </span>
          </div>

          {/* Main Headline - Capitalized per user instruction */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 font-heading">
            <span className="text-[#0d9488]">HEALING</span> <span className="text-slate-900">BEYOND</span> <br />
            <span className="text-slate-900">BORDERS</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal font-body mb-8">
            Led by medical expertise, Amriza bridges global boundaries to connect international patients with world-class, multi-specialty clinical care — a seamless journey from initial consultation to complete recovery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto font-body mb-10">
            {/* Primary Liquid Glass Button */}
            <LiquidButton
              size="lg"
              onClick={() => {
                soundFX.playSubtleClick();
                onOpenConsultation();
              }}
              onMouseEnter={() => soundFX.playGlassHover()}
              className="px-7 py-3.5 rounded-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold text-sm tracking-wide font-body shadow-[0_4px_20px_rgba(20,184,166,0.35)] hover:shadow-[0_6px_26px_rgba(20,184,166,0.5)] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-none"
            >
              <span className="flex items-center gap-2">
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </LiquidButton>

            {/* Secondary Button */}
            <button
              onClick={() => {
                soundFX.playSubtleClick();
                const el = document.getElementById('specialties');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onExploreJourney();
              }}
              onMouseEnter={() => soundFX.playGlassHover()}
              className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-slate-800 text-sm font-semibold tracking-wide font-body transition-all duration-200 flex items-center justify-center cursor-pointer shadow-xs"
            >
              <span>Explore Specialties</span>
            </button>
          </div>

          {/* Bottom Two Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl font-body">
            {/* Card 1: Doctor-Led Care */}
            <div className="px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/95 shadow-[0_4px_22px_rgba(15,23,42,0.04)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1dbcb5]/15 flex items-center justify-center text-[#0d9488] shrink-0">
                <Heart className="w-5 h-5 text-[#0d9488]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 font-heading">
                  Doctor-Led Care
                </div>
                <div className="text-[11px] text-slate-500 font-body">
                  Reviewed by Dr. Mussadiq Ahmed, MD
                </div>
              </div>
            </div>

            {/* Card 2: Chennai, India */}
            <div className="px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/95 shadow-[0_4px_22px_rgba(15,23,42,0.04)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1dbcb5]/15 flex items-center justify-center text-[#0d9488] shrink-0">
                <Globe className="w-5 h-5 text-[#0d9488]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 font-heading">
                  Chennai, India
                </div>
                <div className="text-[11px] text-slate-500 font-body">
                  World-class hospital network
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Doctor Portrait Showcase matching reference */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="lg:col-span-6 w-full relative flex items-center justify-center"
        >
          {/* Subtle Backing Glow */}
          <div className="absolute -inset-4 bg-[#1dbcb5]/25 rounded-[48px] blur-3xl opacity-70 pointer-events-none" />

          {/* Main Portrait Frame with Squircle Radius matching reference */}
          <div className="w-full max-w-[520px] relative rounded-[40px] sm:rounded-[48px] overflow-hidden bg-white/70 p-2 sm:p-2.5 border border-white/95 shadow-[0_20px_50px_rgba(13,148,136,0.14)]">
            <div className="relative rounded-[34px] sm:rounded-[42px] overflow-hidden aspect-[4/5] bg-slate-100 flex items-center justify-center">
              {/* Doctor Image */}
              <img
                src="/dr-mussadiq.jpg"
                alt="Dr. Mussadiq Ahmed, MD"
                className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-500"
                loading="eager"
              />

              {/* Top-Left Floating Badge: CEO & MEDICAL DIRECTOR */}
              <div className="absolute top-4 left-4 rounded-2xl p-3 sm:p-3.5 bg-white/90 backdrop-blur-md border border-white shadow-sm pointer-events-none">
                <div className="text-[9px] sm:text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500">
                  CEO & MEDICAL DIRECTOR
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 font-heading mt-0.5">
                  Dr. Mussadiq Ahmed, MD
                </div>
              </div>

              {/* Bottom-Right Floating Badge: End-to-end care */}
              <div className="absolute bottom-4 right-4 rounded-2xl p-2.5 sm:p-3 bg-white/90 backdrop-blur-md border border-white shadow-sm flex items-center gap-2.5 pointer-events-none">
                <div className="w-6 h-6 rounded-lg bg-teal-100 flex items-center justify-center text-[#0d9488] shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 font-heading leading-tight">
                    End-to-end care
                  </div>
                  <div className="text-[10px] text-slate-500 font-body">
                    Consultation to recovery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
