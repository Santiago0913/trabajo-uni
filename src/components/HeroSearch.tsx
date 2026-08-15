import React, { useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Paintbrush, 
  Clock, 
  Calculator, 
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { SERVICE_BENEFITS } from '../data/mockData';

interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: any) => void;
  onOpenCalculator: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenCalculator,
  onNavigate
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const quickSearchTags = [
    { label: 'Vinilos Lavables', query: 'Viniltex' },
    { label: 'Fachadas Exteriores', query: 'Koraza' },
    { label: 'Pintura Epóxica Pisos', query: 'Epoxica' },
    { label: 'Esmaltes Metales', query: 'Pintulux' },
    { label: 'Impermeabilización', query: 'Aquablock' },
    { label: 'Estuco & Decorativo', query: 'Decorativo' },
  ];

  const handleClear = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-16 md:py-20 lg:py-24">
      {/* Background Decorative Lighting & Textures */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-red-600/40 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-200 text-xs font-semibold backdrop-blur-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Servicios de Pintura Residencial, Comercial e Industrial</span>
          </div>

          {/* User Requested Key Phrase & Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            En <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-indigo-300">Pintuco</span> tenemos todo lo que deseas con la{' '}
            <span className="text-amber-400 underline decoration-amber-400/40 decoration-wavy decoration-2">mejor calidad y precio</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Transformamos tus espacios con pintores certificados, acabados profesionales garantizados hasta por 5 años y catálogo oficial de pinturas Pintuco® directas de fábrica.
          </p>

          {/* PROMINENT LIVE DYNAMIC SEARCH BAR */}
          <div className="pt-2 max-w-3xl mx-auto">
            <div className="relative flex flex-col sm:flex-row items-center bg-slate-900/90 p-2 sm:p-2.5 rounded-2xl border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20 backdrop-blur-xl focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
              
              <div className="flex items-center w-full pl-3 pr-2 py-2">
                <Search className="w-6 h-6 text-blue-400 shrink-0 mr-3" />
                <input
                  ref={inputRef}
                  id="hero-main-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Busca por proyecto, pintura, color (ej. 'interiores', 'fachada', 'Koraza', 'epóxica')..."
                  className="w-full bg-transparent text-white placeholder:text-slate-400 text-sm sm:text-base focus:outline-hidden font-medium"
                />
                
                {searchQuery && (
                  <button
                    onClick={handleClear}
                    className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mr-2"
                    title="Limpiar búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Action Buttons inside/adjacent to search */}
              <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-end">
                <button
                  id="hero-calc-trigger-btn"
                  onClick={onOpenCalculator}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-blue-400" />
                  <span className="whitespace-nowrap">Calcular m²</span>
                </button>
                
                <button
                  id="hero-search-submit-btn"
                  onClick={() => onNavigate('galeria')}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <span className="whitespace-nowrap">Explorar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Search Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-slate-400 font-medium mr-1">Búsquedas populares:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => onSearchChange(tag.query)}
                  className={`px-3 py-1 rounded-full border transition-all ${
                    searchQuery.toLowerCase().includes(tag.query.toLowerCase())
                      ? 'bg-blue-600 border-blue-400 text-white font-semibold shadow-xs'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats / Trust Indicators */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/80 mt-10">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">+1,500</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">Proyectos Finalizados</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">5 Años</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">Garantía por Escrito</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">Pinturas Originales Pintuco</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">4.9 ★</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">Satisfacción de Clientes</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
