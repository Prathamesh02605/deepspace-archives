import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[100] hidden md:block"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.3 }}
      >
        <div className="h-3 w-3 rounded-full bg-[var(--cyan)] glow-cyan" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[99] hidden md:block"
        animate={{
          x: pos.x - 24,
          y: pos.y - 24,
          scale: hovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.6 }}
      >
        <div className="h-12 w-12 rounded-full border border-[var(--primary)]/60 glow-primary" />
      </motion.div>
    </>
  );
}
