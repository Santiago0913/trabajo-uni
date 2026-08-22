import React from 'react';
import { 
  Paintbrush, 
  Shield, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Heart,
  ArrowUp
} from 'lucide-react';
import { OFFICIAL_WHATSAPP_URL } from '../utils/constants';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCalculator }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Paintbrush className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                PINTU<span className="text-blue-500">KO</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Especialistas en servicios de pintura profesional residencial, comercial e industrial. Aplicamos exclusivamente productos originales Pintuco® con garantía certificada y pintores acreditados.
            </p>

            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Garantía formal por escrito hasta por 5 años</span>
            </div>
          </div>

          {/* Col 3: Enlaces Rápidos */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
                  Inicio & Buscador
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('galeria')} className="hover:text-white transition-colors">
                  Galería Antes / Después
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogo')} className="hover:text-white transition-colors">
                  Catálogo de Envases & Precios
                </button>
              </li>
              <li>
                <button onClick={onOpenCalculator} className="hover:text-white transition-colors">
                  Calculadora de Galones (m²)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contacto')} className="hover:text-white transition-colors">
                  Cotizador & Sedes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Líneas Pintuco */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Líneas de Pintura
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Viniltex Avanzada (Lavable)</li>
              <li>Koraza 5 Años (Fachadas)</li>
              <li>Pintulux Esmalte Sintético</li>
              <li>Pintucoat Epóxica Pisos</li>
              <li>Aquablock Impermeabilizante</li>
              <li>Estucos & Efectos Especiales</li>
            </ul>
          </div>

          {/* Col 5: Cobertura & Atención */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-3">
              Atención al Cliente
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+57 (601) 745-9800</span>
              </li>
              <li>
                <a 
                  href={OFFICIAL_WHATSAPP_URL} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Oficial: Chatear Aquí</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>proyectos@pintuko.com.co</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>Bogotá • Medellín • Cali • Barranquilla</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Pintuko. Todos los derechos reservados. Distribuidor y aplicador autorizado de pinturas Pintuco®.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800 transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
