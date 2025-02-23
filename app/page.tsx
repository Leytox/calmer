"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const stages = {
  inhale: {
    name: "in",
    duration: 3,
  },
  hold: {
    name: "hold",
    duration: 7,
  },
  exhale: {
    name: "out",
    duration: 3,
  },
};

const sequence = [stages.inhale, stages.hold, stages.exhale, stages.hold];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const state = sequence[currentIndex];
  const isExpanded = currentIndex < 2;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % sequence.length);
    }, state.duration * 1000);
    return () => clearTimeout(timer);
  }, [currentIndex, state.duration]);

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <motion.div
        className="absolute w-full h-full bg-gradient-to-b from-blue-500 to-blue-600"
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? "100%" : "0%" }}
        transition={{ duration: state.duration, ease: "linear" }}
      />

      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-9xl relative z-10"
        >
          {state.name}
        </motion.h1>
      </AnimatePresence>
    </main>
  );
}
