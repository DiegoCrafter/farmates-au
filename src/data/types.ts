export type StateCode = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'NT' | 'ACT';

export const STATE_NAMES: Record<StateCode, string> = {
  NSW: 'Nueva Gales del Sur',
  VIC: 'Victoria',
  QLD: 'Queensland',
  WA: 'Australia Occidental',
  SA: 'Australia del Sur',
  TAS: 'Tasmania',
  NT: 'Territorio del Norte',
  ACT: 'Territorio de la Capital',
};

export const STATE_ORDER: StateCode[] = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];

export type WorkType =
  | 'picking'
  | 'packing'
  | 'vineyard'
  | 'vegetables'
  | 'livestock'
  | 'fishing'
  | 'general';

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  picking: 'Recolección',
  packing: 'Empaque',
  vineyard: 'Viñedo',
  vegetables: 'Hortalizas',
  livestock: 'Ganadería / esquila',
  fishing: 'Pesca',
  general: 'General / servicios',
};

export interface Contact {
  phone?: string;
  email?: string;
  website?: string;
  harvestOffice?: boolean;
}

export type AddedBy = 'equipo' | 'comunidad';

export interface JobListing {
  id: string;
  name: string;
  town: string;
  state: StateCode;
  lat: number;
  lng: number;
  crop: string;
  workTypes: WorkType[];
  /** 0 = enero */
  seasonStart: number;
  /** 0 = enero; puede ser menor que seasonStart (la temporada cruza el año) */
  seasonEnd: number;
  description: string;
  contact: Contact;
  accommodation: string;
  /** Cuenta como "specified work" para las visas 417/462 */
  specifiedWork: boolean;
  verified: boolean;
  source: string;
  addedBy: AddedBy;
}

export const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const MONTHS_SHORT = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

export function inSeason(j: JobListing, month: number): boolean {
  const s = j.seasonStart;
  const e = j.seasonEnd;
  if (s <= e) return month >= s && month <= e;
  return month >= s || month <= e;
}

export function monthRangeLabel(j: JobListing): string {
  const s = j.seasonStart;
  const e = j.seasonEnd;
  if (s === 0 && e === 11) return 'Todo el año';
  return `${MONTHS_SHORT[s]} – ${MONTHS_SHORT[e]}`;
}

export type Tab = 'inicio' | 'mapa' | 'wiki' | 'agregar' | 'donar' | 'sobre';
