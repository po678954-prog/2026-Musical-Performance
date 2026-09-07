import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: '節目單', target: 'program' },
    { label: '樂譜下載', target: 'songs' },
    { label: '歌曲總播放清單', target: 'playlist' },
  ];

  const handleItemClick = (target: string) => {
    setIsOpen(false);
    onNavigate(target);
  };

  return (
    <header
      id="site-header"
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E1DA] transition-all"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        {/* Title */}
        <a
          href="#program"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick('program');
          }}
          className="flex items-center space-x-2 text-[#333333] hover:text-[#8B7E66] transition-colors"
          aria-label="回節目單首頁"
        >
          <span className="font-serif-title font-medium text-sm sm:text-base md:text-lg tracking-wide text-[#333333]">
            人子的故事
          </span>
        </a>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium">
          {navItems.map((item) => (
            <button
              key={item.target}
              id={`nav-${item.target}`}
              onClick={() => handleItemClick(item.target)}
              className="text-[#666666] hover:text-[#8B7E66] transition-colors py-1 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-button"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 text-[#333333] hover:text-[#8B7E66] hover:bg-[#FAF9F6] transition-colors focus:outline-hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? '關閉選單' : '開啟選單'}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-[#FDFCFB] border-b border-[#E5E1DA] px-5 pt-3 pb-5 shadow-sm space-y-1 animate-fadeIn"
        >
          <div className="py-1 border-b border-[#E5E1DA] mb-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8B7E66] font-serif-title px-2 py-1">
              線上節目單選單 MENU
            </p>
          </div>
          {navItems.map((item) => (
            <button
              key={item.target}
              id={`mobile-nav-${item.target}`}
              onClick={() => handleItemClick(item.target)}
              className="w-full text-left px-3 py-2.5 text-[#333333] hover:bg-[#FAF9F6] hover:text-[#8B7E66] font-medium text-sm tracking-wider transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>{item.label}</span>
              <span className="text-[#8B7E66] text-xs">→</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
