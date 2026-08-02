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
import {
  JobListing,
  MONTHS_SHORT,
  STATE_NAMES,
  WORK_TYPE_LABELS,
  inSeason,
  monthRangeLabel,
} from '../data/types';

export default function JobDetailModal({
  job,
  onClose,
  onDelete,
}: {
  job: JobListing;
  onClose: () => void;
  onDelete?: () => void;
}) {
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
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        <h2>{job.name}</h2>
        <p className="meta-line">
          <MapPin size={14} /> {job.town}, {job.state} · {STATE_NAMES[job.state]}
        </p>
        <p className="meta-line">
          <CalendarDays size={14} /> Temporada: {monthRangeLabel(job)}
        </p>
        <div className="card-tags" style={{ marginTop: 8 }}>
          {job.verified ? (
            <span className="chip chip-ok">
              <BadgeCheck size={13} /> Contacto verificado
            </span>
          ) : (
            <span className="chip chip-warn">Contacto aún no verificado</span>
          )}
          {job.specifiedWork && <span className="chip chip-spec">Cuenta como trabajo especificado (visa)</span>}
          {job.workTypes.map((w) => (
            <span key={w} className="chip chip-work">
              {WORK_TYPE_LABELS[w]}
            </span>
          ))}
        </div>

        <div className="modal-section">
          <h4>Temporada mes a mes</h4>
          <div className="sdot-row">
            {MONTHS_SHORT.map((m, i) => (
              <div
                key={m}
                className={`sdot ${inSeason(job, i) ? 'on' : ''} ${i === nowMonth ? 'now' : ''}`}
                title={`${m}${i === nowMonth ? ' (este mes)' : ''}`}
              >
                {m}
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '8px 0 0' }}>
            Los meses en verde son temporada. El marco ámbar marca el mes actual.
          </p>
        </div>

        <div className="modal-section">
          <h4>Contacto</h4>
          <div className="contact-btns">
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
                <Phone size={16} /> {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className={contact.phone ? 'ghost' : ''}>
                <Mail size={16} /> Escribir email
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noreferrer"
                className={contact.phone || contact.email ? 'ghost' : ''}
              >
                <Globe size={16} /> Sitio / portal <ExternalLink size={13} />
              </a>
            )}
          </div>
          {contact.harvestOffice && (
            <p className="form-note" style={{ marginTop: 12 }}>
              <Info size={14} /> Esta es una oficina oficial de empleo agrícola (gratuita). No
              cobran por inscribirte ni por conseguirte trabajo.
            </p>
          )}
          {!job.verified && (
            <p className="note-warn" style={{ marginTop: 12 }}>
              <AlertTriangle size={16} /> Este contacto no ha sido confirmado por la comunidad.
              Llama o escribe para verificar antes de hacer planes.
            </p>
          )}
        </div>

        <div className="modal-section">
          <h4>Descripción</h4>
          <p style={{ margin: 0 }}>{job.description}</p>
          <p style={{ margin: '10px 0 0', fontSize: '0.9rem' }}>
            <BedDouble size={14} style={{ verticalAlign: '-2px' }} /> Alojamiento típico:{' '}
            <strong>{job.accommodation}</strong>
          </p>
          {job.specifiedWork && (
            <p style={{ margin: '10px 0 0', fontSize: '0.9rem' }}>
              <ShieldCheck size={14} style={{ verticalAlign: '-2px' }} /> Cuenta como specified
              work para renovar tu visa 417/462.
            </p>
          )}
        </div>

        <div className="modal-section">
          <h4>Fuente y estado</h4>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)' }}>
            Fuente: {job.source} · Aportado por: {job.addedBy === 'comunidad' ? 'la comunidad' : 'el equipo'}
          </p>
          {onDelete && (
            <button className="btn btn-sm btn-danger" onClick={onDelete} style={{ marginTop: 12 }}>
              <Trash2 size={14} /> Eliminar este aporte
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
