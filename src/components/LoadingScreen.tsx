import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 8 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 500);
        setTimeout(onDone, 1300);
      }
      setProgress(Math.floor(p));
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent animate-scan" />

          {/* HUD corners */}
          <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]/70">
            SYS://INIT_SEQUENCE
          </div>
          <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]/70">
            v.0.1.0 — PK_OS
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]/70">
            LOADING ASSETS
          </div>
          <div className="absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]/70">
            STATUS: NOMINAL
          </div>

          <div className="relative flex flex-col items-center gap-10">
            {/* Rings */}
            <div className="relative h-48 w-48">
              <div className="absolute inset-0 rounded-full border border-[var(--primary)]/30 animate-spin-slow" />
              <div className="absolute inset-3 rounded-full border border-dashed border-[var(--cyan)]/40 animate-spin-reverse" />
              <div className="absolute inset-6 rounded-full border border-[var(--purple-glow)]/20" />
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke="oklch(0.72 0.18 230)"
                  strokeWidth="1"
                  strokeDasharray={`${(progress / 100) * 289} 289`}
                  className="transition-all duration-200"
                  style={{ filter: "drop-shadow(0 0 6px oklch(0.72 0.18 230))" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl font-display font-light tracking-[0.15em] text-gradient"
                >
                  PK
                </motion.div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Initializing
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="w-72 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span>LOADING</span>
                <span className="text-[var(--cyan)]">{progress.toString().padStart(3, "0")}%</span>
              </div>
              <div className="h-px bg-border overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--cyan)] via-[var(--primary)] to-[var(--purple-glow)] transition-all duration-200"
                  style={{ width: `${progress}%`, boxShadow: "0 0 10px oklch(0.72 0.18 230)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
