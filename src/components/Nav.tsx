import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const ITEMS: [string, string, string][] = [
  ["01", "About", "#about"],
  ["02", "Skills", "#skills"],
  ["03", "Log", "#experience"],
  ["04", "Archive", "#projects"],
  ["05", "Awards", "#certifications"],
  ["06", "Contact", "#contact"],
];

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 100], ["oklch(0.12 0.02 250 / 0)", "oklch(0.10 0.02 250 / 0.85)"]);
  const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const border = useTransform(scrollY, [0, 100], ["rgba(250,204,21,0)", "rgba(250,204,21,0.25)"]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      style={{ background: bg, backdropFilter: blur, WebkitBackdropFilter: blur, borderColor: border }}
      className="fixed top-0 inset-x-0 z-50 border-b"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-12 h-14 md:h-16 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 shrink-0" data-cursor-hover>
          <div className="relative h-8 w-8 grid place-items-center border border-[var(--cyan)]/50">
            <span className="font-display text-sm tracking-widest text-gradient">PK</span>
            <span className="absolute -inset-px border border-[var(--cyan)]/20 animate-pulse" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70 hidden sm:block">
            PRATHAMESH.PORTFOLIO
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-[10px] uppercase tracking-[0.3em]">
          {ITEMS.map(([n, l, h]) => (
            <a
              key={l}
              href={h}
              className="group relative flex items-center gap-2 text-foreground/80 hover:text-[#facc15] transition-colors"
              data-cursor-hover
            >
              <span className="text-[#facc15]/70 group-hover:text-[#facc15]">{n}</span>
              <span>{l}</span>
              <span className="absolute -bottom-1 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 bg-[#facc15] origin-left transition-transform" />
            </a>
          ))}
        </nav>

        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#facc15] hidden lg:flex items-center gap-2 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-[#facc15] animate-pulse" />
          ONLINE
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden h-9 w-9 grid place-items-center border border-[#facc15]/40 text-foreground hover:bg-[#facc15] hover:text-black transition-colors"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="lg:hidden overflow-hidden border-t border-[#facc15]/20 bg-background/95 backdrop-blur"
      >
        <nav className="px-5 py-4 grid grid-cols-2 gap-3 font-mono text-[11px] uppercase tracking-[0.3em]">
          {ITEMS.map(([n, l, h]) => (
            <a
              key={l}
              href={h}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-2 text-foreground/85 hover:text-[#facc15]"
            >
              <span className="text-[#facc15]/70">{n}</span>
              <span>{l}</span>
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}
