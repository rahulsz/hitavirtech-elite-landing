"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Rocket, Target, Users, Layout } from "lucide-react";

const features = [
  {
    title: "12+ Production Projects",
    desc: "Build a professional portfolio including Medallion architecture, RAG pipelines, and cross-cloud ELT sync.",
    icon: <Layout className="w-6 h-6 text-accent-teal" />,
    size: "lg"
  },
  {
    title: "92% Placement Rate",
    desc: "Alumni working at top fintech, FAANG, and AI labs globally.",
    icon: <Target className="w-6 h-6 text-accent-purple" />,
    size: "md"
  },
  {
    title: "Elite Mentorship",
    desc: "Learn from senior architects with 10+ years of enterprise experience.",
    icon: <Users className="w-6 h-6 text-accent-blue" />,
    size: "md"
  },
  {
    title: "Agentic AI First",
    desc: "Move beyond simple RAG. Build actual AI agents with LangGraph and tool-calling capabilities.",
    icon: <Zap className="w-6 h-6 text-accent-teal" />,
    size: "lg"
  }
];

export default function BentoGrid() {
  return (
    <section id="courses" className="relative py-48 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight">
            The <span className="accent-gradient bg-clip-text text-transparent italic">Elite</span> <br />
            Practitioner Standard
          </h2>
          <p className="text-white/60 max-w-xl font-body text-lg leading-relaxed">
            HitaVirTech isn't a bootcamp. It's a residency. We translate complex cloud 
            infrastructure into functional, high-performance engineering prowess.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 rounded-[2.5rem] glass-v2 border-white/5 hover:border-accent-teal/20 transition-all group ${
                feature.size === "lg" ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent-teal/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-display font-medium text-starlight mb-4">{feature.title}</h3>
              <p className="text-white/40 font-body leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
