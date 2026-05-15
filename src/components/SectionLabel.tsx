import { motion } from "framer-motion";

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-12 flex items-center gap-4"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--cyan)]">
        {index}
      </span>
      <span className="h-px w-12 bg-[var(--cyan)]/50" />
      <h2 className="font-display text-xs uppercase tracking-[0.4em] text-muted-foreground">
        {title}
      </h2>
    </motion.div>
  );
}
