import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "transition" | "done">("loading");

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 5 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setProgress(100);
        setTimeout(() => setPhase("transition"), 500);
        setTimeout(() => setPhase("done"), 1700);
        setTimeout(onDone, 2200);
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
          className="fixed inset-0 z-[200] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, #1a1a1a 0%, #0a0a0a 55%, #000000 100%)",
          }}
        >
          {/* White PK logo — middle-right, slightly bottom */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase === "transition" ? 0 : 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-[14%] top-[58%] -translate-y-1/2 flex flex-col items-start gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.55em] text-white/70">
              Prathamesh
            </span>
            <span className="font-display text-7xl md:text-8xl font-light leading-[0.85] tracking-tight text-white">
              KHA
              <br />
              CHANE
            </span>
            <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
              Digital / Portfolio — 2026
            </span>
          </motion.div>

          {/* Vertical loading bar — left edge, 15% of screen width, full height */}
          {phase === "loading" && (
            <div className="absolute left-0 top-0 h-full w-[15vw] bg-white/[0.03] overflow-hidden">
              {/* Yellow fill grows from top to bottom */}
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#facc15]"
                style={{
                  height: `${progress}%`,
                  boxShadow:
                    "0 0 60px #facc15, inset -20px 0 60px rgba(0,0,0,0.25)",
                }}
                transition={{ ease: "linear" }}
              />

              {/* % readout, follows the fill */}
              <motion.div
                className="absolute left-6 -translate-y-full pb-4 leading-none"
                style={{ top: `${progress}%` }}
              >
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-display text-5xl font-light tabular-nums text-black"
                  >
                    {progress.toString().padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl font-light text-black/80">%</span>
                </div>
              </motion.div>

              {/* Top label inside the bar (dark text on yellow once covered) */}
              <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mix-blend-difference">
                PK_OS // INIT
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 mix-blend-difference">
                Loading
              </div>
            </div>
          )}

          {/* Transition: the 15% bar expands left→right to fill the screen, then fades */}
          {phase === "transition" && (
            <motion.div
              initial={{ width: "15vw", opacity: 1 }}
              animate={{ width: "100vw", opacity: [1, 1, 0] }}
              transition={{
                duration: 1.2,
                ease: [0.7, 0, 0.25, 1],
                times: [0, 0.7, 1],
              }}
              className="absolute top-0 left-0 h-full bg-[#facc15]"
              style={{
                boxShadow: "0 0 80px #facc15, 0 0 160px rgba(250,204,21,0.6)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
