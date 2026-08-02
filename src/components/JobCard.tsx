import { BadgeCheck, CalendarDays, ExternalLink, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { JobListing } from '../data/types';
import { useI18n } from '../i18n/LanguageContext';

export default function JobCard({
  job,
  onSelect,
}: {
  job: JobListing;
  onSelect: (j: JobListing) => void;
}) {
  const { t, workTypeLabels, monthRangeLabel, localizedName, localizedCrop, localizedDescription } =
    useI18n();
  const { contact } = job;
  return (
    <article className="job-card">
      <div className="card-head">
        <h3>{localizedName(job)}</h3>
        {job.verified ? (
          <span className="chip chip-ok">
            <BadgeCheck size={13} /> {t('card.verified')}
          </span>
        ) : (
          <span className="chip chip-warn">{t('card.verify')}</span>
        )}
      </div>
      <p className="card-meta">
        <MapPin size={14} /> {job.town}, {job.state} · {localizedCrop(job)}
      </p>
      <div className="card-tags">
        <span className="chip chip-season">
          <CalendarDays size={12} /> {monthRangeLabel(job)}
        </span>
        {job.specifiedWork && <span className="chip chip-spec">{t('card.spec')}</span>}
        {job.workTypes.map((w) => (
          <span key={w} className="chip chip-work">
            {workTypeLabels[w]}
          </span>
        ))}
      </div>
      <p className="card-desc">{localizedDescription(job)}</p>
      <div className="card-contact">
        {contact.phone && (
          <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
            <Phone size={14} /> {contact.phone}
          </a>
        )}
        {contact.email && (
          <a href={`mailto:${contact.email}`}>
            <Mail size={14} /> {t('card.email')}
          </a>
        )}
        {contact.website && (
          <a href={contact.website} target="_blank" rel="noreferrer">
            <Globe size={14} /> {t('card.portal')} <ExternalLink size={11} />
          </a>
        )}
      </div>
      <button className="btn btn-sm btn-outline card-cta" onClick={() => onSelect(job)}>
        {t('card.details')}
      </button>
    </article>
  );
}
