export interface WeatherAlert {
  id: string;
  type: string;
  severity: 'RED' | 'ORANGE' | 'YELLOW';
  title: string;
  region: string;
  issued: string;
}

export const WEATHER_ALERTS: WeatherAlert[] = [
  {
    id: 'alt-1',
    type: 'Cyclone Warning',
    severity: 'RED',
    title: '🔴 RED ALERT: Super Cyclone Signal 4 active over Bay of Bengal affecting Odisha & AP Coasts.',
    region: 'Odisha / Andhra Pradesh, India',
    issued: '10 mins ago',
  },
  {
    id: 'alt-2',
    type: 'Flash Flood Warning',
    severity: 'ORANGE',
    title: '🟠 ORANGE ALERT: Torrential monsoon downpour expected in Wayanad & Idukki districts.',
    region: 'Kerala, India',
    issued: '25 mins ago',
  },
  {
    id: 'alt-3',
    type: 'Earthquake Tremor',
    severity: 'YELLOW',
    title: '🟡 YELLOW ALERT: M5.4 seismic activity reported in Pacific Ring fault line near Tokyo Bay.',
    region: 'Tokyo, Japan',
    issued: '42 mins ago',
  },
];

export const RESCUE_TEAMS = [
  'NDRF Team 1 (Kolkata Unit)',
  'NDRF Team 3 (Chennai Unit)',
  'NDRF Team 5 (Mumbai Squad)',
  'State Disaster Response Force (SDRF)',
  'Indian Coast Guard Aviation Unit',
  'Local Fire Brigade Squad 2',
  'Red Cross Medical Fleet',
];
