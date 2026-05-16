import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "transition" | "done">("loading");

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 7 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setProgress(100);
        // brief hold at 100%, then horizontal sweep transition, then fade
        setTimeout(() => setPhase("transition"), 350);
        setTimeout(() => setPhase("done"), 1400);
        setTimeout(onDone, 2000);
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
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* HUD */}
          <div className="absolute top-6 right-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            v.0.1.0 — PK_OS
          </div>
          <div className="absolute bottom-6 right-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            STATUS: NOMINAL
          </div>

          {/* White PK logo top-left */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: phase === "transition" ? 0 : 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-8 left-8 flex items-center gap-3"
          >
            <span className="font-display text-3xl font-light tracking-[0.2em] text-white">PK</span>
            <span className="h-3 w-px bg-white/30" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              KHACHANE
            </span>
          </motion.div>

          {/* Vertical loading bar — top-left to bottom-left */}
          {phase === "loading" && (
            <>
              {/* Track */}
              <div className="absolute left-8 top-28 bottom-20 w-[3px] bg-white/10 overflow-hidden">
                {/* Fill grows downward */}
                <motion.div
                  className="absolute top-0 left-0 w-full bg-[#facc15]"
                  style={{
                    height: `${progress}%`,
                    boxShadow: "0 0 16px #facc15, 0 0 32px rgba(250,204,21,0.5)",
                  }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Percentage alongside the bar — follows the fill */}
              <motion.div
                className="absolute left-14 font-mono text-xs tracking-[0.2em] text-[#facc15]"
                style={{
                  top: `calc(7rem + (100vh - 13rem) * ${progress / 100})`,
                  textShadow: "0 0 12px rgba(250,204,21,0.6)",
                }}
              >
                {progress.toString().padStart(3, "0")}%
              </motion.div>

              {/* Loading label bottom-left */}
              <div className="absolute bottom-6 left-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                LOADING ASSETS
              </div>
            </>
          )}

          {/* Transition sweep — bar widens horizontally left→right then fades */}
          {phase === "transition" && (
            <motion.div
              initial={{ width: "3px", left: "2rem", top: "7rem", bottom: "5rem", opacity: 1 }}
              animate={{
                width: "100vw",
                left: 0,
                top: 0,
                bottom: 0,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 1.1,
                ease: [0.7, 0, 0.3, 1],
                times: [0, 0.7, 1],
              }}
              className="absolute bg-[#facc15]"
              style={{
                boxShadow: "0 0 60px #facc15, 0 0 120px rgba(250,204,21,0.6)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
