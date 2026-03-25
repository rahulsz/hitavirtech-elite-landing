"use client";

import { motion } from "framer-motion";

const tools = [
  { name: "Apache Spark", category: "Big Data", logo: "/logos/spark.png" },
  { name: "Apache Kafka", category: "Streaming", logo: "/logos/kafka.png" },
  { name: "Databricks", category: "Data Platform", logo: "/logos/databricks.svg" },
  { name: "AWS", category: "Cloud Platform", logo: "/logos/aws.png" },
  { name: "Azure", category: "Cloud Platform", logo: "https://svgl.app/library/azure.svg" },
  { name: "Google Cloud", category: "Cloud Platform", logo: "https://svgl.app/library/google-cloud.svg" },
  { name: "dbt", category: "Transformation", logo: "/logos/dbt.png" },
  { name: "Snowflake", category: "Warehouse", logo: "/logos/snowflake.png" },
  { name: "Airflow", category: "Orchestration", logo: "/logos/airflow.png" },
  { name: "OpenAI", category: "Agentic AI", logo: "https://svgl.app/library/openai.svg" },
  { name: "LangChain", category: "AI Framework", logo: "/logos/langchain.png" },
  { name: "Docker", category: "DevOps", logo: "https://svgl.app/library/docker.svg" },
  { name: "Kubernetes", category: "DevOps", logo: "https://svgl.app/library/kubernetes.svg" },
  { name: "Terraform", category: "IaC", logo: "https://svgl.app/library/terraform.svg" },
  { name: "Python", category: "Language", logo: "https://svgl.app/library/python.svg" },
  { name: "GitHub Actions", category: "CI/CD", logo: "/logos/github_actions.png" },
];

export default function TechStack() {
  return (
    <section className="relative py-24 border-y border-white/5 overflow-hidden bg-void z-20">
      <div className="absolute inset-0 bg-noise-overlay opacity-20 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col gap-12">
        <div className="px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-4">
          <h3 className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-medium">
            The Elite Tech Ecosystem
          </h3>
          <p className="text-white/50 text-xs font-body max-w-xs">
            Hands-on mastery of 30+ production-grade tools.
          </p>
        </div>

        {/* Infinite Marquee with Native Icons */}
        <div className="flex overflow-hidden select-none gap-8 group relative before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-void before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:from-void after:to-transparent">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-8 whitespace-nowrap"
          >
            {[...tools, ...tools].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-6 p-6 rounded-[2rem] glass-v2 border-white/5 glow-on-hover min-w-[300px] group/item transition-all cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 p-3 flex items-center justify-center group-hover/item:bg-white/10 transition-colors shadow-2xl relative">
                   <img 
                    src={item.logo} 
                    alt={item.name} 
                    className="w-full h-full object-contain filter brightness-110 contrast-125"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                   />
                   <div className="hidden absolute inset-0 items-center justify-center text-xl font-bold text-white/20">
                     {item.name.charAt(0)}
                   </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-starlight font-display font-medium text-lg leading-none">{item.name}</span>
                  <span className="text-[8px] tracking-widest uppercase text-white/40">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
