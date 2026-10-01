function TrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8.9 9.4V6.6c0-2.15 1.35-3.85 3.1-3.85s3.1 1.7 3.1 3.85v2.8H13.2V6.6c0-1.05-.55-1.85-1.2-1.85s-1.2.8-1.2 1.85v2.8H8.9Z"
      />
      <path d="M12 8.15c3.8 0 6.6 2.6 6.6 5.95 0 3.75-2.95 6.8-6.6 6.8s-6.6-3.05-6.6-6.8c0-3.35 2.8-5.95 6.6-5.95Z" />
    </svg>
  );
}

function PlansIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M4.05 2.9h15.9c1.2 0 2 .78 2 1.9v9.2c0 1.12-.8 1.9-2 1.9H4.05c-1.2 0-2-.78-2-1.9V4.8c0-1.12.8-1.9 2-1.9Zm2.25 2.55h9.55c.46 0 .8.32.8.75s-.34.75-.8.75H6.3c-.46 0-.8-.32-.8-.75s.34-.75.8-.75Zm0 2.9h9.55c.46 0 .8.32.8.75s-.34.75-.8.75H6.3c-.46 0-.8-.32-.8-.75s.34-.75.8-.75Zm0 2.9h6.35c.46 0 .8.32.8.75s-.34.75-.8.75H6.3c-.46 0-.8-.32-.8-.75s.34-.75.8-.75Z"
      />
      <path d="M7.85 15.8h8.3c.92 0 1.32.5 1.1 1.15l-.48 1.4c-.32.92-1.02 1.5-2.05 1.5H9.28c-1.03 0-1.73-.58-2.05-1.5l-.48-1.4c-.22-.65.18-1.15 1.1-1.15Z" />
    </svg>
  );
}

function YouIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="7.15" r="3.15" />
      <path d="M4.65 19.4c.68-4.6 3.35-7.25 7.35-7.25s6.67 2.65 7.35 7.25c.08.5.1.82.1.95H4.55c0-.13.02-.45.1-.95Z" />
    </svg>
  );
}

export function HomeDock() {
  return (
    <nav className="dock" aria-label="Home">
      <button className="dock__btn" type="button" aria-label="Train">
        <TrainIcon />
      </button>
      <button className="dock__btn" type="button" aria-label="Plans">
        <PlansIcon />
      </button>
      <button className="dock__btn" type="button" aria-label="You" aria-current="page">
        <YouIcon />
      </button>
    </nav>
  );
}
