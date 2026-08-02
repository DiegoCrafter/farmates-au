import { JobListing } from '../data/types';
import JobCard from './JobCard';

export default function WikiList({
  jobs,
  onSelect,
}: {
  jobs: JobListing[];
  onSelect: (j: JobListing) => void;
}) {
  if (jobs.length === 0) {
    return (
      <div className="empty">
        No hay trabajos que coincidan con los filtros. Prueba con otro mes, estado o tipo de
        trabajo.
      </div>
    );
  }
  return (
    <div className="card-grid">
      {jobs.map((j) => (
        <JobCard key={j.id} job={j} onSelect={onSelect} />
      ))}
    </div>
  );
}
