import { motion } from "framer-motion";

/**
 * Site-wide holographic overlay — Sportsbrut / Swiss-International accents:
 * modular grid registration marks, scanlines, corner brackets, sweeping highlight.
 * Purely decorative + pointer-events:none.
 */
export function HolographicOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 holo-scanlines opacity-50" />

      {/* Holographic gradient sweep */}
      <div className="absolute inset-0 holo-sweep opacity-60" />

      {/* Corner registration marks */}
      {[
        "top-4 left-4",
        "top-4 right-4",
        "bottom-4 left-4",
        "bottom-4 right-4",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-6 h-6`}>
          <div className="absolute inset-0 border border-foreground/30" />
          <div className="absolute inset-1.5 border border-[#facc15]/70" />
        </div>
      ))}

      {/* Side rail ticks (left) */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`h-px ${i % 4 === 0 ? "w-4 bg-[#facc15]" : "w-2 bg-foreground/40"}`}
          />
        ))}
      </div>

      {/* HUD labels */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.5em] text-foreground/40">
        PK_OS // 26.05 // FRAME 001
      </div>
      <div className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-[0.5em] text-foreground/40 flex items-center gap-2">
        <motion.span
          className="inline-block h-1.5 w-1.5 bg-[#facc15]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        SIGNAL LOCKED
      </div>
    </div>
  );
}
