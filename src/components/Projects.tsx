import { motion } from "framer-motion";
import { Github, ExternalLink, Hexagon } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const PROJECTS = [
  { id: "PRJ-001", title: "Project Nebula", desc: "An exploratory interface concept blending cinematic motion with utility-driven UI.", status: "STANDBY" },
  { id: "PRJ-002", title: "Vector Field", desc: "A study in generative grids, ambient motion, and reactive design systems.", status: "STANDBY" },
  { id: "PRJ-003", title: "Signal//Noise", desc: "Reserved for upcoming work — a future experiment in audio-reactive visuals.", status: "INCOMING" },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="03" title="ARCHIVE" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group relative glass-panel glass-panel-hover corner-brackets overflow-hidden"
              data-cursor-hover
            >
              {/* Visual */}
              <div className="relative aspect-[4/3] overflow-hidden border-b border-border/50 noise-overlay">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/30 via-[var(--purple-glow)]/15 to-[var(--cyan)]/20 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 grid place-items-center">
                  <Hexagon
                    className="h-24 w-24 text-[var(--cyan)]/40 transition-all duration-700 group-hover:scale-110 group-hover:text-[var(--cyan)]"
                    style={{ filter: "drop-shadow(0 0 12px oklch(0.85 0.16 195 / 0.5))" }}
                  />
                </div>
                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)] bg-background/40 px-2 py-1 backdrop-blur">
                  {p.id}
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground bg-background/40 px-2 py-1 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
                  {p.status}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl mb-2 group-hover:text-gradient transition-all">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.desc}</p>

                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-2 border border-border hover:border-[var(--cyan)] text-xs font-mono uppercase tracking-[0.2em] transition-colors">
                    <Github className="h-3.5 w-3.5" />
                    CODE
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-border hover:border-[var(--cyan)] text-xs font-mono uppercase tracking-[0.2em] transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />
                    LIVE
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
