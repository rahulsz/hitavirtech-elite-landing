"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, Rocket, X } from "lucide-react";

const programs = [
  {
    icon: Sparkles,
    title: "Data Engineering",
    type: "Flagship Residency",
    summary: "Master Spark, Delta Lake and Cloud architectures at production scale.",
    duration: "16 Weeks",
    featured: true,
    details: [
      "Delta Lake with ACID transactions, Z-Ordering & Schema Evolution",
      "PySpark — Broadcast Joins, Window Functions & Streaming",
      "Apache Kafka — Schema Registry & Real-time Pipelines",
      "Medallion Architecture (Bronze → Silver → Gold)",
      "dbt for SQL Transformations & Data Lineage",
      "Airflow Orchestration (MWAA / Astronomer)",
      "12+ production projects with Supply Chain domain"
    ]
  },
  {
    icon: Flame,
    title: "Advanced PySpark",
    type: "Intensive Deep Dive",
    summary: "Performance tuning and internals for high-performance computing.",
    duration: "8 Weeks",
    featured: false,
    details: [
      "Spark Internals — DAG Scheduler, Catalyst Optimizer",
      "Memory Management & Tungsten Engine",
      "Adaptive Query Execution (AQE) strategies",
      "Partitioning, Bucketing & Data Skew solutions",
      "Structured Streaming with exactly-once semantics",
      "Performance benchmarking & profiling tools"
    ]
  },
  {
    icon: Rocket,
    title: "Agentic AI",
    type: "Edge Specialization",
    summary: "Building autonomous systems with LangGraph and RAG orchestration.",
    duration: "6 Weeks",
    featured: false,
    details: [
      "Amazon Bedrock — Claude 3.5 & Llama Foundation Models",
      "OpenAI Assistants API & Function Calling",
      "Multi-agent Orchestration with LangGraph",
      "Vector Databases — Pinecone, Milvus, Weaviate",
      "Production-grade RAG with Reranking pipelines",
      "Tool-calling AI Agents for enterprise workflows"
    ]
  },
];

export default function ProgramsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="stack" className="relative py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="program-card-wrapper rounded-[3rem] p-[2px]"
              style={{
                background: p.featured 
                  ? "linear-gradient(135deg, #00FFD5, #A855F7, #3B82F6)" 
                  : "rgba(255,255,255,0.05)"
              }}
            >
              <div className="h-full w-full bg-void rounded-[2.9rem] p-12 flex flex-col justify-between space-y-12 group hover:bg-white/[0.02] transition-colors duration-500">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.08] group-hover:border-accent-teal/30 transition-colors">
                    <p.icon className="w-6 h-6 text-accent-teal" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest text-muted uppercase font-body">{p.type}</span>
                    <h3 className="text-3xl font-display font-semibold tracking-tight">{p.title}</h3>
                  </div>
                  <p className="text-muted font-body leading-relaxed">{p.summary}</p>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="text-starlight font-display font-medium text-lg">{p.duration}</span>
                  <button 
                    onClick={() => setSelected(selected === i ? null : i)}
                    className="text-[10px] uppercase tracking-widest text-accent-teal border-b border-accent-teal pb-1 hover:text-starlight hover:border-starlight transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Details Panel — Full-width below cards */}
        <AnimatePresence>
          {selected !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="glass-v2 rounded-[2.5rem] p-12 relative">
                <button 
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white/40" />
                </button>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center">
                    {(() => { const Icon = programs[selected].icon; return <Icon className="w-5 h-5 text-accent-teal" />; })()}
                  </div>
                  <div>
                    <h4 className="text-2xl font-display font-semibold">{programs[selected].title}</h4>
                    <span className="text-[10px] tracking-widest text-white/30 uppercase">{programs[selected].duration} • {programs[selected].type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {programs[selected].details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                    >
                      <span className="text-accent-teal text-xs mt-0.5 font-bold">0{idx + 1}</span>
                      <span className="text-white/60 text-sm font-body leading-relaxed">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
