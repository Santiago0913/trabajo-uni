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
import { PurchaseModal } from './components/PurchaseModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';

import { PROJECTS_DATA, PAINT_PRODUCTS_DATA } from './data/mockData';
import { 
  Project, 
  PaintProduct, 
  ProjectCategory, 
  PaintPresentation, 
  ColorSwatch,
  CartItem,
  OrderConfirmation 
} from './types';
import { MessageSquare, Phone, Sparkles, ArrowUp, ShoppingBag } from 'lucide-react';
import { formatCOP } from './utils/formatters';

export default function App() {
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('todos');

  // Shopping Cart & Purchase Flow States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState<boolean>(false);
  const [activePurchaseProduct, setActivePurchaseProduct] = useState<{
    product: PaintProduct;
    size: PaintPresentation;
    color: ColorSwatch;
  } | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);

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

  // Total quantity in cart
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

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

  // Direct Buy Trigger
  const handleBuyProductDirect = (product: PaintProduct, size: PaintPresentation, color: ColorSwatch) => {
    const priceObj = product.presentationPrices.find(p => p.size === size) || product.presentationPrices[0];
    const itemId = `${product.id}-${size}-${color.code}`;

    // Add or increment in cart
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: itemId,
        product,
        size,
        color,
        quantity: 1,
        unitPrice: priceObj.price
      }];
    });

    setActivePurchaseProduct({ product, size, color });
    setIsPurchaseModalOpen(true);
  };

  // Cart helper functions
  const handleUpdateCartQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems(prev => {
      const exists = prev.find(item => item.id === itemId);
      if (exists) {
        return prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item);
      }
      if (activePurchaseProduct) {
        const prod = activePurchaseProduct.product;
        const size = activePurchaseProduct.size;
        const color = activePurchaseProduct.color;
        const price = prod.presentationPrices.find(p => p.size === size)?.price || prod.presentationPrices[0].price;
        return [{
          id: itemId,
          product: prod,
          size,
          color,
          quantity: newQty,
          unitPrice: price
        }];
      }
      return prev;
    });
  };

  const handleAddToCart = (product: PaintProduct, size: PaintPresentation, color: ColorSwatch, quantity = 1) => {
    const priceObj = product.presentationPrices.find(p => p.size === size) || product.presentationPrices[0];
    const itemId = `${product.id}-${size}-${color.code}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, {
        id: itemId,
        product,
        size,
        color,
        quantity,
        unitPrice: priceObj.price
      }];
    });
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== itemId);
      if (updated.length === 0) {
        setActivePurchaseProduct(null);
      }
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    setActivePurchaseProduct(null);
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
        cartCount={totalCartCount}
        onOpenCart={() => {
          // If cart has items or default to first product
          if (cartItems.length === 0 && PAINT_PRODUCTS_DATA[0]) {
            const firstProd = PAINT_PRODUCTS_DATA[0];
            setActivePurchaseProduct({
              product: firstProd,
              size: firstProd.presentationPrices[1]?.size || firstProd.presentationPrices[0].size,
              color: firstProd.colors[0]
            });
          }
          setIsPurchaseModalOpen(true);
        }}
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

        {/* 4. Paint Cans Catalog with Interactive Cans, Prices & Direct Online Purchase */}
        <PaintCansCatalog
          products={PAINT_PRODUCTS_DATA}
          searchQuery={searchQuery}
          onOpenProductDetail={setSelectedPaintDetail}
          onOpenCalculatorWithProduct={handleOpenCalculatorWithProduct}
          onSelectProductForQuote={handleSelectProductForQuote}
          onBuyProduct={handleBuyProductDirect}
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Floating Cart Button if Cart has Items */}
        {totalCartCount > 0 && (
          <button
            id="floating-cart-btn"
            onClick={() => setIsPurchaseModalOpen(true)}
            className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all border border-slate-700 animate-bounce"
            title="Ver carrito de compras"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <span className="text-xs">
              Pagar Pedido ({totalCartCount}) • {formatCOP(totalCartValue)}
            </span>
          </button>
        )}

        {/* Floating WhatsApp Quick Button */}
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
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        initialProduct={activePurchaseProduct?.product}
        initialSize={activePurchaseProduct?.size}
        initialColor={activePurchaseProduct?.color}
        cartItems={cartItems}
        availableProducts={PAINT_PRODUCTS_DATA}
        onUpdateCartItemQty={handleUpdateCartQty}
        onAddToCart={handleAddToCart}
        onRemoveCartItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(order) => setCompletedOrder(order)}
      />

      <OrderSuccessModal
        isOpen={!!completedOrder}
        onClose={() => setCompletedOrder(null)}
        order={completedOrder}
      />

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
        onBuyProduct={handleBuyProductDirect}
      />

      <QuoteSuccessModal
        isOpen={!!quoteSuccessData}
        onClose={() => setQuoteSuccessData(null)}
        data={quoteSuccessData}
      />

    </div>
  );
}
