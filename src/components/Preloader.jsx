import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = prefersReducedMotion ? 500 : 1650;
    const startedAt = performance.now();
    let exitTimer;

    const progressTimer = window.setInterval(() => {
      const next = Math.min(
        100,
        Math.round(((performance.now() - startedAt) / duration) * 100),
      );
      setProgress(next);

      if (next === 100) {
        window.clearInterval(progressTimer);
        exitTimer = window.setTimeout(() => setVisible(false), 180);
      }
    }, 24);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(exitTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-preloader"
          role="status"
          aria-label="Loading WE PROMOTE"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: prefersReducedMotion ? 0.15 : 0.72,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] grid min-h-[100svh] place-items-center overflow-hidden bg-[#080808] px-7 text-white"
        >
          <div className="absolute left-7 right-7 top-7 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.24em] text-white/55 sm:left-12 sm:right-12 sm:top-10">
            <span>WE PROMOTE</span>
            <span>Brand growth, with authority</span>
          </div>

          <div className="w-full max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.38em] text-white/55 sm:mb-7 sm:text-xs"
            >
              A brand authority house
            </motion.p>

            <motion.h1
              initial={{ clipPath: "inset(0 100% 0 0)", y: 16 }}
              animate={{ clipPath: "inset(0 0 0 0)", y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0.25 : 0.85,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="whitespace-nowrap text-center font-[Manrope] text-[clamp(2.6rem,11vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.09em]"
            >
              WE PROMOTE
            </motion.h1>

            <div className="mx-auto mt-8 flex max-w-xl items-center gap-4 sm:mt-10">
              <div className="h-px flex-1 bg-white/20">
                <motion.div
                  className="h-full origin-left bg-white"
                  style={{ scaleX: progress / 100 }}
                />
              </div>
              <span className="w-10 text-right font-mono text-[10px] tabular-nums text-white/65">
                {String(progress).padStart(2, "0")}
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.6 }}
              className="mt-4 text-center text-[9px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[10px]"
            >
              Strategy / Identity / Digital
            </motion.p>
          </div>

          <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between text-[8px] uppercase tracking-[0.2em] text-white/35 sm:bottom-10 sm:left-12 sm:right-12 sm:text-[9px]">
            <span>Building brand recognition</span>
            <span>India</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
