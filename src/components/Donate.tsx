import { ExternalLink, HandCoins, HeartHandshake, ShieldCheck } from 'lucide-react';
import { DONATION_LINKS } from '../data/config';

export default function Donate() {
  return (
    <div className="about-page donate-page">
      <h1>
        <HeartHandshake size={26} style={{ verticalAlign: '-4px', color: 'var(--green-700)' }} />{' '}
        Apoya FarMates AU
      </h1>
      <p>
        FarMates AU es <strong>gratis, sin publicidad y sin comisiones</strong>: nadie paga por
        aparecer en la wiki ni cobramos por conseguirte trabajo. El proyecto vive del tiempo libre
        de quienes lo mantienen y de la buena onda de la comunidad.
      </p>
      <p>
        Si la wiki te ayudó a encontrar tu temporada, a ahorrarte una llamada al otro lado del
        mundo o simplemente quieres que siga creciendo, cualquier aporte se agradece.
      </p>

      <div className="donate-grid">
        {DONATION_LINKS.map((o) => (
          <a
            key={o.id}
            className="donate-card"
            href={o.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="donate-card-top">
              <strong>{o.name}</strong>
              <ExternalLink size={15} />
            </div>
            <p>{o.note}</p>
            <span className="donate-cta">Donar ahora</span>
          </a>
        ))}
      </div>

      <p className="donate-note">
        ¿Prefieres otro medio (transferencia bancaria, cripto, Mercado Pago)? Escríbenos por las
        redes del proyecto y lo sumamos.
      </p>

      <div className="visa-card">
        <h3>
          <HandCoins size={20} /> En qué se usa tu donación
        </h3>
        <ul>
          <li>Hosting, dominio y mapas (las tiles del mapa no son gratis a gran escala).</li>
          <li>Tiempo de desarrollo: nuevas funciones, mejoras de datos y correcciones.</li>
          <li>Difusión entre comunidades de backpackers para que el wiki tenga más aportes.</li>
          <li>Cero para publicidad y cero para pagos a granjas o agencias.</li>
        </ul>
      </div>

      <p className="donate-note" style={{ marginTop: 16 }}>
        <ShieldCheck size={16} style={{ verticalAlign: '-3px' }} /> Las donaciones son{' '}
        <strong>voluntarias</strong>: la wiki seguirá siendo gratis para todos los viajeros, aportes
        o no.
      </p>
    </div>
  );
}
