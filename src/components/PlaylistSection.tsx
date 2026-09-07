import React from 'react';
import { ExternalLink, PlaySquare } from 'lucide-react';

export const PlaylistSection: React.FC = () => {
  const playlistUrl =
    'https://youtube.com/playlist?list=PLkapoFxdvjaycNEFclinXhJ_pwwZsaZja&si=QkFvkiIPm11uAluA';

  return (
    <section
      id="playlist"
      className="py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center"
    >
      <div className="bg-[#FAF9F6] border border-[#E5E1DA] p-8 sm:p-12 shadow-xs">
        <p className="text-xs uppercase tracking-[0.3em] mb-3 text-[#8B7E66] font-medium">
          Official YouTube Playlist
        </p>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#E5E1DA] bg-white text-[#8B7E66] mb-4">
          <PlaySquare className="w-5 h-5" />
        </div>
        <h2 className="text-xl sm:text-2xl font-light font-serif-title text-[#333333] tracking-tight">
          《人子的故事》歌曲總播放清單
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-md mx-auto font-light tracking-wide">
          收錄本劇演出、官方歌詞版 MV 及排練詩歌影音實況
        </p>

        <div className="mt-8">
          <a
            id="btn-main-playlist"
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs sm:text-sm uppercase tracking-widest font-medium transition-colors cursor-pointer"
          >
            <span>觀看《人子的故事》歌曲總播放清單</span>
            <ExternalLink className="w-4 h-4 ml-1.5 opacity-80" />
          </a>
        </div>
      </div>
    </section>
  );
};

