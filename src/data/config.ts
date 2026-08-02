export interface DonationOption {
  id: string;
  name: string;
  url: string;
  note: string;
}

/**
 * Enlaces de donación. Reemplaza los valores "TU_USUARIO" por tus propios
 * enlaces de PayPal, Ko-fi o Buy Me a Coffee.
 */
export const DONATION_LINKS: DonationOption[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    url: 'https://www.paypal.me/TU_USUARIO',
    note: 'Transferencia rápida desde cualquier país. Ideal para montos únicos de cualquier valor.',
  },
  {
    id: 'kofi',
    name: 'Ko-fi',
    url: 'https://ko-fi.com/TU_USUARIO',
    note: 'Página de apoyo con montos fijos. Opción muy popular entre creadores independientes.',
  },
  {
    id: 'bmac',
    name: 'Buy Me a Coffee',
    url: 'https://www.buymeacoffee.com/TU_USUARIO',
    note: 'Una forma simbólica y simple de invitar un café al proyecto.',
  },
];
