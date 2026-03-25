"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Database, Brain, BarChart3, Settings2, CheckCircle2, ArrowRight } from "lucide-react";

const modules = [
  {
    id: "de",
    title: "Data Engineering",
    icon: <Database className="w-5 h-5" />,
    color: "#00FFD5",
    points: [
      "Delta Lake Implementation (ACID, Z-Ordering, Schema Evolution)",
      "Distributed Processing with PySpark (Streaming & Broadcast Joins)",
      "Real-time Streaming with Apache Kafka (Connect & Registry)",
      "Medallion Architecture Design (Bronze/Silver/Gold layers)",
      "SQL Transformations & Data Lineage with dbt",
      "Workflow Orchestration with Apache Airflow (MWAA)"
    ]
  },
  {
    id: "ai",
    title: "Agentic AI & LLMs",
    icon: <Brain className="w-5 h-5" />,
    color: "#A855F7",
    points: [
      "Amazon Bedrock Foundation Models (Claude 3.5, Llama)",
      "Advanced Reasoning with Claude 3.5 Sonnet Integration",
      "OpenAI Assistants API & Complex Function Calling",
      "Multi-agent Orchestration using LangGraph & LangChain",
      "Vector Database Indexing (Pinecone, Milvus, Weaviate)",
      "Production-grade RAG Architectures & Reranking"
    ]
  },
  {
    id: "analytics",
    title: "Data Analytics & BI",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "#3B82F6",
    points: [
      "Modern BI with Power BI (DAX, Paginated Reports)",
      "Databricks SQL Serverless & Lakeview Dashboards",
      "Spark SQL for Statistical Analysis & Window Functions",
      "BigQuery ML & Geospatial Analytics Implementation",
      "Data Governance & Lineage with Databricks Unity Catalog",
      "AI-Powered Predictive Analytics & Anomaly Detection"
    ]
  },
  {
    id: "devops",
    title: "DevOps & MLOps",
    icon: <Settings2 className="w-5 h-5" />,
    color: "#F59E0B",
    points: [
      "GitHub Actions for Data Pipeline CI/CD Automation",
      "Containerization with Docker & Kubernetes (EKS/AKS)",
      "Experiment Tracking & Model Registry with MLflow",
      "Infrastructure as Code (Terraform, Bicep, ARM)",
      "Observability with Datadog & Enterprise ELK Stack",
      "Production Pipeline Automation & Complex Error Handling"
    ]
  }
];

function CurriculumCard({ point, idx, color }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function resetMouse() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: idx * 0.08, type: "spring", stiffness: 100, damping: 15 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ z: 30 }}
      className="group relative cursor-default"
    >
      <div className="p-8 rounded-[2rem] glass-v2 border-white/5 glow-on-hover transition-all relative overflow-hidden h-full">
        {/* Animated gradient line on left */}
        <motion.div
          className="absolute left-0 top-0 w-1 rounded-full"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ delay: idx * 0.08 + 0.3, duration: 0.6 }}
          style={{ backgroundColor: color }}
        />

        {/* Hover shimmer */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${color}08, transparent 70%)` 
          }}
        />

        <div className="relative z-10 flex items-start gap-4">
          <motion.div 
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10"
            style={{ backgroundColor: `${color}15` }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span style={{ color }} className="text-xs font-display font-bold">0{idx + 1}</span>
          </motion.div>

          <div className="flex-1">
            <p className="text-base font-display font-medium text-starlight leading-snug group-hover:text-white transition-colors">
              {point}
            </p>
            <motion.div 
              className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100"
              initial={false}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-3 h-3" style={{ color }} />
              <span className="text-[9px] tracking-widest uppercase font-medium" style={{ color }}>Hands-on Project</span>
            </motion.div>
          </div>
        </div>

        {/* Corner checkmark */}
        <motion.div 
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
        >
          <CheckCircle2 className="w-4 h-4" style={{ color }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function DetailedCurriculum() {
  const [activeTab, setActiveTab] = useState("de");
  const activeModule = modules.find(m => m.id === activeTab);

  return (
    <section className="relative py-48 px-6 bg-void z-20 overflow-hidden" style={{ perspective: "1200px" }}>
      <div className="absolute inset-0 bg-noise-overlay opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with stagger animation */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="space-y-6">
            <motion.h2 
              className="text-4xl sm:text-6xl font-display font-medium tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              The <motion.span 
                className="accent-gradient bg-clip-text text-transparent italic px-2 inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >Deep Dive</motion.span> <br />
              Curriculum
            </motion.h2>
            <motion.p 
              className="text-white/50 max-w-xl font-body text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              We cover the exact patterns used by top-tier engineering teams. No fluff, just production-grade systems architecture.
            </motion.p>
          </div>

          {/* Desktop Tabs with animated indicator */}
          <motion.div 
            className="hidden lg:flex items-center gap-1 p-1.5 glass-v2 rounded-full border-white/5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className="relative flex items-center gap-3 px-5 py-3 rounded-full text-[9px] tracking-[0.2em] font-medium uppercase transition-colors duration-300"
                style={{ color: activeTab === m.id ? "#0A0A0F" : "rgba(255,255,255,0.4)" }}
              >
                {activeTab === m.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-full shadow-2xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  {m.icon}
                  {m.title}
                </span>
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex overflow-x-auto pb-8 gap-4 no-scrollbar mb-12">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className={`relative flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-3xl glass-v2 border-white/10 text-[10px] tracking-widest font-medium uppercase ${
                activeTab === m.id ? "text-starlight" : "text-white/40"
              }`}
            >
              {activeTab === m.id && (
                <motion.div
                  layoutId="activeMobileTab"
                  className="absolute inset-0 rounded-3xl border-2"
                  style={{ borderColor: activeModule.color }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                {m.icon}
                {m.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active module color indicator */}
        <motion.div 
          className="h-px mb-12 rounded-full opacity-30"
          animate={{ backgroundColor: activeModule.color }}
          transition={{ duration: 0.5 }}
          style={{ boxShadow: `0 0 20px ${activeModule.color}` }}
        />

        {/* Content Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeModule.points.map((point, idx) => (
              <CurriculumCard 
                key={`${activeTab}-${idx}`} 
                point={point} 
                idx={idx} 
                color={activeModule.color} 
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
