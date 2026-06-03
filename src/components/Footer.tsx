import { motion } from "framer-motion";

export function Footer() {
  const scrollTop = () => window.dispatchEvent(new Event("pk-scroll-top"));

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-[var(--footer-accent)]/45 bg-[var(--footer-bg)] text-[var(--footer-text)]">
      <div className="absolute inset-0 holo-scanlines opacity-20 pointer-events-none mix-blend-screen" />
      <motion.div
        className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[var(--footer-accent)]/18 to-transparent skew-x-[-18deg]"
        animate={{ x: ["0%", "420%"] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--footer-accent)] to-transparent" />
      <motion.div
        className="absolute inset-x-10 bottom-0 h-px bg-[var(--footer-accent)]/55"
        animate={{ opacity: [0.25, 0.8, 0.25], scaleX: [0.85, 1, 0.85] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <button
          type="button"
          onClick={scrollTop}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--footer-accent)] hover:text-[var(--footer-text)] transition-colors"
          data-cursor-hover
        >
          © 2026 · PK_OS
        </button>
        <div className="font-display text-sm text-center text-[var(--footer-text)]">
          Designed & Developed by <span className="text-[var(--footer-accent)] font-semibold">Prathamesh Khachane</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--footer-muted)] flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--footer-accent)] animate-pulse shadow-[0_0_8px_var(--footer-accent)]" />
          END OF TRANSMISSION
        </div>
      </div>
    </footer>
  );
}
