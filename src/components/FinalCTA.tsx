import React from 'react';
import { motion } from 'framer-motion';
import { soundFX } from '../utils/sound';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface FinalCTAProps {
  onOpenConsultation: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenConsultation }) => {
  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto flex items-center justify-center font-body overflow-hidden">
      {/* Background Soft Glow matching reference */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1dbcb5]/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Gradient Card matching uploaded reference image */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full relative rounded-[28px] sm:rounded-[40px] py-10 sm:py-16 md:py-20 px-5 sm:px-12 md:px-16 text-center text-white overflow-hidden shadow-[0_20px_50px_-10px_rgba(13,155,148,0.35)]"
        style={{
          background: 'linear-gradient(135deg, #0da39b 0%, #07625d 45%, #0a736d 75%, #12aba4 100%)',
        }}
      >
        {/* Subtle Inner Ambient Glow for depth */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#1dbcb5]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Main Title: Space Grotesk */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4 font-heading leading-tight">
            Start Your Healthcare Journey
          </h2>

          {/* Subtitle with centered dot separators: DM Sans */}
          <p className="text-xs sm:text-base md:text-lg text-white/90 font-normal leading-relaxed max-w-2xl mx-auto mb-7 sm:mb-9 font-body">
            Second opinions · Specialist coordination · Hospital coordination · Treatment assistance · Travel & recovery support.
          </p>

          {/* Dual Action Buttons with Identical Matching Height */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 font-body">
            {/* Left Button: WhatsApp */}
            <a
              href="https://wa.me/919566471448?text=Hello%20Dr.%20Mussadiq%20Ahmed%20and%20Amriza%20Team%2C%20I%20would%20like%20to%20enquire%20about%20medical%20travel%20and%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFX.playGlassHover()}
              onClick={() => soundFX.playSubtleClick()}
              className="w-full sm:w-auto px-7 h-[50px] rounded-full bg-white text-slate-800 hover:bg-slate-50 font-bold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 shrink-0"
            >
              {/* WhatsApp Icon */}
              <svg className="w-5 h-5 text-[#25D366] fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.55 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.174 8.174 0 0 1-5.82 2.41c-1.5 0-2.97-.39-4.26-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29z"/>
              </svg>
              <span>WhatsApp: +91 95664 71448</span>
            </a>

            {/* Right Button: Contact us Liquid Glass Button with matching height */}
            <LiquidButton
              size="lg"
              onClick={() => {
                soundFX.playSubtleClick();
                onOpenConsultation();
              }}
              onMouseEnter={() => soundFX.playGlassHover()}
              className="w-full sm:w-auto px-7 h-[50px] rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm border border-white/60 hover:border-white cursor-pointer flex items-center justify-center shrink-0"
            >
              <span>Contact us</span>
            </LiquidButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
