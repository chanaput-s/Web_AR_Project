# Loy Krathong AR

React + Tailwind CSS site with an animated Loy Krathong intro that leads into
an AR.js **image tracking (NFT)** experience. Point a camera at
`Picture/Krathong_image.png` and the `Model/Krathong.gltf` model floats above it.

## Run it

```bash
npm install
npm run dev
```

Open the printed `localhost` URL on a device with a camera. Camera access
requires a secure context — `http://localhost` works out of the box; to test
on a phone over your LAN you'll need HTTPS (e.g. a tunnel like `ngrok` or a
dev-server TLS cert), since plain `http://192.168.x.x` will be blocked by the
browser's camera permissions.

## How it's wired

- **`/`** — animated intro (`src/pages/Intro.jsx`): starfield, rising lanterns,
  a river of drifting krathongs, and a CTA into the AR view.
- **`/ar`** — the AR view (`src/pages/ArExperience.jsx`). A-Frame and the
  AR.js NFT build are lazy-loaded from `public/vendor/` only on this route,
  and the `<a-scene>`/`<a-nft>` markup is injected imperatively (not through
  React's JSX reconciliation) since A-Frame owns that DOM subtree, its WebGL
  context, and the camera stream. `markerFound` / `markerLost` /
  `camera-error` events (per the [ui-events docs](https://ar-js-org.github.io/AR.js-Docs/ui-events/))
  drive the scanning/found/error overlay in `ArOverlay.jsx`.
- **`public/markers/`** — `Krathong_image.fset/.fset3/.iset`, the NFT
  descriptor files generated from `Picture/Krathong_image.png` via
  `@webarkit/nft-marker-creator-app` (only ~18 filtered features were
  extracted at the base level, because the source image is a flat, low-detail
  icon-style graphic; NFT tracking works best on high-contrast, richly
  textured photos, so tracking may be less robust than with a busier image).
- **`public/models/`** — `Krathong.gltf` + `Krathong.bin` (the `.bin` was
  originally referenced as `scene.bin`; the copied `.gltf`'s buffer URI was
  updated to match the renamed file).

## Credit

3D model: "krathong" by [Ziro.com](https://sketchfab.com/Ziro.com), licensed
[CC BY 4.0](http://creativecommons.org/licenses/by/4.0/), via
[Sketchfab](https://sketchfab.com/3d-models/krathong-63c43fc0a4884f6d90021e89f5eb8322).
Attribution is shown in the app footer per the license terms.
