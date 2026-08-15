export type ProjectCategory = 
  | 'todos'
  | 'residencial'
  | 'fachadas'
  | 'comercial'
  | 'industrial'
  | 'impermeabilizacion'
  | 'decorativo';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  clientType: string;
  location: string;
  duration: string;
  areaM2: number;
  description: string;
  imageBefore: string;
  imageAfter: string;
  paintUsed: {
    name: string;
    finish: string;
    colorName: string;
    colorHex: string;
  }[];
  rating: number;
  review: {
    author: string;
    comment: string;
    date: string;
  };
  tags: string[];
  features: string[];
}

export type PaintPresentation = '1/4 Galón' | '1 Galón' | 'Cuñete (5 Galones)' | 'Balde (2.5 Gal)';

export interface ColorSwatch {
  name: string;
  hex: string;
  code: string;
  popular?: boolean;
}

export interface PaintProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'vinilo' | 'esmalte' | 'impermeabilizante' | 'epoxica' | 'anticorrosivo' | 'especial';
  presentationPrices: {
    size: PaintPresentation;
    price: number;
    originalPrice?: number;
    volumeLiters: number;
  }[];
  coveragePerGallonM2: number;
  finish: 'Mate' | 'Satinado' | 'Brillante' | 'Semi-brillante' | 'Texturizado';
  durabilityYears: number;
  washability: 'Ultra Alta (100% lavable)' | 'Alta' | 'Media' | 'Especial';
  vocLevel: 'Bajo Olor / Eco' | 'Estándar' | 'Solvente';
  colors: ColorSwatch[];
  description: string;
  advantages: string[];
  recommendedUses: string[];
  inStock: boolean;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  badge?: string;
  imageColor: string; // Base color for realistic can preview
}

export interface QuoteRequest {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  serviceType: string;
  approxAreaM2: number;
  preferredProduct?: string;
  notes: string;
  contactPreference: 'whatsapp' | 'llamada' | 'email';
}

export interface CartItem {
  id: string;
  product: PaintProduct;
  size: PaintPresentation;
  color: ColorSwatch;
  quantity: number;
  unitPrice: number;
}

export type DocumentType = 'CC' | 'CE' | 'NIT' | 'PAS' | 'PPT';

export type PaymentMethodType = 'PSE' | 'CARD' | 'NEQUI_DAVIPLATA' | 'CASH_ON_DELIVERY';

export interface BankOption {
  code: string;
  name: string;
  popular?: boolean;
  type: 'bank' | 'fintech' | 'coop';
  icon?: string;
}

export interface CheckoutFormState {
  // Identity
  docType: DocumentType;
  docNumber: string;
  fullName: string;
  email: string;
  phone: string;

  // Delivery Address
  department: string;
  city: string;
  addressLine1: string; // Ej: Carrera 43A # 18 Sur - 135
  addressDetails: string; // Ej: Apto 502, Torre 3, Edificio Los Sauces
  neighborhood: string; // Barrio
  deliveryNotes: string; // Instrucciones portería / horario

  // Electronic Invoicing (DIAN)
  requireElectronicInvoice: boolean;
  businessName: string;
  nit: string;
  invoiceEmail: string;

  // Payment
  paymentMethod: PaymentMethodType;
  pseBankCode: string;
  psePersonType: 'NATURAL' | 'JURIDICA';
  pseUserEmail: string;

  // Card details (if CARD)
  cardNumber: string;
  cardHolderName: string;
  cardExpiry: string;
  cardCvv: string;
  cardInstallments: number;

  // Nequi / Daviplata details
  walletPhone: string;

  // Legal Acceptance
  acceptDataPolicy: boolean;
  acceptTerms: boolean;
}

export interface OrderConfirmation {
  orderId: string;
  trackingNumber: string;
  date: string;
  status: 'APROBADO' | 'EN_PREPARACION' | 'DESPACHADO';
  customer: {
    fullName: string;
    docType: DocumentType;
    docNumber: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    department: string;
    city: string;
    addressLine1: string;
    addressDetails: string;
    neighborhood: string;
    deliveryNotes?: string;
  };
  items: CartItem[];
  payment: {
    method: PaymentMethodType;
    methodLabel: string;
    bankOrFranchise?: string;
    approvalCode: string;
    installments?: number;
    subtotal: number;
    shippingCost: number;
    discount: number;
    taxIva: number;
    total: number;
  };
  estimatedDeliveryDate: string;
}
