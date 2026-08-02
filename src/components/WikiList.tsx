import { JobListing } from '../data/types';
import { useI18n } from '../i18n/LanguageContext';
import JobCard from './JobCard';

export default function WikiList({
  jobs,
  onSelect,
}: {
  jobs: JobListing[];
  onSelect: (j: JobListing) => void;
}) {
  const { t } = useI18n();
  if (jobs.length === 0) {
    return <div className="empty">{t('wiki.empty')}</div>;
  }
  return (
    <div className="card-grid">
      {jobs.map((j) => (
        <JobCard key={j.id} job={j} onSelect={onSelect} />
      ))}
    </div>
  );
}
