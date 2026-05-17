import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { Scene3D } from "./Scene3D";
import { MagneticButton } from "./MagneticButton";

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
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* WebGL scene right side */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] pointer-events-none">
        <div className="relative h-full w-full">
          <Scene3D />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent lg:from-background/95 lg:via-background/30" />
        </div>
      </div>

      {/* Soft orbs */}
      <motion.div
        style={{ x: tx1, y: ty1 }}
        className="absolute top-[15%] right-[10%] h-72 w-72 rounded-full bg-[var(--primary)]/15 blur-3xl"
      />
      <motion.div
        style={{ x: tx2, y: ty2 }}
        className="absolute bottom-[10%] left-[5%] h-96 w-96 rounded-full bg-[var(--purple-glow)]/15 blur-3xl"
      />

      {/* Repeating outlined text backdrop — sportsbrut/St-Louis-City style */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-1 overflow-hidden opacity-[0.07] select-none"
        style={{
          WebkitTextStroke: "1px currentColor",
          color: "var(--foreground)",
        }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? "-3%" : "3%" }}
            animate={{ x: i % 2 === 0 ? ["-3%", "0%", "-3%"] : ["3%", "0%", "3%"] }}
            transition={{ duration: 14 + i, repeat: Infinity, ease: "easeInOut" }}
            className="font-display font-black uppercase tracking-tighter text-[9rem] leading-[0.85] whitespace-nowrap text-transparent"
          >
            KHACHANE&nbsp;KHACHANE&nbsp;KHACHANE&nbsp;KHACHANE
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 w-full pt-32 pb-20 z-10">
        {/* Top label — yellow chip + bracketed status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 bg-[#facc15] text-black font-mono text-[10px] uppercase tracking-[0.3em] px-3 py-1">
            <span className="h-1.5 w-1.5 bg-black animate-pulse" />
            PORTFOLIO / 2026
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/50">
            [ OPERATOR_ONLINE ]
          </span>
          <span className="h-px w-12 bg-foreground/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/40">
            LAT 19.07° / LON 72.87°
          </span>
        </motion.div>

        {/* Headline — bold black sportsbrut with glitch */}
        <h1 className="font-display font-black leading-[0.85] tracking-[-0.03em] uppercase">
          <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            data-text="PRATHAMESH"
            className="glitch block text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] text-foreground"
          >
            PRATHAMESH
          </motion.span>
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.7, 0, 0.25, 1] }}
            className="block"
          >
            <span
              data-text="KHACHANE"
              className="glitch text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] text-[#facc15]"
              style={{ textShadow: "4px 4px 0 rgba(0,0,0,0.85)" }}
            >
              KHACHANE
            </span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 max-w-xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[var(--cyan)]" />
            <span className="font-label text-xs uppercase text-[var(--cyan)]">STUDENT // CREATOR</span>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            Building immersive digital experiences through creativity and technology.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="magnetic-btn group relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-[var(--primary)] text-primary-foreground font-mono text-xs uppercase tracking-[0.25em] hover:shadow-[0_0_50px_oklch(0.72_0.18_230/0.7)]"
          >
            <span className="relative z-10">EXPLORE</span>
            <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="magnetic-btn group relative flex items-center gap-3 px-8 py-4 border border-[var(--cyan)]/40 text-foreground font-mono text-xs uppercase tracking-[0.25em] hover:border-[var(--cyan)] hover:bg-[var(--cyan)]/5"
          >
            <span>VIEW PROJECTS</span>
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="magnetic-btn group relative flex items-center gap-3 px-8 py-4 border border-border hover:border-[var(--cyan)] text-foreground font-mono text-xs uppercase tracking-[0.25em] hover:bg-[var(--cyan)]/5"
          >
            <Mail className="h-4 w-4" />
            <span>CONTACT</span>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-label text-[10px] uppercase text-muted-foreground"
        >
          <span>SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown className="h-4 w-4 text-[var(--cyan)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
