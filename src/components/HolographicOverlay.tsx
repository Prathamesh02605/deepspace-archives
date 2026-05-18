import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Site-wide holographic overlay — animated HUD:
 * - parallax depth layers tracking mouse
 * - live frame counter + clock + telemetry
 * - scanlines, gradient sweep, target reticle
 * - registration marks, side ticks, scrolling data stream
 */
export function HolographicOverlay() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  // Three parallax depths
  const x1 = useTransform(sx, (v) => v * 8);
  const y1 = useTransform(sy, (v) => v * 8);
  const x2 = useTransform(sx, (v) => v * 18);
  const y2 = useTransform(sy, (v) => v * 18);
  const x3 = useTransform(sx, (v) => v * 32);
  const y3 = useTransform(sy, (v) => v * 32);

  const [frame, setFrame] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % 9999);
      const d = new Date();
      setClock(
        `${String(d.getUTCHours()).padStart(2, "0")}:${String(
          d.getUTCMinutes()
        ).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")} UTC`
      );
    }, 1000 / 12);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(id);
    };
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {/* DEPTH 1 — scanlines (lowest) */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -inset-8 holo-scanlines opacity-50"
      />

      {/* Roving horizontal scan band */}
      <motion.div
        className="absolute left-0 right-0 h-[140px] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(250,204,21,0.08) 50%, transparent)",
        }}
        animate={{ top: ["-15%", "110%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* Holographic gradient sweep */}
      <div className="absolute inset-0 holo-sweep opacity-60" />

      {/* DEPTH 2 — corner registration marks + side ticks */}
      <motion.div style={{ x: x2, y: y2 }} className="absolute inset-0">
        {[
          "top-4 left-4",
          "top-4 right-4",
          "bottom-4 left-4",
          "bottom-4 right-4",
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-7 h-7`}>
            <div className="absolute inset-0 border border-foreground/30" />
            <div className="absolute inset-1.5 border border-[#facc15]/70" />
            <motion.div
              className="absolute inset-[6px] bg-[#facc15]/80"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          </div>
        ))}

        {/* Left rail ticks */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-px ${
                i % 4 === 0 ? "w-5 bg-[#facc15]" : "w-2 bg-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Right rail vertical telemetry */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-px bg-foreground/40"
              animate={{ width: ["6px", "20px", "10px", "6px"] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* DEPTH 3 — HUD labels & live telemetry (highest parallax) */}
      <motion.div style={{ x: x3, y: y3 }} className="absolute inset-0">
        {/* Top center header */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.5em] text-foreground/50">
          PK_OS // 26.05 // FRAME {String(frame).padStart(4, "0")}
        </div>

        {/* Top left coordinates */}
        <div className="absolute top-3 left-12 font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/40 flex flex-col gap-0.5">
          <span>LAT 19.0760</span>
          <span>LON 72.8777</span>
        </div>

        {/* Top right clock */}
        <div className="absolute top-3 right-12 font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/50">
          {clock || "00:00:00 UTC"}
        </div>

        {/* Bottom right signal */}
        <div className="absolute bottom-3 right-12 font-mono text-[9px] uppercase tracking-[0.5em] text-foreground/50 flex items-center gap-2">
          <motion.span
            className="inline-block h-1.5 w-1.5 bg-[#facc15]"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          SIGNAL LOCKED
        </div>

        {/* Bottom left scrolling data stream */}
        <div className="absolute bottom-3 left-12 max-w-[40vw] overflow-hidden font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/35">
          <motion.div
            className="whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            ► SYS.BOOT OK ► RENDER 60FPS ► SHADER COMPILE OK ► AUDIO IDLE ►
            INPUT ARMED ► NET 24ms ► UPLINK STABLE ► CACHE WARM ► SYS.BOOT OK ►
            RENDER 60FPS ► SHADER COMPILE OK ► AUDIO IDLE ► INPUT ARMED ►
          </motion.div>
        </div>

        {/* Center target reticle (small, off-center) */}
        <div className="absolute top-[28%] right-[8%] w-16 h-16 opacity-50">
          <motion.div
            className="absolute inset-0 border border-[#facc15]/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-3 border border-foreground/30 rounded-full" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#facc15]/40 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-[#facc15]/40 -translate-y-1/2" />
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-1 bg-[#facc15]"
            animate={{ scale: [1, 2, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Scan blocks — random data tiles */}
      <div className="absolute bottom-[20%] left-[6%] flex flex-col gap-1 opacity-60">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex gap-1 font-mono text-[8px] text-foreground/40"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
          >
            <span>{(0xa3f0 + i * 7).toString(16).toUpperCase()}</span>
            <span className="text-[#facc15]/70">
              {Math.random().toString(2).slice(2, 10)}
            </span>
            <span>OK</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
