import { Sprout } from 'lucide-react';
import { Tab } from '../data/types';

const NAV: { id: Tab; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'wiki', label: 'Wiki' },
  { id: 'agregar', label: 'Agregar' },
  { id: 'donar', label: 'Donar' },
  { id: 'sobre', label: 'Sobre' },
];

export default function Header({
  tab,
  onTab,
  communityCount,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  communityCount: number;
}) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" onClick={() => onTab('inicio')}>
          <span className="brand-icon">
            <Sprout size={20} />
          </span>
          <span className="brand-text">
            Farmates <span className="brand-accent">AU</span>
          </span>
        </button>
        <nav className="nav">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nav-btn ${tab === n.id ? 'active' : ''} ${n.id === 'donar' ? 'donar' : ''}`}
              onClick={() => onTab(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <span className="pill">{communityCount} aportes de la comunidad</span>
      </div>
    </header>
  );
}