import { motion } from "framer-motion";
import { Github, Hexagon } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { DetailPanel, type DetailPanelData } from "./DetailPanel";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  desc: string;
  status: string;
  tags: string[];
  bullets: string[];
  long: string;
};

const PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    title: "Project Nebula",
    desc: "An exploratory interface concept blending cinematic motion with utility-driven UI.",
    status: "STANDBY",
    tags: ["React", "Framer Motion", "Tailwind"],
    long:
      "A speculative dashboard built to feel like a mission console — high information density meets cinematic flair. Motion is used as feedback, not decoration.",
    bullets: [
      "Custom HUD primitives and glassmorphic panels",
      "Spring-physics page transitions",
      "Editorial typography on a dense grid",
    ],
  },
  {
    id: "PRJ-002",
    title: "Vector Field",
    desc: "A study in generative grids, ambient motion, and reactive design systems.",
    status: "STANDBY",
    tags: ["WebGL", "GLSL", "Generative"],
    long:
      "An ambient generative scene driven by mouse + audio input. Built to explore how a design system can flex with environmental data instead of static states.",
    bullets: [
      "Custom GLSL fragment shaders",
      "Mouse-reactive flow fields",
      "Token-driven palette presets",
    ],
  },
  {
    id: "PRJ-003",
    title: "Signal//Noise",
    desc: "Reserved for upcoming work — a future experiment in audio-reactive visuals.",
    status: "INCOMING",
    tags: ["Web Audio", "Canvas", "R&D"],
    long:
      "Upcoming research piece exploring real-time audio analysis driving editorial type and brutalist geometry — Sportsbrut energy collides with synesthetic visuals.",
    bullets: [
      "FFT-driven type distortion",
      "Beat-locked editorial layouts",
      "Latency-tuned visual feedback loop",
    ],
  },
  {
    id: "PRJ-004",
    title: "Operator Console",
    desc: "A tactical control panel concept inspired by sci-fi UIs and mission-control telemetry.",
    status: "ACTIVE",
    tags: ["Next.js", "Three.js", "HUD"],
    long:
      "A modular command-center interface — every widget is a reusable telemetry primitive. Designed for dense readability without visual fatigue.",
    bullets: [
      "Composable telemetry widgets",
      "Three.js mini-scenes inside cards",
      "Keyboard-first navigation model",
    ],
  },
  {
    id: "PRJ-005",
    title: "Glitchwave",
    desc: "An editorial brand site exploring brutalist typography and glitch-driven motion.",
    status: "STANDBY",
    tags: ["GSAP", "Editorial", "Brand"],
    long:
      "Concept brand site for an imagined creative collective. Pushes Sportsbrut-style typography to its limit with engineered glitch passes and split-text reveals.",
    bullets: [
      "Hand-tuned glitch shader on display type",
      "Split-text scroll choreography",
      "Cursor-tracked magnetic CTAs",
    ],
  },
  {
    id: "PRJ-006",
    title: "Holosphere",
    desc: "A spatial portfolio experiment — orbiting 3D thumbnails around an interactive core.",
    status: "INCOMING",
    tags: ["R3F", "Spatial", "WebGL"],
    long:
      "Experimental gallery layout where content lives in 3D space. You navigate by gesture and gaze instead of scroll, blending portfolio with simulation.",
    bullets: [
      "React Three Fiber orbit system",
      "Inertia-based gesture navigation",
      "Depth-based content prioritization",
    ],
  },
];

export function Projects() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DetailPanelData | null>(null);

  const handleOpen = (p: Project) => {
    setData({
      id: p.id,
      title: p.title,
      subtitle: "ARCHIVE // CASE FILE",
      description: p.long,
      bullets: p.bullets,
      tags: p.tags,
      meta: [
        { k: "STATUS", v: p.status },
        { k: "CODE", v: p.id },
        { k: "STACK", v: p.tags[0] ?? "—" },
      ],
      status: p.status,
    });
    setOpen(true);
  };

  return (
    <section id="projects" className="relative py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="04" title="ARCHIVE" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
                  <button
                    type="button"
                    onClick={() => handleOpen(p)}
                    className="flex items-center gap-2 px-3 py-2 border border-[#facc15]/50 hover:bg-[#facc15] hover:text-black text-xs font-mono uppercase tracking-[0.2em] transition-colors"
                  >
                    <span className="h-1.5 w-1.5 bg-[#facc15] group-hover:bg-black" />
                    DETAILS
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 border border-border hover:border-[var(--cyan)] text-xs font-mono uppercase tracking-[0.2em] transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    CODE
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <DetailPanel open={open} data={data} onClose={() => setOpen(false)} />
    </section>
  );
}
