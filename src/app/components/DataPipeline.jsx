"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Play, Pause, RotateCcw, Database, Zap, Layers, BarChart3, Terminal, Activity, CheckCircle2 } from "lucide-react";

const STAGES = [
  { id: "ingest", label: "Ingest", icon: Database, color: "#00FFD5" },
  { id: "transform", label: "Transform", icon: Zap, color: "#A855F7" },
  { id: "store", label: "Store", icon: Layers, color: "#3B82F6" },
  { id: "serve", label: "Serve", icon: BarChart3, color: "#F59E0B" },
];

const RAW_RECORDS = [
  { id: 1, user: "usr_8k2m", event: "page_view", ts: "2026-03-25T10:23:01Z", value: null, _corrupt: false },
  { id: 2, user: null, event: "purchase", ts: "2026-03-25T10:23:02Z", value: 299, _corrupt: true },
  { id: 3, user: "usr_3f1x", event: "signup", ts: "2026-03-25T10:23:03Z", value: 0, _corrupt: false },
  { id: 4, user: "usr_9p4q", event: "purchase", ts: "2026-03-25T10:23:04Z", value: 149, _corrupt: false },
  { id: 5, user: "usr_8k2m", event: "purchase", ts: "2026-03-25T10:23:05Z", value: 79, _corrupt: false },
];

const TERMINAL_LINES = {
  ingest: [
    { text: "$ kafka-console-consumer --topic raw_events", type: "cmd" },
    { text: "▸ Consuming from partition 0, offset 48291", type: "info" },
    { text: "▸ Schema validated against registry v3.2", type: "info" },
    { text: "✓ 5 records landed in s3://lake/bronze/", type: "success" },
  ],
  transform: [
    { text: "$ spark-submit transform_job.py", type: "cmd" },
    { text: "▸ Filtering NULL user_id records...", type: "info" },
    { text: "▸ Applying SCD Type-2 merge on dim_users", type: "info" },
    { text: "✓ Silver layer: 4 clean records written", type: "success" },
  ],
  store: [
    { text: "$ delta-table optimize --zorder user_id", type: "cmd" },
    { text: "▸ Compacting 12 small files → 1 optimized", type: "info" },
    { text: "▸ Z-Order index rebuilt on (user_id, event)", type: "info" },
    { text: "✓ Gold layer aggregation complete", type: "success" },
  ],
  serve: [
    { text: "$ databricks sql-query --warehouse prod", type: "cmd" },
    { text: "▸ Refreshing Power BI dataset...", type: "info" },
    { text: "▸ ML feature store updated (v42)", type: "info" },
    { text: "✓ Dashboard live — 0.3s p95 latency", type: "success" },
  ],
};

function MiniTerminal({ stage, isActive }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const lines = TERMINAL_LINES[stage] || [];

  useEffect(() => {
    if (!isActive) { setVisibleLines([]); return; }
    setVisibleLines([]);
    const timers = lines.map((_, i) =>
      setTimeout(() => setVisibleLines(prev => [...prev, lines[i]]), (i + 1) * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, [isActive, stage]);

  return (
    <div className="bg-black/60 rounded-xl border border-white/10 overflow-hidden font-mono text-[11px]">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span className="ml-2 text-white/20 text-[9px]">pipeline_terminal</span>
      </div>
      <div className="p-3 h-[120px] overflow-hidden">
        <AnimatePresence>
          {visibleLines.map((line, i) => (
            <motion.div
              key={`${stage}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`leading-relaxed ${
                line.type === "cmd" ? "text-accent-teal" :
                line.type === "success" ? "text-green-400" :
                "text-white/40"
              }`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {isActive && visibleLines.length < lines.length && (
          <motion.span
            className="inline-block w-2 h-3.5 bg-accent-teal/70 ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}

function DataRecord({ record, stage }) {
  const isCorrupt = record._corrupt;

  const getDisplay = () => {
    switch (stage) {
      case 0: // Raw
        return (
          <span className="text-[10px] text-white/50 font-mono">
            {`{user:"${record.user || "NULL"}", event:"${record.event}", val:${record.value}}`}
          </span>
        );
      case 1: // Cleaned
        if (isCorrupt) return <span className="text-[10px] text-red-400/60 font-mono line-through">FILTERED — null user</span>;
        return (
          <span className="text-[10px] text-purple-300 font-mono">
            {`{user:"${record.user}", event:"${record.event}", val:${record.value}, clean:true}`}
          </span>
        );
      case 2: // Stored
        if (isCorrupt) return null;
        return (
          <span className="text-[10px] text-blue-300 font-mono">
            {`Δ ROW | ${record.user} | ${record.event} | $${record.value} | z_idx:optimized`}
          </span>
        );
      case 3: // Served
        if (isCorrupt) return null;
        return (
          <span className="text-[10px] text-amber-300 font-mono">
            {`📊 ${record.event.toUpperCase()} → $${record.value} → dashboard_live`}
          </span>
        );
      default:
        return null;
    }
  };

  const display = getDisplay();
  if (!display) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, height: 0 }}
      animate={{ opacity: 1, x: 0, height: "auto" }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className={`px-3 py-1.5 rounded-lg border ${
        isCorrupt && stage === 1
          ? "bg-red-500/5 border-red-500/20"
          : "bg-white/[0.02] border-white/5"
      }`}
    >
      {display}
    </motion.div>
  );
}

function LiveMetrics({ currentStage, isRunning }) {
  const [metrics, setMetrics] = useState({ ingested: 0, cleaned: 0, stored: 0, served: 0 });

  useEffect(() => {
    if (!isRunning) return;
    const targets = { ingested: 5, cleaned: 4, stored: 4, served: 4 };
    const keys = ["ingested", "cleaned", "stored", "served"];

    const timers = keys.map((key, idx) => {
      if (currentStage < idx) return null;
      return setTimeout(() => {
        let count = 0;
        const interval = setInterval(() => {
          count++;
          setMetrics(prev => ({ ...prev, [key]: count }));
          if (count >= targets[key]) clearInterval(interval);
        }, 150);
        return () => clearInterval(interval);
      }, idx * 2000);
    });

    return () => timers.forEach(t => t && clearTimeout(t));
  }, [currentStage, isRunning]);

  useEffect(() => {
    if (!isRunning) setMetrics({ ingested: 0, cleaned: 0, stored: 0, served: 0 });
  }, [isRunning]);

  const items = [
    { label: "Ingested", value: metrics.ingested, color: "#00FFD5", total: 5 },
    { label: "Cleaned", value: metrics.cleaned, color: "#A855F7", total: 4 },
    { label: "Stored", value: metrics.stored, color: "#3B82F6", total: 4 },
    { label: "Served", value: metrics.served, color: "#F59E0B", total: 4 },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item, idx) => (
        <motion.div
          key={item.label}
          className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/5"
          animate={{ borderColor: currentStage >= idx && isRunning ? `${item.color}30` : "rgba(255,255,255,0.05)" }}
        >
          <motion.div
            className="text-2xl font-display font-bold"
            style={{ color: item.color }}
            key={item.value}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
          >
            {item.value}
          </motion.div>
          <div className="text-[9px] tracking-widest uppercase text-white/30 mt-1">{item.label}</div>
          {/* Progress bar */}
          <div className="mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
              animate={{ width: `${(item.value / item.total) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function DataPipeline() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [dataStage, setDataStage] = useState(-1);

  const runPipeline = useCallback(() => {
    setIsRunning(true);
    setCurrentStage(-1);
    setDataStage(-1);

    [0, 1, 2, 3].forEach(stage => {
      setTimeout(() => {
        setCurrentStage(stage);
        setDataStage(stage);
      }, stage * 2200);
    });

    setTimeout(() => {
      setIsRunning(false);
    }, 9500);
  }, []);

  const resetPipeline = () => {
    setIsRunning(false);
    setCurrentStage(-1);
    setDataStage(-1);
  };

  return (
    <section className="relative py-48 px-6 bg-void z-20 overflow-hidden">
      <div className="absolute inset-0 bg-noise-overlay opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight">
            How <span className="accent-gradient bg-clip-text text-transparent italic">Data Engineering</span> <br />
            Actually Works
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto font-body text-lg">
            Hit play and watch real data flow through a production pipeline — the exact architecture we teach.
          </p>
        </motion.div>

        {/* Control Bar */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={isRunning ? undefined : runPipeline}
            disabled={isRunning}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-display text-sm font-semibold tracking-wider uppercase transition-all ${
              isRunning 
                ? "bg-white/5 text-white/30 cursor-not-allowed" 
                : "bg-accent-teal text-void hover:shadow-[0_0_40px_rgba(0,255,213,0.3)]"
            }`}
            whileHover={!isRunning ? { scale: 1.05 } : {}}
            whileTap={!isRunning ? { scale: 0.95 } : {}}
          >
            {isRunning ? <Activity className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
            {isRunning ? "Pipeline Running..." : "Run Pipeline"}
          </motion.button>

          <motion.button
            onClick={resetPipeline}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            whileHover={{ rotate: -180 }}
            transition={{ duration: 0.5 }}
          >
            <RotateCcw className="w-4 h-4 text-white/40" />
          </motion.button>
        </motion.div>

        {/* Pipeline Stages */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-10">
          {STAGES.map((stage, idx) => {
            const isActive = currentStage >= idx;
            const isCurrent = currentStage === idx;
            return (
              <motion.div
                key={stage.id}
                className="flex-1 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Stage Header */}
                <div
                  className="rounded-t-2xl p-4 flex items-center gap-3 border border-b-0 transition-all duration-500"
                  style={{
                    borderColor: isActive ? `${stage.color}40` : "rgba(255,255,255,0.05)",
                    backgroundColor: isCurrent ? `${stage.color}08` : "rgba(255,255,255,0.01)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center relative"
                    style={{ backgroundColor: `${stage.color}15` }}
                  >
                    <stage.icon className="w-4 h-4" style={{ color: isActive ? stage.color : "rgba(255,255,255,0.2)" }} />
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{ border: `2px solid ${stage.color}` }}
                        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-display font-semibold" style={{ color: isActive ? stage.color : "rgba(255,255,255,0.3)" }}>
                      {stage.label}
                    </span>
                    {isActive && !isCurrent && (
                      <CheckCircle2 className="w-3 h-3 inline-block ml-2" style={{ color: stage.color }} />
                    )}
                  </div>
                </div>

                {/* Data Records View */}
                <div
                  className="rounded-b-2xl p-3 border border-t-0 min-h-[160px] space-y-1.5 transition-all duration-500"
                  style={{ borderColor: isActive ? `${stage.color}40` : "rgba(255,255,255,0.05)" }}
                >
                  <AnimatePresence mode="popLayout">
                    {dataStage >= idx && RAW_RECORDS.map(record => (
                      <DataRecord key={`${stage.id}-${record.id}`} record={record} stage={idx} />
                    ))}
                  </AnimatePresence>
                  {dataStage < idx && (
                    <div className="h-full flex items-center justify-center text-white/10 text-[10px] tracking-widest uppercase pt-12">
                      Waiting...
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Row: Terminal + Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-white/20" />
              <span className="text-[10px] tracking-widest uppercase text-white/20">Live Pipeline Logs</span>
            </div>
            <MiniTerminal
              stage={STAGES[currentStage]?.id || "ingest"}
              isActive={isRunning && currentStage >= 0}
            />
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-white/20" />
              <span className="text-[10px] tracking-widest uppercase text-white/20">Real-time Metrics</span>
            </div>
            <LiveMetrics currentStage={currentStage} isRunning={isRunning} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
