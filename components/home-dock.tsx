function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 7.72c-.86-.99-2.05-1.56-3.18-1.56-.12 0-.24.01-.36.02-1.16-.1-2.28.62-2.87.62-.62 0-1.56-.6-2.58-.52-1.32.08-2.54.77-3.22 1.96-1.38 2.39-.35 5.92.98 7.86.66.96 1.44 2.03 2.48 1.99.98-.04 1.36-.64 2.55-.64 1.18 0 1.53.64 2.57.62 1.07-.02 1.74-.97 2.39-1.93.43-.62.76-1.3.98-2.02-2.57-.98-2.98-4.62-.74-6.4Z" />
      <path d="M14.22 4.72c.52-.66.87-1.55.77-2.45-.74.04-1.64.5-2.17 1.13-.48.56-.9 1.46-.79 2.32.83.06 1.68-.42 2.19-1Z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="15.7" cy="7.35" r="1.85" opacity="0.94" />
      <path
        opacity="0.94"
        d="M12.2 16.55c.2-3.9 1.55-7.25 3.5-7.25 1.9 0 3.2 3.2 3.45 7.25.04.35.05.6.05.75h-7.15c0-.22.05-.5.15-.75Z"
      />
      <circle cx="9.05" cy="8.7" r="2.35" />
      <path d="M3.9 18.4c.35-4.6 2.2-7.35 5.15-7.35s4.8 2.75 5.15 7.35c.03.3.05.55.05.7H3.85c0-.22.02-.45.05-.7Z" />
    </svg>
  );
}

function PhotosIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M2.7 18.15 8.05 11.1c.22-.28.66-.3.92-.04l2.35 2.28 1.72-1.78c.24-.25.64-.24.88.02l5.35 6.57H2.7Z" />
      <path d="m15.85 3.55.95 2.15 2.2.35-1.6 1.5.4 2.15-1.95-1.05-1.95 1.05.4-2.15-1.6-1.5 2.2-.35.95-2.15Z" />
    </svg>
  );
}

export function HomeDock() {
  return (
    <nav className="dock" aria-label="Home">
      <button className="dock__btn" type="button" aria-label="Store">
        <StoreIcon />
      </button>
      <button className="dock__btn" type="button" aria-label="People">
        <PeopleIcon />
      </button>
      <button className="dock__btn" type="button" aria-label="Photos" aria-current="page">
        <PhotosIcon />
      </button>
    </nav>
  );
}
