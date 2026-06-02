import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

type Entry = {
  year: string;
  role: string;
  org: string;
  loc: string;
  desc: string;
  tags: string[];
};

const ENTRIES: Entry[] = [
  {
    year: "JAN 2026 — PRESENT",
    role: "Independent Developer",
    org: "Self-directed / Portfolio",
    loc: "REMOTE",
    desc: "Shipping cinematic web experiences, exploring motion design, generative visuals, and editorial UI systems.",
    tags: ["React", "Motion", "WebGL"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="03" title="MISSION LOG" />

        <div className="relative">
          {/* Vertical rail */}
          <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-[#facc15]/30 hidden md:block" />

          <div className="space-y-6">
            {ENTRIES.map((e, i) => (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid md:grid-cols-[11rem_1fr] gap-4 md:gap-8 group"
              >
                {/* Year + node */}
                <div className="relative flex md:flex-col md:items-end items-center gap-3 md:gap-2 md:pr-4">
                  <span className="font-display text-sm md:text-base font-black text-[#facc15] tabular-nums leading-tight md:text-right">
                    {e.year}
                  </span>
                  <span className="hidden md:block font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40">
                    LOG.{String(ENTRIES.length - i).padStart(2, "0")}
                  </span>
                  {/* Node dot */}
                  <span className="hidden md:block absolute -right-[6px] top-2 h-3 w-3 bg-[#facc15] border border-background"
                    style={{ boxShadow: "0 0 12px #facc15" }} />
                </div>

                {/* Card */}
                <div className="relative glass-panel corner-brackets p-6 noise-overlay">
                  {/* Header chip */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-[#facc15] text-black font-mono text-[9px] uppercase tracking-[0.4em] px-2 py-0.5">
                      ENTRY/{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/50">
                      LOC // {e.loc}
                    </span>
                  </div>

                  <h3
                    data-text={e.role}
                    className="glitch font-display font-black uppercase text-xl md:text-2xl tracking-tight text-foreground"
                  >
                    {e.role}
                  </h3>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--cyan)]">
                    {e.org}
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {e.desc}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-[0.25em] px-2 py-1 border border-border text-foreground/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.4, duration: 0.7 }}
                    className="absolute bottom-0 left-0 h-[2px] w-1/3 bg-[#facc15] origin-left"
                    style={{ boxShadow: "0 0 12px rgba(250,204,21,0.5)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
