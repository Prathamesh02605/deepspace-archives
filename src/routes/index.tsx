import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AmbientBackground } from "@/components/AmbientBackground";
import { HolographicOverlay } from "@/components/HolographicOverlay";
import { CursorGlow } from "@/components/CursorGlow";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prathamesh Khachane — Student / Developer" },
      { name: "description", content: "Cinematic futuristic portfolio of Prathamesh Khachane — building the future through technology and creativity." },
      { property: "og:title", content: "Prathamesh Khachane — Portfolio" },
      { property: "og:description", content: "Cinematic futuristic portfolio: development, UI/UX and exploration." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <CursorGlow />
      <AmbientBackground />
      {loaded && <HolographicOverlay />}
      {loaded && <SmoothScroll />}

      {loaded && (
        <motion.main
          initial={{ opacity: 0, filter: "blur(20px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Nav />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </motion.main>
      )}
    </>
  );
}
