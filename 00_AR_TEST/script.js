/* ══════════════════════════════════════════════════════════════
   Loy Krathong AR — decorative frame builder
   Builds the festival overlay (edges, corners, moon, lotus,
   lanterns, petals, sparks, river shimmer) and appends it to the
   page. The overlay is purely cosmetic: styles.css gives it
   pointer-events:none so it never interferes with AR tracking or
   gesture taps on the 3D model.
   ══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // Small helper: create an element with classes and optional children.
  function el(tag, className, children) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    (children || []).forEach(function (child) {
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function buildLotus(positionClass) {
    const petals = [];
    for (let i = 0; i < 5; i++) petals.push(el("span", "kf-lotus-petal"));
    petals.push(el("span", "kf-lotus-core"));
    return el("span", "kf-lotus " + positionClass, petals);
  }

  function buildLantern(variantClass) {
    return el("span", "kf-lantern " + variantClass, [el("span", "kf-flame")]);
  }

  function buildFrame() {
    const frame = el("div", "krathong-frame");
    frame.setAttribute("aria-hidden", "true");

    // Festival title
    frame.appendChild(
      el("div", "kf-title", [
        el("span", "kf-th", ["ลอยกระทง"]),
        el("span", "kf-en", ["Loy Krathong Festival"]),
      ])
    );

    // Gold edges
    ["kf-edge-top", "kf-edge-bottom", "kf-edge-left", "kf-edge-right"].forEach(function (side) {
      frame.appendChild(el("span", "kf-edge " + side));
    });

    // Lai-thai corners
    ["kf-corner-tl", "kf-corner-tr", "kf-corner-bl", "kf-corner-br"].forEach(function (corner) {
      frame.appendChild(el("span", "kf-corner " + corner));
    });

    // Full moon
    frame.appendChild(el("span", "kf-moon"));

    // Lotus medallions
    frame.appendChild(buildLotus("kf-lotus-top"));
    frame.appendChild(buildLotus("kf-lotus-bottom"));

    // Drifting krathong lanterns
    ["kf-lantern-a", "kf-lantern-b", "kf-lantern-c", "kf-lantern-d"].forEach(function (v) {
      frame.appendChild(buildLantern(v));
    });

    // Falling lotus petals
    ["kf-petal-a", "kf-petal-b", "kf-petal-c", "kf-petal-d", "kf-petal-e", "kf-petal-f"].forEach(function (v) {
      frame.appendChild(el("span", "kf-petal " + v));
    });

    // Floating sparks
    ["kf-spark-a", "kf-spark-b", "kf-spark-c", "kf-spark-d", "kf-spark-e"].forEach(function (v) {
      frame.appendChild(el("span", "kf-spark " + v));
    });

    // River shimmer
    ["kf-river-1", "kf-river-2", "kf-river-3"].forEach(function (v) {
      frame.appendChild(el("span", "kf-river " + v));
    });

    return frame;
  }

  function init() {
    document.body.appendChild(buildFrame());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
