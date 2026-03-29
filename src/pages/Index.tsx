import { useEffect } from 'react';
import Scene3D from '../components/Scene3D';
import NavHeader from '../components/NavHeader';
import CustomCursor from '../components/CustomCursor';
import RadialMenu from '../components/RadialMenu';
import SpaceshipTracker from '../components/SpaceshipTracker';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import TimelineSection from '../components/TimelineSection';
import OriginLogSection from '../components/OriginLogSection';
import TerminalSection from '../components/TerminalSection';
import SpaceGame from '../components/SpaceGame';
import Footer from '../components/Footer';
import MusicPlayer from '../components/MusicPlayer';

const Index = () => {
  // Ensure page always starts at top (hero section)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen cursor-none overflow-x-hidden">
      <Scene3D />
      <NavHeader />
      <CustomCursor />
      <RadialMenu />
      <SpaceshipTracker />
      <MusicPlayer />
      <main className="relative z-20 pt-12 isolation-isolate">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <OriginLogSection />
        <TerminalSection />
        <SpaceGame />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
