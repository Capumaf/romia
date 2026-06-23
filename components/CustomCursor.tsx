"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);

  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
  setIsMobile(window.innerWidth < 1024);
}, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setDot({ x: e.clientX, y: e.clientY });
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) setHovering(true);
      else setHovering(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Dot — follows instantly */}
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "var(--pink)",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ left: dot.x, top: dot.y }}
        transition={{ duration: 0, ease: "linear" }}
      />

      {/* Ring — follows with lag */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full border"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderColor: "var(--pink-line)",
          translateX: "-50%",
          translateY: "-50%",
          transition: "width 0.2s ease, height 0.2s ease",
        }}
        animate={{ left: dot.x, top: dot.y }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </>
  );
}