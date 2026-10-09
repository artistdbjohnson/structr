"use client";

import { useRef } from "react";
import { LogoMark, type LogoVariant } from "./LogoMark";
import { playLogo } from "./logoMotion";

/** Dock and header marks. Tap plays the 520ms press and release, never the settle. */
export function LogoMarkButton({
  variant = "dark",
  size = 40,
  label = "Structr",
  className,
  onClick,
}: {
  variant?: LogoVariant;
  size?: number;
  label?: string;
  className?: string;
  onClick?: () => void;
}) {
  const tileRef = useRef<HTMLDivElement>(null);

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
      style={{
        appearance: "none",
        background: "none",
        border: 0,
        padding: 0,
        margin: 0,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
      }}
      onPointerDown={() => {
        const tile = tileRef.current;
        if (tile) void playLogo(tile, "press");
      }}
      onClick={onClick}
    >
      <LogoMark variant={variant} size={size} tileRef={tileRef} />
    </button>
  );
}
