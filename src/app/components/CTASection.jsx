"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  return (
    <section id="batch" className="relative py-48 px-6 overflow-hidden z-20">
      {/* Dynamic Background Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-accent-teal/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="p-16 sm:p-24 rounded-[3.5rem] glass-v2 border-accent-teal/20 text-center space-y-12">
          
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block text-[10px] tracking-[0.4em] text-accent-teal font-medium uppercase"
            >
              Start Your Journey
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl sm:text-7xl lg:text-7xl font-display font-medium tracking-tight leading-[0.9]"
            >
              Ready to <br />
              <span className="accent-gradient bg-clip-text text-transparent italic px-4">Innovate?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted max-w-sm mx-auto font-body text-lg"
            >
              Join 500+ HitaVirTech alumni leading the future of intelligence.
            </motion.p>
          </div>

          {/* Fixed Button Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <a
              href="https://forms.gle/oG3bv8VPVK9CPHtB6"
              target="_blank"
              rel="noopener noreferrer"
              className="group h-16 px-12 flex items-center justify-center bg-starlight text-void font-display font-bold text-base tracking-wide rounded-full transition-all duration-500 hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Register for Batch 5
              <ArrowUpRight className="ml-3 w-5 h-5 group-hover:rotate-45 transition-transform" />
            </a>

            <a
              href="mailto:hitavirtech@gmail.com"
              className="h-16 px-10 flex items-center justify-center border border-white/10 glass-v2 text-white/70 font-display font-medium text-sm tracking-wide rounded-full hover:bg-white/5 hover:text-white transition-all underline-offset-8 hover:underline"
            >
              Talk to an Expert
            </a>
          </motion.div>

          <p className="text-[10px] text-dim tracking-widest uppercase">
            Limited seats available • Industry Certification Included
          </p>
        </div>
      </div>
    </section>
  );
}
