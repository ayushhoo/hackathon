import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Box, 
  Play, 
  RefreshCw, 
  Layers, 
  Activity, 
  Database, 
  Globe, 
  Cpu,
  Zap,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Hardcoded Mock "Backend" Data & Logic for Simulator
const simulationStages = [
  { id: 'init', label: 'Initializing LiDAR Core', icon: Database },
  { id: 'mapping', label: 'Terrain Mapping & Mesh Generation', icon: Globe },
  { id: 'ai', label: 'Processing AI Restoration Models', icon: Cpu },
  { id: 'finalize', label: 'Syncing Digital Twin state', icon: RefreshCw }
];

export function DigitalTwin() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Mock "Backend" Simulation Loop
  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (Math.random() * 5);
          if (next >= 100) {
            if (currentStage < simulationStages.length - 1) {
              setCurrentStage(s => s + 1);
              return 0;
            } else {
              setIsSimulating(false);
              setShowResult(true);
              return 100;
            }
          }
          return next;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isSimulating, currentStage]);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentStage(0);
    setProgress(0);
    setShowResult(false);
  };

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
                <div className={`relative w-64 h-64 border-2 border-primary/30 rounded-full ${isSimulating ? 'animate-[spin_4s_linear_infinite]' : 'animate-[spin_10s_linear_infinite]'}`} />
                <div className={`absolute w-48 h-48 border-2 border-accent/30 rounded-full ${isSimulating ? 'animate-[spin_2s_linear_infinite_reverse]' : 'animate-[spin_7s_linear_infinite_reverse]'}`} />
                <Box className={`w-20 h-20 text-primary ${isSimulating ? 'animate-pulse scale-110' : ''} transition-all duration-500`} />
              </div>
              
              <div className="absolute bottom-8 left-8 right-8 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-yellow-400 animate-ping' : 'bg-primary'}`} />
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                      {isSimulating ? `Processing: ${simulationStages[currentStage].label}` : 'Simulation Mode: Standby'}
                    </span>
                  </div>
                  {isSimulating && <Activity className="w-4 h-4 text-primary animate-bounce" />}
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
                    <span>{isSimulating ? 'Analyzing multimodals' : 'System Ready'}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-[10px] font-bold uppercase tracking-[0.2em]">
                Advanced Simulation Suite
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold">Predictive <span className="text-primary">Digital Twin</span></h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                A virtual replica of monitored riparian zones for long-term simulation and planning. Test replanting strategies and climate scenarios with our high-fidelity processing core.
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { icon: RefreshCw, title: "Iterative Refinement", desc: "Using real-time feedback loops to improve model accuracy over time." },
                { icon: Layers, title: "Scenario Testing", desc: "Simulate flooding, drought, and vegetation growth over 10-20 year timelines." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-100">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="group h-14 px-8 text-lg font-bold shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 disabled:opacity-50"
              onClick={startSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? (
                <>
                  <Zap className="mr-2 w-5 h-5 animate-pulse fill-current" />
                  Simulating Ecosystem...
                </>
              ) : (
                <>
                  <Play className="mr-2 w-5 h-5 group-hover:fill-current" />
                  Launch Simulator
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Simulation Result Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <DialogTitle className="text-2xl font-display">Simulation Successful</DialogTitle>
            <DialogDescription className="text-zinc-400">
              The Digital Twin has processed all environmental variables for the next 10-year cycle.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Restoration Success</span>
                <span className="text-emerald-400 font-bold">89.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Erosion Risk Mitigation</span>
                <span className="text-blue-400 font-bold">High</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-400">Data Confidence</span>
                <span className="text-zinc-200">99.2%</span>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/80">
                Recommendation: Prioritize bank stabilization in Zone B-4 based on the simulated 2028 rainfall anomalies.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="w-full" variant="default" onClick={() => setShowResult(false)}>
              Download Detailed Report
            </Button>
            <Button className="w-full" variant="ghost" onClick={() => setShowResult(false)}>
              Close Simulator
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
