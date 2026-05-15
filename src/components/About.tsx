import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="01" title="IDENTITY" />

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h3 className="font-display text-3xl md:text-5xl leading-tight font-light">
              A student crafting <span className="text-gradient">digital experiences</span> at the intersection of <span className="text-[var(--cyan)]">code</span> and <span className="text-[var(--purple-glow)]">design</span>.
            </h3>
            <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Driven by curiosity for technology, futuristic interfaces, and modern
              digital craft. Constantly learning — exploring development, UI/UX,
              programming and the new wave of generative tools shaping tomorrow.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "FOCUS", v: "Web & UI" },
                { k: "BASED", v: "EARTH/IN" },
                { k: "STATUS", v: "LEARNING" },
              ].map((s) => (
                <div key={s.k} className="border-l border-[var(--cyan)]/40 pl-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.k}</div>
                  <div className="mt-1 font-display text-sm text-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative glass-panel glass-panel-hover corner-brackets p-8 noise-overlay overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--cyan)] border-l border-b border-[var(--cyan)]/40">
                PROFILE.SYS
              </div>
              <div className="space-y-4 mt-4">
                {[
                  ["NAME", "Prathamesh Khachane"],
                  ["ROLE", "Student / Developer"],
                  ["DOMAIN", "Frontend / UI"],
                  ["MODE", "Always shipping"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{k}</span>
                    <span className="font-display text-sm">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-1 w-full bg-border/40 overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-[var(--cyan)] to-[var(--primary)] animate-shimmer" />
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                SYSTEM INTEGRITY · 75%
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
