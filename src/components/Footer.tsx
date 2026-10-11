import React from 'react';
import { PhoneCall, Globe, Mail, Stethoscope, ArrowUp, ArrowUpRight } from 'lucide-react';
import { soundFX } from '../utils/sound';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFX.playSubtleClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-8 sm:py-12 px-4 md:px-8 font-body overflow-hidden">
      {/* Centered Floating White/Frosted Glass Squircle Card */}
      <div className="max-w-6xl mx-auto rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.06)] p-6 sm:p-10 md:p-12 relative overflow-hidden">
        {/* Soft Background Accent Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1dbcb5]/8 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Grid: Brand Info, Full Navigation Directory, Direct Coordination */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start pb-8 border-b border-slate-200/70">
          {/* Column 1: Brand Logo, Tagline & CEO Attribution Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a
              href="#"
              onClick={() => soundFX.playSubtleClick()}
              className="flex items-center gap-3 mb-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center p-1 shadow-2xs group-hover:scale-105 transition-transform">
                <img
                  src="/amriza-logo.png"
                  alt="Amriza Health Tourism Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-slate-900 font-heading">
                  AMRIZA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-500 font-heading font-semibold -mt-0.5">
                  HEALTH TOURISM
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-md font-body mb-4">
              Global Care · Trusted Guidance · Healing Beyond Borders — doctor-led health tourism connecting you to world-class care in Chennai, India.
            </p>

            {/* CEO Attribution Badge with Glass Effect */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/95 shadow-[0_8px_25px_rgba(15,23,42,0.04),inset_0_1.5px_2px_rgba(255,255,255,1)] flex items-center gap-3 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
              <div className="w-9 h-9 rounded-xl bg-[#14b8a6]/12 border border-[#14b8a6]/25 flex items-center justify-center text-[#0d9488] shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                <Stethoscope className="w-4 h-4 text-[#0d9488]" />
              </div>
              <div className="text-xs">
                <span className="text-[#0d9488] font-heading font-bold text-[10px] block uppercase tracking-wider">
                  Clinical Leadership
                </span>
                <span className="text-slate-900 font-bold font-heading">
                  DR. MUSSADIQ AHMED, MD
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Full Navigation Directory (3 cols) */}
          <div className="lg:col-span-3 font-body">
            <h4 className="text-[11px] font-heading uppercase tracking-widest text-[#0d9488] font-bold mb-3.5">
              NAVIGATION
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-600 font-medium font-body">
              <li>
                <a href="#" onClick={() => soundFX.playSubtleClick()} className="hover:text-[#0d9488] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#why-amriza" onClick={() => soundFX.playSubtleClick()} className="hover:text-[#0d9488] transition-colors">
                  Why Amriza
                </a>
              </li>
              <li>
                <a href="#specialties" onClick={() => soundFX.playSubtleClick()} className="hover:text-[#0d9488] transition-colors">
                  Specialties
                </a>
              </li>
              <li>
                <a href="#patient-journey" onClick={() => soundFX.playSubtleClick()} className="hover:text-[#0d9488] transition-colors">
                  Patient Journey
                </a>
              </li>
              <li>
                <a href="#trust-credibility" onClick={() => soundFX.playSubtleClick()} className="hover:text-[#0d9488] transition-colors">
                  Clinical Leadership
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => soundFX.playSubtleClick()} className="hover:text-[#0d9488] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Coordination Directory (4 cols) with Liquid Glass Cards */}
          <div className="lg:col-span-4 flex flex-col gap-3 font-body">
            <h4 className="text-[11px] font-heading uppercase tracking-widest text-[#0d9488] font-bold mb-0.5">
              DIRECT COORDINATION
            </h4>

            {/* WhatsApp Glass Card */}
            <a
              href="https://wa.me/919566471448?text=Hello%20Dr.%20Mussadiq%20Ahmed%20and%20Amriza%20Team%2C%20I%20would%20like%20to%20enquire%20about%20medical%20travel%20and%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFX.playGlassHover()}
              onClick={() => soundFX.playSubtleClick()}
              className="relative overflow-hidden flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/85 hover:border-emerald-500/40 text-slate-800 transition-all duration-300 shadow-[0_4px_20px_rgba(15,23,42,0.03),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_rgba(16,185,129,0.16),inset_0_2px_2px_rgba(255,255,255,1)] hover:-translate-y-0.5 group cursor-pointer"
            >
              {/* Glass Top Edge Reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
              {/* Soft Ambient Inner Glow */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-300" />

              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/25 group-hover:border-emerald-500/45 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative z-10">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="flex flex-col relative z-10 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-slate-500 group-hover:text-emerald-700 transition-colors font-heading font-medium tracking-wide">
                  WhatsApp Direct
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm font-heading tracking-tight">
                  +91 95664 71448
                </span>
              </div>
              <div className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 relative z-10">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* International Portal Glass Card */}
            <a
              href="https://hsamrizahealthglobal.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFX.playGlassHover()}
              onClick={() => soundFX.playSubtleClick()}
              className="relative overflow-hidden flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/85 hover:border-[#14b8a6]/40 text-slate-800 transition-all duration-300 shadow-[0_4px_20px_rgba(15,23,42,0.03),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_rgba(20,184,166,0.16),inset_0_2px_2px_rgba(255,255,255,1)] hover:-translate-y-0.5 group cursor-pointer"
            >
              {/* Glass Top Edge Reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
              {/* Soft Ambient Inner Glow */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#14b8a6]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#14b8a6]/20 transition-all duration-300" />

              <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#0d7e79] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#14b8a6]/25 group-hover:border-[#14b8a6]/45 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative z-10">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex flex-col relative z-10 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-slate-500 group-hover:text-[#0d7e79] transition-colors font-heading font-medium tracking-wide">
                  International Portal
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm font-heading tracking-tight truncate">
                  hsamrizahealthglobal.com
                </span>
              </div>
              <div className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-slate-300 group-hover:text-[#0d7e79] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 relative z-10">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Coordination Portal Glass Card */}
            <a
              href="https://hsamrizahealth.com"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFX.playGlassHover()}
              onClick={() => soundFX.playSubtleClick()}
              className="relative overflow-hidden flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/85 hover:border-[#14b8a6]/40 text-slate-800 transition-all duration-300 shadow-[0_4px_20px_rgba(15,23,42,0.03),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_rgba(20,184,166,0.16),inset_0_2px_2px_rgba(255,255,255,1)] hover:-translate-y-0.5 group cursor-pointer"
            >
              {/* Glass Top Edge Reflection */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
              {/* Soft Ambient Inner Glow */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#14b8a6]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#14b8a6]/20 transition-all duration-300" />

              <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/15 border border-[#14b8a6]/30 text-[#0d7e79] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#14b8a6]/25 group-hover:border-[#14b8a6]/45 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] relative z-10">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col relative z-10 min-w-0">
                <span className="text-[10px] sm:text-[11px] text-slate-500 group-hover:text-[#0d7e79] transition-colors font-heading font-medium tracking-wide">
                  Coordination Portal
                </span>
                <span className="font-bold text-slate-900 text-xs sm:text-sm font-heading tracking-tight truncate">
                  hsamrizahealth.com
                </span>
              </div>
              <div className="ml-auto w-6 h-6 rounded-full flex items-center justify-center text-slate-300 group-hover:text-[#0d7e79] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 relative z-10">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Area: Legal Disclaimer & Copyright & Top Button */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-slate-500 leading-relaxed font-body">
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <p className="text-slate-500 font-normal">
              Please note: Treatment plans, estimates, hospital availability, travel arrangements and medical clearance are subject to clinical assessment and applicable provider / regulatory requirements.
            </p>
            <div className="text-slate-400 font-normal">
              © {new Date().getFullYear()} Amriza Health Tourism. All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <LiquidButton
              size="sm"
              onClick={scrollToTop}
              className="px-4 py-2 rounded-full bg-white/90 border border-slate-200/90 hover:border-[#14b8a6] text-[#0d9488] hover:text-[#0b736a] flex items-center gap-1.5 font-heading text-xs font-bold shadow-2xs cursor-pointer"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </LiquidButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

