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
import { MONTHS } from '../data/types';

interface Props {
  stats: { total: number; states: number; thisMonth: number; community: number };
  month: number;
  onGoMap: (month: number) => void;
  onGoWiki: () => void;
  onDonate: () => void;
}

export default function Home({ stats, month, onGoMap, onGoWiki, onDonate }: Props) {
  return (
    <div>
      <section className="hero">
        <h1>
          Trabajo de cosecha y extensión en Australia, <span style={{ color: 'var(--green-700)' }}>zona por zona</span> y por
          temporada.
        </h1>
        <p className="lead">
          Farmates AU es una wiki colaborativa para backpackers y working holiday makers: mapa
          interactivo con las temporadas de cada región, contactos oficiales y aportes de la
          comunidad de viajeros.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => onGoMap(month)}>
            <MapPin size={16} /> Ver en el mapa ({MONTHS[month]} activo)
          </button>
          <button className="btn btn-outline" onClick={onGoWiki}>
            Explorar la wiki
          </button>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-num">
            <Leaf size={22} /> {stats.total}
          </div>
          <div className="stat-label">zonas con trabajo de temporada</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">
            <MapPin size={22} /> {stats.states}
          </div>
          <div className="stat-label">estados y territorios</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">
            <CalendarDays size={22} /> {stats.thisMonth}
          </div>
          <div className="stat-label">activas en {MONTHS[month].toLowerCase()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">
            <Users size={22} /> {stats.community}
          </div>
          <div className="stat-label">aportes de la comunidad</div>
        </div>
      </section>

      <section className="section">
        <h2>Cómo funciona</h2>
        <p className="sub">Tres pasos para encontrar tu próxima temporada.</p>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Elige el mes</h3>
            <p>
              Usa la barra de temporadas en el mapa o en la wiki: cada zona aparece solo en los
              meses en que realmente hay cosecha.
            </p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Contacta antes de viajar</h3>
            <p>
              Llama o escribe al contacto de la ficha y confirma disponibilidad y alojamiento.
              Las buenas temporadas se llenan semanas antes.
            </p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Aporta al wiki</h3>
            <p>
              ¿Trabajaste en una granja y tienes el contacto real? Agrégala en la pestaña
              “Agregar” para ayudar a los que vienen detrás.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Recursos oficiales y útiles</h2>
        <p className="sub">Empieza por aquí antes de mirar listados de Facebook o Gumtree.</p>
        <div className="two-col">
          <ul className="resource-list">
            {OFFICIAL_RESOURCES.map((r) => (
              <li key={r.name} className="resource">
                <Globe size={18} style={{ color: 'var(--green-700)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.name} <ExternalLink size={13} />
                  </a>
                  {r.phone && (
                    <a href={`tel:${r.phone.replace(/[^+\d]/g, '')}`} style={{ color: 'var(--ink)' }}>
                      <Phone size={13} /> {r.phone}
                    </a>
                  )}
                  <p>{r.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="visa-card">
            <h3>
              <ShieldCheck size={20} /> Trabajo especificado y tu visa
            </h3>
            <ul>
              <li>
                <strong>Visa 417 / 462 (Working Holiday):</strong> para renovar al 2.º año se
                necesitan <strong>88 días</strong> de trabajo especificado (specified work) en
                agricultura, cosecha o zonas regionales.
              </li>
              <li>
                <strong>3.er año:</strong> <strong>179 días</strong> adicionales en áreas
                regionales (417) o en el norte de Australia (462).
              </li>
              <li>
                No todo trabajo cuenta: verifica siempre en{' '}
                <a href="https://immi.homeaffairs.gov.au" target="_blank" rel="noreferrer">
                  immi.homeaffairs.gov.au
                </a>{' '}
                los requisitos vigentes antes de planificar tu año.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>
          <Sprout size={20} style={{ verticalAlign: '-3px', color: 'var(--green-700)' }} /> ¿Empezamos?
        </h2>
        <p className="sub">
          Mira qué zonas están activas este mes o explora el listado completo con contactos.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => onGoMap(month)}>
            <MapPin size={16} /> Mapa de temporadas
          </button>
          <button className="btn btn-outline" onClick={onGoWiki}>
            Listado completo
          </button>
          <button className="btn btn-outline" onClick={onDonate}>
            <HeartHandshake size={16} /> Apoyar el proyecto
          </button>
        </div>
      </section>
    </div>
  );
}
