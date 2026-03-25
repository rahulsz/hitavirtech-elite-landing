"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I went from basic SQL to deploying production Delta Lake pipelines at scale. Got placed at ₹18 LPA.",
    author: "Career Switcher",
    role: "Data Engineer @ Top Fintech",
    delay: 0,
  },
  {
    quote: "The Agentic AI module was mind-blowing. Learning LangGraph and Claude integration opened new doors.",
    author: "Tech Architect",
    role: "AI Lead @ Product Startup",
    delay: 0.2,
  },
  {
    quote: "HitaVirTech made it real. The capstone project went straight into my portfolio and got 4 offers.",
    author: "Batch 4 Student",
    role: "Sr. DE @ Global Bank",
    delay: 0.4,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="path" className="relative py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
              <h2 className="text-4xl sm:text-5xl font-display font-medium leading-[1.1] tracking-tight">
                Built by the <br />
                <span className="italic text-white/40">Success</span> of Our <br />
                <span className="accent-gradient bg-clip-text text-transparent">Practitioners</span>
              </h2>
              <p className="text-white/60 font-body text-lg leading-relaxed">
                We don't measure success by certificates, but by the impact our alumni create at the world's most innovative companies. 
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
               {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: t.delay, ease: [0.16, 1, 0.3, 1] }}
                    className={`p-10 rounded-[2.5rem] glass-v2 space-y-8 ${i === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <Quote className="w-8 h-8 text-accent-teal/40" />
                    <p className="text-2xl font-body leading-relaxed text-white/90">
                      "{t.quote}"
                    </p>
                    <div className="pt-8 border-t border-white/5 flex flex-col">
                       <span className="text-starlight font-display font-semibold tracking-wide">{t.author}</span>
                       <span className="text-[10px] text-muted tracking-widest uppercase mt-1">{t.role}</span>
                    </div>
                  </motion.div>
               ))}
            </div>
        </div>
      </div>
    </section>
  );
}
