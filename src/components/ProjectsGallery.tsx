import React, { useState, useMemo } from 'react';
import { 
  Project, 
  ProjectCategory 
} from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { 
  Paintbrush, 
  Clock, 
  MapPin, 
  Maximize2, 
  Star, 
  Sparkles, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';

interface ProjectsGalleryProps {
  projects: Project[];
  searchQuery: string;
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onOpenProjectDetail: (project: Project) => void;
  onSelectProjectForQuote: (project: Project) => void;
}

const CATEGORY_TABS: { id: ProjectCategory; label: string; icon?: string }[] = [
  { id: 'todos', label: 'Todos los Proyectos' },
  { id: 'residencial', label: 'Residencial & Interiores' },
  { id: 'fachadas', label: 'Fachadas & Exteriores' },
  { id: 'comercial', label: 'Comercial & Oficinas' },
  { id: 'industrial', label: 'Pisos & Industrial' },
  { id: 'impermeabilizacion', label: 'Impermeabilización' },
  { id: 'decorativo', label: 'Acabados Decorativos' },
];

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  projects,
  searchQuery,
  selectedCategory,
  onSelectCategory,
  onOpenProjectDetail,
  onSelectProjectForQuote
}) => {
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category check
      const matchesCategory = selectedCategory === 'todos' || project.category === selectedCategory;

      // Search query check
      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.location.toLowerCase().includes(q) ||
        project.tags.some(tag => tag.toLowerCase().includes(q)) ||
        project.paintUsed.some(p => p.name.toLowerCase().includes(q) || p.colorName.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="galeria" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Paintbrush className="w-3.5 h-3.5" />
              <span>Galería de Trabajos Realizados</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Transformaciones Reales & Acabados de Calidad
            </h2>
            <p className="text-slate-600 mt-2 text-base max-w-2xl">
              Explora nuestros proyectos ejecutados. Desliza sobre las imágenes para comparar el <strong className="text-slate-800">antes y después</strong> de la aplicación con pinturas Pintuco®.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs self-start md:self-auto">
            Mostrando <span className="text-blue-600 font-bold">{filteredProjects.length}</span> de {projects.length} proyectos
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrar:</span>
          </div>
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-102'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-md mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Paintbrush className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No encontramos proyectos con ese criterio</h3>
            <p className="text-sm text-slate-500 mt-1">
              Prueba cambiando los términos de búsqueda o seleccionando "Todos los Proyectos".
            </p>
            <button
              onClick={() => {
                onSelectCategory('todos');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver todos los proyectos
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Before/After Interactive Viewer Container */}
              <div className="relative aspect-4/3 w-full bg-slate-900">
                <BeforeAfterSlider
                  imageBefore={project.imageBefore}
                  imageAfter={project.imageAfter}
                  title={project.title}
                  className="w-full h-full"
                />
                
                {/* Fullscreen detail trigger overlay */}
                <button
                  onClick={() => onOpenProjectDetail(project)}
                  className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/70 hover:bg-black/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center gap-1 shadow-lg"
                  title="Ver ficha técnica completa del proyecto"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Ver Detalles</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Meta Tags */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1 text-slate-600 font-medium truncate max-w-[65%]">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {project.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onOpenProjectDetail(project)}
                    className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer leading-snug"
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Paint Products Used with Color Swatches */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Pinturas Pintuco® Aplicadas:
                  </div>
                  <div className="space-y-1.5">
                    {project.paintUsed.map((paint, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                        <span className="font-semibold text-slate-800 truncate pr-2">
                          {paint.name}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs shrink-0"
                            style={{ backgroundColor: paint.colorHex }}
                            title={paint.colorName}
                          />
                          <span className="text-[11px] text-slate-500 font-medium">
                            {paint.colorName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating & Client Quote Snippet */}
                <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-blue-900">
                      {project.review.author}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 italic line-clamp-2">
                    "{project.review.comment}"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    id={`btn-detail-${project.id}`}
                    onClick={() => onOpenProjectDetail(project)}
                    className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center"
                  >
                    Ver Ficha
                  </button>
                  <button
                    id={`btn-quote-${project.id}`}
                    onClick={() => onSelectProjectForQuote(project)}
                    className="flex-1 py-2.5 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Cotizar Similar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
