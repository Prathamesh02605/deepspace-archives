import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Palette, Terminal, Sparkles } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { DetailPanel, type DetailPanelData } from "./DetailPanel";
import type { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

type Skill = {
  icon: LucideIcon;
  title: string;
  level: number;
  tags: string[];
  blurb: string;
  bullets: string[];
};

const SKILLS: Skill[] = [
  {
    icon: Code2,
    title: "Web Development",
    level: 78,
    tags: ["React", "Next.js", "Tailwind"],
    blurb:
      "Crafting fast, accessible interfaces with modern frameworks — focused on component systems, motion, and performance.",
    bullets: [
      "Component-driven architecture in React 19 + TanStack",
      "Tailwind utility design systems & tokenized themes",
      "Edge-rendered apps deployed to Cloudflare Workers",
      "Server functions, RPC patterns, type-safe routing",
    ],
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    level: 70,
    tags: ["Figma", "Motion", "Systems"],
    blurb:
      "Designing interfaces that feel cinematic and intentional — driven by hierarchy, motion, and detail.",
    bullets: [
      "High-fidelity prototypes in Figma with auto-layout",
      "Motion choreography using Framer Motion / GSAP",
      "Design tokens, theming, and accessibility audits",
      "Editorial typography and grid systems",
    ],
  },
  {
    icon: Terminal,
    title: "Programming",
    level: 72,
    tags: ["TypeScript", "Python", "Logic"],
    blurb:
      "Strongly-typed problem solving across web and scripting — building tools that automate the boring stuff.",
    bullets: [
      "TypeScript-first APIs and library design",
      "Python scripting for data and automation",
      "Algorithmic problem solving",
      "Clean Git workflows and code review",
    ],
  },
  {
    icon: Sparkles,
    title: "Learning & Exploration",
    level: 92,
    tags: ["AI", "3D", "Future Tech"],
    blurb:
      "Always exploring the new wave — generative AI, real-time 3D, and tomorrow's interaction paradigms.",
    bullets: [
      "Hands-on with LLM tooling and prompt engineering",
      "WebGL / Three.js for real-time scenes",
      "Generative motion + creative coding experiments",
      "Reading research papers and dev journals weekly",
    ],
  },
];

function SkillCard({
  s,
  i,
  onOpen,
}: {
  s: Skill;
  i: number;
  onOpen: (s: Skill, i: number) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });

  const handle = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  const Icon = s.icon;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={reset}
      onClick={() => onOpen(s, i)}
      type="button"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-panel glass-panel-hover corner-brackets p-7 noise-overlay overflow-hidden text-left cursor-pointer"
      data-cursor-hover
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--primary)]/0 group-hover:bg-[var(--primary)]/20 blur-3xl transition-all duration-700" />

      <div className="flex items-start justify-between mb-6">
        <div className="h-12 w-12 grid place-items-center border border-[var(--cyan)]/40 bg-[var(--cyan)]/5 text-[var(--cyan)] group-hover:glow-cyan transition-all">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          0{i + 1} / 0{SKILLS.length}
        </span>
      </div>

      <h3 className="font-display text-xl mb-2">{s.title}</h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {s.tags.map((t) => (
          <span key={t} className="font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 border border-border text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>PROFICIENCY</span>
          <span className="text-[var(--cyan)]">{s.level}%</span>
        </div>
        <div className="h-px w-full bg-border overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${s.level}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 + 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-[var(--cyan)] via-[var(--primary)] to-[var(--purple-glow)]"
            style={{ boxShadow: "0 0 8px oklch(0.72 0.18 230)" }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-[#facc15] opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="h-px w-6 bg-[#facc15]" />
        TAP TO EXPAND
      </div>
    </motion.button>
  );
}

export function Skills() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DetailPanelData | null>(null);

  const handleOpen = (s: Skill, i: number) => {
    setData({
      id: `CAP-${String(i + 1).padStart(3, "0")}`,
      title: s.title,
      subtitle: "CAPABILITY // DETAIL",
      description: s.blurb,
      bullets: s.bullets,
      tags: s.tags,
      meta: [
        { k: "PROFICIENCY", v: `${s.level}%` },
        { k: "INDEX", v: `0${i + 1} / 0${SKILLS.length}` },
        { k: "STATUS", v: "ACTIVE" },
      ],
      status: "ACTIVE",
    });
    setOpen(true);
  };

  return (
    <section id="skills" className="relative py-20 md:py-24 px-5 md:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="02" title="CAPABILITIES" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((s, i) => <SkillCard key={s.title} s={s} i={i} onOpen={handleOpen} />)}
        </div>
      </div>

      <DetailPanel open={open} data={data} onClose={() => setOpen(false)} />
    </section>
  );
}
