import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CheckCircle2, PlusCircle } from 'lucide-react';
import { JobListing, STATE_ORDER, StateCode, WorkType } from '../data/types';
import { KNOWN_TOWNS } from '../data/jobs';
import { useI18n } from '../i18n/LanguageContext';

interface FormState {
  name: string;
  town: string;
  state: StateCode;
  crop: string;
  seasonStart: string;
  seasonEnd: string;
  accommodation: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  lat: string;
  lng: string;
  specifiedWork: boolean;
}

const INITIAL: FormState = {
  name: '',
  town: '',
  state: 'NSW',
  crop: '',
  seasonStart: '0',
  seasonEnd: '11',
  accommodation: '',
  description: '',
  phone: '',
  email: '',
  website: '',
  lat: '',
  lng: '',
  specifiedWork: true,
};

export default function AddJobForm({ onAdd }: { onAdd: (j: JobListing) => void }) {
  const { t, months, stateNames, workTypeLabels } = useI18n();
  const WORK_TYPES = Object.keys(workTypeLabels) as WorkType[];

  const [form, setForm] = useState<FormState>(INITIAL);
  const [workTypes, setWorkTypes] = useState<WorkType[]>(['picking']);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleWork = (w: WorkType) =>
    setWorkTypes((ws) => (ws.includes(w) ? ws.filter((x) => x !== w) : [...ws, w]));

  const useKnownTown = (e: ChangeEvent<HTMLSelectElement>) => {
    const t = KNOWN_TOWNS.find((k) => k.label === e.target.value);
    if (!t) return;
    setForm((f) => ({
      ...f,
      town: t.town,
      state: t.state,
      lat: String(t.lat),
      lng: String(t.lng),
    }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const lat = parseFloat(form.lat);
    const lng = parseFloat(form.lng);
    if (!form.name.trim() || !form.town.trim() || !form.crop.trim()) {
      setError(t('form.errRequired'));
      return;
    }
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setError(t('form.errCoords'));
      return;
    }
    const job: JobListing = {
      id: `comunidad-${Date.now()}`,
      name: form.name.trim(),
      town: form.town.trim(),
      state: form.state,
      lat,
      lng,
      crop: form.crop.trim(),
      workTypes: workTypes.length ? workTypes : ['general'],
      seasonStart: parseInt(form.seasonStart, 10),
      seasonEnd: parseInt(form.seasonEnd, 10),
      description: form.description.trim() || t('form.noDesc'),
      contact: {
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        website: form.website.trim() || undefined,
      },
      accommodation: form.accommodation.trim() || t('form.noAccom'),
      specifiedWork: form.specifiedWork,
      verified: false,
      source: t('form.sourceCommunity'),
      addedBy: 'comunidad',
    };
    onAdd(job);
    setDone(true);
  };

  if (done) {
    return (
      <div className="success">
        <CheckCircle2 size={44} color="var(--green-700)" />
        <h2>{t('form.successTitle')}</h2>
        <p>{t('form.successBody')}</p>
        <button
          className="btn btn-outline"
          onClick={() => {
            setForm(INITIAL);
            setWorkTypes(['picking']);
            setDone(false);
          }}
        >
          <PlusCircle size={16} /> {t('form.addAnother')}
        </button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h1 style={{ marginTop: 0 }}>{t('form.title')}</h1>
      <p style={{ color: 'var(--muted)' }}>{t('form.intro')}</p>

      <form onSubmit={submit}>
        <div className="form-grid">
          <div className="field full">
            <label>{t('form.name')}</label>
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder={t('form.namePh')}
            />
          </div>

          <div className="field">
            <label>{t('form.town')}</label>
            <input
              value={form.town}
              onChange={(e) => set('town', e.target.value)}
              placeholder={t('form.townPh')}
            />
          </div>

          <div className="field">
            <label>{t('form.state')}</label>
            <select value={form.state} onChange={(e) => set('state', e.target.value)}>
              {STATE_ORDER.map((s) => (
                <option key={s} value={s}>
                  {s} · {stateNames[s]}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>{t('form.crop')}</label>
            <input
              value={form.crop}
              onChange={(e) => set('crop', e.target.value)}
              placeholder={t('form.cropPh')}
            />
          </div>

          <div className="field">
            <label>{t('form.knownTown')}</label>
            <select defaultValue="" onChange={useKnownTown}>
              <option value="">{t('form.knownTownPh')}</option>
              {KNOWN_TOWNS.map((t) => (
                <option key={t.label} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>{t('form.lat')}</label>
            <input
              value={form.lat}
              onChange={(e) => set('lat', e.target.value)}
              placeholder={t('form.latPh')}
              step="any"
            />
          </div>

          <div className="field">
            <label>{t('form.lng')}</label>
            <input
              value={form.lng}
              onChange={(e) => set('lng', e.target.value)}
              placeholder={t('form.lngPh')}
              step="any"
            />
          </div>

          <div className="field">
            <label>{t('form.seasonStart')}</label>
            <select value={form.seasonStart} onChange={(e) => set('seasonStart', e.target.value)}>
              {months.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>{t('form.seasonEnd')}</label>
            <select value={form.seasonEnd} onChange={(e) => set('seasonEnd', e.target.value)}>
              {months.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="field full">
            <label>{t('form.workTypes')}</label>
            <div className="check-row">
              {WORK_TYPES.map((w) => (
                <label key={w}>
                  <input
                    type="checkbox"
                    checked={workTypes.includes(w)}
                    onChange={() => toggleWork(w)}
                  />
                  {workTypeLabels[w]}
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label>{t('form.phone')}</label>
            <input
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder={t('form.phonePh')}
            />
          </div>

          <div className="field">
            <label>{t('form.email')}</label>
            <input
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder={t('form.emailPh')}
            />
          </div>

          <div className="field">
            <label>{t('form.website')}</label>
            <input
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
              placeholder={t('form.websitePh')}
            />
          </div>

          <div className="field">
            <label>{t('form.accommodation')}</label>
            <input
              value={form.accommodation}
              onChange={(e) => set('accommodation', e.target.value)}
              placeholder={t('form.accommodationPh')}
            />
          </div>

          <div className="field full">
            <label>{t('form.description')}</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder={t('form.descriptionPh')}
            />
          </div>

          <div className="field full">
            <label className="check" style={{ display: 'inline-flex', gap: 8, fontWeight: 700 }}>
              <input
                type="checkbox"
                checked={form.specifiedWork}
                onChange={(e) => set('specifiedWork', e.target.checked)}
              />
              {t('form.specCheck')}
            </label>
          </div>
        </div>

        {error && <p className="note-warn" style={{ marginTop: 16 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" type="submit">
            <PlusCircle size={16} /> {t('form.submit')}
          </button>
        </div>
      </form>

      <div className="form-note" style={{ marginTop: 20 }}>
        {t('form.coordsNote')}
      </div>
    </div>
  );
}
