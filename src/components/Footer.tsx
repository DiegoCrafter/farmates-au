import { AlertTriangle, HeartHandshake } from 'lucide-react';
import { Tab } from '../data/types';
import { useI18n } from '../i18n/LanguageContext';

export default function Footer({ onTab }: { onTab?: (t: Tab) => void }) {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-note">
          <AlertTriangle size={14} />
          <span>{t('footer.disclaimer')}</span>
        </p>
        {onTab && (
          <p className="footer-small">
            <button className="footer-donate" onClick={() => onTab('donar')}>
              <HeartHandshake size={13} /> {t('footer.donate')}
            </button>
          </p>
        )}
        <p className="footer-small">{t('footer.about', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
