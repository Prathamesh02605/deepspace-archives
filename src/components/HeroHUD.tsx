import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";


/**
 * Hero-section-scoped holographic HUD. Animated, meaningful overlays:
 * vertical depth bars, mini radar, vitals readout, frame number ticker.
 */
export function HeroHUD() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
      {/* Left vertical depth bars — like sound levels */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-end gap-[3px] h-40">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] bg-[#facc15]"
            initial={{ height: "10%" }}
            animate={{
              height: ["10%", `${30 + Math.random() * 60}%`, "20%", "60%"],
            }}
            transition={{
              duration: 1.8 + (i % 5) * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
            style={{ opacity: 0.35 + (i % 3) * 0.2 }}
          />
        ))}
      </div>
      <div className="absolute left-6 top-[calc(50%+88px)] font-mono text-[8px] uppercase tracking-[0.4em] text-foreground/40">
        AMPL // CH.01
      </div>

      {/* Right side — mini radar */}
      <div className="absolute right-10 top-[18%] w-24 h-24 opacity-70">
        <div className="absolute inset-0 rounded-full border border-foreground/25" />
        <div className="absolute inset-3 rounded-full border border-foreground/20" />
        <div className="absolute inset-6 rounded-full border border-foreground/15" />
        <motion.div
          className="absolute inset-0 origin-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(250,204,21,0.55) 18deg, transparent 36deg)",
            borderRadius: "9999px",
            mask: "radial-gradient(circle, black 60%, transparent 100%)",
            WebkitMask: "radial-gradient(circle, black 60%, transparent 100%)",
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-[#facc15] rounded-full" />
        {/* contact pings */}
        {[
          { x: "30%", y: "35%", d: 0 },
          { x: "70%", y: "60%", d: 1 },
          { x: "55%", y: "20%", d: 2 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-foreground rounded-full"
            style={{ left: p.x, top: p.y }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: p.d * 0.6 }}
          />
        ))}
      </div>
      <div className="absolute right-10 top-[calc(18%+104px)] font-mono text-[8px] uppercase tracking-[0.4em] text-foreground/40">
        RADAR // 3CN
      </div>

      {/* Vitals box — bottom right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-24 right-10 w-44 border border-foreground/20 bg-background/40 backdrop-blur-sm p-3 font-mono text-[9px] uppercase tracking-[0.25em]"
      >
        <div className="flex justify-between text-foreground/40 mb-2">
          <span>VITALS</span>
          <span className="text-[#facc15]">NOMINAL</span>
        </div>
        {[
          { l: "FOCUS", v: 0.84 },
          { l: "FLOW", v: 0.72 },
          { l: "CAFFEINE", v: 0.91 },
        ].map((row) => (
          <div key={row.l} className="flex items-center gap-2 mb-1.5">
            <span className="w-14 text-foreground/50">{row.l}</span>
            <div className="flex-1 h-1 bg-foreground/10 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-[#facc15]"
                initial={{ width: 0 }}
                animate={{ width: `${row.v * 100}%` }}
                transition={{ duration: 1.2, delay: 2 + row.v }}
              />
            </div>
            <span className="text-foreground/60 tabular-nums">
              {String(Math.round(row.v * 100)).padStart(2, "0")}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Frame number ticker — top right of hero */}
      <FrameTicker />

      {/* Interactive target reticle — lock-on with ripple */}
      <InteractiveReticle />
    </div>
  );
}

function InteractiveReticle() {
  const [hover, setHover] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);

  const onClick = () => {
    const id = Date.now();
    setRipples((r) => [...r, id]);
    setTimeout(() => setRipples((r) => r.filter((x) => x !== id)), 900);
  };

  return (
    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-auto">
      <motion.button
        type="button"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onClick={onClick}
        whileTap={{ scale: 0.92 }}
        className="relative w-20 h-20 cursor-crosshair focus:outline-none"
        aria-label="Target lock"
      >
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 border border-[#facc15]/60"
          animate={{ rotate: hover ? 360 : 0 }}
          transition={{
            duration: hover ? 4 : 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Inner ring — pulses on hover */}
        <motion.div
          className="absolute inset-2 border border-foreground/40 rounded-full"
          animate={
            hover
              ? { scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }
              : { scale: 1, opacity: 0.4 }
          }
          transition={{ duration: 1.2, repeat: hover ? Infinity : 0 }}
        />
        {/* Crosshair */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#facc15]/50 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-[#facc15]/50 -translate-y-1/2" />
        {/* Center dot */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-[#facc15]"
          animate={
            hover
              ? { scale: [1, 1.8, 1] }
              : { scale: [1, 1.4, 1] }
          }
          transition={{ duration: hover ? 0.7 : 1.6, repeat: Infinity }}
        />
        {/* Corner brackets — push out on hover */}
        {[
          { c: "top-0 left-0", t: -4, l: -4 },
          { c: "top-0 right-0", t: -4, l: 4 },
          { c: "bottom-0 left-0", t: 4, l: -4 },
          { c: "bottom-0 right-0", t: 4, l: 4 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className={`absolute ${b.c} w-2.5 h-2.5 border-[#facc15]`}
            style={{
              borderTopWidth: b.t < 0 ? 1 : 0,
              borderBottomWidth: b.t > 0 ? 1 : 0,
              borderLeftWidth: b.l < 0 ? 1 : 0,
              borderRightWidth: b.l > 0 ? 1 : 0,
            }}
            animate={{ x: hover ? b.l : 0, y: hover ? b.t : 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 18 }}
          />
        ))}

        {/* Ripples */}
        <AnimatePresence>
          {ripples.map((id) => (
            <motion.span
              key={id}
              className="absolute inset-0 border border-[#facc15] rounded-full pointer-events-none"
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Focus label */}
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#facc15] text-black font-mono text-[9px] uppercase tracking-[0.3em] px-2 py-0.5"
            >
              LOCK ●
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/60"
            >
              TGT_01 // ACQUIRED
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}


function FrameTicker() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute top-28 right-10 font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40 flex flex-col items-end gap-1"
    >
      <span className="bg-[#facc15] text-black px-2 py-0.5 tracking-[0.3em]">
        REC ● HERO
      </span>
      <span>SCN/01 — INTRO</span>
      <span>ASPECT 16:9</span>
    </motion.div>
  );
}
