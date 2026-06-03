import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { DetailPanel, type DetailPanelData } from "./DetailPanel";
import { useState } from "react";

type Entry = {
  year: string;
  role: string;
  org: string;
  loc: string;
  desc: string;
  detail: string;
  tags: string[];
  bullets: string[];
};

const ENTRIES: Entry[] = [
  {
    year: "JAN 2026 — PRESENT",
    role: "Independent Developer",
    org: "Self-directed / Portfolio",
    loc: "REMOTE",
    desc: "Shipping cinematic web experiences, exploring motion design, generative visuals, and editorial UI systems.",
    detail:
      "A self-directed mission focused on building immersive portfolio systems, sharpening frontend engineering, and translating game-inspired interface language into readable web experiences.",
    tags: ["React", "Motion", "WebGL"],
    bullets: [
      "Prototype cinematic UI panels with HUD-style motion and clear hierarchy.",
      "Build responsive React experiences optimized for smooth scrolling and interaction feedback.",
      "Study modern frontend patterns while documenting experiments as portfolio-grade case files.",
    ],
  },
];

export function Experience() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DetailPanelData | null>(null);

  const handleOpen = (e: Entry, i: number) => {
    setData({
      id: `LOG-${String(i + 1).padStart(3, "0")}`,
      title: e.role,
      subtitle: "MISSION LOG // DETAIL",
      description: e.detail,
      bullets: e.bullets,
      tags: e.tags,
      meta: [
        { k: "DURATION", v: e.year },
        { k: "LOCATION", v: e.loc },
        { k: "ORIGIN", v: e.org },
      ],
      status: "ACTIVE",
    });
    setOpen(true);
  };

  return (
    <section id="experience" className="relative py-20 md:py-24 px-5 md:px-6 lg:px-12">
      
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="03" title="MISSION LOG" />

        <div className="relative">
          {/* Vertical rail */}
          <div className="absolute left-[10.5rem] top-0 bottom-0 w-px bg-[#facc15]/30 hidden md:block" />

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
                <button
                  type="button"
                  onClick={() => handleOpen(e, i)}
                  className="relative glass-panel glass-panel-hover corner-brackets p-6 noise-overlay text-left cursor-pointer overflow-hidden"
                  data-cursor-hover
                >
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

                  <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-[#facc15] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="h-px w-6 bg-[#facc15]" />
                    TAP TO EXPAND
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.4, duration: 0.7 }}
                    className="absolute bottom-0 left-0 h-[2px] w-1/3 bg-[#facc15] origin-left"
                    style={{ boxShadow: "0 0 12px rgba(250,204,21,0.5)" }}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <DetailPanel open={open} data={data} onClose={() => setOpen(false)} />
    </section>
  );
}
