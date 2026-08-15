import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  imageBefore: string;
  imageAfter: string;
  title: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  imageBefore,
  imageAfter,
  title,
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl cursor-ew-resize group ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Full background layer) */}
      <img
        src={imageAfter}
        alt={`Resultado final - ${title}`}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Before Image (Clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={imageBefore}
          alt={`Antes de pintar - ${title}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{
            // Keep the underlying image scaled to the full container size
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
            height: '100%'
          }}
        />
      </div>

      {/* Floating Badges */}
      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10 pointer-events-none z-10">
        Antes
      </div>
      <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/20 shadow-md pointer-events-none z-10 flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-300" />
        <span>Después (Pintuco®)</span>
      </div>

      {/* Slider Vertical Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-800 shadow-xl flex items-center justify-center border-2 border-blue-600 group-hover:scale-110 transition-transform">
          <MoveHorizontal className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      {/* Help hint tooltip at bottom on hover */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        ↔ Desliza para comparar el antes y después
      </div>
    </div>
  );
};
