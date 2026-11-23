import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapMarkerItem } from '../types';
import { PriorityBadge } from './PriorityBadge';
import { ResourceBadge } from './ResourceBadge';
import { AlertCircle, MapPin, Users, Shield, MousePointer } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DisasterMapProps {
  markers: MapMarkerItem[];
  focusCenter?: [number, number];
  focusZoom?: number;
}

// Helper component to control map flyTo & scrollWheelZoom dynamically
const MapController: React.FC<{ center: [number, number]; zoom: number; allowWheelZoom: boolean }> = ({
  center,
  zoom,
  allowWheelZoom,
}) => {
  const map = useMap();

  useEffect(() => {
    if (allowWheelZoom) {
      map.scrollWheelZoom.enable();
    } else {
      map.scrollWheelZoom.disable();
    }
  }, [allowWheelZoom, map]);

  useEffect(() => {
    // Invalidate map size after container mounts so tiles load 100% sharply
    const timer = setTimeout(() => {
      map.invalidateSize();
      map.flyTo(center, zoom, { duration: 1.5 });
    }, 150);
    return () => clearTimeout(timer);
  }, [center, zoom, map]);

  return null;
};

export const DisasterMap: React.FC<DisasterMapProps> = ({ markers, focusCenter, focusZoom }) => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Disable scrollWheelZoom by default to prevent page scroll locking bug
  const [allowWheelZoom, setAllowWheelZoom] = useState<boolean>(false);

  // Default starting center matches user screenshot [21.0, 82.0] with zoom level 4 (India + Subcontinent)
  const [mapCenter, setMapCenter] = useState<[number, number]>(focusCenter || [21.0, 82.0]);
  const [mapZoom, setMapZoom] = useState<number>(focusZoom || 4);

  useEffect(() => {
    if (focusCenter) {
      setMapCenter(focusCenter);
      setMapZoom(focusZoom || 10);
    }
  }, [focusCenter, focusZoom]);

  const disasterIconsMap: Record<string, string> = {
    'Flood': '🌊',
    'Tsunami': '🌊',
    'Fire': '🔥',
    'Earthquake': '⚡',
    'Cyclone': '🌪️',
    'Landslide': '⛰️',
    'Building Collapse': '🏢',
    'Road Accident': '🚗',
  };

  const createCustomMarkerIcon = (item: MapMarkerItem) => {
    const p = item.priority?.toLowerCase() || 'medium';
    const score = Math.round(item.severity_score);
    const emoji = disasterIconsMap[item.title] || '🚨';

    let bgGrad = 'from-amber-500 to-amber-600';
    let borderColor = 'border-amber-300';
    let shadowColor = 'rgba(234, 179, 8, 0.6)';
    let pulseClass = '';

    if (p === 'critical' || score >= 75) {
      bgGrad = 'from-red-600 to-rose-700';
      borderColor = 'border-red-300';
      shadowColor = 'rgba(239, 68, 68, 0.9)';
      pulseClass = 'marker-pulse-critical';
    } else if (p === 'high' || score >= 50) {
      bgGrad = 'from-orange-500 to-amber-600';
      borderColor = 'border-orange-300';
      shadowColor = 'rgba(249, 115, 22, 0.8)';
      pulseClass = 'marker-pulse-high';
    } else if (p === 'low' || score < 30) {
      bgGrad = 'from-emerald-500 to-teal-600';
      borderColor = 'border-emerald-300';
      shadowColor = 'rgba(16, 185, 129, 0.6)';
    }

    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div class="relative group cursor-pointer flex flex-col items-center">
          <!-- Outer Pulsing Container -->
          <div class="w-9 h-9 rounded-full bg-gradient-to-br ${bgGrad} border-2 ${borderColor} shadow-xl flex items-center justify-center text-white font-bold text-sm ${pulseClass}" style="box-shadow: 0 0 16px ${shadowColor};">
            <span>${emoji}</span>
          </div>

          <!-- Score Badge Attached Below -->
          <div class="absolute -bottom-2 bg-slate-950 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full border border-slate-700 shadow-md">
            ${score}
          </div>
        </div>
      `,
      iconSize: [36, 42],
      iconAnchor: [18, 21],
    });
  };

  const filteredMarkers = activeCategory === 'All'
    ? markers
    : markers.filter((m) => m.title.toLowerCase().includes(activeCategory.toLowerCase()));

  const tileUrl = theme === 'dark'
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  const regions = [
    { name: '🇮🇳 India Subcontinent', center: [21.0, 82.0] as [number, number], zoom: 4 },
    { name: '🌍 Global View', center: [20.0, 10.0] as [number, number], zoom: 2 },
    { name: '🇺🇸 North America', center: [37.0, -96.0] as [number, number], zoom: 4 },
    { name: '🌏 Asia-Pacific', center: [20.0, 100.0] as [number, number], zoom: 4 },
    { name: '🇪🇺 Europe', center: [48.0, 15.0] as [number, number], zoom: 4 },
  ];

  const categories = ['All', 'Flood', 'Earthquake', 'Fire', 'Cyclone', 'Landslide', 'Building Collapse', 'Road Accident'];

  return (
    <div className="h-[540px] w-full rounded-3xl overflow-hidden border dark:border-slate-800 border-slate-200 shadow-2xl relative flex flex-col">
      {/* Map Control Bar Header */}
      <div className="p-3 dark:bg-slate-900/90 bg-white/90 backdrop-blur-md border-b dark:border-slate-800 border-slate-200 flex flex-wrap items-center justify-between gap-2 z-20">
        {/* Quick Region Selector */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-bold text-slate-400 text-[11px] mr-1 hidden sm:inline">Regions:</span>
          {regions.map((r) => (
            <button
              key={r.name}
              onClick={() => {
                setMapCenter(r.center);
                setMapZoom(r.zoom);
              }}
              className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                mapCenter[0] === r.center[0] && mapCenter[1] === r.center[1]
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'dark:bg-slate-800 bg-slate-100 dark:hover:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Wheel Zoom Scroll Toggle to prevent page scrolling bug */}
          <button
            onClick={() => setAllowWheelZoom(!allowWheelZoom)}
            className={`px-3 py-1 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 border transition-all cursor-pointer shadow-xs ${
              allowWheelZoom
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-600/20'
                : 'dark:bg-slate-800 bg-slate-100 dark:text-slate-300 text-slate-700 border-slate-300 dark:border-slate-700 hover:border-purple-500'
            }`}
            title="Toggle whether mouse scroll wheel zooms the map or scrolls the page"
          >
            <MousePointer className="w-3.5 h-3.5" />
            {allowWheelZoom ? 'Map Wheel Zoom: ON' : 'Map Wheel Zoom: OFF'}
          </button>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'dark:bg-slate-800/80 bg-slate-100 dark:text-slate-400 text-slate-600 hover:text-purple-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="flex-1 relative">
        <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={allowWheelZoom} className="h-full w-full">
          <MapController center={mapCenter} zoom={mapZoom} allowWheelZoom={allowWheelZoom} />
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            url={tileUrl}
          />
          {filteredMarkers.map((item) => (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              icon={createCustomMarkerIcon(item)}
            >
              <Popup className="disaster-popup">
                <div className="p-2 space-y-2 max-w-xs">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-700/60 pb-2">
                    <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      {item.title}
                    </h4>
                    <PriorityBadge priority={item.priority} size="sm" />
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed italic">
                    "{item.text}"
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-purple-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location_name}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Users className="w-3.5 h-3.5" />
                      {item.victim_count} Victims
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Urgency Score: <strong className="text-emerald-400">{item.severity_score}/100</strong></span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold uppercase">{item.status}</span>
                  </div>

                  {item.resources && item.resources.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.resources.map((res, i) => (
                        <ResourceBadge key={i} name={res} />
                      ))}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Map Legend Overlay (Bottom Right) */}
        <div className="absolute bottom-3 right-3 z-[1000] p-3 rounded-2xl dark:bg-slate-950/85 bg-white/90 backdrop-blur-md border dark:border-slate-800 border-slate-200 shadow-2xl text-[10px] space-y-1.5">
          <p className="font-black uppercase tracking-wider dark:text-slate-300 text-slate-800 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-purple-500" /> Severity Index Legend
          </p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-bold">
            <span className="flex items-center gap-1.5 text-red-500">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-ping" /> Critical (≥ 75)
            </span>
            <span className="flex items-center gap-1.5 text-orange-500">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" /> High (50-74)
            </span>
            <span className="flex items-center gap-1.5 text-amber-500">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Medium (30-49)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Low (&lt; 30)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
