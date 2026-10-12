import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Stethoscope, CheckCircle2, MessageCircle, FileText } from 'lucide-react';
import { soundFX } from '../utils/sound';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSpecialty?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultSpecialty = 'Cardiology',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    specialty: defaultSpecialty,
    consultationType: 'Digital Consultation (Zoom / Telehealth)',
    enquiryType: 'Medical-File Review',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultSpecialty) {
      setFormData((prev) => ({ ...prev, specialty: defaultSpecialty }));
    }
  }, [defaultSpecialty]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playSuccessChime();
    setSubmitted(true);
  };

  const constructWhatsAppURL = () => {
    const text = `*AMRIZA HEALTH TOURISM ENQUIRY*%0A` +
      `*Patient Name:* ${encodeURIComponent(formData.name || 'Not provided')}%0A` +
      `*Country:* ${encodeURIComponent(formData.country || 'International')}%0A` +
      `*Specialty:* ${encodeURIComponent(formData.specialty)}%0A` +
      `*Enquiry Type:* ${encodeURIComponent(formData.enquiryType)}%0A` +
      `*Format:* ${encodeURIComponent(formData.consultationType)}%0A` +
      `*Notes:* ${encodeURIComponent(formData.message || 'Medical file review requested.')}`;
    return `https://wa.me/919566471448?text=${text}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-body">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFX.playSubtleClick();
            onClose();
          }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl rounded-[28px] sm:rounded-3xl p-5 sm:p-8 md:p-10 bg-white/98 border border-[#1dbcb5]/35 shadow-2xl z-10 my-auto max-h-[90vh] overflow-y-auto font-body"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Edge Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1dbcb5] to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => {
              soundFX.playSubtleClick();
              onClose();
            }}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-[#1dbcb5] flex items-center justify-center transition-all cursor-pointer shadow-xs"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              {/* Modal Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#1dbcb5]/15 border border-[#1dbcb5]/40 flex items-center justify-center text-[#0d7e79] shadow-xs">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-heading uppercase tracking-widest text-[#0d7e79] font-bold">
                    PRE-DEPARTURE STAGE 01
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                    Request Clinical File Review
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-normal mb-6 font-body">
                Under the medical guidance of <strong className="text-slate-900">Dr. Mussadiq Ahmed, MD</strong>, our clinical team will review your case notes and provide treatment estimations and medical visa facilitation for Chennai.
              </p>

              {/* Form: DM Sans */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left font-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-heading uppercase text-slate-600 mb-1.5 font-bold">
                      Patient / Guardian Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#1dbcb5] focus:bg-white text-slate-900 text-sm outline-none transition-colors font-body shadow-xs"
                    />
                  </div>

                  {/* Country of Residence */}
                  <div>
                    <label className="block text-xs font-heading uppercase text-slate-600 mb-1.5 font-bold">
                      Country of Residence *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. UAE, Oman, Kenya, etc."
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#1dbcb5] focus:bg-white text-slate-900 text-sm outline-none transition-colors font-body shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp / Phone */}
                  <div>
                    <label className="block text-xs font-heading uppercase text-slate-600 mb-1.5 font-bold">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+Country Code & Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#1dbcb5] focus:bg-white text-slate-900 text-sm outline-none transition-colors font-body shadow-xs"
                    />
                  </div>

                  {/* Specialty */}
                  <div>
                    <label className="block text-xs font-heading uppercase text-slate-600 mb-1.5 font-bold">
                      Medical Specialty *
                    </label>
                    <select
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#1dbcb5] focus:bg-white text-slate-900 text-sm outline-none transition-colors font-body shadow-xs"
                    >
                      <option value="Oncology">Oncology</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="IVF & Fertility Care">IVF & Fertility Care</option>
                      <option value="Neurology & Neurosciences">Neurology & Neurosciences</option>
                      <option value="Nephrology">Nephrology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Other Medical Specialties">Other Medical Specialties</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Enquiry Category */}
                  <div>
                    <label className="block text-xs font-heading uppercase text-slate-600 mb-1.5 font-bold">
                      Enquiry Purpose
                    </label>
                    <select
                      value={formData.enquiryType}
                      onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#1dbcb5] focus:bg-white text-slate-900 text-sm outline-none transition-colors font-body shadow-xs"
                    >
                      <option value="Second Opinions">Second Opinions</option>
                      <option value="Specialist Coordination">Specialist Coordination</option>
                      <option value="Hospital Coordination">Hospital Coordination</option>
                      <option value="Treatment Assistance">Treatment Assistance</option>
                      <option value="Travel & Recovery Support">Travel & Recovery Support</option>
                    </select>
                  </div>

                  {/* Consultation Mode */}
                  <div>
                    <label className="block text-xs font-heading uppercase text-slate-600 mb-1.5 font-bold">
                      Preferred Consultation Mode
                    </label>
                    <select
                      value={formData.consultationType}
                      onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#1dbcb5] focus:bg-white text-slate-900 text-sm outline-none transition-colors font-body shadow-xs"
                    >
                      <option value="Digital Consultation (Zoom / Telehealth)">Zoom / Telehealth</option>
                      <option value="Direct In-Person Triage in Chennai">In-Person Triage in Chennai</option>
                      <option value="WhatsApp Clinical File Transmission">WhatsApp File Review</option>
                    </select>
                  </div>
                </div>

                {/* Clinical Notes / Message */}
                <div>
                  <label className="block text-xs font-heading uppercase text-slate-600 mb-1.5 font-bold">
                    Brief Summary of Diagnosis / Medical Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe patient symptoms, current diagnosis, or scans available for review..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#1dbcb5] focus:bg-white text-slate-900 text-sm outline-none transition-colors resize-none font-body shadow-xs"
                  />
                </div>

                {/* Submit Action Liquid Glass Button */}
                <div className="pt-2">
                  <LiquidButton
                    type="submit"
                    size="lg"
                    className="w-full h-[50px] rounded-full bg-gradient-to-r from-[#1dbcb5] via-[#22cdc5] to-[#158a85] text-slate-950 font-bold font-body text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(29,188,181,0.35)] hover:shadow-[0_6px_28px_rgba(29,188,181,0.55)] cursor-pointer border-none flex items-center justify-center"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4 text-slate-950" />
                      <span>SUBMIT FOR DR. MUSSADIQ AHMED'S REVIEW</span>
                    </span>
                  </LiquidButton>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 font-body">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center mx-auto mb-6 text-emerald-700 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="text-xs font-heading uppercase tracking-widest text-[#0d7e79] font-bold mb-2">
                CLINICAL FILE REVIEW REGISTERED
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 font-heading">
                Thank You, {formData.name}
              </h3>

              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 font-normal font-body">
                Your medical enquiry for <strong className="text-slate-900">{formData.specialty}</strong> has been received by Amriza Health Tourism. For immediate priority triage and to send medical scan PDFs, connect directly with our coordination desk via WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-body">
                <a
                  href={constructWhatsAppURL()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-72 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all font-body shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>FORWARD ON WHATSAPP</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-72 py-3.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-xs font-body font-bold uppercase hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
