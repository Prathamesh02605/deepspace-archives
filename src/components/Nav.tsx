import { motion, useScroll, useTransform } from "framer-motion";

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 100], ["oklch(0.12 0.02 250 / 0)", "oklch(0.12 0.02 250 / 0.7)"]);
  const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);

  return (
    <motion.header
      style={{ background: bg, backdropFilter: blur, WebkitBackdropFilter: blur }}
      className="fixed top-0 inset-x-0 z-50 border-b border-transparent"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3" data-cursor-hover>
          <div className="relative h-8 w-8 grid place-items-center border border-[var(--cyan)]/50">
            <span className="font-display text-sm tracking-widest text-gradient">PK</span>
            <span className="absolute -inset-px border border-[var(--cyan)]/20 animate-pulse" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
            PRATHAMESH.PORTFOLIO
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.3em]">
          {[
            ["01", "About", "#about"],
            ["02", "Skills", "#skills"],
            ["03", "Log", "#experience"],
            ["04", "Archive", "#projects"],
            ["05", "Awards", "#certifications"],
            ["06", "Contact", "#contact"],
          ].map(([n, l, h]) => (
            <a key={l} href={h} className="group flex items-center gap-2 text-muted-foreground hover:text-[var(--cyan)] transition-colors" data-cursor-hover>
              <span className="text-[var(--cyan)]/60">{n}</span>
              <span>{l}</span>
            </a>
          ))}
        </nav>

        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)] hidden lg:flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
          ONLINE
        </div>
      </div>
    </motion.header>
  );
}
