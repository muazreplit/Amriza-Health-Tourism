import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { WhyAmriza } from './components/WhyAmriza';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { PatientJourney } from './components/PatientJourney';
import { TrustSection } from './components/TrustSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { SectionDivider } from './components/SectionDivider';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export const App: React.FC = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('Cardiology');

  const handleOpenConsultation = (specialty?: string) => {
    if (specialty) {
      setSelectedSpecialty(specialty);
    }
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  const handleExploreJourney = () => {
    const el = document.getElementById('patient-journey');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 selection:bg-[#1dbcb5]/25 selection:text-[#0c6b66] font-body">
      {/* Top Cyan Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Floating Glass Navbar */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Content Flow */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onOpenConsultation={() => handleOpenConsultation()}
          onExploreJourney={handleExploreJourney}
        />

        <SectionDivider />

        {/* Why Amriza Section */}
        <WhyAmriza />

        <SectionDivider />

        {/* Clinical Specialties Section */}
        <SpecialtiesSection
          onSelectSpecialty={(specialty) => handleOpenConsultation(specialty)}
        />

        <SectionDivider />

        {/* 4-Stage Patient Journey Timeline & 3D Orb */}
        <PatientJourney onOpenConsultation={() => handleOpenConsultation()} />

        <SectionDivider />

        {/* Doctor-Led Clinical Leadership & Trust Section */}
        <TrustSection onOpenConsultation={() => handleOpenConsultation()} />

        <SectionDivider />

        {/* Dramatic Final CTA Section */}
        <FinalCTA onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Interactive Consultation / Medical File Review Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
        defaultSpecialty={selectedSpecialty}
      />
    </div>
  );
};

export default App;
