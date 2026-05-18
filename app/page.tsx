import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import AboutSection from '@/components/sections/AboutSection';
import MissionVision from '@/components/sections/MissionVision';
import ImpactCards from '@/components/sections/ImpactCards';
import ProgramsGrid from '@/components/sections/ProgramsGrid';
import WomenEmpowerment from '@/components/sections/WomenEmpowerment';
import DonationCTA from '@/components/sections/DonationCTA';
import VolunteerSection from '@/components/sections/VolunteerSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <MissionVision />
      <ImpactCards />
      <ProgramsGrid />
      <WomenEmpowerment />
      <DonationCTA />
      <VolunteerSection />
    </>
  );
}