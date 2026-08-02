import { Search } from 'lucide-react';
import { STATE_ORDER, StateCode, WorkType } from '../data/types';
import { useI18n } from '../i18n/LanguageContext';

interface Props {
  stateF: 'ALL' | StateCode;
  setStateF: (v: 'ALL' | StateCode) => void;
  workF: 'ALL' | WorkType;
  setWorkF: (v: 'ALL' | WorkType) => void;
  onlySpecified: boolean;
  setOnlySpecified: (v: boolean) => void;
  query: string;
  setQuery: (v: string) => void;
  showSearch?: boolean;
}

export default function FilterBar({
  stateF,
  setStateF,
  workF,
  setWorkF,
  onlySpecified,
  setOnlySpecified,
  query,
  setQuery,
  showSearch,
}: Props) {
  const { t, stateNames, workTypeLabels } = useI18n();
  return (
    <div className="filterbar">
      {showSearch && (
        <input
          className="search"
          type="search"
          placeholder={t('filter.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <select value={stateF} onChange={(e) => setStateF(e.target.value as 'ALL' | StateCode)}>
        <option value="ALL">{t('filter.allStates')}</option>
        {STATE_ORDER.map((s) => (
          <option key={s} value={s}>
            {s} · {stateNames[s]}
          </option>
        ))}
      </select>
      <select value={workF} onChange={(e) => setWorkF(e.target.value as 'ALL' | WorkType)}>
        <option value="ALL">{t('filter.allWork')}</option>
        {Object.entries(workTypeLabels).map(([k, label]) => (
          <option key={k} value={k}>
            {label}
          </option>
        ))}
      </select>
      <label className="check">
        <input
          type="checkbox"
          checked={onlySpecified}
          onChange={(e) => setOnlySpecified(e.target.checked)}
        />
        {t('filter.onlySpecified')}
      </label>
      {showSearch && (
        <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
          <Search size={14} style={{ verticalAlign: '-2px' }} />
        </span>
      )}
    </div>
  );
}
