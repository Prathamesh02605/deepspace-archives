import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Palette, Terminal, Sparkles } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

const SKILLS: { icon: LucideIcon; title: string; level: number; tags: string[] }[] = [
  { icon: Code2, title: "Web Development", level: 78, tags: ["React", "Next.js", "Tailwind"] },
  { icon: Palette, title: "UI / UX Design", level: 70, tags: ["Figma", "Motion", "Systems"] },
  { icon: Terminal, title: "Programming", level: 72, tags: ["TypeScript", "Python", "Logic"] },
  { icon: Sparkles, title: "Learning & Exploration", level: 92, tags: ["AI", "3D", "Future Tech"] },
];

function SkillCard({ s, i }: { s: typeof SKILLS[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
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
    <motion.div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-panel glass-panel-hover corner-brackets p-7 noise-overlay overflow-hidden"
      data-cursor-hover
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--primary)]/0 group-hover:bg-[var(--primary)]/20 blur-3xl transition-all duration-700" />

      <div className="flex items-start justify-between mb-6">
        <div className="h-12 w-12 grid place-items-center border border-[var(--cyan)]/40 bg-[var(--cyan)]/5 text-[var(--cyan)] group-hover:glow-cyan transition-all">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          0{i + 1} / 04
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
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="02" title="CAPABILITIES" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((s, i) => <SkillCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
