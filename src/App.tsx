import React, { useState, useCallback } from 'react';
import { SONGS_DATA } from './data/songs';
import { Header } from './components/Header';
import { ProgramBooklet } from './components/ProgramBooklet';
import { SongList } from './components/SongList';
import { PlaylistSection } from './components/PlaylistSection';
import { MinistrySection } from './components/MinistrySection';

export default function App() {
  const [expandedSongId, setExpandedSongId] = useState<string | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -56; // header height offset
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const handleSelectSongFromProgram = useCallback((songNumber: string) => {
    const targetSong = SONGS_DATA.find((s) => s.number === songNumber);
    if (targetSong) {
      setExpandedSongId(targetSong.id);
      setTimeout(() => {
        const cardEl = document.getElementById(`song-card-${songNumber}`);
        if (cardEl) {
          const yOffset = -70;
          const y = cardEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          scrollToSection('songs');
        }
      }, 50);
    }
  }, [scrollToSection]);

  const handleToggleSong = useCallback((songId: string) => {
    setExpandedSongId((prev) => (prev === songId ? null : songId));
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#333333] flex flex-col selection:bg-[#8B7E66] selection:text-white">
      {/* 1. Slim Fixed Header */}
      <Header onNavigate={scrollToSection} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 2. Program Booklet Area (Open spread concept on desktop, single-column on mobile) */}
        <ProgramBooklet
          onSelectSong={handleSelectSongFromProgram}
          onScrollToSongs={() => scrollToSection('songs')}
        />

        {/* 3. 21 Songs Section (Accordion 00-20 with direct PDF download) */}
        <SongList
          songs={SONGS_DATA}
          expandedId={expandedSongId}
          onToggleSong={handleToggleSong}
        />

        {/* 4. Full YouTube Playlist Section */}
        <PlaylistSection />

        {/* 5. Ministry Section with Logo and Official YouTube */}
        <MinistrySection />
      </main>
    </div>
  );
}
