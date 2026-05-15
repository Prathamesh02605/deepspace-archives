export function Footer() {
  return (
    <footer className="relative border-t border-border/50 mt-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)]/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © 2026 · PK_OS
        </div>
        <div className="font-display text-sm text-center">
          Designed & Developed by <span className="text-gradient">Prathamesh Khachane</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)] flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
          END OF TRANSMISSION
        </div>
      </div>
    </footer>
  );
}
