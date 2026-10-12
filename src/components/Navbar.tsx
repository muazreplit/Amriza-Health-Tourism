import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Sparkles } from 'lucide-react';
import { soundFX } from '../utils/sound';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['why-amriza', 'specialties', 'patient-journey', 'trust-credibility', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Why Amriza', href: '#why-amriza', id: 'why-amriza' },
    { name: 'Specialties', href: '#specialties', id: 'specialties' },
    { name: 'Journey', href: '#patient-journey', id: 'patient-journey' },
    { name: 'Clinical Leadership', href: '#trust-credibility', id: 'trust-credibility' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8 py-3 md:py-4 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-[#1dbcb5]/25 py-3 shadow-[0_4px_25px_rgba(15,23,42,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand: Space Grotesk Wordmark */}
          <a
            href="#"
            onClick={() => soundFX.playSubtleClick()}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center p-1 backdrop-blur-md group-hover:border-[#1dbcb5] transition-colors shadow-xs">
              <img
                src="/amriza-logo.png"
                alt="Amriza Health Tourism Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-wider text-slate-900 font-heading brand-wordmark flex items-center gap-1.5">
                AMRIZA
                <span className="text-[10px] uppercase font-heading tracking-widest px-1.5 py-0.5 rounded bg-[#1dbcb5]/15 text-[#0d7e79] border border-[#1dbcb5]/35 font-bold">
                  HEALTH TOURISM
                </span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-500 font-body font-medium hidden sm:block">
                Global Care | Trusted Guidance
              </span>
            </div>
          </a>

          {/* Desktop Navigation: Liquid Glass Capsule */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/85 p-1.5 rounded-full border border-white/95 backdrop-blur-2xl font-body shadow-[0_4px_20px_rgba(15,23,42,0.06),inset_0_1.5px_1.5px_rgba(255,255,255,1)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => soundFX.playGlassHover()}
                  onClick={() => soundFX.playSubtleClick()}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 relative ${
                    isActive
                      ? 'text-[#0d7e79] bg-[#1dbcb5]/20 shadow-[0_2px_10px_rgba(29,188,181,0.2),inset_0_1px_1px_rgba(255,255,255,0.9)] font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1dbcb5] shadow-[0_0_6px_rgba(29,188,181,0.8)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-3 font-body">
            {/* WhatsApp Liquid Glass Pill Button (Number Removed) */}
            <a
              href="https://wa.me/919566471448?text=Hello%20Dr.%20Mussadiq%20Ahmed%20and%20Amriza%20Team%2C%20I%20would%20like%20to%20enquire%20about%20medical%20travel%20and%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFX.playGlassHover()}
              onClick={() => soundFX.playSubtleClick()}
              className="hidden sm:inline-flex items-center justify-center gap-2.5 px-6 h-[48px] rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 border border-emerald-500/35 text-sm font-bold font-body transition-all shadow-[0_2px_12px_rgba(16,185,129,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md shrink-0"
              title="Connect with Amriza Coordination Desk on WhatsApp"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span className="font-bold">WhatsApp</span>
            </a>

            {/* Main Consultation CTA: Bold Liquid Glass Button (Desktop / Tablet only) */}
            <LiquidButton
              size="lg"
              onClick={() => {
                soundFX.playSubtleClick();
                onOpenConsultation();
              }}
              onMouseEnter={() => soundFX.playGlassHover()}
              className="hidden md:inline-flex items-center justify-center px-7 h-[48px] rounded-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold font-body text-sm tracking-wide shadow-[0_4px_18px_rgba(20,184,166,0.38)] hover:shadow-[0_6px_26px_rgba(20,184,166,0.55)] cursor-pointer border-none shrink-0"
            >
              <span className="flex items-center gap-2 font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-white" />
                <span>START JOURNEY</span>
              </span>
            </LiquidButton>

            {/* Mobile 3-line Hamburger Toggle Button */}
            <button
              onClick={() => {
                soundFX.playSubtleClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden w-10 h-10 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-[#14b8a6] flex items-center justify-center text-slate-800 shadow-sm cursor-pointer shrink-0 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white/98 backdrop-blur-2xl flex flex-col justify-between pt-20 sm:pt-24 pb-8 px-5 sm:px-6 lg:hidden animate-in fade-in font-body overflow-y-auto">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="pb-3 border-b border-slate-200">
              <span className="text-xs uppercase tracking-widest text-[#0d7e79] font-heading font-bold">
                AMRIZA HEALTH TOURISM
              </span>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-body">
                Global Care | Trusted Guidance
              </p>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundFX.playSubtleClick();
                  setMobileMenuOpen(false);
                }}
                className="text-base sm:text-lg font-medium text-slate-800 hover:text-[#0d7e79] py-2 border-b border-slate-100 flex items-center justify-between font-body"
              >
                <span>{link.name}</span>
                <span className="text-[#0d7e79] text-sm font-bold">→</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-5 border-t border-slate-200">
            <a
              href="https://wa.me/919566471448?text=Hello%20Dr.%20Mussadiq%20Ahmed%20and%20Amriza%20Team%2C%20I%20would%20like%20to%20enquire%20about%20medical%20travel%20and%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-800 flex items-center justify-center gap-2 text-sm font-body font-bold transition-all shadow-[0_2px_12px_rgba(16,185,129,0.15)] active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Connect on WhatsApp</span>
            </a>
            <LiquidButton
              size="lg"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#14b8a6] to-[#0d9488] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase font-body shadow-[0_4px_20px_rgba(20,184,166,0.35)] border-none"
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span>START HEALTHCARE JOURNEY</span>
              </span>
            </LiquidButton>
          </div>
        </div>
      )}
    </>
  );
};
