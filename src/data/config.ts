export interface DonationUrl {
  id: string;
  url: string;
}

/**
 * Enlaces de donación. Reemplaza los valores "TU_USUARIO" por tus propios
 * enlaces de PayPal, Ko-fi o Buy Me a Coffee.
 * Los nombres y descripciones visibles se traducen en src/i18n/translations.ts
 * (clave `donateOptions`), usando el mismo `id`.
 */
export const DONATION_URLS: DonationUrl[] = [
  { id: 'paypal', url: 'https://www.paypal.me/TU_USUARIO' },
  { id: 'kofi', url: 'https://ko-fi.com/TU_USUARIO' },
  { id: 'bmac', url: 'https://www.buymeacoffee.com/TU_USUARIO' },
];
