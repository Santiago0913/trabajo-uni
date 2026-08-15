import React from 'react';
import { Project } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { 
  X, 
  MapPin, 
  Clock, 
  Maximize2, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectForQuote: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectForQuote
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative flex justify-between items-start">
          <div className="pr-10">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                {project.category}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {project.clientType}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {project.duration}
              </span>
              <span className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                {project.areaM2} m² intervenidos
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* High-res Before / After Slider */}
          <div className="aspect-16/9 w-full bg-slate-900 rounded-2xl overflow-hidden shadow-md">
            <BeforeAfterSlider
              imageBefore={project.imageBefore}
              imageAfter={project.imageAfter}
              title={project.title}
              className="w-full h-full"
            />
          </div>

          {/* Description & Work Executed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Descripción del Proyecto
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Procedimiento & Fases de Aplicación
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Review */}
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-blue-900">
                    Opinión del Cliente: {project.review.author}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-700 italic">
                  "{project.review.comment}"
                </p>
              </div>
            </div>

            {/* Paints & Materials column */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Materiales Pintuco® Utilizados
              </h4>
              
              <div className="space-y-2.5">
                {project.paintUsed.map((p, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                    <span className="text-xs font-bold text-slate-900 block">
                      {p.name}
                    </span>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Acabado: {p.finish}</span>
                      <div className="flex items-center gap-1">
                        <span
                          className="w-3 h-3 rounded-full border border-slate-300"
                          style={{ backgroundColor: p.colorHex }}
                        />
                        <span>{p.colorName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 text-center">
                <span className="flex items-center justify-center gap-1 text-[11px] font-bold text-blue-700 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Garantía Oficial Pintuco
                </span>
                <button
                  onClick={() => {
                    onSelectForQuote(project);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                >
                  <span>Cotizar Trabajo Similar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
