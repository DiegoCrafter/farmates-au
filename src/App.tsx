import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Donate from './components/Donate';
import FarmMap from './components/FarmMap';
import WikiList from './components/WikiList';
import AddJobForm from './components/AddJobForm';
import JobDetailModal from './components/JobDetailModal';
import SeasonBar from './components/SeasonBar';
import FilterBar from './components/FilterBar';
import { useJobs } from './hooks/useJobs';
import { inSeason, JobListing, StateCode, Tab, WorkType } from './data/types';
import { useI18n } from './i18n/LanguageContext';

export default function App() {
  const { t, monthsShort } = useI18n();
  const { jobs, addJob, removeJob } = useJobs();
  const [tab, setTab] = useState<Tab>('inicio');
  const [month, setMonth] = useState<number | null>(null);
  const [stateF, setStateF] = useState<'ALL' | StateCode>('ALL');
  const [workF, setWorkF] = useState<'ALL' | WorkType>('ALL');
  const [query, setQuery] = useState('');
  const [onlySpecified, setOnlySpecified] = useState(false);
  const [selected, setSelected] = useState<JobListing | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (month !== null && !inSeason(j, month)) return false;
      if (stateF !== 'ALL' && j.state !== stateF) return false;
      if (workF !== 'ALL' && !j.workTypes.includes(workF)) return false;
      if (onlySpecified && !j.specifiedWork) return false;
      if (q) {
        const hay = [
          j.name,
          j.nameEn,
          j.namePt,
          j.town,
          j.state,
          j.crop,
          j.cropEn,
          j.cropPt,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [jobs, month, stateF, workF, query, onlySpecified]);

  const thisMonth = new Date().getMonth();

  const stats = {
    total: jobs.length,
    states: new Set(jobs.map((j) => j.state)).size,
    thisMonth: jobs.filter((j) => inSeason(j, thisMonth)).length,
    community: jobs.filter((j) => j.addedBy === 'comunidad').length,
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'farmwiki-australia.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const showSeasonBar = tab === 'mapa' || tab === 'wiki';

  return (
    <div className="app">
      <Header tab={tab} onTab={setTab} communityCount={stats.community} />

      <main className="container">
        {tab === 'inicio' && (
          <Home
            stats={stats}
            month={thisMonth}
            onGoMap={(m) => {
              setMonth(m);
              setTab('mapa');
            }}
            onGoWiki={() => setTab('wiki')}
            onDonate={() => setTab('donar')}
          />
        )}

        {showSeasonBar && (
          <SeasonBar
            month={month}
            onMonthChange={(m) => setMonth(m === month ? null : m)}
          />
        )}

        {tab === 'mapa' && (
          <>
            <FilterBar
              stateF={stateF}
              setStateF={setStateF}
              workF={workF}
              setWorkF={setWorkF}
              onlySpecified={onlySpecified}
              setOnlySpecified={setOnlySpecified}
              query={query}
              setQuery={setQuery}
            />
            {month !== null && (
              <p className="seasonbar-hint">
                {t('map.activeHint', { n: filtered.length, month: monthsShort[month] })}
              </p>
            )}
            <FarmMap jobs={filtered} onSelect={setSelected} />
          </>
        )}

        {tab === 'wiki' && (
          <>
            <FilterBar
              stateF={stateF}
              setStateF={setStateF}
              workF={workF}
              setWorkF={setWorkF}
              onlySpecified={onlySpecified}
              setOnlySpecified={setOnlySpecified}
              query={query}
              setQuery={setQuery}
              showSearch
            />
            <div className="wiki-head">
              <p>
                {t('wiki.showing', { shown: filtered.length, total: jobs.length })}
                {month !== null && t('wiki.seasonSuffix', { month: monthsShort[month] })}
              </p>
              <button className="btn btn-outline btn-sm" onClick={exportData}>
                <Download size={14} /> {t('wiki.export')}
              </button>
            </div>
            <WikiList jobs={filtered} onSelect={setSelected} />
          </>
        )}

        {tab === 'agregar' && (
          <AddJobForm
            onAdd={(j) => {
              addJob(j);
              setSelected(j);
              setTab('wiki');
            }}
          />
        )}

        {tab === 'donar' && <Donate />}

        {tab === 'sobre' && <About />}
      </main>

      <Footer onTab={setTab} />

      {selected && (
        <JobDetailModal
          job={selected}
          onClose={() => setSelected(null)}
          onDelete={
            selected.addedBy === 'comunidad'
              ? () => {
                  removeJob(selected.id);
                  setSelected(null);
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
