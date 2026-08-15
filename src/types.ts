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
