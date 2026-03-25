"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Programs", href: "#stack" },
  { name: "Curriculum", href: "#courses" },
  { name: "Success Stories", href: "#path" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-starlight flex items-center justify-center text-void font-bold text-xs transition-transform duration-500 group-hover:rotate-[360deg]">HV</div>
          <span className="text-xl font-display font-bold tracking-tighter">HitaVirTech</span>
        </motion.div>

        {/* Desktop Links - Pill style */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`hidden md:flex items-center gap-1 p-1 rounded-full transition-all duration-500 ${scrolled ? "glass-v2 shadow-2xl" : "bg-transparent"}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 py-2.5 rounded-full text-[10px] tracking-[0.2em] font-medium uppercase text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              {link.name}
            </a>
          ))}
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            href="https://forms.gle/oG3bv8VPVK9CPHtB6"
            target="_blank"
            className="hidden sm:flex h-11 px-6 items-center justify-center bg-accent-teal text-void font-display font-bold text-[10px] tracking-[0.1em] uppercase rounded-full hover:scale-105 active:scale-95 transition-transform"
          >
            Apply Now
            <ArrowUpRight className="ml-2 w-3 h-3" />
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center glass-v2 rounded-full text-starlight"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 p-8 glass-v2 rounded-[2.5rem] md:hidden pointer-events-auto shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-display font-medium text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 border-t border-white/10">
                 <a
                    href="https://forms.gle/oG3bv8VPVK9CPHtB6"
                    className="h-14 w-full flex items-center justify-center bg-starlight text-void font-display font-bold text-base rounded-full"
                  >
                    Enroll in Batch 5
                  </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
