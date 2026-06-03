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

  const BAR_VW = 3.5; // thinner

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, #161616 0%, #0a0a0a 55%, #000000 100%)",
          }}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-screen"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 3px)",
            }}
          />

          {/* Roving horizontal scan band */}
          {phase === "loading" && (
            <motion.div
              className="absolute left-0 right-0 h-[120px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(250,204,21,0.12) 50%, transparent)",
              }}
              animate={{ top: ["-15%", "110%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Scrolling data stream — bottom */}
          {phase === "loading" && (
            <div className="absolute bottom-6 left-[10vw] right-[10vw] overflow-hidden font-mono text-[9px] uppercase tracking-[0.35em] text-white/30 pointer-events-none">
              <motion.div
                className="whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                ► BOOT.SEQ INIT ► LOAD SHADERS ► COMPILE WEBGL ► WARM CACHE ►
                MOUNT FONTS ► HYDRATE STATE ► AUDIO IDLE ► UPLINK 24ms ► OK ►
                BOOT.SEQ INIT ► LOAD SHADERS ► COMPILE WEBGL ► WARM CACHE ►
                MOUNT FONTS ► HYDRATE STATE ► AUDIO IDLE ► UPLINK 24ms ► OK ►
              </motion.div>
            </div>
          )}

          {/* Top right target reticle */}
          {phase === "loading" && (
            <div className="absolute top-8 right-8 w-14 h-14 opacity-70 pointer-events-none">
              <motion.div
                className="absolute inset-0 border border-[#facc15]/70"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 border border-white/30 rounded-full" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-[#facc15]/50 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 w-full h-px bg-[#facc15]/50 -translate-y-1/2" />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-1 bg-[#facc15]"
                animate={{ scale: [1, 2.2, 1], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            </div>
          )}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* ─────────── PK MONOGRAM — center-right ─────────── */}
          <div className="absolute right-[10%] top-1/2 -translate-y-1/2 flex flex-col items-end gap-5">
            {/* Top meta row */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: phase === "transition" ? 0 : 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-12 bg-[#facc15]" />
              <span className="bg-[#facc15] text-black font-mono text-[9px] uppercase tracking-[0.4em] px-2 py-0.5">
                PK_OS
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/50">
                v2.6 / FRAME 001
              </span>
            </motion.div>

            {/* Monogram block */}
            <div className="relative">
              {/* Corner registration marks */}
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((cls, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase === "transition" ? 0 : 0.6 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  className={`absolute h-4 w-4 border-[#facc15] ${cls}`}
                  style={{ margin: "-14px" }}
                />
              ))}

              {/* Outlined ghost behind */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "transition" ? 0 : 0.18 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute inset-0 font-display font-black leading-[0.78] tracking-[-0.05em] text-[11rem] md:text-[16rem] select-none"
                style={{
                  WebkitTextStroke: "1.5px #facc15",
                  color: "transparent",
                  transform: "translate(14px, 14px)",
                }}
              >
                PK
              </motion.div>

              {/* Solid mark */}
              <div className="relative flex items-baseline">
                {["P", "K"].map((c, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
                    animate={{
                      opacity: phase === "transition" ? 0 : 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      delay: 0.15 + i * 0.18,
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative font-display text-[11rem] md:text-[16rem] font-black leading-[0.78] tracking-[-0.05em] text-white"
                  >
                    {c}
                    {/* glitch ghosts */}
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 text-[#facc15] mix-blend-screen"
                      animate={{ x: [0, -3, 2, 0, -1, 0], opacity: [0, 0.7, 0, 0.5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    >
                      {c}
                    </motion.span>
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 text-cyan-300 mix-blend-screen"
                      animate={{ x: [0, 2, -2, 0, 1, 0], opacity: [0, 0.4, 0, 0.3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.2 + i * 0.4 }}
                    >
                      {c}
                    </motion.span>
                  </motion.span>
                ))}

                {/* Yellow accent dot */}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: phase === "transition" ? 0 : 1 }}
                  transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="ml-2 h-3 w-3 self-end mb-8 bg-[#facc15] origin-center"
                  style={{ boxShadow: "0 0 20px #facc15" }}
                />
              </div>
            </div>

            {/* Bottom meta — full name + role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "transition" ? 0 : 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-col items-end gap-1"
            >
              <div className="font-display text-sm uppercase tracking-[0.5em] text-white/80">
                Prathamesh&nbsp;Khachane
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/40">
                STUDENT × CREATOR × PORTFOLIO/2026
              </div>
            </motion.div>
          </div>

          {/* ─────────── LOADING BAR — thinner, % outside ─────────── */}
          {phase === "loading" && (
            <>
              {/* Bar */}
              <div
                className="absolute left-0 top-0 h-full bg-white/[0.03] overflow-hidden border-r border-white/10"
                style={{ width: `${BAR_VW}vw` }}
              >
                <div
                  className="absolute top-0 left-0 w-full bg-[#facc15]"
                  style={{
                    height: `${progress}%`,
                    boxShadow:
                      "0 0 40px #facc15, inset -6px 0 24px rgba(0,0,0,0.25)",
                    transition: "height 80ms linear",
                  }}
                />
                {/* Top/bottom labels inside bar */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 -rotate-90 origin-center font-mono text-[8px] uppercase tracking-[0.4em] text-white/40 mix-blend-difference whitespace-nowrap">
                  INIT
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 -rotate-90 origin-center font-mono text-[8px] uppercase tracking-[0.4em] text-white/40 mix-blend-difference whitespace-nowrap">
                  LOAD
                </div>
              </div>

              {/* % readout — OUTSIDE the bar, tracking fill height */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `calc(${BAR_VW}vw + 24px)`,
                  top: `${progress}%`,
                  transform: "translateY(-50%)",
                  transition: "top 80ms linear",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#facc15]" />
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-6xl font-black tabular-nums text-white leading-none">
                      {progress.toString().padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-light text-[#facc15] leading-none">
                      %
                    </span>
                  </div>
                </div>
                <div className="mt-2 ml-9 font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">
                  LOADING ASSETS
                </div>
              </div>
            </>
          )}

          {/* Transition sweep — one cover/reveal only. */}
          {phase === "transition" && (
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#facc15]"
              initial={{ width: `${BAR_VW}vw`, x: 0 }}
              animate={{
                width: "100vw",
                x: "0vw",
              }}
              transition={{
                duration: 0.64,
                ease: [0.7, 0, 0.25, 1],
              }}
              style={{
                boxShadow: "0 0 80px #facc15, 0 0 160px rgba(250,204,21,0.6)",
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
