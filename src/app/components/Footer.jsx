"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pt-32 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Cinematic Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24 border-b border-white/5">
           
           <div className="lg:col-span-5 space-y-12">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-accent-teal flex items-center justify-center text-void font-bold text-sm">HV</div>
                 <span className="text-3xl font-display font-bold tracking-tight">HitaVirTech</span>
              </div>
              
              <h4 className="text-3xl sm:text-5xl font-display font-medium leading-tight text-white/50">
                 Defining the <br />
                 <span className="text-starlight italic font-light">Intellectual Frontier</span>
              </h4>

              <div className="flex gap-4 items-center">
                 <a href="mailto:hitavirtech@gmail.com" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-accent-teal hover:border-accent-teal/50 transition-all duration-500">
                    <Mail size={18} />
                 </a>
                 <a href="https://linkedin.com" target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-accent-teal hover:border-accent-teal/50 transition-all duration-500">
                    <LinkedinLogo />
                 </a>
              </div>
           </div>

           <div className="lg:col-span-1 hidden lg:block" />

           <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-6">
                 <span className="text-[10px] tracking-[0.3em] font-medium text-white/20 uppercase">Courses</span>
                 <ul className="space-y-4">
                    {["Data Engineering", "PySpark Deep Dive", "Agentic AI"].map(l => (
                       <li key={l}><a href="#" className="font-body text-sm text-dim hover:text-white transition-colors uppercase tracking-widest font-light">{l}</a></li>
                    ))}
                 </ul>
              </div>

              <div className="space-y-6">
                 <span className="text-[10px] tracking-[0.3em] font-medium text-white/20 uppercase">Company</span>
                 <ul className="space-y-4">
                    {["About Us", "Curriculum", "Alumni"].map(l => (
                       <li key={l}><a href="#" className="font-body text-sm text-dim hover:text-white transition-colors uppercase tracking-widest font-light">{l}</a></li>
                    ))}
                 </ul>
              </div>

              <div className="space-y-6 col-span-2 sm:col-span-1">
                 <span className="text-[10px] tracking-[0.3em] font-medium text-white/20 uppercase">Social</span>
                 <ul className="space-y-4">
                    {["LinkedIn", "YouTube", "Discord"].map(l => (
                       <li key={l}><a href="#" className="font-body text-sm text-dim hover:text-white transition-colors uppercase tracking-widest font-light">{l}</a></li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>

        {/* Cinematic Bottom Branding */}
        <div className="pt-24 flex flex-col items-center justify-center text-center space-y-12">
           <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[12vw] font-display font-bold leading-none tracking-tighter text-white/[0.03] select-none uppercase"
           >
              HitaVirTech
           </motion.h2>

           <div className="flex flex-col sm:flex-row justify-between w-full pt-12 border-t border-white/5 gap-6">
              <span className="text-[10px] text-white/40 tracking-widest uppercase">© 2026 HitaVirTech Industries.</span>
              <span className="text-[10px] text-white/30 tracking-widest uppercase flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
                 Building the Future of Intelligence
              </span>
           </div>
        </div>
      </div>
    </footer>
  );
}

function LinkedinLogo() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}
