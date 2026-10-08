import { decideSurface, isSpoofedLayout } from "@/lib/surfaceDecision";

const AVIF_PROBE =
  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";

/**
 * Runs in the document head before the app is parsed. Sets `is-phone` or
 * `is-desktop` on <html>, and blocks the Next.js runtime on the desktop gate
 * and on the desktop-site fit shell (the app boots inside that shell's frame).
 */
export const surfaceBootScript = `(function () {
  var decideSurface = ${decideSurface.toString()};
  var isSpoofedLayout = ${isSpoofedLayout.toString()};
  var KEY = "structr-app";

  try {
    if (new URLSearchParams(location.search).get("app") === "1") sessionStorage.setItem(KEY, "1");
  } catch (e) {}

  var override = false;
  try { override = sessionStorage.getItem(KEY) === "1"; } catch (e) {}

  var standalone = false;
  try {
    standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      window.navigator.standalone === true;
  } catch (e) {}

  var touchPoints = 0;
  try { touchPoints = navigator.maxTouchPoints || 0; } catch (e) {}

  var coarse = false;
  var fine = false;
  var hoverNone = false;
  try { coarse = window.matchMedia("(pointer: coarse)").matches; } catch (e) {}
  try { fine = window.matchMedia("(pointer: fine)").matches; } catch (e) {}
  try { hoverNone = window.matchMedia("(hover: none)").matches; } catch (e) {}

  var touchEvent = false;
  try { touchEvent = "ontouchstart" in window; } catch (e) {}

  var sw = 0;
  var sh = 0;
  try { sw = screen.width || 0; sh = screen.height || 0; } catch (e) {}

  var surface = decideSurface({
    override: override,
    standalone: standalone,
    coarse: coarse,
    fine: fine,
    hoverNone: hoverNone,
    touchPoints: touchPoints,
    touchEvent: touchEvent,
    screenWidth: sw,
    screenHeight: sh
  });

  var framed = false;
  try { framed = window.top !== window.self; } catch (e) { framed = true; }
  if (window.name === "structr-fit") framed = true;

  var layoutW = 0;
  try { layoutW = window.innerWidth || 0; } catch (e) {}
  // ?app=1 and an installed PWA run in the real window. The fit frame is only
  // for a touch device whose layout viewport was stretched (desktop site).
  var spoofed = surface === "phone" && !override && !standalone && isSpoofedLayout(sw, layoutW, framed);

  var root = document.documentElement;
  root.classList.remove("is-phone", "is-desktop", "is-phone-fit");

  if (surface === "desktop") {
    root.classList.add("is-desktop");
    root.setAttribute("data-structr-surface", "desktop");
    root.style.backgroundColor = "#e6e8ec";
    softenChrome();
    blockAppScripts();
  } else if (spoofed) {
    root.classList.add("is-phone", "is-phone-fit");
    root.setAttribute("data-structr-surface", "phone-fit");
    root.setAttribute("data-structr-w", String(sw));
    root.setAttribute("data-structr-h", String(sh));
    root.style.backgroundColor = "#e6e8ec";
    pinViewport(sw);
    blockAppScripts();
  } else {
    root.classList.add("is-phone");
    root.setAttribute("data-structr-surface", "phone");
  }

  function pinViewport(width) {
    var content = "width=" + width + ", initial-scale=1, viewport-fit=cover";
    function apply() {
      var metas = document.querySelectorAll('meta[name="viewport"]');
      if (!metas.length) {
        var created = document.createElement("meta");
        created.setAttribute("name", "viewport");
        created.setAttribute("content", content);
        document.head.appendChild(created);
        return;
      }
      for (var i = 0; i < metas.length; i++) metas[i].setAttribute("content", content);
    }
    apply();
    var watch = new MutationObserver(apply);
    watch.observe(document.head, { childList: true, subtree: true });
    document.addEventListener("DOMContentLoaded", function () {
      apply();
      watch.disconnect();
    });
  }

  function softenChrome() {
    var theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", "#e6e8ec");
    var scheme = document.querySelector('meta[name="color-scheme"]');
    if (scheme) scheme.setAttribute("content", "light");
  }

  function blockAppScripts() {
    // Chunks are async and already queued ahead of this inline script.
    // Point Turbopack at a sink so those chunks never evaluate, and the
    // runtime bails out because the bucket is not an array.
    try {
      globalThis.TURBOPACK = { push: function () {} };
    } catch (e) {}
    try {
      self.__next_f = { push: function () {} };
    } catch (e) {}

    function kept(node) {
      return !!(node && node.getAttribute && node.getAttribute("data-structr-keep") != null);
    }
    function neuterScript(script) {
      if (!script || script.nodeName !== "SCRIPT" || kept(script)) return;
      if (script.getAttribute("data-structr-neutered") === "1") return;
      script.setAttribute("data-structr-neutered", "1");
      script.type = "text/plain";
      var src = script.getAttribute("src");
      if (src) script.removeAttribute("src");
      script.text = "";
      script.textContent = "";
      if (script.parentNode) script.parentNode.removeChild(script);
    }
    function stripPreload(link) {
      if (!link || link.nodeName !== "LINK") return;
      var rel = (link.getAttribute("rel") || "").toLowerCase();
      var as = (link.getAttribute("as") || "").toLowerCase();
      if (rel === "modulepreload" || (rel === "preload" && as === "script")) {
        if (link.parentNode) link.parentNode.removeChild(link);
      }
    }
    function stripMedia(node) {
      if (!node || (node.nodeName !== "IMG" && node.nodeName !== "SOURCE")) return;
      if (node.closest && (node.closest("#structr-gate") || node.closest("#structr-fit"))) return;
      node.removeAttribute("src");
      node.removeAttribute("srcset");
    }
    function neuterTree(node) {
      if (!node || node.nodeType !== 1) return;
      if (node.nodeName === "SCRIPT") neuterScript(node);
      stripPreload(node);
      stripMedia(node);
      if (!node.querySelectorAll) return;
      var scripts = node.querySelectorAll("script");
      for (var i = 0; i < scripts.length; i++) neuterScript(scripts[i]);
      var links = node.querySelectorAll("link");
      for (var j = 0; j < links.length; j++) stripPreload(links[j]);
      var media = node.querySelectorAll("img, source");
      for (var k = 0; k < media.length; k++) stripMedia(media[k]);
    }
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes;
        for (var j = 0; j < added.length; j++) neuterTree(added[j]);
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();`;

export type GateFrame = { file: string; ground: string };

/** Slideshow and desktop-site frame. Marked data-structr-keep so the gate can run. */
export function desktopGateScript(frames: GateFrame[]): string {
  return `(function () {
    var FRAMES = ${JSON.stringify(frames)};
    var HOLD = 6600;
    var FADE = 1800;
    var root = document.documentElement;

    if (root.classList.contains("is-phone-fit")) {
      mountFrame();
      return;
    }
    if (!root.classList.contains("is-desktop")) return;
    startGate();

    function mountFrame() {
      var sw = Number(root.getAttribute("data-structr-w")) || screen.width || 0;
      var sh = Number(root.getAttribute("data-structr-h")) || screen.height || 0;
      if (!sw || !sh) return;
      var frame = document.createElement("iframe");
      frame.id = "structr-fit";
      frame.name = "structr-fit";
      frame.title = "Structr";
      frame.setAttribute("data-structr-keep", "");
      frame.src = location.pathname + location.search + location.hash;
      sizeFrame(frame, sw, sh);
      document.body.appendChild(frame);
      window.addEventListener("resize", function () {
        var w = screen.width || sw;
        var h = screen.height || sh;
        sizeFrame(frame, w, h);
      });
    }

    function sizeFrame(frame, w, h) {
      var layout = window.innerWidth || w;
      var scale = layout / w;
      frame.style.width = w + "px";
      frame.style.height = h + "px";
      frame.style.transform = "scale(" + scale + ")";
    }

    function startGate() {
      var ground = document.getElementById("structr-gate-ground");
      var a = document.getElementById("structr-gate-a");
      var b = document.getElementById("structr-gate-b");
      var qr = document.getElementById("structr-gate-qr");
      if (!ground || !a || !b || !FRAMES.length) return;
      if (qr) qr.src = "/gate/qr.svg";

      var ext = "webp";
      var reduce = false;
      try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
      var frontEl = a;
      var backEl = b;
      var index = 0;

      function url(file) { return "/hero/" + file + "." + ext; }

      function prepHidden(img) {
        img.style.transition = "none";
        img.classList.remove("is-on", "is-live");
        void img.offsetWidth;
        img.style.transition = "";
      }

      function showInitial() {
        ground.style.backgroundColor = FRAMES[0].ground;
        frontEl.src = url(FRAMES[0].file);
        frontEl.decoding = "async";
        frontEl.setAttribute("fetchpriority", "high");
        frontEl.style.transition = "none";
        frontEl.classList.add("is-on");
        if (!reduce) frontEl.classList.add("is-live");
        void frontEl.offsetWidth;
        frontEl.style.transition = "";
        root.setAttribute("data-hero", FRAMES[0].file);
        if (!reduce) armCycle();
      }

      function armCycle() {
        var holdTimer = 0;
        var fadeTimer = 0;
        var remain = HOLD;
        var started = 0;
        var fadeRemain = FADE;
        var fadeStarted = 0;
        var fading = false;
        var pending = false;
        var stopped = false;
        var preloadHref = "";

        function clips() {
          var gate = document.getElementById("structr-gate");
          if (!gate || !gate.getAnimations) return [];
          return gate.getAnimations({ subtree: true });
        }
        function pauseClips() {
          var list = clips();
          for (var i = 0; i < list.length; i++) if (list[i].playState === "running") list[i].pause();
        }
        function resumeClips() {
          var list = clips();
          for (var i = 0; i < list.length; i++) if (list[i].playState === "paused") list[i].play();
        }
        function preload(i) {
          var href = url(FRAMES[i].file);
          if (preloadHref === href) return;
          preloadHref = href;
          var link = document.getElementById("structr-gate-preload");
          if (link) link.parentNode.removeChild(link);
          link = document.createElement("link");
          link.id = "structr-gate-preload";
          link.rel = "preload";
          link.as = "image";
          link.href = href;
          document.head.appendChild(link);
          var img = new Image();
          img.decoding = "async";
          img.src = href;
        }
        function armHold() {
          fading = false;
          pending = false;
          started = performance.now();
          window.clearTimeout(holdTimer);
          holdTimer = window.setTimeout(beginFade, remain);
          preload((index + 1) % FRAMES.length);
        }
        function finishFade() {
          if (stopped) return;
          prepHidden(frontEl);
          var swap = frontEl;
          frontEl = backEl;
          backEl = swap;
          index = (index + 1) % FRAMES.length;
          fading = false;
          remain = HOLD;
          fadeRemain = FADE;
          root.setAttribute("data-hero", FRAMES[index].file);
          if (document.hidden) return;
          armHold();
        }
        function beginFade() {
          if (stopped) return;
          if (document.hidden) {
            pending = true;
            return;
          }
          pending = false;
          fading = true;
          var next = (index + 1) % FRAMES.length;
          fadeRemain = FADE;
          backEl.src = url(FRAMES[next].file);
          prepHidden(backEl);
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              if (stopped) return;
              backEl.classList.add("is-on", "is-live");
              ground.style.backgroundColor = FRAMES[next].ground;
              fadeStarted = performance.now();
              if (document.hidden) {
                pauseClips();
                return;
              }
              window.clearTimeout(fadeTimer);
              fadeTimer = window.setTimeout(finishFade, fadeRemain);
            });
          });
        }
        function onVisibility() {
          if (document.hidden) {
            root.classList.add("gate-paused");
            pauseClips();
            if (fading) {
              fadeRemain = Math.max(0, fadeRemain - (performance.now() - fadeStarted));
              window.clearTimeout(fadeTimer);
            } else if (!pending) {
              remain = Math.max(0, remain - (performance.now() - started));
              window.clearTimeout(holdTimer);
            }
            return;
          }
          root.classList.remove("gate-paused");
          resumeClips();
          if (pending) {
            beginFade();
            return;
          }
          if (fading) {
            fadeStarted = performance.now();
            window.clearTimeout(fadeTimer);
            fadeTimer = window.setTimeout(finishFade, fadeRemain);
            return;
          }
          armHold();
        }
        document.addEventListener("visibilitychange", onVisibility);
        var media = window.matchMedia("(prefers-reduced-motion: reduce)");
        var onReduce = function () {
          if (!media.matches) return;
          stopped = true;
          window.clearTimeout(holdTimer);
          window.clearTimeout(fadeTimer);
        };
        if (media.addEventListener) media.addEventListener("change", onReduce);
        armHold();
      }

      var probe = new Image();
      var settled = false;
      function finishProbe(avif) {
        if (settled) return;
        settled = true;
        ext = avif ? "avif" : "webp";
        showInitial();
      }
      probe.onload = function () { finishProbe(probe.naturalWidth > 0); };
      probe.onerror = function () { finishProbe(false); };
      probe.src = ${JSON.stringify(AVIF_PROBE)};
    }
  })();`;
}
