"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  }

  function handleMouseLeave() {
    setTransform("");
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transform || "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)" }}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
}
