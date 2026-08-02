import {
  CalendarDays,
  ExternalLink,
  Globe,
  HeartHandshake,
  Leaf,
  MapPin,
  Phone,
  ShieldCheck,
  Sprout,
  Users,
} from 'lucide-react';
import { OFFICIAL_RESOURCES } from '../data/jobs';
import { useI18n } from '../i18n/LanguageContext';

interface Props {
  stats: { total: number; states: number; thisMonth: number; community: number };
  month: number;
  onGoMap: (month: number) => void;
  onGoWiki: () => void;
  onDonate: () => void;
}

export default function Home({ stats, month, onGoMap, onGoWiki, onDonate }: Props) {
  const { t, months, resources } = useI18n();
  const monthName = months[month].toLowerCase();

  return (
    <div>
      <section className="hero">
        <h1>
          {t('home.heroA')} <span style={{ color: 'var(--green-700)' }}>{t('home.heroB')}</span>{' '}
          {t('home.heroC')}
        </h1>
        <p className="lead">{t('home.lead')}</p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => onGoMap(month)}>
            <MapPin size={16} /> {t('home.mapBtn', { month: monthName })}
          </button>
          <button className="btn btn-outline" onClick={onGoWiki}>
            {t('home.wikiBtn')}
          </button>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-num">
            <Leaf size={22} /> {stats.total}
          </div>
          <div className="stat-label">{t('home.statTotal')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">
            <MapPin size={22} /> {stats.states}
          </div>
          <div className="stat-label">{t('home.statStates')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">
            <CalendarDays size={22} /> {stats.thisMonth}
          </div>
          <div className="stat-label">{t('home.statThisMonth', { month: monthName })}</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">
            <Users size={22} /> {stats.community}
          </div>
          <div className="stat-label">{t('home.statCommunity')}</div>
        </div>
      </section>

      <section className="section">
        <h2>{t('home.howTitle')}</h2>
        <p className="sub">{t('home.howSub')}</p>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>{t('home.step1Title')}</h3>
            <p>{t('home.step1Desc')}</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>{t('home.step2Title')}</h3>
            <p>{t('home.step2Desc')}</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>{t('home.step3Title')}</h3>
            <p>{t('home.step3Desc', { tab: t('nav.add') })}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>{t('home.resourcesTitle')}</h2>
        <p className="sub">{t('home.resourcesSub')}</p>
        <div className="two-col">
          <ul className="resource-list">
            {OFFICIAL_RESOURCES.map((r) => {
              const meta = resources[r.id];
              return (
                <li key={r.id} className="resource">
                  <Globe size={18} style={{ color: 'var(--green-700)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <a href={r.url} target="_blank" rel="noreferrer">
                      {meta.name} <ExternalLink size={13} />
                    </a>
                    {r.phone && (
                      <a href={`tel:${r.phone.replace(/[^+\d]/g, '')}`} style={{ color: 'var(--ink)' }}>
                        <Phone size={13} /> {r.phone}
                      </a>
                    )}
                    <p>{meta.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="visa-card">
            <h3>
              <ShieldCheck size={20} /> {t('home.visaTitle')}
            </h3>
            <ul>
              <li>
                <strong>{t('home.visaB1Title')}</strong> {t('home.visaB1')}
              </li>
              <li>
                <strong>{t('home.visaB2Title')}</strong> {t('home.visaB2')}
              </li>
              <li>{t('home.visaB3')}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>
          <Sprout size={20} style={{ verticalAlign: '-3px', color: 'var(--green-700)' }} />{' '}
          {t('home.closeTitle')}
        </h2>
        <p className="sub">{t('home.closeSub')}</p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => onGoMap(month)}>
            <MapPin size={16} /> {t('home.mapBtn2')}
          </button>
          <button className="btn btn-outline" onClick={onGoWiki}>
            {t('home.listBtn')}
          </button>
          <button className="btn btn-outline" onClick={onDonate}>
            <HeartHandshake size={16} /> {t('home.donateBtn')}
          </button>
        </div>
      </section>
    </div>
  );
}
