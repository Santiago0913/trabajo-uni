import React, { useState } from 'react';
import { COMPANY_LOCATIONS, SERVICE_BENEFITS } from '../data/mockData';
import { formatCOP } from '../utils/formatters';
import { OFFICIAL_WHATSAPP_URL } from '../utils/constants';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Clock, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  Navigation,
  Building2,
  Calendar
} from 'lucide-react';

interface ContactAndMapProps {
  initialAreaM2?: number;
  initialProduct?: string;
  initialEstimatedCost?: number;
  onSuccessSubmit: (formData: any) => void;
}

export const ContactAndMap: React.FC<ContactAndMapProps> = ({
  initialAreaM2 = 80,
  initialProduct = 'Viniltex Avanzada Antibacterial',
  initialEstimatedCost,
  onSuccessSubmit
}) => {
  const [selectedLocation, setSelectedLocation] = useState(COMPANY_LOCATIONS[0]);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Bogotá D.C.');
  const [projectType, setProjectType] = useState('Residencial / Interiores');
  const [areaM2, setAreaM2] = useState<number>(initialAreaM2);
  const [notes, setNotes] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<'whatsapp' | 'llamada' | 'email'>('whatsapp');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if props change
  React.useEffect(() => {
    if (initialAreaM2) setAreaM2(initialAreaM2);
  }, [initialAreaM2]);

  // Rough estimation calculation for preview
  const estimatedLaborCost = areaM2 * 18000; // ~$18.000 COP per m² estimated labor
  const estimatedMaterialCost = initialEstimatedCost || (areaM2 * 14000);
  const totalEstimate = estimatedLaborCost + estimatedMaterialCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      fullName,
      phone,
      email,
      city,
      projectType,
      areaM2,
      product: initialProduct,
      notes,
      preferredMethod,
      estimatedTotal: totalEstimate
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccessSubmit(formData);
    }, 600);
  };

  const handleOpenWhatsAppDirect = () => {
    window.open(OFFICIAL_WHATSAPP_URL, '_blank');
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Cotización Inmediata & Atención Personalizada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Agenda tu Visita Técnica o Solicita Cotización
          </h2>
          <p className="text-slate-300 mt-3 text-base sm:text-lg">
            Diagnóstico sin costo en tu domicilio u obra. Te asesoramos con la carta de colores oficial Pintuco® y presupuesto formal con garantía por escrito.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Interactive Quote Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Formulario de Cotización</h3>
                <p className="text-xs text-slate-400 mt-0.5">Respuesta garantizada en menos de 15 minutos</p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[11px] font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Asesores en línea
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Andrés Gómez"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 312 456 7890"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Ciudad / Municipio *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Bogotá D.C.">Bogotá D.C. & Sabana</option>
                    <option value="Medellín">Medellín & Valle de Aburrá</option>
                    <option value="Cali">Cali & Alrededores</option>
                    <option value="Barranquilla">Barranquilla & Costa</option>
                    <option value="Bucaramanga">Bucaramanga & Santander</option>
                    <option value="Otra Ciudad">Otra Ciudad de Colombia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tipo de Proyecto
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Residencial / Interiores">Residencial / Interiores</option>
                    <option value="Fachada / Exterior">Fachada / Exterior en Alturas</option>
                    <option value="Comercial / Oficinas">Comercial / Oficinas</option>
                    <option value="Piso Epóxico / Industrial">Piso Epóxico / Industrial</option>
                    <option value="Impermeabilización Techo/Terraza">Impermeabilización Techo/Terraza</option>
                    <option value="Estuco & Acabado Especial">Estuco Veneciano & Acabados</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-300">
                      Área Aprox. a Pintar:
                    </label>
                    <span className="text-xs font-extrabold text-blue-400">
                      {areaM2} m²
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={600}
                    step={10}
                    value={areaM2}
                    onChange={(e) => setAreaM2(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Preferencia de Contacto
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                      { id: 'llamada', label: 'Llamada', icon: Phone },
                      { id: 'email', label: 'Email', icon: Calendar }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPreferredMethod(method.id as any)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-lg border flex items-center justify-center gap-1 transition-all ${
                          preferredMethod === method.id
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <method.icon className="w-3 h-3" />
                        <span>{method.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Detalles adicionales o requerimientos (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Requiero resanar humedad en el techo y pintar sala y 2 alcobas..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Instant Estimation Summary Box */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 font-medium block">
                    Presupuesto estimado aproximado ({areaM2} m²):
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400">
                    {formatCOP(totalEstimate)} <span className="text-xs font-normal text-slate-400">COP</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Incluye mano de obra calificada + insumos y pintura original Pintuco®
                  </span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDirect}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/30 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    id="btn-submit-quote-form"
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-900/40 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}</span>
                  </button>
                </div>
              </div>

            </form>
          </div>

          {/* RIGHT: Map & Location Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Location Switcher Card */}
            <div className="bg-slate-950/90 rounded-3xl p-6 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Nuestras Sedes & Centros de Color</h3>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-sm border border-emerald-800">
                  {selectedLocation.status}
                </span>
              </div>

              {/* City Selection Tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1 rounded-xl mb-4">
                {COMPANY_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all text-center ${
                      selectedLocation.id === loc.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {loc.city}
                  </button>
                ))}
              </div>

              {/* Active Location Info */}
              <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
                <h4 className="text-sm font-extrabold text-white">
                  {selectedLocation.name}
                </h4>

                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{selectedLocation.address}</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a href={`tel:${selectedLocation.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-300 transition-colors">
                    {selectedLocation.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a 
                    href={OFFICIAL_WHATSAPP_URL} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>WhatsApp: Chatear con un Asesor</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{selectedLocation.hours}</span>
                </div>
              </div>

              {/* INTERACTIVE STYLED MAP EMBED / VISUALIZER */}
              <div className="mt-4 relative h-48 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group">
                
                {/* Stylized Vector Map representation */}
                <div 
                  className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-70"
                />
                
                {/* Simulated Road Grid Visual */}
                <svg className="absolute inset-0 w-full h-full stroke-slate-800" strokeWidth="3" fill="none">
                  <line x1="0" y1="40" x2="100%" y2="80" />
                  <line x1="0" y1="120" x2="100%" y2="60" />
                  <line x1="80" y1="0" x2="120" y2="100%" />
                  <line x1="240" y1="0" x2="200" y2="100%" />
                  <circle cx="50%" cy="50%" r="40" className="stroke-blue-500/20 fill-blue-500/5 animate-pulse" />
                </svg>

                {/* Pin in center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
                  <div className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-md shadow-lg mb-1 whitespace-nowrap flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>Pintuko {selectedLocation.city}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xl ring-4 ring-blue-500/30">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Google Maps Directions Link Button */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.name + ' ' + selectedLocation.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 backdrop-blur-md flex items-center gap-1.5 shadow-md transition-all hover:scale-105 z-20"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-400" />
                  <span>Cómo llegar en Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

            </div>

            {/* Guarantees & Certifications Card */}
            <div className="bg-gradient-to-r from-blue-950/60 to-slate-950 rounded-2xl p-5 border border-blue-900/40">
              <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Póliza de Cumplimiento & Garantía Pintuco®</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Pintores con afiliación a seguridad social y certificados en alturas.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Entrega con acta de conformidad y certificado de garantía hasta por 5 años.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Facturación legal con IVA para personas naturales y copropiedades.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
