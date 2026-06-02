export function Footer() {
  return (
    <footer className="relative bg-oklch(0.10 0.02 250) border-t border-[#facc15]/30 mt-12 overflow-hidden">
      {/* HUD scanline overlay */}
      <div className="absolute inset-0 holo-scanlines opacity-30 pointer-events-none" />
      {/* Top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#facc15] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#facc15]/80">
          © 2026 · PK_OS
        </div>
        <div className="font-display text-sm text-center text-white/90">
          Designed & Developed by <span className="text-[#facc15] font-semibold">Prathamesh Khachane</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#facc15] flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#facc15] animate-pulse shadow-[0_0_8px_#facc15]" />
          END OF TRANSMISSION
        </div>
      </div>
    </footer>
  );
}
