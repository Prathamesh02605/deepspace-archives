import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "transition" | "done">("loading");
  const onDoneRef = useRef(onDone);
  const completedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      if (completedRef.current) return;
      p += Math.random() * 5 + 2;
      if (p >= 100) {
        completedRef.current = true;
        p = 100;
        clearInterval(id);
        setProgress(100);
        // Hold briefly at 100%, then run the single yellow sweep.
        timersRef.current.push(window.setTimeout(() => setPhase("transition"), 300));
        // Mount once the single yellow curtain has covered the viewport.
        timersRef.current.push(window.setTimeout(() => onDoneRef.current(), 300 + 640));
        // Remove the loader immediately after reveal is ready — no second yellow motion.
        timersRef.current.push(window.setTimeout(() => setPhase("done"), 300 + 760));
        return;
      }
      setProgress(Math.floor(p));
    }, 80);
    return () => {
      clearInterval(id);
      timersRef.current.forEach(window.clearTimeout);
      timersRef.current = [];
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          style={{ backgroundColor: "var(--loader-bg)" }}
        >
          {/* Subtle film grain / noise backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
              backgroundSize: "256px 256px",
            }}
          />

          {/* Vignette glow around the logo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 72% 48%, color-mix(in oklab, var(--loader-accent) 6%, transparent) 0%, transparent 45%)",
            }}
          />

          {/* Thin vertical progress bar — left edge */}
          {phase === "loading" && (
            <div className="absolute left-0 top-0 h-full w-[3px] overflow-hidden bg-[var(--loader-text)]/[0.06]">
              <div
                className="absolute top-0 left-0 w-full bg-[var(--loader-accent)]"
                style={{ height: `${progress}%`, transition: "height 80ms linear" }}
              />
              <div
                className="absolute top-0 left-0 w-full bg-[var(--loader-accent)] blur-[6px] opacity-40"
                style={{ height: `${progress}%`, transition: "height 80ms linear" }}
              />
            </div>
          )}

          {/* Logo block — center-right like Endfield */}
          <div className="absolute right-[12%] top-1/2 -translate-y-1/2 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: phase === "transition" ? 0 : 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Small label above */}
              <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.5em] text-[var(--loader-text-muted)]">
                PK_OS / v2.6
              </div>

              {/* Main mark */}
              <div className="relative flex items-baseline">
                <span className="font-display text-[4.5rem] leading-[0.85] tracking-[-0.04em] font-black text-[var(--loader-text)] md:text-[6.5rem]">
                  PK
                </span>
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--loader-text-muted)] self-end mb-2 md:text-xs">
                  // 001
                </span>
              </div>

              {/* Divider */}
              <div className="mt-5 h-px w-16 bg-[var(--loader-accent)]" />

              {/* Name / role */}
              <div className="mt-5 font-display text-xs uppercase tracking-[0.45em] text-[var(--loader-text)] md:text-sm">
                Prathamesh Khachane
              </div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--loader-text-muted)]">
                Student × Creator × Portfolio/2026
              </div>
            </motion.div>
          </div>

          {/* Percentage readout — bottom-left */}
          {phase === "loading" && (
            <motion.div
              className="absolute bottom-10 left-7 flex flex-col items-start gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-baseline">
                <span className="font-display text-5xl font-black tabular-nums leading-none text-[var(--loader-accent)] md:text-7xl">
                  {progress}
                </span>
                <span className="font-display text-2xl font-light leading-none text-[var(--loader-accent)]/70 md:text-3xl">
                  %
                </span>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--loader-text-muted)]">
                Updating...
              </div>
            </motion.div>
          )}

          {/* Transition sweep — one cover/reveal only. */}
          {phase === "transition" && (
            <motion.div
              className="absolute top-0 left-0 h-full bg-[var(--loader-accent)]"
              initial={{ width: "3px", x: 0 }}
              animate={{ width: "100vw", x: "0vw" }}
              transition={{ duration: 0.64, ease: [0.7, 0, 0.25, 1] }}
              style={{
                boxShadow:
                  "0 0 80px var(--loader-accent), 0 0 160px color-mix(in oklab, var(--loader-accent) 60%, transparent)",
              }}
            >
              <motion.div
                className="absolute inset-0 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 2px, transparent 2px, transparent 5px)",
                }}
                animate={{ x: [0, 6, -4, 0] }}
                transition={{ duration: 0.25, repeat: Infinity }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
