import { useEffect, useRef, useState } from "react";
import { Camera, Flower2, Info, ScanLine, Sparkles, X } from "lucide-react";

// Relative URLs keep the AR files working when the app is deployed under a repository path.
const ASSET_ROOT = "./assets";

function ArScene({ onClose }) {
  const markerRef = useRef(null);
  const [markerFound, setMarkerFound] = useState(false);
  const [arStatus, setArStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    Promise.all([
      import("aframe"),
      import("@ar-js-org/ar.js/aframe/build/aframe-ar.mjs"),
    ])
      .then(() => active && setArStatus("ready"))
      .catch((error) => {
        console.error("Unable to load the AR.js npm package", error);
        if (active) setArStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const marker = markerRef.current;
    if (arStatus !== "ready" || !marker) return undefined;
    const handleFound = () => setMarkerFound(true);
    const handleLost = () => setMarkerFound(false);
    marker.addEventListener("markerFound", handleFound);
    marker.addEventListener("markerLost", handleLost);
    return () => {
      marker.removeEventListener("markerFound", handleFound);
      marker.removeEventListener("markerLost", handleLost);
    };
  }, [arStatus]);

  // AR.js measures the camera source once on start. Fire a couple of resize
  // events after the scene is ready so it recomputes the video/canvas size and
  // centers the feed correctly (also handles rotating the device).
  useEffect(() => {
    if (arStatus !== "ready") return undefined;
    const nudge = () => window.dispatchEvent(new Event("resize"));
    const timers = [setTimeout(nudge, 250), setTimeout(nudge, 1000)];
    return () => timers.forEach(clearTimeout);
  }, [arStatus]);

  // Release the webcam when the AR view unmounts. AR.js injects its <video>
  // element straight into <body>, so React never cleans it up on its own —
  // without this the camera light stays on and re-entering AR can show black.
  useEffect(() => {
    return () => {
      document
        .querySelectorAll("video")
        .forEach((video) => {
          const stream = video.srcObject;
          if (stream && typeof stream.getTracks === "function") {
            stream.getTracks().forEach((track) => track.stop());
          }
          video.srcObject = null;
          if (video.parentNode) video.parentNode.removeChild(video);
        });
    };
  }, []);

  return (
    <main className="ar-shell">
      <div className="ar-topbar">
        <button
          className="icon-button"
          type="button"
          onClick={onClose}
          aria-label="Close AR experience"
        >
          <X size={20} />
        </button>
        <div className="ar-title">
          <span className="eyebrow">Loy Krathong / AR mode</span>
          <strong>Place your krathong</strong>
        </div>
        <div className={`tracking-pill ${markerFound ? "is-found" : ""}`}>
          <span className="tracking-dot" />
          {markerFound ? "Marker found" : "Looking"}
        </div>
      </div>
      <div className="ar-help">
        <ScanLine size={18} />
        <span>Point your camera at the supplied marker</span>
      </div>
      {/* Ornate gold Thai festival frame around the AR scene. Purely decorative:
          pointer-events are disabled so camera/marker interaction is untouched. */}
      <div className="ar-frame" aria-hidden="true">
        <span className="ar-frame-edge edge-top" />
        <span className="ar-frame-edge edge-bottom" />
        <span className="ar-frame-edge edge-left" />
        <span className="ar-frame-edge edge-right" />

        <span className="ar-corner corner-tl" />
        <span className="ar-corner corner-tr" />
        <span className="ar-corner corner-bl" />
        <span className="ar-corner corner-br" />

        <span className="ar-moon" />

        <span className="ar-lotus lotus-top">
          <Flower2 size={26} strokeWidth={1.1} />
        </span>
        <span className="ar-lotus lotus-bottom">
          <Flower2 size={26} strokeWidth={1.1} />
        </span>

        <span className="ar-lantern-float lantern-a">
          <span className="float-flame" />
        </span>
        <span className="ar-lantern-float lantern-b">
          <span className="float-flame" />
        </span>
        <span className="ar-lantern-float lantern-c">
          <span className="float-flame" />
        </span>

        <span className="ar-petal petal-a" />
        <span className="ar-petal petal-b" />
        <span className="ar-petal petal-c" />
        <span className="ar-petal petal-d" />
      </div>
      {arStatus === "ready" && (
        <a-scene
          embedded
          vr-mode-ui="enabled: false"
          loading-screen="enabled: false"
          renderer="logarithmicDepthBuffer: true; alpha: true;"
          arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
        >
          <a-assets>
            <a-asset-item
              id="krathong-model"
              src={`${ASSET_ROOT}/asset.gltf`}
            />
          </a-assets>
          <a-marker
            ref={markerRef}
            id="krathong-marker"
            type="pattern"
            preset="custom"
            url={`${ASSET_ROOT}/marker.patt`}
            raycaster="objects: .clickable"
            emitevents="true"
            cursor="fuse: false; rayOrigin: mouse;"
          >
            <a-entity
              gltf-model="#krathong-model"
              scale="4.180749342536503 4.180749342536503 4.180749342536503"
              class="clickable"
            />
          </a-marker>
          <a-entity camera />
        </a-scene>
      )}
      {arStatus === "loading" && (
        <div className="ar-loading">Starting AR camera...</div>
      )}
      {arStatus === "error" && (
        <div className="ar-loading">
          AR.js could not start. Please refresh and try again.
        </div>
      )}
    </main>
  );
}

export default function App() {
  const [arOpen, setArOpen] = useState(false);
  if (arOpen) return <ArScene onClose={() => setArOpen(false)} />;

  return (
    <main className="intro-shell">
      <nav className="site-nav">
        <a className="brand" href="/" aria-label="Loy Krathong home">
          <span className="brand-mark">
            <Flower2 size={16} />
          </span>
          <span>RIVER / RITUAL</span>
        </a>
        <span className="nav-season">THAILAND · FULL MOON FESTIVAL</span>
      </nav>
      <section className="intro-grid">
        <div className="intro-copy">
          <div className="section-label">
            <span /> A small wish, set afloat
          </div>
          <h1>
            Let the river
            <br />
            <em>carry it forward.</em>
          </h1>
          <p className="intro-lede">
            A quiet AR ritual for Loy Krathong. Bring a traditional krathong to
            life, then release a wish into the night.
          </p>
          <button
            className="primary-button"
            type="button"
            onClick={() => setArOpen(true)}
          >
            <Camera size={19} />
            Enter the AR experience
          </button>
          <div className="intro-note">
            <Info size={15} />
            <span>
              Works best on mobile Chrome or Safari with camera access.
            </span>
          </div>
        </div>
        <div className="intro-art" aria-hidden="true">
          <div className="art-rings" />
          <div className="art-lantern">
            <div className="lantern-flame" />
            <div className="lantern-cup">
              <Flower2 size={42} strokeWidth={1.25} />
            </div>
            <div className="lantern-petal petal-left" />
            <div className="lantern-petal petal-right" />
          </div>
          <div className="water-line line-one" />
          <div className="water-line line-two" />
          <div className="water-line line-three" />
          <div className="art-caption">
            <Sparkles size={14} /> MAKE A WISH
          </div>
        </div>
      </section>
      <footer className="intro-footer">
        <div className="footer-stat">
          <strong>01</strong>
          <span>SCAN</span>
        </div>
        <div className="footer-rule" />
        <div className="footer-stat">
          <strong>02</strong>
          <span>PLACE</span>
        </div>
        <div className="footer-rule" />
        <div className="footer-stat">
          <strong>03</strong>
          <span>RELEASE</span>
        </div>
        <span className="footer-credit">An augmented ritual for the river</span>
      </footer>
    </main>
  );
}
