import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CheckCircle2, PlusCircle } from 'lucide-react';
import {
  JobListing,
  MONTHS,
  MONTHS_SHORT,
  STATE_NAMES,
  STATE_ORDER,
  WORK_TYPE_LABELS,
  StateCode,
  WorkType,
} from '../data/types';
import { KNOWN_TOWNS } from '../data/jobs';

const WORK_TYPES = Object.keys(WORK_TYPE_LABELS) as WorkType[];

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
      setError('Completa al menos: nombre, ciudad y cultivo.');
      return;
    }
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setError('Faltan las coordenadas (latitud y longitud). Usa una ciudad conocida o búscalas en Google Maps.');
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
      description: form.description.trim() || 'Sin descripción.',
      contact: {
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        website: form.website.trim() || undefined,
      },
      accommodation: form.accommodation.trim() || 'No especificado',
      specifiedWork: form.specifiedWork,
      verified: false,
      source: 'Aportado por la comunidad',
      addedBy: 'comunidad',
    };
    onAdd(job);
    setDone(true);
  };

  if (done) {
    return (
      <div className="success">
        <CheckCircle2 size={44} color="var(--green-700)" />
        <h2>Gracias por aportar al wiki</h2>
        <p>
          Tu entrada se guardó en este navegador y ya aparece en la wiki y en el mapa marcada como
          “verificar”. Otros viajeros podrán confirmar el contacto.
        </p>
        <button
          className="btn btn-outline"
          onClick={() => {
            setForm(INITIAL);
            setWorkTypes(['picking']);
            setDone(false);
          }}
        >
          <PlusCircle size={16} /> Agregar otra granja
        </button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h1 style={{ marginTop: 0 }}>Agregar una granja o empleador</h1>
      <p style={{ color: 'var(--muted)' }}>
        Aporta un contacto real con el que hayas trabajado o que esté confirmado. Los aportes se
        guardan en tu navegador y quedan marcados como “no verificados” hasta que la comunidad los
        confirme.
      </p>

      <form onSubmit={submit}>
        <div className="form-grid">
          <div className="field full">
            <label>Nombre de la granja / empleador *</label>
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Ej.: Sunny Valley Orchards"
            />
          </div>

          <div className="field">
            <label>Ciudad o pueblo *</label>
            <input
              value={form.town}
              onChange={(e) => set('town', e.target.value)}
              placeholder="Ej.: Mildura"
            />
          </div>

          <div className="field">
            <label>Estado *</label>
            <select value={form.state} onChange={(e) => set('state', e.target.value)}>
              {STATE_ORDER.map((s) => (
                <option key={s} value={s}>
                  {s} · {STATE_NAMES[s]}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Cultivo o rubro *</label>
            <input
              value={form.crop}
              onChange={(e) => set('crop', e.target.value)}
              placeholder="Ej.: cerezas, uvas, bananas…"
            />
          </div>

          <div className="field">
            <label>Ciudad conocida (autocompleta coordenadas)</label>
            <select defaultValue="" onChange={useKnownTown}>
              <option value="">— Elegir del catálogo —</option>
              {KNOWN_TOWNS.map((t) => (
                <option key={t.label} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Latitud *</label>
            <input
              value={form.lat}
              onChange={(e) => set('lat', e.target.value)}
              placeholder="Ej.: -34.185"
              step="any"
            />
          </div>

          <div className="field">
            <label>Longitud *</label>
            <input
              value={form.lng}
              onChange={(e) => set('lng', e.target.value)}
              placeholder="Ej.: 142.162"
              step="any"
            />
          </div>

          <div className="field">
            <label>Inicio de temporada (mes)</label>
            <select value={form.seasonStart} onChange={(e) => set('seasonStart', e.target.value)}>
              {MONTHS.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Fin de temporada (mes)</label>
            <select value={form.seasonEnd} onChange={(e) => set('seasonEnd', e.target.value)}>
              {MONTHS.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="field full">
            <label>Tipos de trabajo</label>
            <div className="check-row">
              {WORK_TYPES.map((w) => (
                <label key={w}>
                  <input
                    type="checkbox"
                    checked={workTypes.includes(w)}
                    onChange={() => toggleWork(w)}
                  />
                  {WORK_TYPE_LABELS[w]}
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Teléfono (opcional)</label>
            <input
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="Ej.: 1800 062 332"
            />
          </div>

          <div className="field">
            <label>Email (opcional)</label>
            <input
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="ejemplo@granja.com.au"
            />
          </div>

          <div className="field">
            <label>Sitio web / perfil (opcional)</label>
            <input
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
              placeholder="https://…"
            />
          </div>

          <div className="field">
            <label>Alojamiento típico (opcional)</label>
            <input
              value={form.accommodation}
              onChange={(e) => set('accommodation', e.target.value)}
              placeholder="Ej.: Hostel / on-farm / no hay"
            />
          </div>

          <div className="field full">
            <label>Descripción (opcional)</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Paga por pieza, horarios, cuánta gente contratan, trucos del área…"
            />
          </div>

          <div className="field full">
            <label className="check" style={{ display: 'inline-flex', gap: 8, fontWeight: 700 }}>
              <input
                type="checkbox"
                checked={form.specifiedWork}
                onChange={(e) => set('specifiedWork', e.target.checked)}
              />
              Cuenta como trabajo especificado para la visa 417/462
            </label>
          </div>
        </div>

        {error && <p className="note-warn" style={{ marginTop: 16 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" type="submit">
            <PlusCircle size={16} /> Publicar en la wiki
          </button>
        </div>
      </form>

      <div className="form-note" style={{ marginTop: 20 }}>
        ¿No sabes las coordenadas? Busca la ciudad en Google Maps, haz clic derecho sobre el punto y
        copia los números (latitud, longitud). La latitud de Australia es negativa (ej. -34.18) y la
        longitud es positiva (ej. 142.16).
      </div>
    </div>
  );
}
