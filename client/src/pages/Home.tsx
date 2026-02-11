import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { AnalyticsPreview } from "@/components/sections/AnalyticsPreview";
import { DigitalTwin } from "@/components/sections/DigitalTwin";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const caseStudies = [
    {
      location: t("caseStudies.case1Location"),
      impact: t("caseStudies.case1Impact"),
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop"
    },
    {
      location: t("caseStudies.case2Location"),
      impact: t("caseStudies.case2Impact"),
      image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1932&auto=format&fit=crop"
    },
    {
      location: t("caseStudies.case3Location"),
      impact: t("caseStudies.case3Impact"),
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1874&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <TechStack />
        <AnalyticsPreview />
        <DigitalTwin />
        
        {/* Case Studies Section */}
        <section id="case-studies" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-display font-bold">{t("caseStudies.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("caseStudies.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="overflow-hidden group cursor-pointer border-border/50">
                    <div className="aspect-video relative">
                      <img src={item.image} alt={item.location} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                        <div className="bg-black/50 backdrop-blur-md text-white text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                    <CardHeader className="p-6">
                      <CardTitle className="text-lg">{item.impact}</CardTitle>
                      <CardDescription>{t("caseStudies.caseDescription")}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold">{t("community.mainTitle")}</h2>
              <p className="text-muted-foreground">
                {t("community.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:border-primary/50 transition-colors border-dashed">
                <CardHeader>
                  <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                  <CardTitle>{t("community.forumTitle")}</CardTitle>
                  <CardDescription>{t("community.forumDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">{t("community.joinDiscussion")}</Button>
                </CardContent>
              </Card>

              <Card className="hover:border-primary/50 transition-colors border-dashed">
                <CardHeader>
                  <MessageSquare className="w-10 h-10 text-accent mx-auto mb-4" />
                  <CardTitle>{t("community.blogTitle")}</CardTitle>
                  <CardDescription>{t("community.blogDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">{t("community.readArticles")}</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact/Get Involved */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold">{t("cta.title")}</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="h-12 px-8">{t("cta.partnership")}</Button>
              <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/20 hover:bg-primary-foreground/10">{t("cta.volunteer")}</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
