import React from 'react';
import { ExternalLink, Youtube } from 'lucide-react';

export const MinistrySection: React.FC = () => {
  const officialYoutubeUrl = 'https://www.youtube.com/@calebyu8878';

  return (
    <footer
      id="ministry"
      className="pt-16 pb-16 px-4 sm:px-8 bg-[#FAF9F6] border-t border-[#E5E1DA] mt-12"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Ministry Name & Introduction */}
        <p className="text-xs uppercase tracking-[0.25em] mb-2 text-[#8B7E66] font-medium font-serif-title">
          The Christian Affective Ministry
        </p>
        <h3 className="text-xl sm:text-2xl font-light font-serif-title text-[#333333] tracking-widest mb-3">
          恩感福音事奉團隊
        </h3>
        <p className="text-sm sm:text-base text-[#444444] max-w-xl mx-auto font-serif-title leading-relaxed mb-8 font-light">
          透過詩歌進行宣教、醫治、打破文化間的藩籬、促進關係
        </p>

        {/* Official YouTube Channel Link */}
        <div className="mb-10">
          <a
            id="btn-official-youtube"
            href={officialYoutubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 border border-[#E5E1DA] hover:border-[#8B7E66] bg-white text-[#333333] hover:text-[#8B7E66] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer shadow-2xs"
          >
            <Youtube className="w-4 h-4 text-[#8B7E66]" />
            <span>恩感福音事奉團隊｜官方 YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-60" />
          </a>
        </div>

        {/* Performance Acknowledgments and Footer Credits */}
        <div className="pt-8 border-t border-[#E5E1DA] text-xs text-[#999999] space-y-1.5 font-light">
          <p>
            2026 音樂演出《人子的故事》節目單與樂譜
          </p>
          <p>
            協辦單位：晨曦會、沐恩之家、盧縣一委員/原住民族委員會
          </p>
          <p className="pt-2 text-[11px] text-[#AAAAAA] uppercase tracking-wider">
            © 2026 恩感福音事奉團隊 / The Christian Affective Ministry. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
