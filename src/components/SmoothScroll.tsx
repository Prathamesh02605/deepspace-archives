import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      lerp: 0.075,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Anchor links integration
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const a = t.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id) {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.45 });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -40, duration: 1.45 });
      }
    };
    const onScrollTop = () => lenis.scrollTo(0, { duration: 1.45 });
    document.addEventListener("click", onClick);
    window.addEventListener("pk-scroll-top", onScrollTop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      window.removeEventListener("pk-scroll-top", onScrollTop);
      lenis.destroy();
    };
  }, []);

  return null;
}
