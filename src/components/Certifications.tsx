import { motion } from "framer-motion";
import { ShieldCheck, Award } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { DetailPanel, type DetailPanelData } from "./DetailPanel";
import { useState } from "react";

type Cert = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  desc: string;
  bullets: string[];
};

const CERTS: Cert[] = [
  {
    id: "CRT-001",
    name: "React Advanced Patterns",
    issuer: "Frontend Masters",
    year: "2025",
    desc: "Deep dive into compound components, hooks design, performance and state machines.",
    bullets: ["Compound component architecture", "Render props vs hooks tradeoffs", "Memoization & profiling"],
  },
  {
    id: "CRT-002",
    name: "Motion Design for Web",
    issuer: "Self-study / Codrops",
    year: "2025",
    desc: "Choreography principles, easing curves, and timing crafted for cinematic interfaces.",
    bullets: ["Material vs cinematic easing", "Spring physics calibration", "Storyboard-driven motion"],
  },
  {
    id: "CRT-003",
    name: "TypeScript Foundations",
    issuer: "Total TypeScript",
    year: "2024",
    desc: "Strong typing patterns — generics, conditional types, and type-safe API boundaries.",
    bullets: ["Generics in real APIs", "Discriminated unions", "Zod-style runtime validation"],
  },
  {
    id: "CRT-004",
    name: "Creative Coding Lab",
    issuer: "Open Cohort",
    year: "2024",
    desc: "Generative visuals with canvas, WebGL and shaders — focused on aesthetic and intent.",
    bullets: ["GLSL shader basics", "Noise-driven composition", "Real-time interactivity"],
  },
];

export function Certifications() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<DetailPanelData | null>(null);

  const handleOpen = (c: Cert) => {
    setData({
      id: c.id,
      title: c.name,
      subtitle: "ACHIEVEMENT // BADGE",
      description: c.desc,
      bullets: c.bullets,
      meta: [
        { k: "ISSUER", v: c.issuer },
        { k: "YEAR", v: c.year },
        { k: "STATUS", v: "VERIFIED" },
      ],
      status: "VERIFIED",
    });
    setOpen(true);
  };

  return (
    <section id="certifications" className="relative py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="05" title="ACHIEVEMENTS" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTS.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => handleOpen(c)}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative text-left glass-panel glass-panel-hover corner-brackets p-6 noise-overlay overflow-hidden cursor-pointer"
              data-cursor-hover
            >
              {/* Badge shape */}
              <div className="absolute -top-10 -right-10 h-28 w-28 rotate-12 border-2 border-[#facc15]/40" />
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#facc15]/0 group-hover:bg-[#facc15]/20 blur-3xl transition-all duration-700" />

              <div className="flex items-start justify-between mb-5">
                <div className="h-12 w-12 grid place-items-center border border-[#facc15]/60 bg-[#facc15]/10 text-[#facc15] group-hover:bg-[#facc15] group-hover:text-black transition-all">
                  {i % 2 === 0 ? <ShieldCheck className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/40">
                  {c.id}
                </span>
              </div>

              <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#facc15] mb-1">
                {c.year}
              </div>
              <h3 className="font-display text-lg leading-tight text-foreground mb-1">
                {c.name}
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {c.issuer}
              </div>

              <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40 group-hover:text-[#facc15] transition-colors">
                <span className="h-px w-6 bg-current" />
                INSPECT
              </div>

              {/* Bottom accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.5, duration: 0.7 }}
                className="absolute bottom-0 left-0 h-[2px] w-full bg-[#facc15]/70 origin-left"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <DetailPanel open={open} data={data} onClose={() => setOpen(false)} />
    </section>
  );
}
