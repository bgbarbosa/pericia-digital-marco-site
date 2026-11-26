// Traços dos ícones da referência aprovada, convertidos em JSX estático.
const shapes = {
  arrow: <><path d="M4 12h15m-6-6 6 6-6 6" /></>,
  audio: <><path d="M3 10v4m4-8v12m5-15v18m5-15v12m4-8v4" /></>,
  back: <><path d="M20 12H5m6-6-6 6 6 6" /></>,
  bank: <><path d="m2 9 10-6 10 6H2Zm2 12h16M6 10v8m4-8v8m4-8v8m4-8v8M3 18h18" /></>,
  book: <><path d="M12 6a8 8 0 0 0-9-3v16a9 9 0 0 1 9 2 9 9 0 0 1 9-2V3a8 8 0 0 0-9 3Zm0 0v15" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12h18m-11 0v2h4v-2" /></>,
  building: <><rect x="5" y="3" width="14" height="19" rx="2" /><path d="M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1m-4 7v-3h2v3" /></>,
  car: <><path d="m5 10 2-5h10l2 5M3 10h18v8H3Zm2 8v3m14-3v3M6 14h2m8 0h2" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="18" rx="2" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="m8 13 2 2 5-5m-7 8h8" /></>,
  cpu: <><rect x="5" y="5" width="14" height="14" rx="3" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" /></>,
  file: <><path d="M6 2h8l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z M14 2v6h5M8 12h7m-7 4h7" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 7h14M5 17h14" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8" cy="8" r="2" /><path d="m3 17 5-5 4 4 4-6 5 7" /></>,
  layers: <><path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V6a4 4 0 1 1 8 0v4m-4 4v3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  message: <><path d="M20 11a8 8 0 0 1-8 8H5l1.5-4A8 8 0 1 1 20 11Z" /><path d="M8 9h8m-8 4h5" /></>,
  monitor: <><rect x="3" y="3" width="18" height="13" rx="2" /><path d="M8 21h8m-4-5v5" /></>,
  network: <><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="16" y="16" width="6" height="6" rx="1" /><path d="M12 8v4H5v4m7-4h7v4" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  scale: <><path d="M12 3v18M5 21h14M3 7h18M6 7l-4 8h8L6 7Zm12 0-4 8h8l-4-8Z" /></>,
  search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></>,
  shield: <><path d="m12 2 9 4v6c0 5-5 9-9 10-4-1-9-5-9-10V6Z" /><path d="m8 12 3 3 5-6" /></>,
  smartphone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4M11 19h2" /></>,
  users: <><circle cx="9" cy="7" r="3" /><path d="M3 20v-3a6 6 0 0 1 12 0v3m2-15a3 3 0 0 1 0 6m2 3a5 5 0 0 1 2 4v2" /></>,
  video: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m10 9 5 3-5 3Z" /></>,
};

export default function ForensicsIcon({ name, className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      {shapes[name]}
    </svg>
  );
}
