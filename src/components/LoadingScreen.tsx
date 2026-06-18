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
        timersRef.current.push(window.setTimeout(() => setPhase("transition"), 320));
        timersRef.current.push(window.setTimeout(() => onDoneRef.current(), 320 + 660));
        timersRef.current.push(window.setTimeout(() => setPhase("done"), 320 + 780));
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

  // Topographic contour SVG (subtle organic curves like the reference backdrop)
  const topoSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.05'>
      <path d='M-50,180 C220,120 420,260 640,220 C860,180 1050,300 1250,260 C1420,225 1560,290 1700,250'/>
      <path d='M-50,300 C200,260 380,380 620,330 C840,285 1040,420 1260,360 C1440,310 1570,400 1700,360'/>
      <path d='M-50,440 C220,400 420,520 660,470 C880,425 1080,560 1280,500 C1440,455 1580,540 1700,500'/>
      <path d='M-50,580 C200,540 400,660 640,610 C860,565 1060,700 1260,640 C1440,595 1580,680 1700,640'/>
      <path d='M-50,720 C220,680 420,800 660,750 C880,705 1080,840 1280,780 C1440,735 1580,820 1700,780'/>
      <path d='M-50,60 C220,20 420,140 640,100 C860,60 1050,180 1250,140 C1420,105 1560,170 1700,130' stroke-opacity='0.035'/>
      <path d='M200,-40 C260,200 180,440 320,640 C420,800 360,900 420,1000' stroke-opacity='0.04'/>
      <path d='M900,-40 C960,220 880,460 1020,660 C1120,820 1060,920 1120,1020' stroke-opacity='0.035'/>
      <path d='M1300,-40 C1360,200 1280,440 1420,640 C1520,800 1460,900 1520,1000' stroke-opacity='0.035'/>
    </svg>`,
  )}`;

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
          {/* Topographic contour backdrop */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("${topoSvg}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Film grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "256px 256px",
            }}
          />

          {/* Soft vignette around logo (warm yellow glow) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 72% 50%, color-mix(in oklab, var(--loader-accent) 5%, transparent) 0%, transparent 40%)",
            }}
          />

          {/* Left-edge vertical progress bar (fills top → down) */}
          {phase === "loading" && (
            <div className="absolute left-0 top-0 h-full w-[6px] md:w-[7px] overflow-hidden bg-[var(--loader-text)]/[0.05]">
              <div
                className="absolute top-0 left-0 w-full bg-[var(--loader-accent)]"
                style={{ height: `${progress}%`, transition: "height 90ms linear" }}
              />
              <div
                className="absolute top-0 left-0 w-full bg-[var(--loader-accent)] blur-[8px] opacity-50"
                style={{ height: `${progress}%`, transition: "height 90ms linear" }}
              />
            </div>
          )}

          {/* Logo block — center-right */}
          <div className="absolute right-[6%] md:right-[10%] top-1/2 -translate-y-1/2 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: phase === "transition" ? 0 : 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-3 font-mono text-[8px] uppercase tracking-[0.55em] text-[var(--loader-text)]/60">
                P · K · H · A · C · H · A · N · E
              </div>
              <div className="relative flex items-baseline">
                <span className="font-display text-[3.5rem] leading-[0.85] tracking-[-0.04em] font-black text-[var(--loader-text)] md:text-[5rem]">
                  PK
                </span>
                <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--loader-text)]/50 self-end mb-2">
                  / 001
                </span>
              </div>
              <div className="mt-3 h-px w-14 bg-[var(--loader-accent)]" />
              <div className="mt-3 font-display text-[10px] uppercase tracking-[0.45em] text-[var(--loader-text)]/80 md:text-xs">
                Portfolio · 2026
              </div>
            </motion.div>
          </div>

          {/* Bottom-left: tiny yellow tick + huge percentage + "Updating..." */}
          {phase === "loading" && (
            <motion.div
              className="absolute bottom-8 left-5 md:bottom-10 md:left-7 flex flex-col items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {/* small yellow tick */}
              <div className="mb-2 h-3 w-[3px] bg-[var(--loader-accent)]" />
              <div className="flex items-baseline">
                <span className="font-display text-[3.25rem] md:text-[5rem] font-extrabold tabular-nums leading-none text-[var(--loader-accent)]">
                  {progress}
                </span>
                <span className="font-display text-2xl md:text-4xl font-light leading-none text-[var(--loader-accent)] ml-0.5">
                  %
                </span>
              </div>
              {/* dotted segments */}
              <div className="mt-2 flex gap-[3px]">
                {Array.from({ length: 2 }).map((_, i) => (
                  <span key={i} className="block h-[5px] w-[5px] bg-[var(--loader-text)]/30" />
                ))}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.35em] text-[var(--loader-text)]/45">
                Updating...
              </div>
            </motion.div>
          )}

          {/* Horizontal scan-line + bottom HUD widget + tagline (right half) */}
          {phase === "loading" && (
            <motion.div
              className="absolute left-0 right-0 bottom-[22%] hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* faint horizontal divider line across the whole viewport */}
              <div className="h-px w-full bg-[var(--loader-text)]/15" />

              {/* HUD widget sitting just above the line, right-of-center */}
              <div className="absolute -top-12 left-[55%] flex items-start gap-2">
                {/* yellow downward triangle */}
                <svg width="14" height="14" viewBox="0 0 14 14" className="mt-[2px]">
                  <polygon points="7,12 1,3 13,3" fill="var(--loader-accent)" />
                  <circle cx="7" cy="6.5" r="1" fill="var(--loader-bg)" />
                </svg>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[7px] w-[7px] border border-[var(--loader-text)]/40 flex items-center justify-center">
                      <span className="text-[6px] leading-none text-[var(--loader-text)]/50">+</span>
                    </div>
                    <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-[var(--loader-text)]/55 leading-tight">
                      Mission-Dependent Payload<br />System Interfaces
                    </span>
                  </div>
                  {/* dot grid */}
                  <div className="mt-1 ml-[14px] grid grid-cols-6 gap-[2px]">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className="block h-[3px] w-[3px] bg-[var(--loader-text)]/30" />
                    ))}
                  </div>
                </div>
              </div>

              {/* tagline sitting just below the line */}
              <div className="absolute top-2 left-[55%] font-display text-xs tracking-[0.25em] text-[var(--loader-text)]/90">
                OVER THE FRONTIER / INTO THE FRONT
              </div>
            </motion.div>
          )}

          {/* Transition sweep — single yellow curtain */}
          {phase === "transition" && (
            <motion.div
              className="absolute top-0 left-0 h-full bg-[var(--loader-accent)]"
              initial={{ width: "6px" }}
              animate={{ width: "100vw" }}
              transition={{ duration: 0.66, ease: [0.7, 0, 0.25, 1] }}
              style={{
                boxShadow:
                  "0 0 80px var(--loader-accent), 0 0 160px color-mix(in oklab, var(--loader-accent) 55%, transparent)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
