import { useI18n } from '../i18n/LanguageContext';

export default function About() {
  const { t } = useI18n();
  return (
    <div className="about-page">
      <h1>{t('about.title')}</h1>
      <p>{t('about.p1')}</p>

      <h2>{t('about.h2what')}</h2>
      <p>
        <strong>{t('about.p2Lead')}</strong> {t('about.p2Rest')}
      </p>
      <p>
        <strong>{t('about.p3Lead')}</strong> {t('about.p3Rest')}
      </p>
      <p>
        <strong>{t('about.p4Lead')}</strong> {t('about.p4Rest')}
      </p>

      <h2>{t('about.h2accuracy')}</h2>
      <p>{t('about.p5')}</p>
      <p>{t('about.p6')}</p>

      <h2>{t('about.h2collab')}</h2>
      <p>
        {t('about.p7a')}
        <strong>{t('nav.add')}</strong>
        {t('about.p7b')}
        <strong>{t('nav.wiki')}</strong>
        {t('about.p7c')}
      </p>

      <h2>{t('about.h2warn')}</h2>
      <p>
        {t('about.p8a')}
        <a href="https://www.harvesttrail.gov.au" target="_blank" rel="noreferrer">
          harvesttrail.gov.au
        </a>
        {t('about.p8b')}
        <a href="https://immi.homeaffairs.gov.au" target="_blank" rel="noreferrer">
          immi.homeaffairs.gov.au
        </a>
        {t('about.p8c')}
      </p>
    </div>
  );
}
