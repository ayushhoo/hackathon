import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Droplets, Target, Compass } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Riparian Zone with LiDAR overlay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background/95" />
      </div>

      <div className="container relative z-10 px-4 py-24 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Real-time Environmental Monitoring Active
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground leading-[1.1]">
            Van Sampatti: The Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-accent">
              Riparian Restoration
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Empowering stakeholders with precise, AI-driven insights to combat riparian degradation, deforestation, and habitat disruption.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              Explore Mission <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base backdrop-blur-sm">
              View Technology
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Our Vision</h3>
              </div>
              <p className="text-sm text-muted-foreground">Real-time, data-informed restoration using scalable sensing infrastructure and AI analytics.</p>
            </div>
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
              <div className="flex items-center gap-3 mb-2">
                <Compass className="w-5 h-5 text-accent" />
                <h3 className="font-bold">Our Mission</h3>
              </div>
              <p className="text-sm text-muted-foreground">Empower environmental stakeholders with predictive tools to combat ecological buffers threats.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
