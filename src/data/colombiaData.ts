import { BankOption } from '../types';

export interface DepartmentCities {
  department: string;
  cities: string[];
}

export const COLOMBIA_LOCATIONS: DepartmentCities[] = [
  {
    department: 'Bogotá D.C.',
    cities: ['Bogotá D.C. (Usaquén, Chapinero, Suba, Teusaquillo, etc.)', 'Soacha', 'Chía', 'Cota', 'Cajicá', 'Zipaquirá', 'Mosquera', 'Funza', 'Madrid', 'Facatativá']
  },
  {
    department: 'Antioquia',
    cities: ['Medellín (El Poblado, Laureles, Belén, etc.)', 'Envigado', 'Itagüí', 'Sabaneta', 'Bello', 'Rionegro', 'La Ceja', 'Guarne', 'Marinilla', 'Apartadó']
  },
  {
    department: 'Valle del Cauca',
    cities: ['Cali (Norte, Sur, Ciudad Jardín, San Fernando)', 'Palmira', 'Yumbo', 'Jamundí', 'Buga', 'Tuluá', 'Cartago', 'Buenaventura']
  },
  {
    department: 'Atlántico',
    cities: ['Barranquilla (Alto Prado, Riomar, Villa Country)', 'Soledad', 'Puerto Colombia', 'Malambo', 'Sabanalarga']
  },
  {
    department: 'Santander',
    cities: ['Bucaramanga (Cabecera, Floridablanca)', 'Floridablanca', 'Girón', 'Piedecuesta', 'Barrancabermeja', 'San Gil']
  },
  {
    department: 'Bolívar',
    cities: ['Cartagena (Bocagrande, Castillogrande, Manga)', 'Turbaco', 'Arjona', 'Magangué']
  },
  {
    department: 'Cundinamarca',
    cities: ['Chía', 'Cota', 'Cajicá', 'Zipaquirá', 'Fusagasugá', 'Girardot', 'Facatativá', 'Mosquera', 'Sopó', 'Tocancipá']
  },
  {
    department: 'Risaralda',
    cities: ['Pereira (Pinares, Álamos, Cerritos)', 'Dosquebradas', 'Santa Rosa de Cabal']
  },
  {
    department: 'Caldas',
    cities: ['Manizales (Palogrande, Milán, Chipre)', 'Villamaría', 'Chinchiná']
  },
  {
    department: 'Quindío',
    cities: ['Armenia (La Castellana, Norte)', 'Calarcá', 'Circasia', 'Montenegro']
  },
  {
    department: 'Norte de Santander',
    cities: ['Cúcuta', 'Los Patios', 'Villa del Rosario', 'Ocaña', 'Pamplona']
  },
  {
    department: 'Tolima',
    cities: ['Ibagué', 'Espinal', 'Melgar', 'Flandes']
  },
  {
    department: 'Meta',
    cities: ['Villavicencio', 'Acacías', 'Granada', 'Cumaral']
  },
  {
    department: 'Magdalena',
    cities: ['Santa Marta (El Rodadero, Pozos Colorados, Centro)', 'Ciénaga', 'Fundación']
  },
  {
    department: 'Nariño',
    cities: ['Pasto', 'Ipiales', 'Tumaco']
  },
  {
    department: 'Huila',
    cities: ['Neiva', 'Pitalito', 'Garzón']
  },
  {
    department: 'Cesar',
    cities: ['Valledupar', 'Aguachica', 'Agustín Codazzi']
  },
  {
    department: 'Córdoba',
    cities: ['Montería', 'Cereté', 'Lorica', 'Sahagún']
  },
  {
    department: 'Boyacá',
    cities: ['Tunja', 'Duitama', 'Sogamoso', 'Villa de Leyva', 'Paipa']
  },
  {
    department: 'Cauca',
    cities: ['Popayán', 'Santander de Quilichao', 'Puerto Tejada']
  }
];

export const COLOMBIAN_BANKS: BankOption[] = [
  { code: '1007', name: 'Bancolombia', popular: true, type: 'bank' },
  { code: '1051', name: 'Banco Davivienda', popular: true, type: 'bank' },
  { code: '1001', name: 'Banco de Bogotá', popular: true, type: 'bank' },
  { code: '1507', name: 'Nequi', popular: true, type: 'fintech' },
  { code: '1551', name: 'Daviplata', popular: true, type: 'fintech' },
  { code: '1013', name: 'BBVA Colombia', popular: true, type: 'bank' },
  { code: '1023', name: 'Banco de Occidente', popular: false, type: 'bank' },
  { code: '1002', name: 'Banco Popular', popular: false, type: 'bank' },
  { code: '1052', name: 'Banco AV Villas', popular: false, type: 'bank' },
  { code: '1019', name: 'Scotiabank Colpatria', popular: false, type: 'bank' },
  { code: '1040', name: 'Banco Agrario de Colombia', popular: false, type: 'bank' },
  { code: '1032', name: 'Banco Caja Social', popular: false, type: 'bank' },
  { code: '1006', name: 'Banco Itaú Colombia', popular: false, type: 'bank' },
  { code: '1065', name: 'Banco Santander Colombia', popular: false, type: 'bank' },
  { code: '1062', name: 'Banco Falabella', popular: false, type: 'bank' },
  { code: '1070', name: 'Lulo Bank', popular: true, type: 'fintech' },
  { code: '1071', name: 'Nu Colombia (Nubank)', popular: true, type: 'fintech' },
  { code: '1072', name: 'Dale! (Grupo Aval)', popular: false, type: 'fintech' },
  { code: '1066', name: 'Banco Pichincha', popular: false, type: 'bank' },
  { code: '1061', name: 'Bancoomeva', popular: false, type: 'bank' },
  { code: '1012', name: 'Banco GNB Sudameris', popular: false, type: 'bank' },
  { code: '1063', name: 'Banco Finandina', popular: false, type: 'bank' },
  { code: '1069', name: 'Banco Serfinanza', popular: false, type: 'bank' },
  { code: '1501', name: 'Movii', popular: false, type: 'fintech' },
  { code: '1502', name: 'RappiPay - Davivienda', popular: false, type: 'fintech' },
  { code: '1503', name: 'Ualá Colombia', popular: false, type: 'fintech' },
  { code: '1059', name: 'Bancamía', popular: false, type: 'bank' },
  { code: '1058', name: 'Banco ProCredit', popular: false, type: 'bank' },
  { code: '1053', name: 'Banco W', popular: false, type: 'bank' },
  { code: '1055', name: 'Coopcentral', popular: false, type: 'coop' }
];

export const DOCUMENT_TYPE_LABELS: Record<string, { label: string; placeholder: string; helper: string }> = {
  CC: { label: 'Cédula de Ciudadanía (C.C.)', placeholder: 'Ej: 1013101871', helper: '6 a 10 dígitos numéricos' },
  CE: { label: 'Cédula de Extranjería (C.E.)', placeholder: 'Ej: 345678', helper: 'Número de documento de extranjería' },
  NIT: { label: 'NIT (Empresas o Personas Jurídicas)', placeholder: 'Ej: 900123456-1', helper: 'Incluir dígito de verificación' },
  PAS: { label: 'Pasaporte Extranjero', placeholder: 'Ej: AB1234567', helper: 'Número de pasaporte vigente' },
  PPT: { label: 'Permiso por Protección Temporal (PPT)', placeholder: 'Ej: 12345678', helper: 'Identificación oficial PPT' }
};
