import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, Clock, ShieldCheck } from "lucide-react";

export function About() {
  const problems = [
    { icon: TrendingDown, text: "Manual and labor-intensive monitoring" },
    { icon: Clock, text: "Infrequent and reactive intervention" },
    { icon: AlertCircle, text: "Lack of predictive and simulation capabilities" }
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold">The Riparian Challenge</h2>
          <p className="text-muted-foreground text-lg">
            Riparian zones are critical ecological buffers but are increasingly threatened by erosion, runoff, and climate variability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                Problem Statement
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Current monitoring methods are insufficient to address the scale of degradation. There is an urgent need for a <strong>scalable, automated, and intelligent system</strong> that continuously monitors riparian health and supports adaptive restoration.
              </p>
            </div>

            <div className="grid gap-4">
              {problems.map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                  <p.icon className="w-5 h-5 text-destructive" />
                  <span className="font-medium">{p.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img 
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" 
              alt="Healthy Riparian Zone" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-medium italic">"Restoring the lifelines of our planet through data-driven precision."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
