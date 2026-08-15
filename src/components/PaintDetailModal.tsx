import React, { useState } from 'react';
import { PaintProduct, PaintPresentation, ColorSwatch } from '../types';
import { PaintCan3D } from './PaintCan3D';
import { formatCOP } from '../utils/formatters';
import { 
  X, 
  Droplets, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Calculator, 
  Layers, 
  Star,
  Check
} from 'lucide-react';

interface PaintDetailModalProps {
  product: PaintProduct | null;
  onClose: () => void;
  onOpenCalculator: (product: PaintProduct) => void;
  onSelectForQuote: (product: PaintProduct, size: PaintPresentation, color: ColorSwatch) => void;
}

export const PaintDetailModal: React.FC<PaintDetailModalProps> = ({
  product,
  onClose,
  onOpenCalculator,
  onSelectForQuote
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<PaintPresentation>(
    product.presentationPrices[1]?.size || product.presentationPrices[0].size
  );
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(product.colors[0]);

  const priceObj = product.presentationPrices.find(p => p.size === selectedSize) || product.presentationPrices[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[11px] font-bold uppercase rounded-md">
                {product.category}
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {product.rating} ({product.reviewCount} opiniones)
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              {product.name}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
              {product.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: 3D Paint Visualizer */}
            <div className="md:col-span-5 bg-gradient-to-b from-slate-100 to-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col items-center justify-center">
              <PaintCan3D
                size={selectedSize}
                brandName={product.name}
                category={product.category}
                finish={product.finish}
                colorHex={selectedColor.hex}
                colorName={selectedColor.name}
                isPopular={selectedColor.popular}
              />

              {/* Presentation Switcher */}
              <div className="mt-4 flex gap-1 bg-slate-200/70 p-1 rounded-xl w-full justify-center">
                {product.presentationPrices.map(p => (
                  <button
                    key={p.size}
                    onClick={() => setSelectedSize(p.size)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedSize === p.size
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-white/70'
                    }`}
                  >
                    {p.size.replace('(5 Galones)', '5 Gal')}
                  </button>
                ))}
              </div>

              {/* Price Display */}
              <div className="mt-4 text-center">
                <span className="text-xs text-slate-400 block font-medium">Precio Actual:</span>
                <span className="text-2xl font-black text-slate-900">
                  {formatCOP(priceObj.price)}
                </span>
                {priceObj.originalPrice && (
                  <span className="text-xs text-slate-400 line-through block font-semibold">
                    Antes: {formatCOP(priceObj.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Technical Specs & Color Swatches */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Descripción Técnica
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Palette Selector */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Paleta de Tonos Disponibles ({product.colors.length} colores)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor.code === c.code;
                    return (
                      <button
                        key={c.code}
                        onClick={() => setSelectedColor(c)}
                        className={`group relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          isSelected 
                            ? 'border-blue-600 ring-2 ring-blue-500/40 scale-110 shadow-sm' 
                            : 'border-slate-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={`${c.name} (${c.code})`}
                      >
                        {isSelected && (
                          <Check className={`w-4 h-4 ${
                            c.hex === '#FFFFFF' || c.hex === '#F5F5F0' || c.hex === '#E5E7EB' 
                              ? 'text-slate-900' 
                              : 'text-white'
                          }`} />
                        )}
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs text-slate-600 mt-1 block font-medium">
                  Tono activo: <strong className="text-blue-600">{selectedColor.name}</strong> ({selectedColor.code})
                </span>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Rendimiento Teórico</span>
                  <span className="font-bold text-slate-800">~{product.coveragePerGallonM2} m² / galón</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Lavabilidad</span>
                  <span className="font-bold text-slate-800">{product.washability}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Acabado Final</span>
                  <span className="font-bold text-slate-800">{product.finish}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Nivel VOC / Olor</span>
                  <span className="font-bold text-slate-800">{product.vocLevel}</span>
                </div>
              </div>

              {/* Advantages List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Ventajas Principales
                </h4>
                <ul className="space-y-1">
                  {product.advantages.map((adv, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

        {/* Footer CTAs */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={() => {
              onOpenCalculator(product);
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 flex items-center justify-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Calcular Galones para Mi Espacio</span>
          </button>

          <button
            onClick={() => {
              onSelectForQuote(product, selectedSize, selectedColor);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Cotizar con {product.name}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
