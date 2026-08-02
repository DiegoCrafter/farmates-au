import { CalendarDays, MapPin } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { JobListing, WorkType } from '../data/types';
import { WORK_TYPE_COLORS } from '../data/jobs';
import { useI18n } from '../i18n/LanguageContext';

function iconFor(wt: WorkType) {
  return L.divIcon({
    className: 'fm-icon',
    html: `<span class="fm-marker" style="background:${WORK_TYPE_COLORS[wt]}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });
}

export default function FarmMap({
  jobs,
  onSelect,
}: {
  jobs: JobListing[];
  onSelect: (j: JobListing) => void;
}) {
  const { t, workTypeLabels, monthRangeLabel, localizedName, localizedCrop } = useI18n();
  return (
    <div>
      <div className="map-shell">
        <MapContainer
          center={[-25.4, 134.5]}
          zoom={4}
          scrollWheelZoom
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {jobs.map((j) => (
            <Marker key={j.id} position={[j.lat, j.lng]} icon={iconFor(j.workTypes[0])}>
              <Popup>
                <div className="fm-popup">
                  <strong>{localizedName(j)}</strong>
                  <span className="fm-popup-meta">
                    <MapPin size={12} /> {j.town}, {j.state} · {localizedCrop(j)}
                  </span>
                  <span className="fm-popup-meta">
                    <CalendarDays size={12} /> {t('map.popupSeason', { label: monthRangeLabel(j) })}
                  </span>
                  {j.specifiedWork && <span className="chip chip-spec">{t('map.popupSpec')}</span>}
                  <button className="btn btn-sm btn-outline" onClick={() => onSelect(j)}>
                    {t('map.popupBtn')}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="map-legend">
        {Object.entries(WORK_TYPE_COLORS).map(([k, c]) => (
          <span key={k}>
            <i style={{ background: c }} />
            {workTypeLabels[k as WorkType]}
          </span>
        ))}
      </div>
    </div>
  );
}
