"use client";

import { useRef, type PointerEvent } from "react";

const SLOP = 12;

/**
 * Ignore a click that was really a drag or scroll.
 * Pointer capture used to turn those gestures into taps.
 */
export function useTapGuard() {
  const point = useRef({ x: 0, y: 0, moved: false });

  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    point.current = { x: event.clientX, y: event.clientY, moved: false };
  }

  function onPointerMove(event: PointerEvent) {
    const start = point.current;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > SLOP) {
      start.moved = true;
    }
  }

  function suppress() {
    point.current.moved = true;
  }

  function consumeIfMoved() {
    const moved = point.current.moved;
    point.current.moved = false;
    return moved;
  }

  return { onPointerDown, onPointerMove, suppress, consumeIfMoved };
}
