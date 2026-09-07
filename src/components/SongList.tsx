import React from 'react';
import { Song } from '../types';
import { ChevronDown, ExternalLink, Download, FileText } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface SongListProps {
  songs: Song[];
  expandedId: string | null;
  onToggleSong: (songId: string) => void;
}

export const SongList: React.FC<SongListProps> = ({
  songs,
  expandedId,
  onToggleSong,
}) => {
  return (
    <section id="songs" className="py-16 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] mb-2 text-[#8B7E66] font-medium">
          Sheet Music & Scores
        </p>
        <h2 className="text-2xl sm:text-3xl font-light font-serif-title text-[#333333] tracking-tight">
          樂譜下載
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-md mx-auto font-light tracking-wide">
          點擊曲目展開詳細介紹、欣賞 YouTube 演出影片或直接下載樂譜 PDF
        </p>
      </div>

      {/* Accordion Song List */}
      <div className="space-y-2.5" role="region" aria-label="歌曲手風琴清單">
        {songs.map((song) => {
          const isExpanded = expandedId === song.id;
          const youtubeUrl = `https://www.youtube.com/watch?v=${song.youtubeVideoId}`;

          return (
            <div
              key={song.id}
              id={`song-card-${song.number}`}
              className={`border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-white border-[#8B7E66] shadow-xs'
                  : 'bg-white border-[#E5E1DA] hover:border-[#8B7E66]'
              }`}
            >
              {/* Accordion Header Button */}
              <button
                type="button"
                id={`btn-song-${song.number}`}
                onClick={() => onToggleSong(song.id)}
                aria-expanded={isExpanded}
                aria-controls={`song-content-${song.number}`}
                className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left cursor-pointer select-none transition-colors"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 pr-2">
                  {/* Song Number Badge */}
                  <span
                    className={`inline-flex items-center justify-center font-mono text-sm font-medium shrink-0 transition-colors ${
                      isExpanded
                        ? 'text-black font-semibold'
                        : 'text-[#8B7E66]'
                    }`}
                  >
                    {song.number}
                  </span>

                  {/* Title & Short Description */}
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h3 className="font-serif-title font-normal text-base sm:text-lg text-[#333333] tracking-wide">
                        【{song.title}】
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 border border-[#E5E1DA] bg-[#FAF9F6] text-[#8B7E66]">
                        {song.language}
                      </span>
                    </div>
                    {/* Collapsed short description (<= 20 chars) */}
                    <p className="text-xs sm:text-sm text-[#8B7E66] italic font-light truncate mt-0.5 max-w-xs sm:max-w-md">
                      {song.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Chevron icon */}
                <div
                  className={`w-7 h-7 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isExpanded
                      ? 'rotate-180 text-black'
                      : 'text-[#999999]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Expanded Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`song-content-${song.number}`}
                    key={`content-${song.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pt-3 pb-6 border-t border-[#E5E1DA] bg-[#FAF9F6]">
                      {/* Credits Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                        <span className="px-2.5 py-1 border border-[#E5E1DA] bg-white text-[#666666] font-light">
                          {song.author}
                        </span>
                        <span className="px-2.5 py-1 border border-[#E5E1DA] bg-white text-[#666666] font-mono text-[11px]">
                          {song.keyInfo} · {song.tempo}
                        </span>
                        <span className="px-2.5 py-1 border border-[#E5E1DA] bg-white text-[#8B7E66] text-[11px] flex items-center space-x-1">
                          <FileText className="w-3 h-3 mr-0.5" />
                          <span>檔案：{song.pdfFile}</span>
                        </span>
                      </div>

                      {/* Full Factual Description (30-50 chars) */}
                      <div className="mb-4 p-4 bg-white border-l-2 border-[#8B7E66] text-[#444444] text-sm sm:text-base font-serif leading-relaxed italic">
                        {song.description}
                      </div>

                      {/* Scripture citation if available */}
                      {song.scripture && (
                        <div className="mb-5 text-xs text-[#777777] font-serif">
                          <span className="text-[#8B7E66] font-medium mr-1">經文呼應：</span>
                          {song.scripture}
                        </div>
                      )}

                      {/* Action Links Bar: Focused directly on YouTube and PDF Download */}
                      <div className="pt-3 border-t border-[#E5E1DA] flex flex-wrap gap-3 items-center">
                        {/* 1. YouTube Direct Link */}
                        <a
                          id={`btn-youtube-${song.number}`}
                          href={youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs tracking-wider uppercase font-medium transition-colors cursor-pointer shadow-2xs"
                          title={`前往 YouTube 觀看 ${song.title} 演出影片`}
                        >
                          <span>▶ YouTube 演出影片</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                        </a>

                        {/* 2. Download PDF (Primary Action) */}
                        <a
                          id={`btn-download-${song.number}`}
                          href={song.pdfUrl}
                          download={song.pdfFile}
                          className="inline-flex items-center space-x-2 px-5 py-2 bg-[#8B7E66] text-white hover:bg-[#726650] text-xs tracking-wider uppercase font-medium transition-colors cursor-pointer shadow-xs"
                          title={`下載 ${song.title} 樂譜 PDF（${song.pdfFile}）`}
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>下載樂譜 PDF</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
