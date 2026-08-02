import { Sprout } from 'lucide-react';
import { Tab } from '../data/types';
import { LANGS, useI18n } from '../i18n/LanguageContext';

export default function Header({
  tab,
  onTab,
  communityCount,
}: {
  tab: Tab;
  onTab: (t: Tab) => void;
  communityCount: number;
}) {
  const { t, lang, setLang } = useI18n();

  const NAV: { id: Tab; label: string }[] = [
    { id: 'inicio', label: t('nav.home') },
    { id: 'mapa', label: t('nav.map') },
    { id: 'wiki', label: t('nav.wiki') },
    { id: 'agregar', label: t('nav.add') },
    { id: 'donar', label: t('nav.donate') },
    { id: 'sobre', label: t('nav.about') },
  ];

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
        <div className="lang-switch" role="group" aria-label={t('lang.label')}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={`lang-btn ${lang === l.code ? 'active' : ''}`}
              title={l.label}
              aria-label={l.label}
              onClick={() => setLang(l.code)}
            >
              {l.native}
            </button>
          ))}
        </div>
        <span className="pill">{t('header.communityPill', { n: communityCount })}</span>
      </div>
    </header>
  );
}
