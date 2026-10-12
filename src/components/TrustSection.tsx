import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/sound';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface TrustSectionProps {
  onOpenConsultation: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="trust-credibility" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto font-body overflow-hidden">
      {/* Background Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-[#1dbcb5]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Doctor-Led Title Kept Above the Box */}
      <div className="flex flex-col items-center text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[#0d7e79] text-xs font-heading tracking-widest uppercase mb-3.5 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0d7e79]" />
          <span>Clinical Governance</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 font-heading">
          DOCTOR-LED <span className="text-gradient-cyan">HEALTHCARE COORDINATION</span>
        </h2>
        <p className="max-w-xl text-slate-600 text-sm sm:text-base font-normal leading-relaxed font-body">
          International patient protocols anchored in medical judgment and direct physician oversight.
        </p>
      </div>

      {/* Main Leadership Profile Box with Exact Width Matching Contact Box */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full relative rounded-[28px] sm:rounded-[40px] p-5 sm:p-10 md:p-12 bg-white/85 backdrop-blur-xl border border-white/95 shadow-[0_20px_50px_rgba(13,155,148,0.08)] overflow-hidden font-body z-10"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 md:gap-12 relative z-10">
          {/* Circular Doctor Portrait */}
          <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden shrink-0 shadow-md border-4 border-white bg-slate-100 flex items-center justify-center">
            <img
              src="/dr-mussadiq-v2.jpg"
              alt="Dr. Mussadiq Ahmed, MD - CEO of Amriza Health Tourism"
              className="w-full h-full object-cover object-[center_15%]"
            />
          </div>

          {/* Profile Details matching exact typography and copy */}
          <div className="flex flex-col text-center md:text-left flex-1 items-center md:items-start">
            {/* Small Uppercase Tag */}
            <div className="text-[10px] sm:text-xs font-heading uppercase tracking-widest text-[#0d7e79] font-bold mb-1">
              LEADERSHIP
            </div>

            {/* Doctor Name */}
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight font-heading mb-1">
              Dr. Mussadiq Ahmed, MD
            </h3>

            {/* Title / Role */}
            <div className="text-xs sm:text-sm font-heading font-semibold text-slate-500 uppercase tracking-wider mb-5">
              CEO — AMRIZA HEALTH TOURISM
            </div>

            {/* Exact Quote Body Copy */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal font-body mb-7 max-w-2xl">
              Every Amriza journey begins with a physician's eyes on your case. Dr. Mussadiq personally reviews your complete medical file, guides treatment planning with partner specialists, and oversees your care until final medical clearance — so decisions about your health are always made with clinical expertise at the centre.
            </p>

            {/* CTA Liquid Glass Button */}
            <LiquidButton
              size="lg"
              onClick={() => {
                soundFX.playSubtleClick();
                onOpenConsultation();
              }}
              onMouseEnter={() => soundFX.playGlassHover()}
              className="h-[50px] px-7 rounded-full bg-[#13a8a2] hover:bg-[#0f948f] text-white font-semibold text-sm tracking-wide font-body shadow-[0_4px_18px_rgba(19,168,162,0.3)] hover:shadow-[0_6px_24px_rgba(19,168,162,0.45)] cursor-pointer border-none flex items-center justify-center"
            >
              <span className="flex items-center gap-2">
                <span>Request a consultation</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </LiquidButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
