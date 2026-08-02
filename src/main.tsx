import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import './index.css';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';

// Sin StrictMode: evita el doble montaje que a veces rompe el MapContainer de Leaflet en desarrollo.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);
