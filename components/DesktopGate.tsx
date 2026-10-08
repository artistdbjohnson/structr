import heroFrames from "@/public/hero/manifest.json";
import { desktopGateScript, type GateFrame } from "@/lib/surfaceBoot";

const frames: GateFrame[] = (heroFrames as { file: string; ground: string }[]).map((frame) => ({
  file: frame.file,
  ground: frame.ground,
}));

/** Static gallery. The head script shows it only on desktop, before the app boots. */
export function DesktopGate() {
  return (
    <div id="structr-gate">
      <div className="gate__ground" id="structr-gate-ground" />
      <div className="gate__stage">
        <div className="gate__frame">
          <img id="structr-gate-a" className="gate__shot" alt="" width={1080} height={1929} draggable={false} />
          <img id="structr-gate-b" className="gate__shot" alt="" width={1080} height={1929} draggable={false} />
        </div>
      </div>
      <div className="gate__note">
        <img id="structr-gate-qr" className="gate__qr" alt="" width={76} height={76} />
        <div className="gate__copy">
          <p className="gate__lead">Structr lives on your phone.</p>
          <p className="gate__hint">Open structr-wine.vercel.app on your phone and add it to your Home Screen.</p>
        </div>
      </div>
      <script id="structr-gate-boot" data-structr-keep="" dangerouslySetInnerHTML={{ __html: desktopGateScript(frames) }} />
    </div>
  );
}
