import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export type DetailPanelData = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  meta?: { k: string; v: string }[];
  tags?: string[];
  bullets?: string[];
  status?: string;
};

export function DetailPanel({
  open,
  data,
  onClose,
}: {
  open: boolean;
  data: DetailPanelData | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[150] grid place-items-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Scan line backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #facc15 0px, #facc15 1px, transparent 1px, transparent 4px)",
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30, clipPath: "inset(0 50% 0 50%)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0%)" }}
            exit={{ opacity: 0, y: 20, clipPath: "inset(0 50% 0 50%)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-background border border-[#facc15]/40 noise-overlay"
            style={{
              boxShadow:
                "0 0 0 1px rgba(250,204,21,0.15), 0 30px 80px -10px rgba(250,204,21,0.25), 0 0 120px -20px rgba(250,204,21,0.3)",
            }}
          >
            {/* Corner brackets */}
            {[
              "top-0 left-0 border-t-2 border-l-2",
              "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((c, i) => (
              <span
                key={i}
                className={`absolute h-4 w-4 border-[#facc15] ${c}`}
                style={{ margin: "-2px" }}
              />
            ))}

            {/* Header strip */}
            <div className="flex items-center justify-between border-b border-[#facc15]/30 px-5 py-3 bg-[#facc15]/[0.04]">
              <div className="flex items-center gap-3">
                <span className="bg-[#facc15] text-black font-mono text-[9px] uppercase tracking-[0.4em] px-2 py-0.5">
                  {data.id}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/50">
                  DETAIL // EXPANDED
                </span>
                {data.status && (
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.4em] text-[#facc15]">
                    <span className="h-1.5 w-1.5 bg-[#facc15] animate-pulse" />
                    {data.status}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="h-7 w-7 grid place-items-center border border-[#facc15]/40 text-foreground/70 hover:bg-[#facc15] hover:text-black transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 pt-6 pb-7 max-h-[70vh] overflow-y-auto">
              {data.subtitle && (
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#facc15] mb-2">
                  {data.subtitle}
                </div>
              )}
              <h3
                data-text={data.title}
                className="glitch font-display font-black uppercase text-3xl md:text-4xl tracking-tight text-foreground"
              >
                {data.title}
              </h3>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-3 h-[3px] w-24 bg-[#facc15] origin-left"
                style={{ boxShadow: "0 0 16px rgba(250,204,21,0.6)" }}
              />

              <p className="mt-6 text-foreground/80 leading-relaxed">
                {data.description}
              </p>

              {data.bullets && data.bullets.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {data.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.06 }}
                      className="flex gap-3 text-sm text-foreground/70"
                    >
                      <span className="mt-2 h-[6px] w-[6px] bg-[#facc15] shrink-0" />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {data.tags && data.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {data.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-[0.25em] px-2 py-1 border border-[#facc15]/40 text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {data.meta && data.meta.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-border/50 pt-5">
                  {data.meta.map((m) => (
                    <div key={m.k} className="border-l-2 border-[#facc15]/60 pl-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/50">
                        {m.k}
                      </div>
                      <div className="mt-1 font-display text-sm text-foreground">
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer ticker */}
            <div className="border-t border-[#facc15]/20 px-5 py-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40">
              <span>ESC // CLOSE</span>
              <span className="text-[#facc15]">● ACQUIRED</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
