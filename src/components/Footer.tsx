import { AlertTriangle, HeartHandshake } from 'lucide-react';
import { Tab } from '../data/types';

export default function Footer({ onTab }: { onTab?: (t: Tab) => void }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-note">
          <AlertTriangle size={14} />
          <span>
            Wiki colaborativa: los datos pueden estar desactualizados o ser inexactos. Verifica
            siempre la información antes de viajar, llamar o firmar un contrato.
          </span>
        </p>
        {onTab && (
          <p className="footer-small">
            <button className="footer-donate" onClick={() => onTab('donar')}>
              <HeartHandshake size={13} /> ¿Te sirve la wiki? Apóyala con una donación voluntaria
            </button>
          </p>
        )}
        <p className="footer-small">
          FarMates AU · proyecto comunitario para working holiday makers (visas 417/462) ·{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
