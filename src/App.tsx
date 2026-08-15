import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { ProjectsGallery } from './components/ProjectsGallery';
import { PaintCansCatalog } from './components/PaintCansCatalog';
import { ServicesProcess } from './components/ServicesProcess';
import { ContactAndMap } from './components/ContactAndMap';
import { PaintCalculatorModal } from './components/PaintCalculatorModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { PaintDetailModal } from './components/PaintDetailModal';
import { QuoteSuccessModal } from './components/QuoteSuccessModal';
import { Footer } from './components/Footer';

import { PROJECTS_DATA, PAINT_PRODUCTS_DATA } from './data/mockData';
import { Project, PaintProduct, ProjectCategory, PaintPresentation, ColorSwatch } from './types';
import { MessageSquare, Phone, Sparkles, ArrowUp } from 'lucide-react';

export default function App() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('todos');

  // Modal States
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [calculatorProduct, setCalculatorProduct] = useState<PaintProduct | undefined>(undefined);
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<Project | null>(null);
  const [selectedPaintDetail, setSelectedPaintDetail] = useState<PaintProduct | null>(null);
  const [quoteSuccessData, setQuoteSuccessData] = useState<any | null>(null);

  // Pre-filled state for the contact quote form
  const [quoteAreaM2, setQuoteAreaM2] = useState<number>(75);
  const [quoteProduct, setQuoteProduct] = useState<string>('Viniltex Avanzada Antibacterial');
  const [quoteEstimatedCost, setQuoteEstimatedCost] = useState<number | undefined>(undefined);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFocusSearch = () => {
    scrollToSection('hero');
    const input = document.getElementById('hero-main-search-input');
    if (input) {
      input.focus();
    }
  };

  // Trigger calculator from catalog
  const handleOpenCalculatorWithProduct = (product: PaintProduct) => {
    setCalculatorProduct(product);
    setIsCalculatorOpen(true);
  };

  // Handle calculator applied to quote
  const handleApplyCalculatorToQuote = (areaM2: number, product: PaintProduct, calculatedCost: number) => {
    setQuoteAreaM2(areaM2);
    setQuoteProduct(product.name);
    setQuoteEstimatedCost(calculatedCost);
    scrollToSection('contacto');
  };

  // Handle selecting a project for a similar quote
  const handleSelectProjectForQuote = (project: Project) => {
    setQuoteAreaM2(project.areaM2);
    if (project.paintUsed[0]) {
      setQuoteProduct(project.paintUsed[0].name);
    }
    scrollToSection('contacto');
  };

  // Handle selecting a paint product to quote
  const handleSelectProductForQuote = (product: PaintProduct, size: PaintPresentation, color: ColorSwatch) => {
    setQuoteProduct(`${product.name} (${size}, Color: ${color.name})`);
    scrollToSection('contacto');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. Header & Navigation */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenCalculator={() => {
          setCalculatorProduct(undefined);
          setIsCalculatorOpen(true);
        }}
        onFocusSearch={handleFocusSearch}
      />

      <main>
        {/* 2. Hero with User Requested Phrase & Live Search Engine */}
        <HeroSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToSection('galeria');
          }}
          onOpenCalculator={() => {
            setCalculatorProduct(undefined);
            setIsCalculatorOpen(true);
          }}
          onNavigate={scrollToSection}
        />

        {/* 3. Interactive Gallery of Completed Projects with Filters & Before/After slider */}
        <ProjectsGallery
          projects={PROJECTS_DATA}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenProjectDetail={setSelectedProjectDetail}
          onSelectProjectForQuote={handleSelectProjectForQuote}
        />

        {/* 4. Paint Cans Catalog with Interactive Cans & Prices */}
        <PaintCansCatalog
          products={PAINT_PRODUCTS_DATA}
          searchQuery={searchQuery}
          onOpenProductDetail={setSelectedPaintDetail}
          onOpenCalculatorWithProduct={handleOpenCalculatorWithProduct}
          onSelectProductForQuote={handleSelectProductForQuote}
        />

        {/* 5. 4-Step Professional Application Process */}
        <ServicesProcess
          onNavigateToQuote={() => scrollToSection('contacto')}
        />

        {/* 6. Contact Section with Quote Form & Interactive Map */}
        <ContactAndMap
          initialAreaM2={quoteAreaM2}
          initialProduct={quoteProduct}
          initialEstimatedCost={quoteEstimatedCost}
          onSuccessSubmit={(formData) => setQuoteSuccessData(formData)}
        />
      </main>

      {/* 7. Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenCalculator={() => {
          setCalculatorProduct(undefined);
          setIsCalculatorOpen(true);
        }}
      />

      {/* Floating Quick WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <a
          id="floating-whatsapp-btn"
          href="https://wa.me/573124567890?text=Hola%20Pintuko,%20deseo%20asesor%C3%ADa%20y%20cotizaci%C3%B3n%20de%20pintura"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all shadow-emerald-500/40"
          title="Chatear con un asesor Pintuko por WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="hidden sm:inline-block text-xs">Cotizar por WhatsApp</span>
        </a>
      </div>

      {/* Modals */}
      <PaintCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        products={PAINT_PRODUCTS_DATA}
        selectedProduct={calculatorProduct}
        onApplyToQuote={handleApplyCalculatorToQuote}
      />

      <ProjectDetailModal
        project={selectedProjectDetail}
        onClose={() => setSelectedProjectDetail(null)}
        onSelectForQuote={handleSelectProjectForQuote}
      />

      <PaintDetailModal
        product={selectedPaintDetail}
        onClose={() => setSelectedPaintDetail(null)}
        onOpenCalculator={(p) => {
          setCalculatorProduct(p);
          setIsCalculatorOpen(true);
        }}
        onSelectForQuote={handleSelectProductForQuote}
      />

      <QuoteSuccessModal
        isOpen={!!quoteSuccessData}
        onClose={() => setQuoteSuccessData(null)}
        data={quoteSuccessData}
      />

    </div>
  );
}
