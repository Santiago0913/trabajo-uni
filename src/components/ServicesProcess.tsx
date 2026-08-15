import React from 'react';
import { 
  ClipboardCheck, 
  Sparkles, 
  Paintbrush, 
  ShieldCheck, 
  ArrowRight,
  Droplets,
  Layers
} from 'lucide-react';

interface ServicesProcessProps {
  onNavigateToQuote: () => void;
}

export const ServicesProcess: React.FC<ServicesProcessProps> = ({ onNavigateToQuote }) => {
  const steps = [
    {
      number: '01',
      title: 'Diagnóstico & Asesoría de Color',
      description: 'Visitamos tu inmueble, medimos con láser, evaluamos humedad y te presentamos la carta de colores oficial Pintuco.',
      icon: ClipboardCheck,
      badge: 'Gratuito'
    },
    {
      number: '02',
      title: 'Protección Total & Preparación',
      description: 'Enmascaramos pisos, zócalos y muebles con plástico protector. Resanamos microfisuras y lijamos sin polvo.',
      icon: Layers,
      badge: 'Cero Suciedad'
    },
    {
      number: '03',
      title: 'Aplicación Profesional',
      description: 'Aplicamos el número de manos exacto con equipo airless o rodillos profesionales para un acabado uniforme y sin marcas.',
      icon: Paintbrush,
      badge: 'Pintores SENA'
    },
    {
      number: '04',
      title: 'Entrega Limpia & Garantía',
      description: 'Retiramos toda la protección, dejamos todo impecable y te entregamos tu acta de garantía certificada por hasta 5 años.',
      icon: ShieldCheck,
      badge: 'Hasta 5 Años'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-950 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Metodología Certificada Pintuko</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Cómo realizamos tu proyecto de pintura?
          </h2>
          <p className="text-slate-300 mt-2 text-sm sm:text-base">
            Garantizamos rapidez, máxima limpieza y durabilidad comprobada en cada capa aplicada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between hover:border-blue-500/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-700 group-hover:text-blue-500 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div className="inline-block px-2 py-0.5 bg-blue-950 text-blue-300 text-[10px] font-bold rounded-sm border border-blue-800 mb-2">
                  {step.badge}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>Paso {idx + 1} de 4</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onNavigateToQuote}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-102"
          >
            <span>Quiero Agendar una Visita Técnica Gratis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
