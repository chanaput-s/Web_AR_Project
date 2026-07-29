import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// NOTE: React.StrictMode intentionally mounts, unmounts, then remounts every
// component once in development. That double lifecycle breaks AR.js: the first
// <a-scene> grabs the webcam, the unmount tears it down, and the remounted
// scene is left with a dead (black) video stream. Rendering without StrictMode
// keeps a single, stable AR scene so the camera feed stays live.
createRoot(document.getElementById("root")).render(<App />);
