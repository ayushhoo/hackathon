import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine, Trees, Sprout, CloudRain } from "lucide-react";
import techDiagram from "@/assets/tech-diagram.png";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function TechStack() {
  const { t } = useTranslation();

  const features = [
    {
      icon: ScanLine,
      title: t("techstack.feature1Title"),
      description: t("techstack.feature1Desc")
    },
    {
      icon: Trees,
      title: t("techstack.feature2Title"),
      description: t("techstack.feature2Desc")
    },
    {
      icon: CloudRain,
      title: t("techstack.feature3Title"),
      description: t("techstack.feature3Desc")
    },
    {
      icon: Sprout,
      title: t("techstack.feature4Title"),
      description: t("techstack.feature4Desc")
    }
  ];

  return (
    <section id="technology" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {t("techstack.mainTitle")} <br/>
                <span className="text-primary">{t("techstack.highlightTitle")}</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("techstack.description")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50 bg-background/50 hover:bg-background transition-colors duration-300">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl -z-10" />
            <img 
              src={techDiagram} 
              alt="IoT Sensor Diagram" 
              className="w-full rounded-2xl shadow-2xl border border-border/20 bg-background/50 backdrop-blur-sm p-2"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
