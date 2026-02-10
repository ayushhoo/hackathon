import { motion } from "framer-motion";
import { Box, Play, RefreshCw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DigitalTwin() {
  return (
    <section id="digital-twin" className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-48 h-48 border-2 border-accent/30 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                <Box className="w-20 h-20 text-primary animate-pulse" />
              </div>
              
              <div className="absolute bottom-8 left-8 right-8 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Simulation Mode: Active</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      animate={{ width: ["20%", "80%", "40%", "90%"] }}
                      transition={{ duration: 10, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
                    <span>Terrain Mapping</span>
                    <span>94% Accurate</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold">Predictive <span className="text-primary">Digital Twin</span></h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                A virtual replica of monitored riparian zones for long-term simulation and planning. Test replanting strategies and climate scenarios before field implementation.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { icon: RefreshCw, title: "Iterative Refinement", desc: "Using real-time feedback loops to improve model accuracy over time." },
                { icon: Layers, title: "Scenario Testing", desc: "Simulate flooding, drought, and vegetation growth over 10-20 year timelines." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-100">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="shadow-2xl shadow-primary/50">
              Launch Simulator
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
