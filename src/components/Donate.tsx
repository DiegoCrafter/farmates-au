import { ExternalLink, HandCoins, HeartHandshake, ShieldCheck } from 'lucide-react';
import { DONATION_URLS } from '../data/config';
import { useI18n } from '../i18n/LanguageContext';

export default function Donate() {
  const { t, donateOptions } = useI18n();
  return (
    <div className="about-page donate-page">
      <h1>
        <HeartHandshake size={26} style={{ verticalAlign: '-4px', color: 'var(--green-700)' }} />{' '}
        {t('donate.title')}
      </h1>
      <p>{t('donate.intro1')}</p>
      <p>{t('donate.intro2')}</p>

      <div className="donate-grid">
        {DONATION_URLS.map((o) => {
          const meta = donateOptions[o.id];
          return (
            <a key={o.id} className="donate-card" href={o.url} target="_blank" rel="noreferrer">
              <div className="donate-card-top">
                <strong>{meta.name}</strong>
                <ExternalLink size={15} />
              </div>
              <p>{meta.note}</p>
              <span className="donate-cta">{t('donate.donateNow')}</span>
            </a>
          );
        })}
      </div>

      <p className="donate-note">{t('donate.altMeans')}</p>

      <div className="visa-card">
        <h3>
          <HandCoins size={20} /> {t('donate.usageTitle')}
        </h3>
        <ul>
          <li>{t('donate.usage1')}</li>
          <li>{t('donate.usage2')}</li>
          <li>{t('donate.usage3')}</li>
          <li>{t('donate.usage4')}</li>
        </ul>
      </div>

      <p className="donate-note" style={{ marginTop: 16 }}>
        <ShieldCheck size={16} style={{ verticalAlign: '-3px' }} /> {t('donate.voluntary')}
      </p>
    </div>
  );
}
