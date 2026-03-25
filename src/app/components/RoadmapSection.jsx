"use client";

import { motion } from "framer-motion";

const milestones = [
  { week: "01-02", title: "Cloud Foundations & Medallion Architecture", desc: "Mastering S3, ADLS, and GCS with Delta Lake transactions." },
  { week: "03-05", title: "Distributed Engineering with Spark", desc: "Optimization, broadcast joins, and Petabyte-scale processing." },
  { week: "06-07", title: "Real-time Streaming & Flink", desc: "Kafka Connect, Schema Registry, and stateful streaming." },
  { week: "08-09", title: "MLOps & Data Governance", desc: "Unity Catalog, Terraform, and automated CI/CD pipelines." },
  { week: "10-14", title: "Agentic AI & LLM Systems", desc: "LangGraph, RAG, Tool-calling, and Enterprise AI Agents." },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="relative py-48 px-6 bg-void z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <h2 className="text-5xl lg:text-6xl font-display font-medium leading-[0.9] tracking-tight text-starlight">
              The 14-Week <br />
              <span className="accent-gradient bg-clip-text text-transparent italic">Roadmap</span>
            </h2>
            <p className="mt-8 text-white/50 text-lg leading-relaxed max-w-xs font-body">
              A comprehensive leap from engineering fundamentals to state-of-the-art Agentic AI systems.
            </p>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-8">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative p-12 rounded-[2.5rem] glass-v2 border-white/5 hover:border-accent-teal/20 transition-all flex flex-col md:flex-row gap-8 md:items-center"
              >
                <div className="flex-shrink-0">
                  <span className="text-4xl font-display font-bold text-white/10 group-hover:text-accent-teal/30 transition-colors">
                    W{item.week}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-medium text-starlight">{item.title}</h3>
                  <p className="text-white/40 font-body leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
