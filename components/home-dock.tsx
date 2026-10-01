import { PeopleIcon, PhotosIcon, StoreIcon } from "@/components/icons";

export function HomeDock() {
  return (
    <nav className="dock" aria-label="Home">
      <button className="dock__btn" type="button" aria-label="Store">
        <StoreIcon />
      </button>
      <button className="dock__btn" type="button" aria-label="People">
        <PeopleIcon />
      </button>
      <button
        className="dock__btn dock__btn--active"
        type="button"
        aria-label="Photos"
        aria-current="page"
      >
        <PhotosIcon />
      </button>
    </nav>
  );
}
