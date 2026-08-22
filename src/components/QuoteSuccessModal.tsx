import React from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Sparkles, 
  Calendar, 
  X,
  FileCheck
} from 'lucide-react';
import { formatCOP } from '../utils/formatters';
import { OFFICIAL_WHATSAPP_URL } from '../utils/constants';

interface QuoteSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const QuoteSuccessModal: React.FC<QuoteSuccessModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  if (!isOpen || !data) return null;

  const handleWhatsApp = () => {
    window.open(OFFICIAL_WHATSAPP_URL, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-black tracking-tight">
            ¡Solicitud Recibida con Éxito!
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Un maestro pintor certificado Pintuco® revisará tus requerimientos.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-slate-700">
          
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Cliente:</span>
              <span className="font-bold text-slate-900">{data.fullName || 'No especificado'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Teléfono:</span>
              <span className="font-bold text-slate-900">{data.phone || 'No especificado'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ubicación:</span>
              <span className="font-bold text-slate-900">{data.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Proyecto:</span>
              <span className="font-bold text-slate-900">{data.projectType} (~{data.areaM2} m²)</span>
            </div>
            {data.estimatedTotal && (
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-700">Presupuesto Estimado:</span>
                <span className="font-black text-emerald-600 text-sm">{formatCOP(data.estimatedTotal)} COP</span>
              </div>
            )}
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Te enviaremos la propuesta técnica detallada con desglose de insumos.</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Visita de evaluación técnica presencial sin ningún costo ni compromiso.</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirmar y Chatear por WhatsApp Ahora</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cerrar y Seguir Navegando
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
