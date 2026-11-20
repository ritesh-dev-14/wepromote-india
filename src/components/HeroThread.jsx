import { useCallback, useEffect, useRef } from "react";

const SEGMENT_LAYERS = [
  "back",  // 0: top-left origin curve diving into line 0 ("BUILD")
  "front", // 1: looping inside/across "BUILD"
  "back",  // 2: dropping behind gap toward line 1
  "front", // 3: swooping around left curve of "BRAND" ('B')
  "back",  // 4: curving around bottom of 'B'
  "front", // 5: gliding between line 1 & 2 toward "AUTHORITY"
  "back",  // 6: looping upward into circular curl
  "front", // 7: loop crossing front
  "back",  // 8: cradling bottom of "THAT LEADS."
  "back",  // 9: vertical S-curve cascading to end dot above scroll prompt
];

const lerp = (p1, p2, t) => ({
  x: p1.x + (p2.x - p1.x) * t,
  y: p1.y + (p2.y - p1.y) * t,
});

const splitBezier = ([p0, p1, p2, p3], t) => {
  const p01 = lerp(p0, p1, t);
  const p12 = lerp(p1, p2, t);
  const p23 = lerp(p2, p3, t);
  const p012 = lerp(p01, p12, t);
  const p123 = lerp(p12, p23, t);
  const p0123 = lerp(p012, p123, t);
  return [
    [p0, p01, p012, p0123],
    [p0123, p123, p23, p3],
  ];
};

const fmtC = ([, p1, p2, p3]) =>
  `C ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}, ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`;

function getGlyphRect(lineEl, charStart, charEnd) {
  if (!lineEl) return null;
  try {
    const textNode = lineEl.childNodes[0];
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      const range = document.createRange();
      range.setStart(textNode, Math.min(charStart, textNode.length));
      range.setEnd(textNode, Math.min(charEnd, textNode.length));
      const rect = range.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) return rect;
    }
  } catch (e) {
    // fallback below
  }
  const lineRect = lineEl.getBoundingClientRect();
  const textLen = (lineEl.textContent || "").length || 1;
  const charWidth = lineRect.width / textLen;
  return {
    left: lineRect.left + charStart * charWidth,
    right: lineRect.left + charEnd * charWidth,
    top: lineRect.top,
    bottom: lineRect.bottom,
    width: (charEnd - charStart) * charWidth,
    height: lineRect.height,
  };
}

export default function HeroThread({
  heroRef,
  line0Ref,
  line1Ref,
  line2Ref,
  scrollRef,
}) {
  const backSvgRef = useRef(null);
  const frontSvgRef = useRef(null);
  const pathRefs = useRef([]);
  const originDotRef = useRef(null);
  const endRingRef = useRef(null);
  const endDotRef = useRef(null);
  const headDotBackRef = useRef(null);
  const headDotFrontRef = useRef(null);

  const segmentDataRef = useRef([]);
  const totalLengthRef = useRef(0);
  const isCompleteRef = useRef(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  const updateGeometry = useCallback(() => {
    const heroEl = heroRef.current;
    const l0El = line0Ref.current;
    const l1El = line1Ref.current;
    const l2El = line2Ref.current;
    if (!heroEl || !l0El || !l1El || !l2El) return;

    const v = heroEl.getBoundingClientRect();
    if (v.width <= 0 || v.height <= 0) return;

    // Set viewBox on both SVGs to match exact pixel coordinates (no aspect-ratio distortion)
    const viewBoxStr = `0 0 ${v.width} ${v.height}`;
    if (backSvgRef.current) backSvgRef.current.setAttribute("viewBox", viewBoxStr);
    if (frontSvgRef.current) frontSvgRef.current.setAttribute("viewBox", viewBoxStr);

    const l0Rect = l0El.getBoundingClientRect();
    const l1Rect = l1El.getBoundingClientRect();
    const l2Rect = l2El.getBoundingClientRect();
    const scrollRect = scrollRef?.current?.getBoundingClientRect();

    const fontSize = parseFloat(getComputedStyle(l0El).fontSize) || 120;
    const O = l0Rect.height * 0.72;

    const toHero = (r) => ({
      x: r.left - v.left,
      y: r.top - v.top,
      w: r.width,
      h: r.height,
    });

    // Glyph measurements:
    // line 0: "WE BUILD" -> index 4: 'U', index 5: 'I'
    const k_raw = getGlyphRect(l0El, 4, 5);
    const L_raw = getGlyphRect(l0El, 5, 6);
    // line 1: "BRAND AUTHORITY" -> index 0: 'B', index 1: 'R'
    const P_raw = getGlyphRect(l1El, 0, 1);
    const R_raw = getGlyphRect(l1El, 1, 2);
    // line 2: "THAT LEADS." -> index 8: 'D', index 9: 'S'
    const q_raw = getGlyphRect(l2El, 8, 9);
    const I_raw = getGlyphRect(l2El, 9, 10);

    const k_box = toHero(k_raw);
    const L_box = toHero(L_raw);
    const P_box = toHero(P_raw);
    const R_box = toHero(R_raw);
    const q_box = toHero(q_raw);
    const I_box = toHero(I_raw);

    // D: origin dot (top left)
    const D = {
      x: Math.max(32, l0Rect.left - v.left - 18),
      y: Math.max(48, l0Rect.top - v.top - 36),
    };

    const F = { x: L_box.x + 0.54 * L_box.w, y: L_box.y + 0.31 * L_box.h };
    const z = { x: k_box.x - 0.18 * fontSize, y: k_box.y + 0.05 * O };
    const W = { x: P_box.x + 0.44 * P_box.w, y: P_box.y + 0.32 * P_box.h };
    const H = { x: P_box.x + 1.8 * P_box.w, y: P_box.y - 0.04 * P_box.h };
    const Y = Math.max(12, P_box.x - 0.14 * P_box.w);
    const G = { x: q_box.x + 0.18 * q_box.w, y: q_box.y - 0.015 * O };
    const V = { x: Y + G.y - (P_box.y + 0.57 * P_box.h), y: G.y };

    const Q = (4 * Y - 2 * W.x + V.x) / 3;
    const [Z, J] = splitBezier(
      [
        W,
        { x: Q, y: W.y + ((Q - W.x) * (W.y - H.y)) / (W.x - H.x) },
        { x: W.x + Q - V.x, y: V.y },
        V,
      ],
      0.5
    );

    const [_, ee] = splitBezier(
      [
        { x: L_box.x + 0.64 * L_box.w, y: L_box.y + 0.49 * L_box.h },
        { x: L_box.x + 0.288 * L_box.w, y: L_box.y + 0.776 * L_box.h },
        H,
        W,
      ],
      0.2
    );

    let tLow = 0,
      tHigh = 1;
    for (let i = 0; i < 15; i++) {
      const mid = (tLow + tHigh) / 2;
      splitBezier(ee, mid)[0][3].x > R_box.x - 0.01 * fontSize
        ? (tLow = mid)
        : (tHigh = mid);
    }
    const [ea, en] = splitBezier(ee, (tLow + tHigh) / 2);

    const ei = { x: I_box.x + 0.66 * I_box.w, y: I_box.y + 0.44 * O };
    const es = { x: q_box.x + 0.64 * q_box.w, y: q_box.y + 0.46 * O };
    const ec = { x: I_box.x + 0.14 * I_box.w, y: I_box.y + 1.02 * O };

    // End point: directly above the "Scroll to follow the thread" link!
    const targetScrollX = scrollRect
      ? scrollRect.left - v.left + 35
      : v.width * 0.72;
    const targetScrollY = scrollRect
      ? scrollRect.top - v.top - 24
      : v.height - 72;
    const eh = { x: targetScrollX, y: targetScrollY };

    const ed = Math.max(30, (eh.y - ec.y) / 0.55);
    const eu = (factor) => ec.y + (eh.y - ec.y) * factor;

    // 10 Segments (matching Daksh Gajjar reference with mathematical precision)
    const ey = [
      `M ${D.x} ${D.y} C ${(D.x + 0.16 * fontSize).toFixed(2)} ${(k_box.y - 0.3 * O).toFixed(2)}, ${z.x.toFixed(2)} ${z.y.toFixed(2)}, ${F.x.toFixed(2)} ${F.y.toFixed(2)}`,
      `M ${F.x.toFixed(2)} ${F.y.toFixed(2)} C ${(F.x + (F.x - z.x) * 0.045).toFixed(2)} ${(F.y + (F.y - z.y) * 0.045).toFixed(2)}, ${(L_box.x + 0.8 * L_box.w).toFixed(2)} ${(L_box.y + 0.36 * L_box.h).toFixed(2)}, ${(L_box.x + 0.64 * L_box.w).toFixed(2)} ${(L_box.y + 0.49 * L_box.h).toFixed(2)} ${fmtC(_)}`,
      `M ${ea[0].x.toFixed(2)} ${ea[0].y.toFixed(2)} ${fmtC(ea)}`,
      `M ${en[0].x.toFixed(2)} ${en[0].y.toFixed(2)} ${fmtC(en)}`,
      `M ${W.x.toFixed(2)} ${W.y.toFixed(2)} ${fmtC(Z)}`,
      `M ${J[0].x.toFixed(2)} ${J[0].y.toFixed(2)} ${fmtC(J)} H ${G.x.toFixed(2)}`,
      `M ${G.x.toFixed(2)} ${G.y.toFixed(2)} C ${(I_box.x + 0.45 * I_box.w).toFixed(2)} ${G.y.toFixed(2)}, ${(ei.x + 0.08 * I_box.w).toFixed(2)} ${(q_box.y - 0.1 * O).toFixed(2)}, ${ei.x.toFixed(2)} ${ei.y.toFixed(2)}`,
      `M ${ei.x.toFixed(2)} ${ei.y.toFixed(2)} C ${(ei.x - 0.08 * I_box.w).toFixed(2)} ${(q_box.y + 0.98 * O).toFixed(2)}, ${(es.x - 0.13 * q_box.w).toFixed(2)} ${(q_box.y + 0.97 * O).toFixed(2)}, ${es.x.toFixed(2)} ${es.y.toFixed(2)}`,
      `M ${es.x.toFixed(2)} ${es.y.toFixed(2)} C ${es.x.toFixed(2)} ${(q_box.y + 0.35 * O).toFixed(2)}, ${(I_box.x + 0.14 * I_box.w).toFixed(2)} ${(q_box.y + 0.32 * O).toFixed(2)}, ${(I_box.x + 0.14 * I_box.w).toFixed(2)} ${(q_box.y + 0.48 * O).toFixed(2)} L ${ec.x.toFixed(2)} ${ec.y.toFixed(2)}`,
      `M ${ec.x.toFixed(2)} ${ec.y.toFixed(2)} C ${(ec.x - 0.04 * ed).toFixed(2)} ${eu(0.18).toFixed(2)}, ${(ec.x + 0.08 * ed).toFixed(2)} ${eu(0.35).toFixed(2)}, ${(ec.x - 0.04 * ed).toFixed(2)} ${eu(0.52).toFixed(2)} S ${(ec.x + 0.02 * ed).toFixed(2)} ${eu(0.78).toFixed(2)}, ${eh.x.toFixed(2)} ${eh.y.toFixed(2)}`,
    ];

    // Update origin dot
    if (originDotRef.current) {
      originDotRef.current.setAttribute("cx", String(D.x));
      originDotRef.current.setAttribute("cy", String(D.y));
    }

    // Update end dot & ring
    if (endDotRef.current) {
      endDotRef.current.setAttribute("cx", String(eh.x));
      endDotRef.current.setAttribute("cy", String(eh.y));
    }
    if (endRingRef.current) {
      endRingRef.current.setAttribute("cx", String(eh.x));
      endRingRef.current.setAttribute("cy", String(eh.y));
    }

    // Update paths and measure lengths
    let cumulative = 0;
    const segs = [];
    for (let i = 0; i < 10; i++) {
      const pathEl = pathRefs.current[i];
      if (!pathEl) continue;
      pathEl.setAttribute("d", ey[i]);
      const len = pathEl.getTotalLength();
      segs.push({
        el: pathEl,
        length: len,
        start: cumulative,
        layer: SEGMENT_LAYERS[i],
      });
      cumulative += len;

      if (isCompleteRef.current) {
        pathEl.style.strokeDasharray = "none";
        pathEl.style.strokeDashoffset = "0";
      } else {
        pathEl.style.strokeDasharray = `${len} ${len}`;
        pathEl.style.strokeDashoffset = `${len}`;
      }
    }

    segmentDataRef.current = segs;
    totalLengthRef.current = cumulative;
  }, [heroRef, line0Ref, line1Ref, line2Ref, scrollRef]);

  // Entrance animation (duration: 3200ms - deliberate, luxurious, smooth)
  useEffect(() => {
    let mounted = true;

    const startAnimation = () => {
      if (!mounted) return;
      updateGeometry();

      const duration = 3000; // 3 seconds after preloader exits
      startTimeRef.current = null;

      const step = (timestamp) => {
        if (!mounted) return;
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const p = Math.min(1, elapsed / duration);

        // Smooth cubic ease out
        const eased = 1 - Math.pow(1 - p, 3);
        const dist = eased * totalLengthRef.current;

        const segs = segmentDataRef.current;
        let activePoint = null;
        let activeLayer = "back";

        for (let i = 0; i < segs.length; i++) {
          const seg = segs[i];
          const start = seg.start;
          const end = start + seg.length;

          if (dist <= start) {
            seg.el.style.strokeDashoffset = String(seg.length);
          } else if (dist >= end) {
            seg.el.style.strokeDashoffset = "0";
          } else {
            const inSeg = dist - start;
            seg.el.style.strokeDashoffset = String(seg.length - inSeg);
            try {
              activePoint = seg.el.getPointAtLength(inSeg);
              activeLayer = seg.layer;
            } catch (e) {}
          }
        }

        const headBack = headDotBackRef.current;
        const headFront = headDotFrontRef.current;

        if (activePoint && p < 1) {
          if (activeLayer === "front") {
            if (headFront) {
              headFront.setAttribute("cx", String(activePoint.x));
              headFront.setAttribute("cy", String(activePoint.y));
              headFront.style.opacity = "1";
            }
            if (headBack) headBack.style.opacity = "0";
          } else {
            if (headBack) {
              headBack.setAttribute("cx", String(activePoint.x));
              headBack.setAttribute("cy", String(activePoint.y));
              headBack.style.opacity = "1";
            }
            if (headFront) headFront.style.opacity = "0";
          }
        }

        if (p < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          isCompleteRef.current = true;
          if (headBack) headBack.style.opacity = "0";
          if (headFront) headFront.style.opacity = "0";
          if (endDotRef.current) endDotRef.current.style.opacity = "1";
          if (endRingRef.current) endRingRef.current.style.opacity = "1";
          segs.forEach((s) => {
            s.el.style.strokeDasharray = "none";
            s.el.style.strokeDashoffset = "0";
          });
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    };

    // Wait for fonts AND for the preloader exit animation to fully complete
    const onPreloaderDone = () => {
      document.fonts.ready.then(() => {
        if (mounted) startAnimation();
      });
    };

    // Measure geometry immediately so SVG paths exist in DOM (but don't animate yet)
    document.fonts.ready.then(() => {
      if (mounted) updateGeometry();
    });

    window.addEventListener("wepromote:preloader-done", onPreloaderDone);

    const handleResize = () => {
      updateGeometry();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      mounted = false;
      window.removeEventListener("wepromote:preloader-done", onPreloaderDone);
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateGeometry]);

  return (
    <>
      {/* ==============================================================
          BACK THREAD LAYER (z-index: 3, behind the hero text)
      ============================================================== */}
      <svg
        ref={backSvgRef}
        className="hero-thread-layer hero-thread-back"
        aria-hidden="true"
      >
        {SEGMENT_LAYERS.map((layer, idx) => {
          if (layer !== "back") return null;
          return (
            <path
              key={`seg-${idx}`}
              ref={(el) => (pathRefs.current[idx] = el)}
              data-segment={idx}
              data-thread-depth="back"
              className="hero-thread-path"
            />
          );
        })}

        {/* Origin dot at start of thread */}
        <circle ref={originDotRef} className="hero-thread-origin" r="4" />

        {/* Resting end dot and pulsing ring directly above scroll prompt */}
        <circle
          ref={endRingRef}
          className="hero-thread-end-ring"
          r="11"
          style={{ opacity: 0, transition: "opacity 0.6s ease" }}
        />
        <circle
          ref={endDotRef}
          className="hero-thread-end-dot"
          r="4"
          style={{ opacity: 0, transition: "opacity 0.6s ease" }}
        />

        {/* Leading tip dot during drawing (back layer) */}
        <circle
          ref={headDotBackRef}
          className="hero-thread-head"
          r="4"
          style={{ opacity: 0 }}
        />
      </svg>

      {/* ==============================================================
          FRONT THREAD LAYER (z-index: 5, in front of the hero text)
      ============================================================== */}
      <svg
        ref={frontSvgRef}
        className="hero-thread-layer hero-thread-front"
        aria-hidden="true"
      >
        {SEGMENT_LAYERS.map((layer, idx) => {
          if (layer !== "front") return null;
          return (
            <path
              key={`seg-${idx}`}
              ref={(el) => (pathRefs.current[idx] = el)}
              data-segment={idx}
              data-thread-depth="front"
              className="hero-thread-path"
            />
          );
        })}

        {/* Leading tip dot during drawing (front layer) */}
        <circle
          ref={headDotFrontRef}
          className="hero-thread-head"
          r="4"
          style={{ opacity: 0 }}
        />
      </svg>
    </>
  );
}
