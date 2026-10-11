import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <section className="relative py-6 px-4 md:px-8 max-w-4xl mx-auto font-body">
      <div className="rounded-2xl p-4 sm:p-5 glass-panel border border-[#1dbcb5]/25 shadow-xs flex items-start gap-3.5">
        <div className="w-7 h-7 rounded-lg bg-[#1dbcb5]/12 flex items-center justify-center text-[#0d7e79] shrink-0 mt-0.5">
          <ShieldAlert className="w-3.5 h-3.5 text-[#0d7e79]" />
        </div>
        <div>
          <div className="text-[10px] font-heading uppercase tracking-wider text-[#0d7e79] font-bold mb-0.5">
            REGULATORY & CLINICAL ADVISORY
          </div>
          <p className="text-xs text-slate-600 font-normal leading-relaxed font-body">
            Treatment plans, estimates, hospital availability, travel arrangements, and medical clearance are subject to individual clinical assessment and applicable healthcare provider / regulatory requirements.
          </p>
        </div>
      </div>
    </section>
  );
};
