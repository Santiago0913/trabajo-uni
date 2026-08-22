import React, { useState } from 'react';
import { 
  Paintbrush, 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Shield, 
  Calculator, 
  Sparkles,
  MapPin,
  Search,
  ShoppingBag
} from 'lucide-react';
import { OFFICIAL_WHATSAPP_URL } from '../utils/constants';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenCalculator: () => void;
  onFocusSearch: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onOpenCalculator,
  onFocusSearch,
  cartCount = 0,
  onOpenCart
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Galería de Trabajos', id: 'galeria' },
    { label: 'Catálogo de Pinturas', id: 'catalogo' },
    { label: 'Calculadora', action: onOpenCalculator },
    { label: 'Contacto & Sedes', id: 'contacto' },
  ];

  const handleLinkClick = (link: { id?: string; action?: () => void }) => {
    if (link.action) {
      link.action();
    } else if (link.id) {
      onNavigate(link.id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar for quick contact */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Shield className="w-3.5 h-3.5" />
              Garantía Certificada Pintuco® hasta 5 años
            </span>
            <span className="hidden sm:inline-block text-slate-400">•</span>
            <span className="hidden sm:inline-block text-slate-300">
              Mano de obra profesional & pinturas originales
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:+576017459800" 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>(601) 745-9800</span>
            </a>
            <a 
              href={OFFICIAL_WHATSAPP_URL} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp Inmediato</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <button 
            id="brand-logo-btn"
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Paintbrush className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  PINTU<span className="text-blue-600">KO</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 rounded-sm">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                Servicios & Pinturas Profesionales
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(link)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              id="nav-search-shortcut-btn"
              onClick={onFocusSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200"
              title="Buscar proyectos y pinturas"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Buscar...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-400">
                /
              </kbd>
            </button>

            <button
              id="nav-calc-btn"
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 rounded-lg border border-blue-200/60 transition-colors"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Calculadora m²</span>
            </button>

            {onOpenCart && (
              <button
                id="nav-cart-btn"
                onClick={onOpenCart}
                className="relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-black text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 rounded-lg transition-all shadow-2xs"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>Comprar / Carrito</span>
                {cartCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[10px] font-black animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            <button
              id="nav-quote-cta-btn"
              onClick={() => onNavigate('contacto')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/30 transition-all hover:shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Cotizar Gratis</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-1.5 md:hidden">
            {onOpenCart && (
              <button
                id="mobile-cart-btn"
                onClick={onOpenCart}
                className="relative p-2 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg"
                aria-label="Abrir Carrito"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-black flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button
              id="mobile-calc-quick-btn"
              onClick={onOpenCalculator}
              className="p-2 text-blue-600 bg-blue-50 rounded-lg"
              aria-label="Calculadora de Pintura"
            >
              <Calculator className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-100 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenCalculator();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-blue-700 bg-blue-50 rounded-lg border border-blue-200"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculadora m²</span>
            </button>
            <button
              onClick={() => {
                onNavigate('contacto');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Cotizar Ahora</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
