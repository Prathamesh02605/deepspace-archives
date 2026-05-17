import { motion } from "framer-motion";

/**
 * Sportsbrut-style section header: yellow chip tag + index + hard rule.
 */
export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 flex items-center gap-3"
    >
      {/* Yellow chip */}
      <span className="inline-flex items-center gap-2 bg-[#facc15] text-black font-mono text-[10px] uppercase tracking-[0.35em] px-3 py-1">
        <span className="h-1.5 w-1.5 bg-black" />
        {index}
      </span>

      {/* Glitch title */}
      <span
        data-text={title}
        className="glitch font-display font-black uppercase tracking-tight text-2xl md:text-3xl text-foreground"
      >
        {title}
      </span>

      <span className="h-px flex-1 bg-foreground/20" />
      <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40">
        SECTOR/{index}
      </span>
    </motion.div>
  );
}
