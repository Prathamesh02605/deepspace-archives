import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

export function ScrollToTop() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setShow(v > 600);
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] group"
          data-cursor-hover
        >
          {/* Corner brackets */}
          <span className="absolute -inset-1 pointer-events-none">
            {[
              "top-0 left-0 border-t-2 border-l-2",
              "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((c, i) => (
              <span
                key={i}
                className={`absolute h-2.5 w-2.5 border-[#facc15] ${c}`}
              />
            ))}
          </span>

          <div
            className="relative h-12 w-12 md:h-14 md:w-14 grid place-items-center bg-background border border-[#facc15]/60 text-[#facc15] group-hover:bg-[#facc15] group-hover:text-black transition-colors"
            style={{ boxShadow: "0 0 24px -6px rgba(250,204,21,0.45)" }}
          >
            <ArrowUp className="h-5 w-5" />
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.3em] bg-background px-1.5 text-[#facc15]">
              TOP
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
