import React, { useState } from 'react';
import { 
  PaintProduct, 
  PaintPresentation,
  ColorSwatch 
} from '../types';
import { PaintCan3D } from './PaintCan3D';
import { formatCOP } from '../utils/formatters';
import { 
  Sparkles, 
  Droplets, 
  ShieldCheck, 
  Layers, 
  Check, 
  Calculator, 
  ArrowRight,
  Info,
  PackageCheck,
  Star,
  ShoppingBag
} from 'lucide-react';

interface PaintCansCatalogProps {
  products: PaintProduct[];
  searchQuery: string;
  onOpenProductDetail: (product: PaintProduct) => void;
  onOpenCalculatorWithProduct: (product: PaintProduct) => void;
  onSelectProductForQuote: (product: PaintProduct, size: PaintPresentation, color: ColorSwatch) => void;
  onBuyProduct: (product: PaintProduct, size: PaintPresentation, color: ColorSwatch) => void;
}

export const PaintCansCatalog: React.FC<PaintCansCatalogProps> = ({
  products,
  searchQuery,
  onOpenProductDetail,
  onOpenCalculatorWithProduct,
  onSelectProductForQuote,
  onBuyProduct
}) => {
  // State tracking for selected size and color per product
  const [selectedSizes, setSelectedSizes] = useState<Record<string, PaintPresentation>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, ColorSwatch>>({});
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === 'todos' || p.category === categoryFilter;
    if (!searchQuery.trim()) return matchesCat;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.finish.toLowerCase().includes(q) ||
      p.colors.some(c => c.name.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  const getProductSize = (p: PaintProduct): PaintPresentation => {
    return selectedSizes[p.id] || p.presentationPrices[1]?.size || p.presentationPrices[0].size;
  };

  const getProductColor = (p: PaintProduct): ColorSwatch => {
    return selectedColors[p.id] || p.colors[0];
  };

  const handleSizeChange = (productId: string, size: PaintPresentation) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleColorChange = (productId: string, color: ColorSwatch) => {
    setSelectedColors(prev => ({ ...prev, [productId]: color }));
  };

  const categories = [
    { id: 'todos', label: 'Todas las Líneas' },
    { id: 'vinilo', label: 'Vinilos & Interiores' },
    { id: 'impermeabilizante', label: 'Fachadas & Impermeabilizantes' },
    { id: 'esmalte', label: 'Esmaltes Metales & Madera' },
    { id: 'epoxica', label: 'Epóxicas Alto Tráfico' },
  ];

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Droplets className="w-3.5 h-3.5 text-amber-700" />
            <span>Catálogo Oficial de Envases & Precios</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Envases de Pintura Pintuco® con Precios Claros
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Elige el producto ideal para tu proyecto. Selecciona la presentación (Cuñete, Galón o 1/4) y prueba los tonos de color directamente sobre el envase interactivo.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentSize = getProductSize(product);
            const currentColor = getProductColor(product);
            const priceInfo = product.presentationPrices.find(p => p.size === currentSize) || product.presentationPrices[0];

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Top Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                      {product.badge}
                    </span>
                  </div>
                )}

                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({product.reviewCount})</span>
                </div>

                {/* 3D Paint Can Interactive Display Area */}
                <div className="bg-gradient-to-b from-slate-100 via-slate-50 to-white pt-10 pb-4 px-4 flex flex-col items-center justify-center border-b border-slate-100">
                  <PaintCan3D
                    size={currentSize}
                    brandName={product.name}
                    category={product.category}
                    finish={product.finish}
                    colorHex={currentColor.hex}
                    colorName={currentColor.name}
                    isPopular={currentColor.popular}
                  />

                  {/* Presentation Switcher Pills */}
                  <div className="mt-2 flex items-center justify-center gap-1.5 bg-slate-200/70 p-1 rounded-xl border border-slate-300/60 max-w-full">
                    {product.presentationPrices.map((pres) => (
                      <button
                        key={pres.size}
                        onClick={() => handleSizeChange(product.id, pres.size)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                          currentSize === pres.size
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-700 hover:text-slate-950 hover:bg-white/80'
                        }`}
                      >
                        {pres.size.replace('(5 Galones)', '5 Gal')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Brand and Line Title */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                        Línea {product.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-sm">
                        Acabado {product.finish}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Color Swatches Palette */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-slate-700">
                          Color seleccionado: <strong className="text-blue-700">{currentColor.name}</strong>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {currentColor.code}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        {product.colors.map((color) => {
                          const isColorSelected = currentColor.code === color.code;
                          return (
                            <button
                              key={color.code}
                              onClick={() => handleColorChange(product.id, color)}
                              className={`group relative w-7 h-7 rounded-full transition-transform border-2 flex items-center justify-center ${
                                isColorSelected 
                                  ? 'border-blue-600 ring-2 ring-blue-500/40 scale-110 shadow-sm' 
                                  : 'border-slate-300 hover:scale-105'
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={`${color.name} (${color.code})`}
                            >
                              {isColorSelected && (
                                <Check className={`w-3.5 h-3.5 ${
                                  color.hex === '#FFFFFF' || color.hex === '#F5F5F0' || color.hex === '#E5E7EB' 
                                    ? 'text-slate-900' 
                                    : 'text-white'
                                }`} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tech Specs Micro-Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Rendimiento</span>
                        <span className="font-bold text-slate-800">~{product.coveragePerGallonM2} m²/gal</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Durabilidad</span>
                        <span className="font-bold text-slate-800">{product.durabilityYears} años</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA Section */}
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block">
                          Precio por {currentSize}:
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-slate-950">
                            {formatCOP(priceInfo.price)}
                          </span>
                          {priceInfo.originalPrice && (
                            <span className="text-xs text-slate-400 line-through font-semibold">
                              {formatCOP(priceInfo.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onOpenProductDetail(product)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-0.5"
                        title="Ver ficha técnica"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Ficha</span>
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <button
                        id={`btn-buy-prod-${product.id}`}
                        onClick={() => onBuyProduct(product, currentSize, currentColor)}
                        className="w-full py-2.5 px-3 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Comprar Ahora • {formatCOP(priceInfo.price)}</span>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id={`btn-calc-prod-${product.id}`}
                          onClick={() => onOpenCalculatorWithProduct(product)}
                          className="py-2 px-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1 text-center"
                        >
                          <Calculator className="w-3.5 h-3.5 text-blue-600" />
                          <span>Calcular m²</span>
                        </button>

                        <button
                          id={`btn-buy-quote-${product.id}`}
                          onClick={() => onSelectProductForQuote(product, currentSize, currentColor)}
                          className="py-2 px-2 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center justify-center gap-1 text-center border border-blue-200/60"
                        >
                          <span>Cotizar Mano de Obra</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
