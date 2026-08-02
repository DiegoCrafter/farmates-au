import { useEffect } from 'react';
import {
  AlertTriangle,
  BadgeCheck,
  BedDouble,
  CalendarDays,
  ExternalLink,
  Globe,
  Info,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { JobListing, inSeason } from '../data/types';
import { useI18n } from '../i18n/LanguageContext';

export default function JobDetailModal({
  job,
  onClose,
  onDelete,
}: {
  job: JobListing;
  onClose: () => void;
  onDelete?: () => void;
}) {
  const {
    t,
    monthsShort,
    stateNames,
    workTypeLabels,
    monthRangeLabel,
    localizedName,
    localizedDescription,
    localizedAccommodation,
  } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const nowMonth = new Date().getMonth();
  const { contact } = job;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t('modal.close')}>
          <X size={18} />
        </button>

        <h2>{localizedName(job)}</h2>
        <p className="meta-line">
          <MapPin size={14} /> {job.town}, {job.state} · {stateNames[job.state]}
        </p>
        <p className="meta-line">
          <CalendarDays size={14} /> {t('map.popupSeason', { label: monthRangeLabel(job) })}
        </p>
        <div className="card-tags" style={{ marginTop: 8 }}>
          {job.verified ? (
            <span className="chip chip-ok">
              <BadgeCheck size={13} /> {t('modal.verified')}
            </span>
          ) : (
            <span className="chip chip-warn">{t('modal.unverified')}</span>
          )}
          {job.specifiedWork && <span className="chip chip-spec">{t('modal.spec')}</span>}
          {job.workTypes.map((w) => (
            <span key={w} className="chip chip-work">
              {workTypeLabels[w]}
            </span>
          ))}
        </div>

        <div className="modal-section">
          <h4>{t('modal.seasonTitle')}</h4>
          <div className="sdot-row">
            {monthsShort.map((m, i) => (
              <div
                key={m}
                className={`sdot ${inSeason(job, i) ? 'on' : ''} ${i === nowMonth ? 'now' : ''}`}
                title={i === nowMonth ? t('modal.nowMonth', { m }) : m}
              >
                {m}
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '8px 0 0' }}>
            {t('modal.seasonHint')}
          </p>
        </div>

        <div className="modal-section">
          <h4>{t('modal.contactTitle')}</h4>
          <div className="contact-btns">
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
                <Phone size={16} /> {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className={contact.phone ? 'ghost' : ''}>
                <Mail size={16} /> {t('modal.emailBtn')}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noreferrer"
                className={contact.phone || contact.email ? 'ghost' : ''}
              >
                <Globe size={16} /> {t('modal.siteBtn')} <ExternalLink size={13} />
              </a>
            )}
          </div>
          {contact.harvestOffice && (
            <p className="form-note" style={{ marginTop: 12 }}>
              <Info size={14} /> {t('modal.harvestOffice')}
            </p>
          )}
          {!job.verified && (
            <p className="note-warn" style={{ marginTop: 12 }}>
              <AlertTriangle size={16} /> {t('modal.unverifiedNote')}
            </p>
          )}
        </div>

        <div className="modal-section">
          <h4>{t('modal.descTitle')}</h4>
          <p style={{ margin: 0 }}>{localizedDescription(job)}</p>
          <p style={{ margin: '10px 0 0', fontSize: '0.9rem' }}>
            <BedDouble size={14} style={{ verticalAlign: '-2px' }} /> {t('modal.accommodation')}
            <strong>{localizedAccommodation(job)}</strong>
          </p>
          {job.specifiedWork && (
            <p style={{ margin: '10px 0 0', fontSize: '0.9rem' }}>
              <ShieldCheck size={14} style={{ verticalAlign: '-2px' }} /> {t('modal.specNote')}
            </p>
          )}
        </div>

        <div className="modal-section">
          <h4>{t('modal.sourceTitle')}</h4>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)' }}>
            {t('modal.source', {
              source: job.source,
              by: job.addedBy === 'comunidad' ? t('modal.byCommunity') : t('modal.byTeam'),
            })}
          </p>
          {onDelete && (
            <button className="btn btn-sm btn-danger" onClick={onDelete} style={{ marginTop: 12 }}>
              <Trash2 size={14} /> {t('modal.deleteBtn')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
