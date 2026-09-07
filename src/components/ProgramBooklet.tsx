import React from 'react';
import { PROGRAM_INFO, PROGRAM_LEFT_ITEMS, PROGRAM_RIGHT_ITEMS, ProgramItem } from '../data/program';
import { ChevronDown, Calendar, MapPin, Music } from 'lucide-react';

interface ProgramBookletProps {
  onSelectSong: (songNumber: string) => void;
  onScrollToSongs: () => void;
}

export const ProgramBooklet: React.FC<ProgramBookletProps> = ({ onSelectSong, onScrollToSongs }) => {
  const renderItem = (item: ProgramItem, idx: number) => {
    if (item.isSpecial) {
      return (
        <div key={`special-${idx}`} className="my-3 py-2 px-3 bg-[#F9F7F2] text-center border-y border-[#E5E1DA]">
          <span className="text-xs font-serif-title tracking-[0.2em] text-[#8B7E66] uppercase font-medium">
            ✦ {item.title} · INTERMISSION ✦
          </span>
        </div>
      );
    }

    return (
      <div key={`item-${item.number}-${idx}`} className="group py-2 px-2 hover:bg-[#FAF9F6] transition-colors border-b border-[#F5F2EC] last:border-b-0">
        {item.actLabel && (
          <div className="flex items-center space-x-1.5 text-[11px] font-serif-title text-[#8B7E66] tracking-wider mb-0.5">
            <span className="inline-block w-1 h-1 rounded-full bg-[#8B7E66]"></span>
            <span>{item.actLabel}</span>
            <span className="text-[#999999]">·</span>
            <span className="text-[#666666] font-normal">{item.actName}</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => onSelectSong(item.number)}
          className="w-full flex items-center justify-between text-left cursor-pointer group-hover:translate-x-0.5 transition-transform"
          title={`點擊查看 ${item.number} ${item.title}`}
        >
          <div className="flex items-baseline space-x-3">
            <span className="text-xs font-mono font-medium text-[#8B7E66] min-w-5">
              {item.number}
            </span>
            <span className="text-sm font-serif-title text-[#333333] font-medium group-hover:text-[#8B7E66] transition-colors">
              【{item.title}】
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-[#999999] font-light">
              {item.meta}
            </span>
            <span className="text-[10px] text-[#CCCCCC] group-hover:text-[#8B7E66] transition-colors">
              ➔
            </span>
          </div>
        </button>
      </div>
    );
  };

  return (
    <section id="program" className="pt-20 pb-12 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Visual Header Banner - Clean Minimalist Hero */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] mb-3 text-[#8B7E66] font-medium">
          2026 Musical Performance & Scores
        </p>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-light text-[#333333] tracking-tight">
          人子的故事
        </h1>
        <p className="text-xs sm:text-sm text-[#8B7E66] font-normal mt-2 tracking-widest font-serif-title">
          承擔與受難 · 恩感神劇
        </p>
        <p className="text-xs sm:text-sm text-[#666666] font-light mt-2 max-w-xl mx-auto tracking-wide">
          {PROGRAM_INFO.descriptor}
        </p>
      </div>

      {/* Program Booklet Spread / Card Container */}
      <div className="relative bg-[#FDFCFB] border border-[#E5E1DA] shadow-xs overflow-hidden">
        {/* Desktop Two-Page Spread Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 relative divide-x divide-[#E5E1DA]">
          {/* Left Page (左頁：序曲與第 1 至 5 幕) */}
          <div className="p-8 xl:p-9 bg-[#FDFCFB]">
            {/* Page Header */}
            <div className="border-b border-[#E5E1DA] pb-5 mb-5">
              <div className="flex justify-between items-baseline">
                <span className="font-serif-title font-normal text-xl text-[#333333] tracking-wide">
                  恩感神劇【人子的故事】
                </span>
                <span className="text-xs font-mono font-medium text-[#8B7E66] uppercase tracking-widest">
                  Act 00–08
                </span>
              </div>
              <div className="mt-3 text-xs text-[#666666] space-y-1 font-light">
                <p>
                  <span className="text-[#333333] font-medium">主辦單位：</span>
                  {PROGRAM_INFO.organizer}
                </p>
                <p>
                  <span className="text-[#333333] font-medium">協辦單位：</span>
                  {PROGRAM_INFO.coOrganizers.join('、')}
                </p>
              </div>
            </div>

            {/* Core Quote */}
            <div className="p-4 bg-[#F9F7F2] border-l-2 border-[#8B7E66] text-xs text-[#555555] font-serif-title leading-relaxed italic mb-6">
              「{PROGRAM_INFO.introQuote}」
            </div>

            {/* Program Items (00-08) */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E1DA] text-xs font-serif-title text-[#8B7E66] uppercase tracking-widest">
                <span>上半場劇目（開場至第五幕）</span>
                <span className="text-[11px] font-mono text-[#999999]">00～08</span>
              </div>
              {PROGRAM_LEFT_ITEMS.map((item, idx) => renderItem(item, idx))}
            </div>
          </div>

          {/* Right Page (右頁：第 6 至 15 幕及全劇終) */}
          <div className="p-8 xl:p-9 bg-[#FAF9F6]">
            {/* Page Header with Performance Date/Location */}
            <div className="border-b border-[#E5E1DA] pb-5 mb-5 flex justify-between items-center text-xs text-[#666666]">
              <div className="flex items-center space-x-2 text-[#333333] font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#8B7E66]" />
                <span>{PROGRAM_INFO.year}.{PROGRAM_INFO.date} {PROGRAM_INFO.time}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[#666666]">
                <MapPin className="w-3.5 h-3.5 text-[#999999]" />
                <span>{PROGRAM_INFO.venue}</span>
              </div>
            </div>

            {/* Program Items (09-20) */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5E1DA] text-xs font-serif-title text-[#8B7E66] uppercase tracking-widest">
                <span>下半場劇目（第六幕至終曲）</span>
                <span className="text-[11px] font-mono text-[#999999]">09～20</span>
              </div>
              {PROGRAM_RIGHT_ITEMS.map((item, idx) => renderItem(item, idx))}
            </div>

            {/* Right page footer footnote */}
            <div className="mt-5 pt-3 border-t border-[#E5E1DA] text-center text-xs uppercase tracking-[0.2em] text-[#999999] font-serif-title">
              ── 全劇終 FINALE ──
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Single-Column Responsive Layout */}
        <div className="lg:hidden p-5 sm:p-7 bg-[#FDFCFB]">
          {/* Mobile Program Header */}
          <div className="border-b border-[#E5E1DA] pb-4 mb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="font-serif-title font-medium text-lg text-[#333333]">
                恩感神劇【人子的故事】
              </span>
              <span className="text-xs font-mono text-[#8B7E66] uppercase tracking-widest">
                PROGRAM
              </span>
            </div>
            <p className="text-xs text-[#666666] mb-1">
              <span className="font-medium text-[#333333]">主辦：</span>
              {PROGRAM_INFO.organizer}
            </p>
            <p className="text-xs text-[#666666] mb-4">
              <span className="font-medium text-[#333333]">協辦：</span>
              {PROGRAM_INFO.coOrganizers.join('、')}
            </p>

            {/* Quote */}
            <div className="p-3.5 bg-[#F9F7F2] border-l-2 border-[#8B7E66] text-xs text-[#555555] font-serif-title leading-relaxed italic">
              「{PROGRAM_INFO.introQuote}」
            </div>
          </div>

          {/* Part 1 Header */}
          <div className="flex items-center justify-between py-2 px-1 text-xs font-serif-title text-[#8B7E66] uppercase tracking-widest border-b border-[#E5E1DA] mb-2">
            <span>上半場劇目（00～08）</span>
            <span className="text-[#999999] font-mono text-[11px]">序曲至第五幕</span>
          </div>
          <div className="space-y-0.5 mb-5">
            {PROGRAM_LEFT_ITEMS.map((item, idx) => renderItem(item, idx))}
          </div>

          {/* Part 2 Header */}
          <div className="flex items-center justify-between py-2 px-1 text-xs font-serif-title text-[#8B7E66] uppercase tracking-widest border-b border-[#E5E1DA] mb-2">
            <span>下半場劇目（09～20）</span>
            <span className="text-[#999999] font-mono text-[11px]">第六幕至終曲</span>
          </div>
          <div className="space-y-0.5 mb-5">
            {PROGRAM_RIGHT_ITEMS.map((item, idx) => renderItem(item, idx))}
          </div>

          {/* Performance venue tag for mobile */}
          <div className="bg-[#FAF9F6] p-4 text-xs text-[#666666] flex flex-col sm:flex-row justify-between sm:items-center gap-2 border border-[#E5E1DA]">
            <div className="flex items-center space-x-2 text-[#333333]">
              <Calendar className="w-3.5 h-3.5 text-[#8B7E66]" />
              <span className="font-medium">2026.09.15 19:00</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[#666666]">
              <MapPin className="w-3.5 h-3.5 text-[#999999]" />
              <span>台中中山堂（臺中市北區學士路98號）</span>
            </div>
          </div>
        </div>

        {/* Spread Bottom Action Anchor Bar */}
        <div className="bg-[#FAF9F6] border-t border-[#E5E1DA] px-5 py-4 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#666666] font-serif-title flex items-center space-x-2">
            <Music className="w-3.5 h-3.5 text-[#8B7E66]" />
            <span>點選上方曲目快速瀏覽，或向下前往「樂譜下載」與詳細介紹</span>
          </div>
          <button
            id="btn-scroll-to-songs"
            type="button"
            onClick={onScrollToSongs}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
          >
            <span>樂譜下載</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

