"use client";

import * as m from "framer-motion/m";
import { useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mousePosition.x, springConfig);
  const smoothY = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    if (isMounted) {
      smoothX.set(mousePosition.x);
      smoothY.set(mousePosition.y);
    }
  }, [mousePosition, smoothX, smoothY, isMounted]);

  if (!isMounted) return <div className="fixed inset-0 z-[-1] bg-gray-50 dark:bg-gray-950" />;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <m.div
        className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/20 dark:bg-indigo-600/15 blur-[120px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
