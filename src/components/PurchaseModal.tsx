import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  PaintProduct, 
  PaintPresentation, 
  ColorSwatch, 
  CartItem, 
  DocumentType, 
  PaymentMethodType, 
  CheckoutFormState, 
  OrderConfirmation 
} from '../types';
import { 
  COLOMBIAN_BANKS, 
  COLOMBIA_LOCATIONS, 
  DOCUMENT_TYPE_LABELS 
} from '../data/colombiaData';
import { 
  validateDocNumber, 
  validateFullName, 
  validatePhone, 
  validateEmail, 
  validateAddress, 
  detectCardFranchise, 
  validateCardNumber, 
  validateCardExpiry, 
  validateCardCvv 
} from '../utils/checkoutValidation';
import { formatCOP } from '../utils/formatters';
import { PaintCan3D } from './PaintCan3D';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Building2, 
  UserCheck, 
  Lock, 
  Check, 
  AlertCircle, 
  Smartphone, 
  Banknote, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingBag, 
  FileText, 
  Sparkles,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: PaintProduct;
  initialSize?: PaintPresentation;
  initialColor?: ColorSwatch;
  cartItems: CartItem[];
  availableProducts?: PaintProduct[];
  onUpdateCartItemQty: (itemId: string, newQty: number) => void;
  onAddToCart?: (product: PaintProduct, size: PaintPresentation, color: ColorSwatch, quantity?: number) => void;
  onRemoveCartItem: (itemId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: OrderConfirmation) => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  initialSize,
  initialColor,
  cartItems,
  availableProducts = [],
  onUpdateCartItemQty,
  onAddToCart,
  onRemoveCartItem,
  onClearCart,
  onOrderSuccess
}) => {
  // Step navigation: 1: Datos Personales, 2: Entrega, 3: Pago & Bancos
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [bankSearchTerm, setBankSearchTerm] = useState<string>('');
  const [isAddingMoreOpen, setIsAddingMoreOpen] = useState<boolean>(false);
  const initializedRef = useRef<boolean>(false);

  // Auto-sync initial product into cartItems if cart is empty on open
  useEffect(() => {
    if (isOpen) {
      if (!initializedRef.current && cartItems.length === 0 && initialProduct && onAddToCart) {
        const size = initialSize || initialProduct.presentationPrices[1]?.size || initialProduct.presentationPrices[0].size;
        const color = initialColor || initialProduct.colors[0];
        onAddToCart(initialProduct, size, color, 1);
        initializedRef.current = true;
      }
    } else {
      initializedRef.current = false;
    }
  }, [isOpen, initialProduct, initialSize, initialColor, onAddToCart]);

  // Form State
  const [form, setForm] = useState<CheckoutFormState>({
    docType: 'CC',
    docNumber: '',
    fullName: '',
    email: '',
    phone: '',

    department: 'Bogotá D.C.',
    city: 'Bogotá D.C. (Usaquén, Chapinero, Suba, Teusaquillo, etc.)',
    addressLine1: '',
    addressDetails: '',
    neighborhood: '',
    deliveryNotes: '',

    requireElectronicInvoice: false,
    businessName: '',
    nit: '',
    invoiceEmail: '',

    paymentMethod: 'PSE',
    pseBankCode: '1007', // Bancolombia default
    psePersonType: 'NATURAL',
    pseUserEmail: '',

    cardNumber: '',
    cardHolderName: '',
    cardExpiry: '',
    cardCvv: '',
    cardInstallments: 1,

    walletPhone: '',

    acceptDataPolicy: true,
    acceptTerms: true
  });

  // Track field touch state for pristine vs dirty validation display
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Active items in cart directly bound to cartItems state
  const activeItems = cartItems;

  // Financial calculations
  const subtotal = useMemo(() => {
    return activeItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  }, [activeItems]);

  const freeShippingThreshold = 150000;
  const isShippingFree = subtotal >= freeShippingThreshold;
  const shippingCost = subtotal === 0 ? 0 : (isShippingFree ? 0 : 15000);
  const taxIva = Math.round(subtotal * 0.19 / 1.19); // 19% IVA included
  const total = subtotal + shippingCost;

  // Selected department cities
  const currentDepartmentCities = useMemo(() => {
    const found = COLOMBIA_LOCATIONS.find(d => d.department === form.department);
    return found ? found.cities : [];
  }, [form.department]);

  // Filtered banks for PSE search
  const filteredBanks = useMemo(() => {
    if (!bankSearchTerm.trim()) return COLOMBIAN_BANKS;
    const q = bankSearchTerm.toLowerCase();
    return COLOMBIAN_BANKS.filter(b => b.name.toLowerCase().includes(q) || b.code.includes(q));
  }, [bankSearchTerm]);

  // Validation States
  const docValidation = useMemo(() => validateDocNumber(form.docType, form.docNumber), [form.docType, form.docNumber]);
  const nameValidation = useMemo(() => validateFullName(form.fullName), [form.fullName]);
  const phoneValidation = useMemo(() => validatePhone(form.phone), [form.phone]);
  const emailValidation = useMemo(() => validateEmail(form.email), [form.email]);
  const addressValidation = useMemo(() => validateAddress(form.addressLine1), [form.addressLine1]);

  // Card Validations
  const detectedFranchise = useMemo(() => detectCardFranchise(form.cardNumber), [form.cardNumber]);
  const cardNumberValidation = useMemo(() => validateCardNumber(form.cardNumber), [form.cardNumber]);
  const cardExpiryValidation = useMemo(() => validateCardExpiry(form.cardExpiry), [form.cardExpiry]);
  const cardCvvValidation = useMemo(() => validateCardCvv(form.cardCvv), [form.cardCvv]);

  const isStep1Valid = docValidation.isValid && nameValidation.isValid && phoneValidation.isValid && emailValidation.isValid;
  const isStep2Valid = addressValidation.isValid && form.department && form.city;

  const isStep3Valid = useMemo(() => {
    if (!form.acceptTerms || !form.acceptDataPolicy) return false;

    if (form.paymentMethod === 'PSE') {
      const pseEmailValid = form.pseUserEmail ? validateEmail(form.pseUserEmail).isValid : emailValidation.isValid;
      return !!form.pseBankCode && pseEmailValid;
    }

    if (form.paymentMethod === 'CARD') {
      return cardNumberValidation.isValid && 
             cardExpiryValidation.isValid && 
             cardCvvValidation.isValid && 
             form.cardHolderName.trim().length >= 4;
    }

    if (form.paymentMethod === 'NEQUI_DAVIPLATA') {
      const walletNumber = form.walletPhone || form.phone;
      return validatePhone(walletNumber).isValid;
    }

    if (form.paymentMethod === 'CASH_ON_DELIVERY') {
      return true;
    }

    return true;
  }, [form, emailValidation, cardNumberValidation, cardExpiryValidation, cardCvvValidation]);

  // Helper to mark field touched
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Handle department change to reset city default
  const handleDepartmentChange = (dept: string) => {
    const loc = COLOMBIA_LOCATIONS.find(d => d.department === dept);
    setForm(prev => ({
      ...prev,
      department: dept,
      city: loc ? loc.cities[0] : ''
    }));
  };

  // Execute Checkout Payment Simulation
  const handleProcessOrder = () => {
    // Touch all fields to show errors if any
    setTouched({
      docNumber: true,
      fullName: true,
      phone: true,
      email: true,
      addressLine1: true,
      cardNumber: true,
      cardHolderName: true,
      cardExpiry: true,
      cardCvv: true
    });

    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Generate Order confirmation
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const randomCus = Math.floor(100000 + Math.random() * 900000);
      const now = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 2);

      let methodLabel = 'PSE - Pagos Seguros en Línea';
      let bankOrFranchise = COLOMBIAN_BANKS.find(b => b.code === form.pseBankCode)?.name || 'Bancolombia';

      if (form.paymentMethod === 'CARD') {
        methodLabel = `Tarjeta de Crédito (${detectedFranchise.toUpperCase()})`;
        bankOrFranchise = `${detectedFranchise.toUpperCase()} **** ${form.cardNumber.replace(/\D/g, '').slice(-4)}`;
      } else if (form.paymentMethod === 'NEQUI_DAVIPLATA') {
        methodLabel = 'Nequi / Daviplata Transferencia Directa';
        bankOrFranchise = `Celular ${form.walletPhone || form.phone}`;
      } else if (form.paymentMethod === 'CASH_ON_DELIVERY') {
        methodLabel = 'Pago Contra Entrega (Efectivo / Datáfono en puerta)';
        bankOrFranchise = 'Cobro al repartidor oficial';
      }

      const orderData: OrderConfirmation = {
        orderId: `PK-${now.getFullYear()}-${randomOrderNum}`,
        trackingNumber: `COL-SERVI-${randomCus}`,
        date: now.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'APROBADO',
        customer: {
          fullName: form.fullName,
          docType: form.docType,
          docNumber: form.docNumber,
          email: form.email,
          phone: form.phone
        },
        shippingAddress: {
          department: form.department,
          city: form.city,
          addressLine1: form.addressLine1,
          addressDetails: form.addressDetails || 'Sin detalles adicionales',
          neighborhood: form.neighborhood || 'Zona Urbana',
          deliveryNotes: form.deliveryNotes
        },
        items: activeItems,
        payment: {
          method: form.paymentMethod,
          methodLabel,
          bankOrFranchise,
          approvalCode: `CUS-${randomCus}`,
          installments: form.paymentMethod === 'CARD' ? form.cardInstallments : undefined,
          subtotal,
          shippingCost,
          discount: 0,
          taxIva,
          total
        },
        estimatedDeliveryDate: deliveryDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })
      };

      onClearCart();
      onOrderSuccess(orderData);
      onClose();
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Security & Stepper */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Finalizar Compra Segura</span>
                  <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    SSL 256-Bit
                  </span>
                </h3>
                <p className="text-xs text-slate-300">
                  Despacho oficial certificado Pintuco® con garantía de fábrica
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={isProcessing}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Tabs */}
          <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                currentStep === 1 
                  ? 'bg-blue-600 text-white' 
                  : isStep1Valid 
                    ? 'bg-slate-800 text-emerald-300' 
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === 1 ? 'bg-white text-blue-700' : isStep1Valid ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
              }`}>
                {isStep1Valid ? <Check className="w-3.5 h-3.5" /> : '1'}
              </div>
              <div className="hidden sm:block">
                <span className="text-[11px] font-bold block leading-none">Paso 1</span>
                <span className="text-xs font-medium opacity-90">Cédula & Datos</span>
              </div>
            </button>

            <button
              onClick={() => {
                if (isStep1Valid) setCurrentStep(2);
                else handleBlur('docNumber');
              }}
              className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                currentStep === 2 
                  ? 'bg-blue-600 text-white' 
                  : isStep2Valid 
                    ? 'bg-slate-800 text-emerald-300' 
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === 2 ? 'bg-white text-blue-700' : isStep2Valid ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
              }`}>
                {isStep2Valid ? <Check className="w-3.5 h-3.5" /> : '2'}
              </div>
              <div className="hidden sm:block">
                <span className="text-[11px] font-bold block leading-none">Paso 2</span>
                <span className="text-xs font-medium opacity-90">Dirección de Entrega</span>
              </div>
            </button>

            <button
              onClick={() => {
                if (isStep1Valid && isStep2Valid) setCurrentStep(3);
                else {
                  handleBlur('docNumber');
                  handleBlur('addressLine1');
                }
              }}
              className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                currentStep === 3 
                  ? 'bg-blue-600 text-white' 
                  : isStep3Valid 
                    ? 'bg-slate-800 text-emerald-300' 
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === 3 ? 'bg-white text-blue-700' : isStep3Valid ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
              }`}>
                {isStep3Valid ? <Check className="w-3.5 h-3.5" /> : '3'}
              </div>
              <div className="hidden sm:block">
                <span className="text-[11px] font-bold block leading-none">Paso 3</span>
                <span className="text-xs font-medium opacity-90">Pago & Bancos</span>
              </div>
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 max-h-[68vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Col: Step Form Content */}
            <div className="lg:col-span-7 space-y-6">

              {/* ================= STEP 1: IDENTIFICACION & DATOS ================= */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-slate-900 pb-2 border-b border-slate-100">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <h4 className="text-base font-extrabold">1. Validación de Identidad del Comprador</h4>
                  </div>

                  {/* Tipo de Documento y Número de Cédula */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tipo de Documento <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="checkout-doc-type"
                        value={form.docType}
                        onChange={(e) => setForm(prev => ({ ...prev, docType: e.target.value as DocumentType }))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                      >
                        <option value="CC">Cédula de Ciudadanía (C.C.)</option>
                        <option value="CE">Cédula de Extranjería (C.E.)</option>
                        <option value="NIT">NIT (Empresas / Jurídica)</option>
                        <option value="PAS">Pasaporte (Extranjeros)</option>
                        <option value="PPT">Permiso Temporal (PPT)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-7">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Número de Cédula / Documento <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="checkout-doc-number"
                          type="text"
                          value={form.docNumber}
                          onChange={(e) => setForm(prev => ({ ...prev, docNumber: e.target.value }))}
                          onBlur={() => handleBlur('docNumber')}
                          placeholder={DOCUMENT_TYPE_LABELS[form.docType]?.placeholder || 'Ej: 1013101871'}
                          className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden transition-all ${
                            touched.docNumber && !docValidation.isValid
                              ? 'border-red-400 ring-2 ring-red-100'
                              : touched.docNumber && docValidation.isValid
                                ? 'border-emerald-500 ring-2 ring-emerald-50'
                                : 'border-slate-300 focus:border-blue-600'
                          }`}
                        />
                        {touched.docNumber && (
                          <div className="absolute right-3 top-2.5">
                            {docValidation.isValid ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      <p className={`text-[11px] mt-1 ${touched.docNumber && !docValidation.isValid ? 'text-red-500 font-semibold' : 'text-slate-500'}`}>
                        {touched.docNumber && !docValidation.isValid ? docValidation.message : DOCUMENT_TYPE_LABELS[form.docType]?.helper}
                      </p>
                    </div>
                  </div>

                  {/* Nombre Completo */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nombres y Apellidos Completos <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="checkout-fullname"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                        onBlur={() => handleBlur('fullName')}
                        placeholder="Ej: Andrés Felipe Martínez Gómez"
                        className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden transition-all ${
                          touched.fullName && !nameValidation.isValid
                            ? 'border-red-400 ring-2 ring-red-100'
                            : touched.fullName && nameValidation.isValid
                              ? 'border-emerald-500 ring-2 ring-emerald-50'
                              : 'border-slate-300 focus:border-blue-600'
                        }`}
                      />
                      {touched.fullName && (
                        <div className="absolute right-3 top-2.5">
                          {nameValidation.isValid ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {touched.fullName && !nameValidation.isValid && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1">
                        {nameValidation.message}
                      </p>
                    )}
                  </div>

                  {/* Celular y Correo Electrónico */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Teléfono Celular de Contacto <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="checkout-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                          onBlur={() => handleBlur('phone')}
                          placeholder="Ej: 312 456 7890"
                          className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden transition-all ${
                            touched.phone && !phoneValidation.isValid
                              ? 'border-red-400 ring-2 ring-red-100'
                              : touched.phone && phoneValidation.isValid
                                ? 'border-emerald-500 ring-2 ring-emerald-50'
                                : 'border-slate-300 focus:border-blue-600'
                          }`}
                        />
                        {touched.phone && (
                          <div className="absolute right-3 top-2.5">
                            {phoneValidation.isValid ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      <p className={`text-[11px] mt-1 ${touched.phone && !phoneValidation.isValid ? 'text-red-500 font-semibold' : 'text-slate-500'}`}>
                        {touched.phone && !phoneValidation.isValid ? phoneValidation.message : 'Para coordinación de entrega por el transportador'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Correo Electrónico <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="checkout-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                          onBlur={() => handleBlur('email')}
                          placeholder="Ej: andres.martinez@gmail.com"
                          className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden transition-all ${
                            touched.email && !emailValidation.isValid
                              ? 'border-red-400 ring-2 ring-red-100'
                              : touched.email && emailValidation.isValid
                                ? 'border-emerald-500 ring-2 ring-emerald-50'
                                : 'border-slate-300 focus:border-blue-600'
                          }`}
                        />
                        {touched.email && (
                          <div className="absolute right-3 top-2.5">
                            {emailValidation.isValid ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                      <p className={`text-[11px] mt-1 ${touched.email && !emailValidation.isValid ? 'text-red-500 font-semibold' : 'text-slate-500'}`}>
                        {touched.email && !emailValidation.isValid ? emailValidation.message : 'Envío de factura y número de guía'}
                      </p>
                    </div>
                  </div>

                  {/* Checkbox Factura Electrónica con NIT */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.requireElectronicInvoice}
                        onChange={(e) => setForm(prev => ({ ...prev, requireElectronicInvoice: e.target.checked }))}
                        className="w-4 h-4 rounded-sm text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                      <span className="text-xs font-bold text-slate-800">
                        ¿Requieres Facturación Electrónica DIAN a nombre de Empresa / NIT?
                      </span>
                    </label>

                    {form.requireElectronicInvoice && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-200 animate-in fade-in duration-150">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Razón Social de la Empresa
                          </label>
                          <input
                            type="text"
                            value={form.businessName}
                            onChange={(e) => setForm(prev => ({ ...prev, businessName: e.target.value }))}
                            placeholder="Ej: Constructora Andina S.A.S."
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            NIT con Dígito de Verificación
                          </label>
                          <input
                            type="text"
                            value={form.nit}
                            onChange={(e) => setForm(prev => ({ ...prev, nit: e.target.value }))}
                            placeholder="Ej: 901234567-8"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      id="btn-step1-next"
                      onClick={() => {
                        setTouched({ docNumber: true, fullName: true, phone: true, email: true });
                        if (isStep1Valid) setCurrentStep(2);
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Continuar a Dirección de Entrega</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 2: DIRECCION DE ENTREGA ================= */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-slate-900 pb-2 border-b border-slate-100">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <h4 className="text-base font-extrabold">2. Dirección de Entrega del Pedido en Colombia</h4>
                  </div>

                  {/* Departamento y Ciudad */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Departamento <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="checkout-department"
                        value={form.department}
                        onChange={(e) => handleDepartmentChange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                      >
                        {COLOMBIA_LOCATIONS.map(d => (
                          <option key={d.department} value={d.department}>{d.department}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Ciudad / Municipio <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="checkout-city"
                        value={form.city}
                        onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                      >
                        {currentDepartmentCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dirección exacta con nomenclatura colombiana */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Dirección Completa (Calle / Cra / Av / Diagonal) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="checkout-address"
                        type="text"
                        value={form.addressLine1}
                        onChange={(e) => setForm(prev => ({ ...prev, addressLine1: e.target.value }))}
                        onBlur={() => handleBlur('addressLine1')}
                        placeholder="Ej: Carrera 43A # 18 Sur - 135"
                        className={`w-full bg-slate-50 border rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden transition-all ${
                          touched.addressLine1 && !addressValidation.isValid
                            ? 'border-red-400 ring-2 ring-red-100'
                            : touched.addressLine1 && addressValidation.isValid
                              ? 'border-emerald-500 ring-2 ring-emerald-50'
                              : 'border-slate-300 focus:border-blue-600'
                        }`}
                      />
                      {touched.addressLine1 && (
                        <div className="absolute right-3 top-2.5">
                          {addressValidation.isValid ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {touched.addressLine1 && !addressValidation.isValid && (
                      <p className="text-[11px] text-red-500 font-semibold mt-1">
                        {addressValidation.message}
                      </p>
                    )}
                  </div>

                  {/* Barrio y Detalles complementarios */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Barrio / Sector
                      </label>
                      <input
                        id="checkout-neighborhood"
                        type="text"
                        value={form.neighborhood}
                        onChange={(e) => setForm(prev => ({ ...prev, neighborhood: e.target.value }))}
                        placeholder="Ej: El Poblado / Cedritos / San Fernando"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Apto / Casa / Torre / Oficina (Opcional)
                      </label>
                      <input
                        id="checkout-address-details"
                        type="text"
                        value={form.addressDetails}
                        onChange={(e) => setForm(prev => ({ ...prev, addressDetails: e.target.value }))}
                        placeholder="Ej: Torre 2 Apto 804, Conjunto Los Robles"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Instrucciones para el transportador */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Indicaciones o Referencias de Entrega
                    </label>
                    <textarea
                      id="checkout-delivery-notes"
                      rows={2}
                      value={form.deliveryNotes}
                      onChange={(e) => setForm(prev => ({ ...prev, deliveryNotes: e.target.value }))}
                      placeholder="Ej: Portería 24 horas, llamar al timbre o dejar con el vigilante."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  {/* Botones de navegación */}
                  <div className="pt-3 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver</span>
                    </button>

                    <button
                      id="btn-step2-next"
                      onClick={() => {
                        setTouched({ addressLine1: true });
                        if (isStep2Valid) setCurrentStep(3);
                      }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md flex items-center gap-2"
                    >
                      <span>Ir al Método de Pago</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 3: METODO DE PAGO & BANCOS DE COLOMBIA ================= */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-slate-900 pb-2 border-b border-slate-100">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <h4 className="text-base font-extrabold">3. Método de Pago & Selección Bancaria</h4>
                  </div>

                  {/* Payment Method Selector Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {/* PSE */}
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'PSE' }))}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        form.paymentMethod === 'PSE'
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <span className="text-xs">PSE Bancos</span>
                      <span className="text-[10px] text-slate-400 font-normal">Débito ACH</span>
                    </button>

                    {/* Tarjeta */}
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'CARD' }))}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        form.paymentMethod === 'CARD'
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 text-indigo-600" />
                      <span className="text-xs">Tarjetas</span>
                      <span className="text-[10px] text-slate-400 font-normal">Crédito/Débito</span>
                    </button>

                    {/* Nequi / Daviplata */}
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'NEQUI_DAVIPLATA' }))}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        form.paymentMethod === 'NEQUI_DAVIPLATA'
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-fuchsia-600" />
                      <span className="text-xs">Nequi/Daviplata</span>
                      <span className="text-[10px] text-slate-400 font-normal">Transferencia</span>
                    </button>

                    {/* Contra Entrega */}
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, paymentMethod: 'CASH_ON_DELIVERY' }))}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        form.paymentMethod === 'CASH_ON_DELIVERY'
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs">Contra Entrega</span>
                      <span className="text-[10px] text-slate-400 font-normal">Pagas al recibir</span>
                    </button>
                  </div>

                  {/* ===== SUB-FORM: PSE (Varios Bancos de Colombia) ===== */}
                  {form.paymentMethod === 'PSE' && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-blue-700 text-white font-black text-[10px] flex items-center justify-center">
                            PSE
                          </div>
                          <span className="text-xs font-bold text-slate-900">
                            Selecciona tu Entidad Financiera en Colombia ({COLOMBIAN_BANKS.length} entidades disponibles)
                          </span>
                        </div>
                      </div>

                      {/* Search bank input */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          value={bankSearchTerm}
                          onChange={(e) => setBankSearchTerm(e.target.value)}
                          placeholder="Buscar banco (ej: Bancolombia, Davivienda, Nequi, Nu, BBVA)..."
                          className="w-full bg-white border border-slate-300 rounded-xl pl-8.5 pr-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600"
                        />
                      </div>

                      {/* Bank Select Dropdown */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Banco / Billetera ACH <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="checkout-pse-bank"
                          value={form.pseBankCode}
                          onChange={(e) => setForm(prev => ({ ...prev, pseBankCode: e.target.value }))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-blue-600 focus:outline-hidden"
                        >
                          <optgroup label="Bancos Más Utilizados">
                            {COLOMBIAN_BANKS.filter(b => b.popular).map(b => (
                              <option key={b.code} value={b.code}>⭐ {b.name}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Todos los Bancos y Entidades Financieras">
                            {filteredBanks.map(b => (
                              <option key={b.code} value={b.code}>{b.name}</option>
                            ))}
                          </optgroup>
                        </select>
                      </div>

                      {/* Tipo de Persona & Correo registrado en PSE */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Tipo de Persona
                          </label>
                          <select
                            value={form.psePersonType}
                            onChange={(e) => setForm(prev => ({ ...prev, psePersonType: e.target.value as any }))}
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                          >
                            <option value="NATURAL">Persona Natural</option>
                            <option value="JURIDICA">Persona Jurídica (Empresa)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Correo Registrado en PSE
                          </label>
                          <input
                            type="email"
                            value={form.pseUserEmail || form.email}
                            onChange={(e) => setForm(prev => ({ ...prev, pseUserEmail: e.target.value }))}
                            placeholder="correo@pse.com.co"
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== SUB-FORM: TARJETA DE CREDITO / DEBITO ===== */}
                  {form.paymentMethod === 'CARD' && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          Información de Tarjeta de Crédito / Débito
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                          Franquicia: {detectedFranchise.toUpperCase()}
                        </span>
                      </div>

                      {/* Número de Tarjeta */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Número de Tarjeta (16 dígitos) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="checkout-card-number"
                            type="text"
                            maxLength={19}
                            value={form.cardNumber}
                            onChange={(e) => setForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                            onBlur={() => handleBlur('cardNumber')}
                            placeholder="4500 1234 5678 9010"
                            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900"
                          />
                          {touched.cardNumber && (
                            <div className="absolute right-3 top-2">
                              {cardNumberValidation.isValid ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                        {touched.cardNumber && !cardNumberValidation.isValid && (
                          <p className="text-[10px] text-red-500 font-semibold mt-1">
                            {cardNumberValidation.message}
                          </p>
                        )}
                      </div>

                      {/* Nombre en la tarjeta */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Nombre del Titular (como figura en la tarjeta) <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="checkout-card-name"
                          type="text"
                          value={form.cardHolderName}
                          onChange={(e) => setForm(prev => ({ ...prev, cardHolderName: e.target.value }))}
                          placeholder="Ej: ANDRES F MARTINEZ"
                          className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs uppercase text-slate-900"
                        />
                      </div>

                      {/* Expiry, CVV, Cuotas */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Vence (MM/AA)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={form.cardExpiry}
                            onChange={(e) => setForm(prev => ({ ...prev, cardExpiry: e.target.value }))}
                            placeholder="08/28"
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-center font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={form.cardCvv}
                            onChange={(e) => setForm(prev => ({ ...prev, cardCvv: e.target.value }))}
                            placeholder="123"
                            className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-center font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Cuotas
                          </label>
                          <select
                            value={form.cardInstallments}
                            onChange={(e) => setForm(prev => ({ ...prev, cardInstallments: Number(e.target.value) }))}
                            className="w-full bg-white border border-slate-300 rounded-xl px-2 py-2 text-xs font-semibold"
                          >
                            <option value={1}>1 Cuota (0% interés)</option>
                            <option value={2}>2 Cuotas</option>
                            <option value={3}>3 Cuotas</option>
                            <option value={6}>6 Cuotas</option>
                            <option value={12}>12 Cuotas</option>
                            <option value={24}>24 Cuotas</option>
                            <option value={36}>36 Cuotas</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== SUB-FORM: NEQUI / DAVIPLATA ===== */}
                  {form.paymentMethod === 'NEQUI_DAVIPLATA' && (
                    <div className="p-4 rounded-2xl bg-fuchsia-50/60 border border-fuchsia-200 space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-fuchsia-700" />
                        <span className="text-xs font-bold text-fuchsia-950">
                          Transferencia Directa Nequi o Daviplata (Transfiya)
                        </span>
                      </div>
                      <p className="text-xs text-fuchsia-900 leading-relaxed">
                        Recibirás una notificación Push o solicitud de cobro en tu App de Nequi o Daviplata por el valor exacto de <strong>{formatCOP(total)}</strong>.
                      </p>
                      <div>
                        <label className="block text-[11px] font-bold text-fuchsia-900 mb-1">
                          Número de Celular Nequi / Daviplata
                        </label>
                        <input
                          type="tel"
                          value={form.walletPhone || form.phone}
                          onChange={(e) => setForm(prev => ({ ...prev, walletPhone: e.target.value }))}
                          placeholder="312 456 7890"
                          className="w-full bg-white border border-fuchsia-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900"
                        />
                      </div>
                    </div>
                  )}

                  {/* ===== SUB-FORM: PAGO CONTRA ENTREGA ===== */}
                  {form.paymentMethod === 'CASH_ON_DELIVERY' && (
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-center gap-2 text-emerald-900">
                        <Banknote className="w-5 h-5 text-emerald-700" />
                        <span className="text-xs font-bold">
                          Pago Contra Entrega al Recibir tus Envases
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Paga en la puerta de tu domicilio en efectivo o con datáfono inalámbrico (tarjeta débito/crédito) cuando el repartidor de Pintuko entregue tus productos y selle la garantía.
                      </p>
                    </div>
                  )}

                  {/* Legal Acceptance Checkboxes (Ley Habeas Data 1581 & Términos) */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        id="checkout-accept-terms"
                        type="checkbox"
                        checked={form.acceptTerms}
                        onChange={(e) => setForm(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                        className="w-4 h-4 rounded-sm text-blue-600 focus:ring-blue-500 border-slate-300 mt-0.5"
                      />
                      <span className="text-[11px] text-slate-600 leading-tight">
                        Acepto los <strong>Términos y Condiciones de Compra y Garantía Pintuco®</strong> (Garantía de originalidad y despacho en Colombia).
                      </span>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        id="checkout-accept-data"
                        type="checkbox"
                        checked={form.acceptDataPolicy}
                        onChange={(e) => setForm(prev => ({ ...prev, acceptDataPolicy: e.target.checked }))}
                        className="w-4 h-4 rounded-sm text-blue-600 focus:ring-blue-500 border-slate-300 mt-0.5"
                      />
                      <span className="text-[11px] text-slate-600 leading-tight">
                        Autorizo el tratamiento de mis datos personales conforme a la <strong>Ley 1581 de 2012 (Habeas Data)</strong> para facturación y despacho.
                      </span>
                    </label>
                  </div>

                  {/* Back & Pay CTA Button */}
                  <div className="pt-3 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Volver</span>
                    </button>

                    <button
                      id="btn-confirm-pay"
                      disabled={!isStep3Valid || isProcessing || activeItems.length === 0}
                      onClick={handleProcessOrder}
                      className={`px-6 py-3.5 text-xs font-black rounded-xl shadow-lg flex items-center gap-2 transition-all ${
                        !isStep3Valid || isProcessing || activeItems.length === 0
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 active:scale-98'
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Validando Transacción Bancaria...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pagar {formatCOP(total)} Ahora</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Col: Order Summary & Cart Items Details */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                    <span>Resumen del Pedido ({activeItems.reduce((acc, i) => acc + i.quantity, 0)} {activeItems.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'unidad' : 'unidades'})</span>
                  </h4>
                  {activeItems.length > 0 ? (
                    <button
                      id="btn-clear-cart-modal"
                      type="button"
                      onClick={onClearCart}
                      className="text-[11px] font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 px-2 py-0.5 rounded-md border border-slate-200/80 hover:border-red-200 transition-all flex items-center gap-1 group/clear"
                      title="Eliminar todos los productos del pedido"
                    >
                      <Trash2 className="w-3 h-3 text-slate-400 group-hover/clear:text-red-500 transition-colors" />
                      <span>Vaciar pedido</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                      Pintuko Pro
                    </span>
                  )}
                </div>

                {/* Items List */}
                {activeItems.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-xl border border-dashed border-slate-300 space-y-3 my-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Tu pedido está vacío
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Has eliminado los productos de tu compra. Selecciona uno del catálogo para continuar.
                      </p>
                    </div>
                    {availableProducts.length > 0 && onAddToCart && (
                      <div className="pt-2 flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const prod = availableProducts[0];
                            const sz = prod.presentationPrices[1]?.size || prod.presentationPrices[0].size;
                            const col = prod.colors[0];
                            onAddToCart(prod, sz, col, 1);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Agregar {availableProducts[0]?.name} (1 Galón)</span>
                        </button>
                        <button
                          type="button"
                          onClick={onClose}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
                        >
                          Explorar catálogo de pinturas en la tienda
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {activeItems.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-2.5 transition-all hover:border-slate-300"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <div 
                              className="w-7 h-7 rounded-full border-2 border-white shadow-xs shrink-0 mt-0.5" 
                              style={{ backgroundColor: item.color.hex }}
                              title={item.color.name}
                            />
                            <div className="min-w-0 flex-1">
                              <h5 className="text-xs font-bold text-slate-900 leading-tight truncate">
                                {item.product.name}
                              </h5>
                              <span className="text-[11px] text-slate-500 block mt-0.5">
                                {item.size} • Color: <strong className="text-slate-700">{item.color.name}</strong>
                              </span>
                              <span className="text-[11px] font-medium text-slate-600 block mt-0.5">
                                {formatCOP(item.unitPrice)} c/u
                              </span>
                            </div>
                          </div>

                          {/* Item Subtotal & Delete Action Button */}
                          <div className="text-right flex flex-col items-end gap-1">
                            <button
                              id={`btn-remove-item-${item.id}`}
                              type="button"
                              onClick={() => onRemoveCartItem(item.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all flex items-center gap-1 group/del"
                              title="Eliminar este producto del pedido"
                              aria-label={`Eliminar ${item.product.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-slate-400 group-hover/del:text-red-600 transition-colors" />
                              <span className="text-[10px] font-semibold text-slate-400 group-hover/del:text-red-600 transition-colors">
                                Eliminar
                              </span>
                            </button>
                            <div>
                              <span className="text-xs font-black text-blue-700 block">
                                {formatCOP(item.unitPrice * item.quantity)}
                              </span>
                              {item.quantity > 1 && (
                                <span className="text-[10px] text-slate-400 block font-medium">
                                  ({item.quantity} × {formatCOP(item.unitPrice)})
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Stepper & Quick Add Pills */}
                        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200">
                            <button
                              id={`btn-cart-decrease-${item.id}`}
                              type="button"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onUpdateCartItemQty(item.id, item.quantity - 1);
                                } else {
                                  onRemoveCartItem(item.id);
                                }
                              }}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs transition-all shadow-2xs ${
                                item.quantity === 1 
                                  ? 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200' 
                                  : 'bg-white hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-200/80'
                              }`}
                              title={item.quantity === 1 ? "Eliminar este producto del pedido" : "Disminuir 1 unidad"}
                              aria-label="Disminuir cantidad"
                            >
                              {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                            </button>

                            <input
                              id={`input-cart-qty-${item.id}`}
                              type="number"
                              min="1"
                              max="99"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val) && val >= 1) {
                                  onUpdateCartItemQty(item.id, Math.min(99, val));
                                }
                              }}
                              className="w-10 h-7 text-center font-extrabold text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                              aria-label="Cantidad de unidades"
                            />

                            <button
                              id={`btn-cart-increase-${item.id}`}
                              type="button"
                              onClick={() => onUpdateCartItemQty(item.id, item.quantity + 1)}
                              className="w-7 h-7 bg-white hover:bg-blue-50 hover:text-blue-700 active:bg-blue-100 text-slate-800 border border-slate-200/80 rounded-lg flex items-center justify-center font-bold text-xs transition-all shadow-2xs"
                              title="Aumentar 1 unidad"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Quick Increment Shortcuts */}
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">Sumar:</span>
                            <button
                              type="button"
                              onClick={() => onUpdateCartItemQty(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-[10px] font-bold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg border border-slate-200/80 transition-colors"
                              title="Añadir 1 unidad más"
                            >
                              +1
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateCartItemQty(item.id, item.quantity + 2)}
                              className="px-2 py-1 text-[10px] font-bold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg border border-slate-200/80 transition-colors"
                              title="Añadir 2 unidades más"
                            >
                              +2
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateCartItemQty(item.id, item.quantity + 5)}
                              className="px-2 py-1 text-[10px] font-bold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg border border-slate-200/80 transition-colors"
                              title="Añadir 5 unidades más (Ideal obras / proyectos)"
                            >
                              +5
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Add Extra Products / Presentations Accordion */}
                {availableProducts.length > 0 && onAddToCart && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setIsAddingMoreOpen(!isAddingMoreOpen)}
                      className="w-full py-2 px-3 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100/80 rounded-xl border border-blue-200/60 flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" />
                        <span>{isAddingMoreOpen ? 'Ocultar catálogo rápido' : '+ Agregar otra pintura / galón al pedido'}</span>
                      </span>
                      <span className="text-[10px] font-semibold text-blue-600 bg-white px-1.5 py-0.5 rounded-md border border-blue-200">
                        {availableProducts.length} disponibles
                      </span>
                    </button>

                    {isAddingMoreOpen && (
                      <div className="mt-2 p-2.5 bg-white rounded-xl border border-slate-200 space-y-2 max-h-48 overflow-y-auto animate-in fade-in duration-150">
                        <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">
                          Selecciona para agregar:
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {availableProducts.map((p) => {
                            const defaultSz = p.presentationPrices[1]?.size || p.presentationPrices[0].size;
                            const priceObj = p.presentationPrices.find(pr => pr.size === defaultSz) || p.presentationPrices[0];
                            return (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  onAddToCart(p, defaultSz, p.colors[0], 1);
                                }}
                                className="w-full text-left p-2 rounded-lg hover:bg-slate-50 border border-slate-100 hover:border-slate-300 flex items-center justify-between gap-2 transition-all group"
                              >
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-4 h-4 rounded-full border border-slate-200 shrink-0"
                                    style={{ backgroundColor: p.colors[0]?.hex || '#ffffff' }}
                                  />
                                  <div>
                                    <span className="text-[11px] font-bold text-slate-800 block group-hover:text-blue-700">
                                      {p.name}
                                    </span>
                                    <span className="text-[10px] text-slate-500">
                                      {defaultSz} • {p.colors[0]?.name}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[11px] font-bold text-slate-900 group-hover:text-blue-600">
                                  +{formatCOP(priceObj.price)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Free shipping progress bar */}
                <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-blue-600" />
                      {isShippingFree ? '¡Envío Nacional Gratis Aplicado!' : 'Envío Gratis desde $150.000 COP'}
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-900">
                      {isShippingFree ? '100%' : `${Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${isShippingFree ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%` }}
                    />
                  </div>
                  {!isShippingFree && (
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Agrega {formatCOP(freeShippingThreshold - subtotal)} más para obtener envío gratis a cualquier ciudad de Colombia.
                    </span>
                  )}
                </div>
              </div>

              {/* Price Breakdown Calculation */}
              <div className="space-y-2 pt-3 border-t border-slate-200 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Productos:</span>
                  <span className="font-semibold text-slate-800">{formatCOP(subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Costo de Envío:</span>
                  <span className={`font-semibold ${isShippingFree ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {isShippingFree ? 'GRATIS' : formatCOP(shippingCost)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>IVA Incluido (19% DIAN):</span>
                  <span>{formatCOP(taxIva)}</span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                  <span className="text-sm font-black text-slate-900">Total a Pagar:</span>
                  <span className="text-xl font-black text-blue-700">{formatCOP(total)}</span>
                </div>

                {/* Trust guarantee micro-tags */}
                <div className="pt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Pintura 100% Original</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Garantía de Fábrica</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
