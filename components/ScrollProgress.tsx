"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] h-[2px] w-full origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "var(--pink)",
        boxShadow: "0 0 8px var(--pink)",
      }}
    />
  );
}