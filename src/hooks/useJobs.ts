import { useEffect, useMemo, useState } from 'react';
import { JobListing } from '../data/types';
import { SEED_JOBS } from '../data/jobs';

const STORAGE_KEY = 'farmwiki.community.v1';

function loadCommunity(): JobListing[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as JobListing[]) : [];
  } catch {
    return [];
  }
}

export function useJobs() {
  const [community, setCommunity] = useState<JobListing[]>(() =>
    typeof window === 'undefined' ? [] : loadCommunity()
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(community));
    } catch {
      // almacenamiento no disponible: se ignora
    }
  }, [community]);

  const jobs = useMemo(() => [...community, ...SEED_JOBS], [community]);

  const addJob = (j: JobListing) => setCommunity((prev) => [j, ...prev]);
  const removeJob = (id: string) => setCommunity((prev) => prev.filter((j) => j.id !== id));
  const resetCommunity = () => setCommunity([]);

  return { jobs, addJob, removeJob, resetCommunity };
}
