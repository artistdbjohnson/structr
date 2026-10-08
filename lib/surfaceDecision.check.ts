import assert from "node:assert/strict";
import { decideSurface, isSpoofedLayout, type SurfaceSignals } from "./surfaceDecision.ts";

function signals(patch: Partial<SurfaceSignals>): SurfaceSignals {
  return {
    override: false,
    standalone: false,
    coarse: false,
    fine: true,
    hoverNone: false,
    touchPoints: 0,
    touchEvent: false,
    screenWidth: 1440,
    screenHeight: 900,
    ...patch,
  };
}

assert.equal(decideSurface(signals({})), "desktop");
assert.equal(decideSurface(signals({ screenWidth: 400, screenHeight: 800 })), "desktop");
assert.equal(
  decideSurface(signals({ fine: false, hoverNone: true, screenWidth: 800, screenHeight: 600 })),
  "desktop",
);

assert.equal(decideSurface(signals({ coarse: true, fine: false, hoverNone: true, screenWidth: 390, screenHeight: 844 })), "phone");
assert.equal(decideSurface(signals({ fine: true, touchPoints: 5, screenWidth: 390, screenHeight: 844 })), "phone");
assert.equal(decideSurface(signals({ touchEvent: true, screenWidth: 390, screenHeight: 844 })), "phone");
assert.equal(decideSurface(signals({ hoverNone: true })), "desktop");
assert.equal(decideSurface(signals({ override: true })), "phone");
assert.equal(decideSurface(signals({ standalone: true })), "phone");
assert.equal(decideSurface(signals({ screenWidth: 1024, screenHeight: 1366 })), "desktop");
assert.equal(decideSurface(signals({ screenWidth: 1024, screenHeight: 1366, touchPoints: 5, fine: false, coarse: true })), "phone");

assert.equal(isSpoofedLayout(390, 980, false), true);
assert.equal(isSpoofedLayout(390, 390, false), false);
assert.equal(isSpoofedLayout(390, 980, true), false);
assert.equal(isSpoofedLayout(1440, 400, false), false);
assert.equal(isSpoofedLayout(1440, 1440, false), false);

console.log("surfaceDecision ok");
