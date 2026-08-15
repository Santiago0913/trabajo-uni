import React, { useState } from 'react';
import { PaintProduct } from '../types';
import { calculatePaintNeed, formatCOP } from '../utils/formatters';
import { 
  X, 
  Calculator, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Info,
  PackageCheck
} from 'lucide-react';

interface PaintCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: PaintProduct[];
  selectedProduct?: PaintProduct;
  onApplyToQuote: (areaM2: number, product: PaintProduct, calculatedCost: number) => void;
}

export const PaintCalculatorModal: React.FC<PaintCalculatorModalProps> = ({
  isOpen,
  onClose,
  products,
  selectedProduct,
  onApplyToQuote
}) => {
  const [activeTab, setActiveTab] = useState<'direct' | 'dimensions'>('direct');
  const [areaM2, setAreaM2] = useState<number>(65);
  const [wallLength, setWallLength] = useState<number>(4);
  const [wallHeight, setWallHeight] = useState<number>(2.5);
  const [numberOfWalls, setNumberOfWalls] = useState<number>(4);
  const [coats, setCoats] = useState<number>(2);
  const [chosenProductId, setChosenProductId] = useState<string>(
    selectedProduct?.id || products[0]?.id || ''
  );

  if (!isOpen) return null;

  const currentProduct = products.find(p => p.id === chosenProductId) || products[0];

  // Calculate actual area
  const effectiveArea = activeTab === 'direct' 
    ? areaM2 
    : wallLength * wallHeight * numberOfWalls;

  const calculation = calculatePaintNeed(
    effectiveArea, 
    coats, 
    currentProduct?.coveragePerGallonM2 || 35
  );

  // Price estimate calculations
  const priceGalon = currentProduct?.presentationPrices.find(p => p.size === '1 Galón')?.price || 85000;
  const priceCunete = currentProduct?.presentationPrices.find(p => p.size === 'Cuñete (5 Galones)')?.price || 380000;
  const priceCuarto = currentProduct?.presentationPrices.find(p => p.size === '1/4 Galón')?.price || 28000;

  const estimatedProductCost = 
    (calculation.recommendedPacks.cuñetes * priceCunete) +
    (calculation.recommendedPacks.galones * priceGalon) +
    (calculation.recommendedPacks.cuartos * priceCuarto);

  const handleApply = () => {
    onApplyToQuote(effectiveArea, currentProduct, estimatedProductCost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calculator className="w-4 h-4" />
            <span>Herramienta Técnica Pintuco®</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Calculadora de Pintura & Metros Cuadrados
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Calcula exactamente cuántos galones y cuñetes necesitas para tu espacio sin desperdicios.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('direct')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'direct'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ingresar Área Total (m²)
            </button>
            <button
              onClick={() => setActiveTab('dimensions')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'dimensions'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Calcular por Medidas de Muros
            </button>
          </div>

          {/* Dimension Inputs */}
          {activeTab === 'direct' ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700">
                  Área estimada a pintar:
                </label>
                <span className="text-sm font-extrabold text-blue-600">
                  {effectiveArea} m²
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={areaM2}
                onChange={(e) => setAreaM2(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5 m² (Baño/Muro pequeño)</span>
                <span>100 m² (Apartamento)</span>
                <span>500 m² (Casa grande / Fachada)</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Largo Muro (m)
                </label>
                <input
                  type="number"
                  min={1}
                  step={0.5}
                  value={wallLength}
                  onChange={(e) => setWallLength(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Alto Muro (m)
                </label>
                <input
                  type="number"
                  min={1}
                  step={0.1}
                  value={wallHeight}
                  onChange={(e) => setWallHeight(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  N° de Muros
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={numberOfWalls}
                  onChange={(e) => setNumberOfWalls(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Product and Coats Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Producto Pintuco a utilizar:
              </label>
              <select
                value={chosenProductId}
                onChange={(e) => setChosenProductId(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 text-slate-800"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (~{p.coveragePerGallonM2} m²/gal)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Número de manos recomendadas:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setCoats(num)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      coats === num
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num} {num === 1 ? 'mano' : 'manos'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RESULTS CARD */}
          <div className="bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 p-5 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between border-b border-blue-200/60 pb-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Resultado del Cálculo
              </span>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">
                {effectiveArea} m² × {coats} manos = {calculation.totalM2ToPaint} m² totales
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <div className="text-3xl font-black text-slate-900">
                  {calculation.gallonsNeeded} <span className="text-lg font-bold text-slate-600">Galones</span>
                </div>
                <div className="text-xs text-slate-600 font-medium mt-1">
                  Distribución óptima de envases sugerida:
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {calculation.recommendedPacks.cuñetes > 0 && (
                    <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-md">
                      {calculation.recommendedPacks.cuñetes} Cuñete(s) (5 Gal)
                    </span>
                  )}
                  {calculation.recommendedPacks.galones > 0 && (
                    <span className="px-2.5 py-1 bg-slate-800 text-white text-xs font-bold rounded-md">
                      {calculation.recommendedPacks.galones} Galón(es)
                    </span>
                  )}
                  {calculation.recommendedPacks.cuartos > 0 && (
                    <span className="px-2.5 py-1 bg-slate-200 text-slate-800 text-xs font-bold rounded-md">
                      {calculation.recommendedPacks.cuartos} 1/4 Galón
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:border-l sm:border-blue-200 sm:pl-4">
                <span className="text-xs text-slate-500 font-medium block">
                  Costo estimado en pintura:
                </span>
                <div className="text-2xl font-black text-blue-700">
                  {formatCOP(estimatedProductCost)}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  * Precio de producto Pintuco® original. No incluye mano de obra profesional ni preparación.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cerrar
          </button>

          <button
            id="btn-apply-calculator-to-quote"
            onClick={handleApply}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Aplicar Cálculo a Mi Cotización</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
