export type StateCode = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'NT' | 'ACT';

export const STATE_ORDER: StateCode[] = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];

export type WorkType =
  | 'picking'
  | 'packing'
  | 'vineyard'
  | 'vegetables'
  | 'livestock'
  | 'fishing'
  | 'general';

export interface Contact {
  phone?: string;
  email?: string;
  website?: string;
  harvestOffice?: boolean;
}

export type AddedBy = 'equipo' | 'comunidad';

export interface JobListing {
  id: string;
  /** Nombre en español (idioma base del catálogo) */
  name: string;
  nameEn?: string;
  namePt?: string;
  town: string;
  state: StateCode;
  lat: number;
  lng: number;
  crop: string;
  cropEn?: string;
  cropPt?: string;
  workTypes: WorkType[];
  /** 0 = enero */
  seasonStart: number;
  /** 0 = enero; puede ser menor que seasonStart (la temporada cruza el año) */
  seasonEnd: number;
  description: string;
  descriptionEn?: string;
  descriptionPt?: string;
  contact: Contact;
  accommodation: string;
  accommodationEn?: string;
  accommodationPt?: string;
  /** Cuenta como "specified work" para las visas 417/462 */
  specifiedWork: boolean;
  verified: boolean;
  source: string;
  addedBy: AddedBy;
}

export function inSeason(j: JobListing, month: number): boolean {
  const s = j.seasonStart;
  const e = j.seasonEnd;
  if (s <= e) return month >= s && month <= e;
  return month >= s || month <= e;
}

export type Tab = 'inicio' | 'mapa' | 'wiki' | 'agregar' | 'donar' | 'sobre';
