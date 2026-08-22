import { Project, PaintProduct } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    title: 'Transformación Integral Residencia Los Rosales',
    category: 'residencial',
    clientType: 'Residencial Familiar',
    location: 'Bogotá D.C. - Zona Norte',
    duration: '5 días',
    areaM2: 185,
    description: 'Renovación completa de áreas sociales, sala de estar y habitaciones principales con pintura vinilo lavable antibacterial y muro focal decorativo con técnica texturizada.',
    imageBefore: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    paintUsed: [
      { name: 'Viniltex Avanzada Antimanchas', finish: 'Satinado', colorName: 'Blanco Lino', colorHex: '#F4F4F0' },
      { name: 'Viniltex Colección Vanguardia', finish: 'Mate', colorName: 'Azul Egeo Profundo', colorHex: '#1E3D59' }
    ],
    rating: 5,
    review: {
      author: 'Carolina Mendoza',
      comment: 'El equipo de Pintuko fue extremadamente limpio y puntual. El acabado en las paredes quedó impecable, sin una sola gota en los pisos.',
      date: 'Febrero 2026'
    },
    tags: ['Interiores', 'Lavable', 'Muro de Acento', 'Antibacterial'],
    features: ['Empastado y lijado con aspiración', '2 manos de Viniltex Avanzada', 'Protección total de pisos y muebles', 'Garantía de 3 años']
  },
  {
    id: 'proj-2',
    title: 'Restauración y Protección de Fachada Edificio Horizon',
    category: 'fachadas',
    clientType: 'Edificio Residencial',
    location: 'Medellín - El Poblado',
    duration: '14 días',
    areaM2: 650,
    description: 'Hidrolavado a presión, sellado de fisuras micrométricas e impermeabilización exterior con Koraza elastomérica de alta resistencia a rayos UV y lluvia ácida.',
    imageBefore: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    paintUsed: [
      { name: 'Koraza 5 Años Protección Clima', finish: 'Mate', colorName: 'Gris Grafito Suave', colorHex: '#4A5568' },
      { name: 'Koraza Base Selladora', finish: 'Mate', colorName: 'Blanco Nevada', colorHex: '#FFFFFF' }
    ],
    rating: 5,
    review: {
      author: 'Ing. Rodrigo Cárdenas (Admin. Copropiedad)',
      comment: 'Cumplieron con todos los estándares de trabajo en alturas y las fechas pactadas. La fachada luce como nueva y resiste perfectamente el agua.',
      date: 'Enero 2026'
    },
    tags: ['Fachadas', 'Trabajo en Alturas', 'Impermeabilización', 'Resistencia UV'],
    features: ['Hidrolavado 2500 PSI', 'Sellado de microfisuras', 'Aplicación airless de Koraza 5 Años', 'Andamiaje certificado']
  },
  {
    id: 'proj-3',
    title: 'Adecuación Corporativa & Muros de Marca TechHub',
    category: 'comercial',
    clientType: 'Oficinas Empresariales',
    location: 'Cali - Ciudad Jardín',
    duration: '4 días',
    areaM2: 320,
    description: 'Pintura de cielorrasos técnicos en negro mate, muros de oficinas con pintura de bajo olor (cero VOC) y zonas interactivas de pizarra borrable.',
    imageBefore: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
    paintUsed: [
      { name: 'Pintura Viniltex Eco Cero Olor', finish: 'Mate', colorName: 'Gris Minimalista', colorHex: '#D1D5DB' },
      { name: 'Esmalte Base Agua Especial', finish: 'Semi-brillante', colorName: 'Negro Ébano', colorHex: '#1F2937' }
    ],
    rating: 4.9,
    review: {
      author: 'Andrés Felipe Gómez (Director de Operaciones)',
      comment: 'Pintaron durante el fin de semana para no interrumpir la jornada de la empresa. El lunes no había ningún olor a pintura.',
      date: 'Marzo 2026'
    },
    tags: ['Comercial', 'Bajo Olor', 'Cero VOC', 'Pintura Rápida'],
    features: ['Trabajo nocturno y fin de semana', 'Pinturas ecológicas certificadas', 'Líneas y acentos corporativos', 'Pizarra borrable']
  },
  {
    id: 'proj-4',
    title: 'Recubrimiento Epóxico Alto Tráfico Parqueadero & Taller',
    category: 'industrial',
    clientType: 'Centro Logístico & Automotriz',
    location: 'Barranquilla - Vía 40',
    duration: '6 días',
    areaM2: 450,
    description: 'Desbaste de concreto con diamante, imprimación epóxica autonivelante y acabado poliuretano de alta resistencia a aceites, derrames químicos y tráfico pesado de montacargas.',
    imageBefore: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    paintUsed: [
      { name: 'Pintucoat Epóxico 100% Sólidos', finish: 'Brillante', colorName: 'Gris Industrial Claro', colorHex: '#9CA3AF' },
      { name: 'Esmalte Demarcador Alto Tráfico', finish: 'Brillante', colorName: 'Amarillo Tráfico Seguridad', colorHex: '#FBBF24' }
    ],
    rating: 5,
    review: {
      author: 'Mauricio Restrepo (Gerente de Planta)',
      comment: 'La resistencia del piso epóxico superó las expectativas. Fácil de limpiar y la demarcación vial quedó milimétrica.',
      date: 'Enero 2026'
    },
    tags: ['Epóxica', 'Pisos Industriales', 'Alto Tráfico', 'Demarcación'],
    features: ['Preparación mecánica diamantada', 'Barrera de humedad', 'Demarcación de zonas de seguridad', 'Resistencia química grado pesado']
  },
  {
    id: 'proj-5',
    title: 'Impermeabilización Integral Terraza y Cubierta Solarium',
    category: 'impermeabilizacion',
    clientType: 'Penthouse Residencial',
    location: 'Bucaramanga - Cabecera',
    duration: '3 días',
    areaM2: 120,
    description: 'Tratamiento de filtraciones activas, colocación de malla de refuerzo poliéster y sistema elastomérico fibratado Aquablock de Pintuco para tránsito peatonal moderado.',
    imageBefore: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    paintUsed: [
      { name: 'Aquablock Ultra Fibratado', finish: 'Mate Elastomérico', colorName: 'Blanco Reflejante Térmico', colorHex: '#FFFFFF' },
      { name: 'Sellador Flexible de Juntas', finish: 'Mate', colorName: 'Gris Sellante', colorHex: '#6B7280' }
    ],
    rating: 5,
    review: {
      author: 'Dra. Patricia Salazar',
      comment: 'Teníamos un problema crónico de humedad en el techo de la sala. Con el tratamiento de Pintuko las lluvias de invierno no dejaron pasar ni una gota.',
      date: 'Febrero 2026'
    },
    tags: ['Impermeabilización', 'Antifiltraciones', 'Reflectivo Térmico', 'Techos'],
    features: ['Malla de refuerzo cuadriculada', 'Sellado de bajantes y sifones', 'Aislamiento térmico reductor de calor', '5 años de garantía certificada']
  },
  {
    id: 'proj-6',
    title: 'Acabado Veneciano & Muros de Diseño Restaurante Botánico',
    category: 'decorativo',
    clientType: 'Restaurante Gourmet',
    location: 'Bogotá D.C. - Zona G',
    duration: '4 días',
    areaM2: 95,
    description: 'Creación de muros de acento con estuco veneciano espatulado con veladuras en tono terracota cálido y protección con cera hidrófuga abrillantable.',
    imageBefore: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    imageAfter: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    paintUsed: [
      { name: 'Estuco Veneciano Decorativo', finish: 'Brillo Mármol', colorName: 'Terracota Toscano', colorHex: '#B45309' },
      { name: 'Veladura Perlada', finish: 'Satinado', colorName: 'Dorado Suave', colorHex: '#D97706' }
    ],
    rating: 5,
    review: {
      author: 'Chef Julián Arango',
      comment: 'El efecto marmolado le dio a nuestro salón una calidez impresionante. Los clientes siempre se toman fotos frente al muro.',
      date: 'Febrero 2026'
    },
    tags: ['Estuco Veneciano', 'Efecto Mármol', 'Decorativo', 'Alta Gama'],
    features: ['3 capas espatuladas a mano', 'Encerado protector repelente al polvo', 'Efecto visual sedoso tridimensional']
  }
];

export const PAINT_PRODUCTS_DATA: PaintProduct[] = [
  {
    id: 'paint-viniltex-avanzada',
    name: 'Viniltex Avanzada Antibacterial',
    tagline: 'Máxima lavabilidad y protección para tus espacios interiores',
    category: 'vinilo',
    presentationPrices: [
      { size: '1/4 Galón', price: 28900, originalPrice: 32000, volumeLiters: 0.95 },
      { size: '1 Galón', price: 84900, originalPrice: 95000, volumeLiters: 3.78 },
      { size: 'Cuñete (5 Galones)', price: 379000, originalPrice: 420000, volumeLiters: 18.9 }
    ],
    coveragePerGallonM2: 35,
    finish: 'Satinado',
    durabilityYears: 5,
    washability: 'Ultra Alta (100% lavable)',
    vocLevel: 'Bajo Olor / Eco',
    colors: [
      { name: 'Blanco Nieve', hex: '#FFFFFF', code: 'V-01', popular: true },
      { name: 'Blanco Lino', hex: '#F5F5F0', code: 'V-02', popular: true },
      { name: 'Gris Perla', hex: '#E5E7EB', code: 'V-03', popular: true },
      { name: 'Marfil Suave', hex: '#FEF3C7', code: 'V-04' },
      { name: 'Verde Eucalipto', hex: '#A7F3D0', code: 'V-05' },
      { name: 'Azul Neblina', hex: '#BAE6FD', code: 'V-06' },
      { name: 'Terracota Calma', hex: '#FED7AA', code: 'V-07' },
      { name: 'Gris Grafito', hex: '#4B5563', code: 'V-08' }
    ],
    description: 'Pintura vinil acrílica diluible en agua tipo 1 con tecnología anti-adherente de manchas y escudo antibacterial que elimina el 99.9% de hongos y bacterias.',
    advantages: [
      'Resiste más de 1,000 ciclos de lavado sin perder color',
      'Protección activa contra bacterias y moho',
      'Secado ultra rápido al tacto en 30 minutos',
      'Excelente poder de cubrimiento en dos manos'
    ],
    recommendedUses: ['Salas', 'Comedores', 'Habitaciones de niños', 'Hospitales', 'Colegios', 'Pasillos'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 312,
    badge: 'Más Vendido',
    imageColor: '#2563EB' // Blue Pintuco Signature
  },
  {
    id: 'paint-koraza-5',
    name: 'Koraza 5 Años Protección Total',
    tagline: 'El escudo definitivo contra el sol extremo, lluvia y humedad en exteriores',
    category: 'impermeabilizante',
    presentationPrices: [
      { size: '1/4 Galón', price: 34500, originalPrice: 38000, volumeLiters: 0.95 },
      { size: '1 Galón', price: 104900, originalPrice: 119000, volumeLiters: 3.78 },
      { size: 'Cuñete (5 Galones)', price: 469000, originalPrice: 515000, volumeLiters: 18.9 }
    ],
    coveragePerGallonM2: 28,
    finish: 'Mate',
    durabilityYears: 5,
    washability: 'Alta',
    vocLevel: 'Bajo Olor / Eco',
    colors: [
      { name: 'Blanco Puro', hex: '#FFFFFF', code: 'K-01', popular: true },
      { name: 'Gris Cemento', hex: '#9CA3AF', code: 'K-02', popular: true },
      { name: 'Gris Antracita', hex: '#374151', code: 'K-03', popular: true },
      { name: 'Arena Sahariana', hex: '#FDE68A', code: 'K-04' },
      { name: 'Ladrillo Colonial', hex: '#B45309', code: 'K-05' },
      { name: 'Ocre Andino', hex: '#D97706', code: 'K-06' }
    ],
    description: 'Pintura 100% acrílica elastomérica formulada para resistir las condiciones climáticas más extremas. Crea una membrana impermeable que sella microfisuras.',
    advantages: [
      'Garantía comprobada de 5 años al exterior',
      'Flexibilidad que puentea fisuras de hasta 0.5 mm',
      'Pigmentos inorgánicos ultra resistentes a la decoloración solar UV',
      'Repele agua líquida pero permite que el muro respire'
    ],
    recommendedUses: ['Fachadas residenciales', 'Muros perimetrales', 'Edificios en altura', 'Zonas costeras'],
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 245,
    badge: 'Uso Exterior',
    imageColor: '#DC2626' // Red Accent Pintuco
  },
  {
    id: 'paint-pintulux-esmalte',
    name: 'Pintulux Esmalte Sintético Brillante',
    tagline: 'Brillo espejo y protección anticorrosiva para metales y maderas',
    category: 'esmalte',
    presentationPrices: [
      { size: '1/4 Galón', price: 24900, originalPrice: 28000, volumeLiters: 0.95 },
      { size: '1 Galón', price: 79900, originalPrice: 89000, volumeLiters: 3.78 },
      { size: 'Cuñete (5 Galones)', price: 355000, volumeLiters: 18.9 }
    ],
    coveragePerGallonM2: 40,
    finish: 'Brillante',
    durabilityYears: 4,
    washability: 'Ultra Alta (100% lavable)',
    vocLevel: 'Solvente',
    colors: [
      { name: 'Blanco Brillante', hex: '#FFFFFF', code: 'P-01', popular: true },
      { name: 'Negro Brillante', hex: '#111827', code: 'P-02', popular: true },
      { name: 'Azul Señal', hex: '#1D4ED8', code: 'P-03' },
      { name: 'Verde Máquina', hex: '#047857', code: 'P-04' },
      { name: 'Rojo Carmesí', hex: '#DC2626', code: 'P-05' },
      { name: 'Amarillo Tráfico', hex: '#FACC15', code: 'P-06' },
      { name: 'Gris Maquinaria', hex: '#6B7280', code: 'P-07' }
    ],
    description: 'Esmalte alquídico de máxima nivelación y brillo espejo formulado para embellecer y proteger rejas, puertas, ventanas metálicas, portones y muebles de madera.',
    advantages: [
      'Brillo de larga duración que no se opaca',
      'Excelente adherencia sobre superficies ferrosas y maderas',
      'Poder anticorrosivo incorporado de grado profesional',
      'Resistente al frote y limpieza frecuente'
    ],
    recommendedUses: ['Rejas', 'Puertas metálicas', 'Portones', 'Mobiliario de madera', 'Estructuras de acero'],
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewCount: 189,
    badge: 'Metales & Madera',
    imageColor: '#F59E0B' // Amber Accent
  },
  {
    id: 'paint-pintucoat-epoxica',
    name: 'Pintucoat Epóxico Alto Rendimiento',
    tagline: 'Resistencia química y mecánica superior para pisos y tanques',
    category: 'epoxica',
    presentationPrices: [
      { size: '1 Galón', price: 145000, originalPrice: 162000, volumeLiters: 3.78 },
      { size: 'Cuñete (5 Galones)', price: 649000, originalPrice: 710000, volumeLiters: 18.9 }
    ],
    coveragePerGallonM2: 25,
    finish: 'Brillante',
    durabilityYears: 7,
    washability: 'Ultra Alta (100% lavable)',
    vocLevel: 'Solvente',
    colors: [
      { name: 'Gris Perla Industrial', hex: '#CBD5E1', code: 'E-01', popular: true },
      { name: 'Gris Carbón', hex: '#475569', code: 'E-02', popular: true },
      { name: 'Blanco Sanitario', hex: '#FFFFFF', code: 'E-03' },
      { name: 'Azul Piscina / Tanques', hex: '#0284C7', code: 'E-04' },
      { name: 'Verde Quirófano', hex: '#059669', code: 'E-05' }
    ],
    description: 'Recubrimiento epóxico bicomponente de curado con poliamida. Diseñado para áreas que demandan extrema higiene, desinfección química constante y resistencia a aceites.',
    advantages: [
      'Soporta tránsito de maquinaria pesada y montacargas',
      'Superficie vítrea fácil de esterilizar y lavar',
      'Resistencia a solventes, combustibles, ácidos suaves y álcalis',
      'Apto para contacto con agua potable'
    ],
    recommendedUses: ['Pisos de bodegas', 'Clínicas y laboratorios', 'Talleres mecánicos', 'Plantas de alimentos', 'Tanques de agua'],
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewCount: 97,
    badge: 'Industrial Pesado',
    imageColor: '#059669' // Emerald
  },
  {
    id: 'paint-aquablock-imper',
    name: 'Aquablock Fibratado Membrana Líquida',
    tagline: 'Impermeabilizante con fibras elásticas para techos, losas y terrazas',
    category: 'impermeabilizante',
    presentationPrices: [
      { size: '1 Galón', price: 92000, originalPrice: 102000, volumeLiters: 3.78 },
      { size: 'Cuñete (5 Galones)', price: 410000, originalPrice: 450000, volumeLiters: 18.9 }
    ],
    coveragePerGallonM2: 20,
    finish: 'Mate',
    durabilityYears: 5,
    washability: 'Alta',
    vocLevel: 'Bajo Olor / Eco',
    colors: [
      { name: 'Blanco Reflectivo Térmico', hex: '#FFFFFF', code: 'A-01', popular: true },
      { name: 'Gris Techo', hex: '#64748B', code: 'A-02', popular: true },
      { name: 'Rojo Terracota Teja', hex: '#991B1B', code: 'A-03' },
      { name: 'Verde Jardín', hex: '#166534', code: 'A-04' }
    ],
    description: 'Impermeabilizante acrílico elastomérico reforzado con fibras que reemplaza en muchas aplicaciones el uso de tela de refuerzo tradicional.',
    advantages: [
      'Reduce hasta 6°C la temperatura interior (en color Blanco)',
      'Fibras incorporadas que resisten dilatación y contracción térmica',
      'Cero goteras garantizadas',
      'Fácil aplicación directa con rodillo o brocha'
    ],
    recommendedUses: ['Terrazas transitables', 'Techos de fibrocemento', 'Losas de concreto', 'Muros medianeros'],
    inStock: true,
    featured: false,
    rating: 4.9,
    reviewCount: 164,
    badge: 'Antigoteras',
    imageColor: '#0284C7' // Sky Blue
  },
  {
    id: 'paint-viniltex-mate-pro',
    name: 'Viniltex Rendimiento Pro Tipo 1',
    tagline: 'Pintura vinílica de alto rendimiento y cubrimiento superior en seco',
    category: 'vinilo',
    presentationPrices: [
      { size: '1/4 Galón', price: 22000, volumeLiters: 0.95 },
      { size: '1 Galón', price: 68000, originalPrice: 75000, volumeLiters: 3.78 },
      { size: 'Cuñete (5 Galones)', price: 295000, originalPrice: 330000, volumeLiters: 18.9 }
    ],
    coveragePerGallonM2: 42,
    finish: 'Mate',
    durabilityYears: 4,
    washability: 'Alta',
    vocLevel: 'Bajo Olor / Eco',
    colors: [
      { name: 'Blanco Mate Puro', hex: '#FFFFFF', code: 'M-01', popular: true },
      { name: 'Gris Nube', hex: '#E2E8F0', code: 'M-02', popular: true },
      { name: 'Almendra', hex: '#FEF3C7', code: 'M-03' },
      { name: 'Champaña', hex: '#FDE68A', code: 'M-04' }
    ],
    description: 'Pintura vinilo acrílica tipo 1 mate que disimula imperfecciones en techos y muros con máxima blancura y rendimiento por metro cuadrado.',
    advantages: [
      'Rendimiento superior que rinde más m² por galón',
      'Acabado mate aterciopelado que no refleja destellos',
      'Ideal para proyectos residenciales de gran escala',
      'Excelente lavabilidad y bajo salpique al aplicar'
    ],
    recommendedUses: ['Cielorrasos', 'Muros de apartamentos', 'Proyectos inmobiliarios', 'Drywall'],
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 142,
    badge: 'Gran Rendimiento',
    imageColor: '#3B82F6'
  }
];

export const SERVICE_BENEFITS = [
  {
    icon: 'ShieldCheck',
    title: 'Garantía por Escrito',
    desc: 'Hasta 5 años de garantía formal respaldada directamente por producto y mano de obra profesional.'
  },
  {
    icon: 'Paintbrush',
    title: 'Pintores Certificados',
    desc: 'Técnicos certificados en alturas (SENA), trabajo limpio y aplicación con tecnología airless de alta precisión.'
  },
  {
    icon: 'Sparkles',
    title: 'Protección y Limpieza Total',
    desc: 'Empacamos y protegemos el 100% de tus muebles, pisos y rodapiés. Entregamos todo reluciente.'
  },
  {
    icon: 'BadgePercent',
    title: 'Precios Directos de Fábrica',
    desc: 'Ahorra en insumos Pintuco originales con descuentos especiales aplicados a tu cotización integral.'
  }
];

export const COMPANY_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Sede Principal & Centro de Color Pintuko',
    address: 'Av. Calle 127 # 19A - 44, Bogotá D.C.',
    city: 'Bogotá',
    phone: '+57 (601) 745-9800',
    whatsapp: 'https://wa.me/qr/QOML6V54SSSAH1',
    hours: 'Lunes a Viernes: 7:30 AM - 6:00 PM | Sábados: 8:00 AM - 3:00 PM',
    mapCoords: { lat: 4.7083, lng: -74.0534 },
    status: 'Abierto Ahora',
    isMain: true
  },
  {
    id: 'loc-2',
    name: 'Centro de Experiencia & Pintura Industrial Medellín',
    address: 'Cra. 43A # 18 Sur - 135, Poblado, Medellín',
    city: 'Medellín',
    phone: '+57 (604) 444-1220',
    whatsapp: 'https://wa.me/qr/QOML6V54SSSAH1',
    hours: 'Lunes a Viernes: 7:30 AM - 5:30 PM | Sábados: 8:00 AM - 2:00 PM',
    mapCoords: { lat: 6.1952, lng: -75.5786 },
    status: 'Abierto Ahora',
    isMain: false
  },
  {
    id: 'loc-3',
    name: 'Punto Técnico & Distribución Cali',
    address: 'Calle 10 # 56 - 22, Pasoancho, Cali',
    city: 'Cali',
    phone: '+57 (602) 388-7711',
    whatsapp: 'https://wa.me/qr/QOML6V54SSSAH1',
    hours: 'Lunes a Viernes: 8:00 AM - 5:30 PM | Sábados: 8:00 AM - 1:00 PM',
    mapCoords: { lat: 3.4112, lng: -76.5432 },
    status: 'Abierto Ahora',
    isMain: false
  }
];
