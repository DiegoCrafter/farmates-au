import { BadgeCheck, CalendarDays, ExternalLink, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { JobListing, WORK_TYPE_LABELS, monthRangeLabel } from '../data/types';

export default function JobCard({
  job,
  onSelect,
}: {
  job: JobListing;
  onSelect: (j: JobListing) => void;
}) {
  const { contact } = job;
  return (
    <article className="job-card">
      <div className="card-head">
        <h3>{job.name}</h3>
        {job.verified ? (
          <span className="chip chip-ok">
            <BadgeCheck size={13} /> verificado
          </span>
        ) : (
          <span className="chip chip-warn">verificar</span>
        )}
      </div>
      <p className="card-meta">
        <MapPin size={14} /> {job.town}, {job.state} · {job.crop}
      </p>
      <div className="card-tags">
        <span className="chip chip-season">
          <CalendarDays size={12} /> {monthRangeLabel(job)}
        </span>
        {job.specifiedWork && <span className="chip chip-spec">Visa especificado</span>}
        {job.workTypes.map((w) => (
          <span key={w} className="chip chip-work">
            {WORK_TYPE_LABELS[w]}
          </span>
        ))}
      </div>
      <p className="card-desc">{job.description}</p>
      <div className="card-contact">
        {contact.phone && (
          <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
            <Phone size={14} /> {contact.phone}
          </a>
        )}
        {contact.email && (
          <a href={`mailto:${contact.email}`}>
            <Mail size={14} /> Email
          </a>
        )}
        {contact.website && (
          <a href={contact.website} target="_blank" rel="noreferrer">
            <Globe size={14} /> Portal <ExternalLink size={11} />
          </a>
        )}
      </div>
      <button className="btn btn-sm btn-outline card-cta" onClick={() => onSelect(job)}>
        Ver detalles
      </button>
    </article>
  );
}
