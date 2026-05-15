import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const tx1 = useTransform(sx, (v) => v * 30);
  const ty1 = useTransform(sy, (v) => v * 30);
  const tx2 = useTransform(sx, (v) => v * -20);
  const ty2 = useTransform(sy, (v) => v * -20);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Floating geometric orbs */}
      <motion.div
        style={{ x: tx1, y: ty1 }}
        className="absolute top-[15%] right-[10%] h-72 w-72 rounded-full bg-[var(--primary)]/15 blur-3xl"
      />
      <motion.div
        style={{ x: tx2, y: ty2 }}
        className="absolute bottom-[10%] left-[5%] h-96 w-96 rounded-full bg-[var(--purple-glow)]/15 blur-3xl"
      />

      {/* Rotating ring decoration */}
      <motion.div
        style={{ x: tx1, y: ty1 }}
        className="absolute top-1/2 right-[6%] -translate-y-1/2 hidden lg:block"
      >
        <div className="relative h-[420px] w-[420px]">
          <div className="absolute inset-0 rounded-full border border-[var(--primary)]/20 animate-spin-slow" />
          <div className="absolute inset-8 rounded-full border border-dashed border-[var(--cyan)]/30 animate-spin-reverse" />
          <div className="absolute inset-20 rounded-full border border-[var(--purple-glow)]/20 animate-spin-slow" />
          <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[var(--cyan)] glow-cyan">
            <span className="absolute inset-0 rounded-full bg-[var(--cyan)] animate-pulse-ring" />
          </div>
          {/* Tick marks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-0 h-3 w-px bg-[var(--cyan)]/40 origin-bottom"
              style={{ transform: `translateX(-50%) rotate(${i * 30}deg) translateY(0)`, transformOrigin: "50% 210px" }}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 w-full pt-32 pb-20">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--cyan)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
          <span>PORTFOLIO // 2026</span>
          <span className="h-px w-12 bg-[var(--cyan)]/50" />
          <span className="text-muted-foreground">OPERATOR ONLINE</span>
        </motion.div>

        {/* Headline — staggered */}
        <h1 className="font-display font-light leading-[0.9] tracking-tight">
          {"PRATHAMESH".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4 + i * 0.04, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]"
            >
              {c}
            </motion.span>
          ))}
          <br />
          <span className="text-gradient">
            {"KHACHANE".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.8 + i * 0.04, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]"
              >
                {c}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 max-w-xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--cyan)]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--cyan)]">STUDENT</span>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Building the future through technology and creativity.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden flex items-center gap-3 px-7 py-4 bg-[var(--primary)] text-primary-foreground font-mono text-xs uppercase tracking-[0.25em] transition-all hover:shadow-[0_0_40px_oklch(0.72_0.18_230/0.7)]"
          >
            <span className="relative z-10">EXPLORE</span>
            <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[var(--cyan)] to-[var(--primary)] transition-transform duration-500" />
          </a>
          <a
            href="#contact"
            className="group relative flex items-center gap-3 px-7 py-4 border border-[var(--cyan)]/40 text-foreground font-mono text-xs uppercase tracking-[0.25em] transition-all hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/5"
          >
            <Mail className="h-4 w-4" />
            <span>CONTACT</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ArrowDown className="h-4 w-4 text-[var(--cyan)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
