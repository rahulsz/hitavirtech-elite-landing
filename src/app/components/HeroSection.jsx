"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MotionBackground from "./MotionBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-6 overflow-hidden pt-32">
      <MotionBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-start lg:grid lg:grid-cols-12 gap-12">
          
          {/* Main Typography */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4"
            >
              <span className="inline-block py-1 px-3 border border-accent-teal/20 bg-accent-teal/5 text-accent-teal text-[10px] tracking-[0.3em] font-medium uppercase rounded-full">
                Next Cohort: April 5, 2026
              </span>
              <span className="inline-block py-1 px-3 border border-red-500/20 bg-red-500/5 text-red-400 text-[10px] tracking-[0.3em] font-medium uppercase rounded-full animate-pulse">
                73% Seats Filled
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] sm:text-[8vw] lg:text-[6.5vw] font-display font-medium leading-[0.9] tracking-[-0.04em] text-starlight"
            >
              Master the <br />
              <span className="italic font-light text-white/90">Data & AI</span> <br />
              <span className="accent-gradient bg-clip-text text-transparent">Stack That Leads</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-lg sm:text-xl text-muted max-w-xl font-body leading-relaxed"
            >
              A transformative 16-week program for builders, architects, and visionaries. 
              Bridging the gap between theory and world-class engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              <a
                href="https://forms.gle/oG3bv8VPVK9CPHtB6"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-14 px-10 flex items-center justify-center bg-starlight text-void font-display font-bold text-sm tracking-wide rounded-full transition-transform duration-500 hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10">Enroll in Batch 5</span>
                <div className="absolute inset-0 bg-accent-teal translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <ArrowUpRight className="ml-2 w-4 h-4 relative z-10 transition-transform duration-500 group-hover:rotate-45" />
              </a>

              <button className="h-14 px-8 flex items-center justify-center border border-white/10 glass-v2 text-white/80 font-display font-medium text-sm tracking-wide rounded-full hover:bg-white/5 hover:text-white transition-all">
                Curriculum Details
              </button>
            </motion.div>
          </div>

          {/* Right side stats/details */}
          <div className="hidden lg:flex lg:col-span-4 flex-col justify-end pb-12">
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="p-8 glass-v2 rounded-[2rem] space-y-8"
             >
                <div>
                  <div className="text-accent-teal text-4xl font-display font-bold">500+</div>
                  <div className="text-[10px] text-muted tracking-widest uppercase mt-1">Global Alumni</div>
                </div>
                <div>
                  <div className="text-starlight text-4xl font-display font-bold">16w</div>
                  <div className="text-[10px] text-muted tracking-widest uppercase mt-1">Live Immersion</div>
                </div>
                <div className="pt-4 border-t border-white/5">
                   <p className="text-xs text-dim italic font-body">
                     "The standard for Data Engineering training in India." — Alumni Review
                   </p>
                </div>
             </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[8px] uppercase tracking-[0.3em]">Scroll</span>
      </motion.div>
    </section>
  );
}
