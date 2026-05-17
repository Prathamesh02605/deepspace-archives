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
        setTimeout(() => setPhase("transition"), 450);
        // sweep takes full duration; mark done only after sweep completes
        setTimeout(() => setPhase("done"), 450 + 1400);
        setTimeout(onDone, 450 + 1400 + 100);
        return;
      }
      setProgress(Math.floor(p));
    }, 80);
    return () => clearInterval(id);
  }, [onDone]);

  // Glitchy initials
  const initials = ["P", "K"];

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, #161616 0%, #0a0a0a 55%, #000000 100%)",
          }}
        >
          {/* Holographic scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-screen"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* Animated PK initials — center-right, with glitch sweep */}
          <div className="absolute right-[12%] top-1/2 -translate-y-1/2 flex flex-col items-start gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "transition" ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.55em] text-white/60"
            >
              [ PK_OS // INIT ]
            </motion.div>

            <div className="relative flex items-baseline gap-2">
              {initials.map((c, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                  animate={{
                    opacity: phase === "transition" ? 0 : 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: 0.1 + i * 0.15,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative font-display text-[10rem] md:text-[14rem] font-light leading-[0.8] tracking-tighter text-white"
                >
                  {c}
                  {/* Glitch ghosts */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 text-[#facc15] mix-blend-screen"
                    animate={{ x: [0, -3, 2, 0, -1, 0], opacity: [0, 0.8, 0, 0.6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {c}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 text-cyan-300 mix-blend-screen"
                    animate={{ x: [0, 2, -2, 0, 1, 0], opacity: [0, 0.5, 0, 0.4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.2 + i * 0.4 }}
                  >
                    {c}
                  </motion.span>
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "transition" ? 0 : 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40"
            >
              PRATHAMESH KHACHANE — PORTFOLIO/2026
            </motion.div>
          </div>

          {/* Vertical loading bar — half size: 7.5vw */}
          {phase === "loading" && (
            <div className="absolute left-0 top-0 h-full w-[7.5vw] bg-white/[0.03] overflow-hidden border-r border-white/5">
              {/* Yellow fill grows top→bottom */}
              <div
                className="absolute top-0 left-0 w-full bg-[#facc15]"
                style={{
                  height: `${progress}%`,
                  boxShadow:
                    "0 0 60px #facc15, inset -10px 0 40px rgba(0,0,0,0.25)",
                  transition: "height 80ms linear",
                }}
              />

              {/* % readout — sits just above the fill edge */}
              <div
                className="absolute left-4 -translate-y-full pb-3 leading-none"
                style={{ top: `${progress}%`, transition: "top 80ms linear" }}
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-light tabular-nums text-black">
                    {progress.toString().padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl font-light text-black/80">%</span>
                </div>
              </div>

              {/* Top label */}
              <div className="absolute top-5 left-4 font-mono text-[9px] uppercase tracking-[0.35em] text-white/40 mix-blend-difference">
                INIT
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-5 left-4 font-mono text-[9px] uppercase tracking-[0.35em] text-white/40 mix-blend-difference">
                LOAD
              </div>
            </div>
          )}

          {/* Transition: bar sweeps left→right fully. No fade until it has reached the far side. */}
          {phase === "transition" && (
            <motion.div
              initial={{ width: "7.5vw", opacity: 1 }}
              animate={{ width: "100vw", opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.7, 0, 0.25, 1] }}
              className="absolute top-0 left-0 h-full bg-[#facc15]"
              style={{
                boxShadow: "0 0 80px #facc15, 0 0 160px rgba(250,204,21,0.6)",
              }}
            >
              {/* glitch overlay during sweep */}
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
