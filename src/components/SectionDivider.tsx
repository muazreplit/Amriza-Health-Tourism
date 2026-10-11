import React from 'react';

export const SectionDivider: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-center gap-3 pointer-events-none select-none">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#1dbcb5]/35 to-[#1dbcb5]/10" />
      <div className="w-2 h-2 rounded-full bg-[#1dbcb5] shadow-[0_0_8px_rgba(29,188,181,0.6)] shrink-0" />
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#1dbcb5]/35 to-[#1dbcb5]/10" />
    </div>
  );
};
