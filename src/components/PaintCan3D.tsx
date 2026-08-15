import React from 'react';
import { PaintPresentation } from '../types';
import { Sparkles, Award } from 'lucide-react';

interface PaintCan3DProps {
  size: PaintPresentation;
  brandName: string;
  category: string;
  finish: string;
  colorHex: string;
  colorName: string;
  isPopular?: boolean;
  className?: string;
}

export const PaintCan3D: React.FC<PaintCan3DProps> = ({
  size,
  brandName,
  category,
  finish,
  colorHex,
  colorName,
  isPopular,
  className = ''
}) => {
  const isCunete = size === 'Cuñete (5 Galones)';
  const isQuarter = size === '1/4 Galón';

  // Sizing styles
  const canHeight = isCunete ? 'h-64' : isQuarter ? 'h-44' : 'h-56';
  const canWidth = isCunete ? 'w-52' : isQuarter ? 'w-36' : 'w-44';

  return (
    <div className={`relative flex flex-col items-center justify-center py-4 ${className}`}>
      {/* 3D Can / Bucket Visual Construction */}
      <div className={`relative ${canHeight} ${canWidth} flex flex-col items-center transition-all duration-300`}>
        
        {/* Metal Handle for Bucket (Cuñete 5 Galones) */}
        {isCunete && (
          <div className="absolute -top-4 w-44 h-20 border-4 border-slate-400 rounded-t-full pointer-events-none z-10 shadow-xs flex items-start justify-center">
            <div className="w-16 h-3 bg-slate-800 rounded-full mt-1 shadow-inner flex items-center justify-center">
              <div className="w-8 h-1 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Top Rim / Lid Ring */}
        <div className="relative w-full h-6 rounded-t-2xl bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-t border-x border-slate-300 shadow-sm z-20 flex items-center justify-center">
          <div className="w-5/6 h-3 rounded-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 border border-slate-400/60 shadow-inner flex items-center justify-center">
            {/* Lid Color Accent Inlay */}
            <div 
              className="w-1/3 h-1.5 rounded-full shadow-xs transition-colors duration-300 border border-black/10"
              style={{ backgroundColor: colorHex }}
            />
          </div>
        </div>

        {/* Can Body Container */}
        <div 
          className="relative w-full flex-1 rounded-b-xl overflow-hidden border-x border-b border-slate-400/80 shadow-xl flex flex-col justify-between"
          style={{
            background: `linear-gradient(135deg, #1e293b 0%, #0f172a 100%)`
          }}
        >
          {/* Metallic / Gloss lighting sheen layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-black/30 pointer-events-none z-10" />
          <div className="absolute left-4 top-0 bottom-0 w-6 bg-gradient-to-r from-white/30 to-transparent pointer-events-none z-10 opacity-70" />

          {/* Top Label Brand Header */}
          <div className="relative z-10 px-3 pt-2.5 pb-1 flex justify-between items-start bg-slate-900/60 backdrop-blur-xs border-b border-white/10">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-black text-white tracking-wider">PINTUCO</span>
                <span className="text-[8px] bg-red-600 text-white font-bold px-1 rounded-xs uppercase">®</span>
              </div>
              <span className="text-[8px] font-semibold tracking-wider text-blue-300 uppercase block">
                {category}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-bold text-amber-300 block">
                {finish}
              </span>
              <span className="text-[8px] text-slate-300">
                {size.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Middle Body with Main Brand Name and Dynamic Swatch Splash */}
          <div className="relative z-10 px-3 py-1 flex-1 flex flex-col justify-center items-center text-center">
            {/* Real Color Paint Splat / Swatch Circle with reflection */}
            <div className="relative my-1">
              <div 
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg transition-colors duration-300 flex items-center justify-center"
                style={{ backgroundColor: colorHex }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 blur-2xs" />
              </div>
              {isPopular && (
                <div className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 p-0.5 rounded-full shadow-md">
                  <Sparkles className="w-3 h-3" />
                </div>
              )}
            </div>

            <h4 className="text-[11px] font-extrabold text-white leading-tight drop-shadow-md line-clamp-2">
              {brandName}
            </h4>
            <p className="text-[9px] text-slate-200 font-medium truncate max-w-full mt-0.5">
              Color: <span className="font-bold text-amber-200">{colorName}</span>
            </p>
          </div>

          {/* Bottom Rim of Can with Volume & Quality seal */}
          <div className="relative z-10 px-2.5 py-1.5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-t border-white/10 flex items-center justify-between text-[8px] text-slate-300 font-medium">
            <span className="flex items-center gap-0.5 text-amber-400 font-bold">
              <Award className="w-2.5 h-2.5" />
              Garantía Original
            </span>
            <span className="bg-white/15 px-1.5 py-0.5 rounded-xs text-white font-mono font-bold">
              {size}
            </span>
          </div>
        </div>

        {/* Realistic Ground Shadow */}
        <div className="w-3/4 h-3 bg-slate-900/40 rounded-full blur-sm mt-1 transform scale-y-75" />
      </div>
    </div>
  );
};
