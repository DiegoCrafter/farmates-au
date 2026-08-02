import { MONTHS_SHORT } from '../data/types';

export default function SeasonBar({
  month,
  onMonthChange,
}: {
  month: number | null;
  onMonthChange: (m: number) => void;
}) {
  return (
    <div className="seasonbar-wrap">
      <div className="seasonbar">
        {MONTHS_SHORT.map((m, i) => (
          <button
            key={m}
            className={`month-btn ${month === i ? 'active' : ''}`}
            onClick={() => onMonthChange(i)}
          >
            {m}
          </button>
        ))}
      </div>
      <p className="seasonbar-hint">
        {month === null
          ? 'Mostrando todas las temporadas. Toca un mes para ver solo las zonas activas en ese mes.'
          : `Filtrando por la temporada de ${MONTHS_SHORT[month]}. Toca de nuevo el mes para quitar el filtro.`}
      </p>
    </div>
  );
}
