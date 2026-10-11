import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Compass, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface ChennaiConnectionProps {
  onOpenConsultation: () => void;
}

export const ChennaiConnection: React.FC<ChennaiConnectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="chennai-gateway" className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden font-body">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#1dbcb5]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-[#0d7e79] text-xs font-heading tracking-widest uppercase mb-3.5 shadow-sm">
          <Globe className="w-3.5 h-3.5 text-[#0d7e79]" />
          <span>Clinical Gateway</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3 font-heading">
          CHENNAI <span className="text-gradient-cyan">HEALTHCARE ACCESS</span>
        </h2>
        <p className="max-w-xl text-slate-600 text-sm sm:text-base font-normal leading-relaxed font-body">
          Direct connection for international patients to Chennai’s multi-specialty clinical infrastructure.
        </p>
      </div>

      {/* Central Pipeline Concept Badge */}
      <div className="max-w-3xl mx-auto mb-10 relative z-10">
        <div className="p-4 sm:p-5 rounded-2xl glass-card flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm font-body">
          {/* Step 1 */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0d7e79] shadow-xs">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-heading text-[#0d7e79] uppercase font-bold">ORIGIN</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 font-heading">Global Patient</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center text-[#0d7e79]">
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#1dbcb5] to-[#158a85]" />
            <ArrowRight className="w-3.5 h-3.5 -ml-1 text-[#0d7e79]" />
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1dbcb5] text-slate-950 flex items-center justify-center font-bold shadow-sm">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-heading text-[#0d7e79] uppercase font-bold">AMRIZA HUB</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 font-heading">Chennai (MAA)</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center text-[#0d7e79]">
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#158a85] to-[#1dbcb5]" />
            <ArrowRight className="w-3.5 h-3.5 -ml-1 text-[#0d7e79]" />
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0d7e79] shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-heading text-[#0d7e79] uppercase font-bold">DESTINATION</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900 font-heading">Specialist Care</div>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Console Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-[#1dbcb5]/25 shadow-md overflow-hidden font-body z-10 max-w-4xl mx-auto"
      >
        {/* Radar Telemetry Screen */}
        <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(29, 188, 181, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(29, 188, 181, 0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="absolute w-36 h-36 rounded-full border border-[#1dbcb5]/30 animate-ping opacity-30" />
          <div className="absolute w-60 h-60 rounded-full border border-[#1dbcb5]/25" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-[#1dbcb5]/15" />

          {/* Chennai Marker */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <span className="w-4 h-4 rounded-full bg-[#1dbcb5] block shadow-[0_0_15px_#1dbcb5]" />
              <span className="absolute -inset-1.5 rounded-full border-2 border-[#1dbcb5] animate-ping opacity-75" />
            </div>
            <div className="mt-2.5 px-3 py-0.5 rounded-full bg-slate-900/90 border border-[#1dbcb5]/50 text-[#1dbcb5] font-heading text-xs font-bold tracking-wider">
              CHENNAI CLINICAL HUB
            </div>
            <div className="text-[10px] font-heading text-slate-400 mt-0.5">
              13.0827° N, 80.2707° E
            </div>
          </div>
        </div>

        {/* 3 Clean Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-6 font-body">
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#1dbcb5]/12 flex items-center justify-center text-[#0d7e79] mb-2.5">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1 font-heading">Hospital Coordination</h4>
            <p className="text-xs text-slate-600 font-normal leading-relaxed font-body">
              Accredited multi-specialty hospitals and specialist coordination across Chennai.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#1dbcb5]/12 flex items-center justify-center text-[#0d7e79] mb-2.5">
              <MapPin className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1 font-heading">Airport & Stay Logistics</h4>
            <p className="text-xs text-slate-600 font-normal leading-relaxed font-body">
              Airport pickup from MAA and partner hotel / serviced accommodation check-in.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-[#1dbcb5]/12 flex items-center justify-center text-[#0d7e79] mb-2.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1 font-heading">Recovery & Departure</h4>
            <p className="text-xs text-slate-600 font-normal leading-relaxed font-body">
              Rehabilitation support, low-exertion sightseeing, and final departure clearance.
            </p>
          </div>
        </div>

        <div className="mt-7 flex justify-center font-body">
          <button
            onClick={() => {
              soundFX.playSubtleClick();
              onOpenConsultation();
            }}
            onMouseEnter={() => soundFX.playGlassHover()}
            className="px-6 py-2.5 rounded-full bg-white border border-[#1dbcb5]/45 hover:border-[#1dbcb5] text-[#0d7e79] hover:bg-slate-50 text-xs font-body font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#1dbcb5]" />
            <span>Connect with Chennai Clinical Desk</span>
            <ArrowRight className="w-3 h-3 text-[#0d7e79]" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};
