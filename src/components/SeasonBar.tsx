import { useI18n } from '../i18n/LanguageContext';

export default function SeasonBar({
  month,
  onMonthChange,
}: {
  month: number | null;
  onMonthChange: (m: number) => void;
}) {
  const { t, monthsShort } = useI18n();
  return (
    <div className="seasonbar-wrap">
      <div className="seasonbar">
        {monthsShort.map((m, i) => (
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
          ? t('season.hintAll')
          : t('season.hintMonth', { month: monthsShort[month] })}
      </p>
    </div>
  );
}
