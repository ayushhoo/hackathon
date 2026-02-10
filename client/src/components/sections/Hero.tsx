import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Droplets } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Riparian Zone with LiDAR overlay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90" />
      </div>

      <div className="container relative z-10 px-4 py-32 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Real-time Environmental Monitoring Active
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
            Restoring Riparian Zones through <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Automated Intelligence
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Scalable, data-driven restoration using IoT-connected LiDAR sensors for anomaly detection, crop suitability, and adaptive management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-base">
              Explore Platform <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              View Case Studies
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-border/50 mt-16">
            <div className="flex flex-col items-center gap-2">
              <Activity className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold font-display">99.9%</span>
              <span className="text-sm text-muted-foreground">Uptime Monitoring</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Droplets className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold font-display">Real-time</span>
              <span className="text-sm text-muted-foreground">Water Quality Analysis</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center font-bold text-primary">AI</div>
              <span className="text-2xl font-bold font-display">Predictive</span>
              <span className="text-sm text-muted-foreground">Generative Modeling</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center font-bold text-accent">DT</div>
              <span className="text-2xl font-bold font-display">Digital Twin</span>
              <span className="text-sm text-muted-foreground">Scenario Simulation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
