import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "transition" | "done">("loading");

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 6 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setProgress(100);
        setTimeout(() => setPhase("transition"), 450);
        setTimeout(() => setPhase("done"), 1500);
        setTimeout(onDone, 2100);
        return;
      }
      setProgress(Math.floor(p));
    }, 80);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-[#0a0a0a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Faint topographic grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "120px 120px",
            }}
          />

          {/* White PK logo top-left */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: phase === "transition" ? 0 : 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-8 left-10 flex items-center gap-3"
          >
            <span className="font-display text-3xl font-light tracking-[0.2em] text-white">PK</span>
            <span className="h-3 w-px bg-white/30" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              KHACHANE
            </span>
          </motion.div>

          {/* HUD corners */}
          <div className="absolute top-8 right-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            v.0.1.0 — PK_OS
          </div>

          {/* Bottom-left: tiny vertical tick + big % number */}
          {phase === "loading" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute bottom-10 left-10 flex flex-col items-start gap-3"
            >
              {/* Vertical tick that fills upward */}
              <div className="relative h-16 w-[3px] bg-white/10">
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-[#facc15]"
                  style={{
                    height: `${progress}%`,
                    boxShadow: "0 0 14px #facc15, 0 0 28px rgba(250,204,21,0.5)",
                  }}
                />
              </div>

              {/* Big percentage */}
              <div className="flex items-baseline gap-1 leading-none">
                <span
                  className="font-display text-6xl font-light tracking-tight text-[#facc15] tabular-nums"
                  style={{ textShadow: "0 0 24px rgba(250,204,21,0.45)" }}
                >
                  {progress.toString().padStart(2, "0")}
                </span>
                <span className="font-display text-2xl font-light text-[#facc15]">%</span>
              </div>

              {/* Tiny status */}
              <div className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                <span className="h-1 w-1 bg-[#facc15] animate-pulse" />
                <span>Loading assets</span>
              </div>
            </motion.div>
          )}

          {/* Transition: yellow bar sweeps from left to right across the screen, then fades */}
          {phase === "transition" && (
            <motion.div
              initial={{ width: "3px", x: 0, opacity: 1 }}
              animate={{ width: "100vw", opacity: [1, 1, 0] }}
              transition={{
                duration: 1.1,
                ease: [0.7, 0, 0.3, 1],
                times: [0, 0.65, 1],
              }}
              className="absolute top-0 left-0 h-full bg-[#facc15]"
              style={{
                boxShadow: "0 0 60px #facc15, 0 0 140px rgba(250,204,21,0.6)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
