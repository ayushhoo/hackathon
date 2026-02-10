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

export default function Home() {
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
              <h2 className="text-3xl md:text-4xl font-display font-bold">Pilot Deployments</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real-world impact across diverse riparian ecosystems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  location: "Ganga Basin, Zone A",
                  impact: "40% Erosion Reduction",
                  image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop"
                },
                {
                  location: "Amazon Tributary, SE-5",
                  impact: "Native Species Recovery",
                  image: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1932&auto=format&fit=crop"
                },
                {
                  location: "Nile Delta Buffer",
                  impact: "Runoff Quality Improved",
                  image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1874&auto=format&fit=crop"
                }
              ].map((item, i) => (
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
                      <CardDescription>Continuous monitoring revealed key indicators for bank stabilization.</CardDescription>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold">Community & Collaboration</h2>
              <p className="text-muted-foreground">
                Join a network of environmentalists, data scientists, and local communities working together to restore our riparian zones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="hover:border-primary/50 transition-colors border-dashed">
                <CardHeader>
                  <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                  <CardTitle>Discussion Forums</CardTitle>
                  <CardDescription>Share insights, ask questions, and collaborate on restoration strategies.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Join Discussion</Button>
                </CardContent>
              </Card>

              <Card className="hover:border-primary/50 transition-colors border-dashed">
                <CardHeader>
                  <MessageSquare className="w-10 h-10 text-accent mx-auto mb-4" />
                  <CardTitle>Project Blog</CardTitle>
                  <CardDescription>Read the latest updates on our sensor deployments and restoration success stories.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Read Articles</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact/Get Involved */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Ready to make an impact?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              We're looking for research partners, government agencies, and volunteer organizations to scale our impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="h-12 px-8">Partnership Inquiry</Button>
              <Button size="lg" variant="outline" className="h-12 px-8 border-primary-foreground/20 hover:bg-primary-foreground/10">Volunteer Program</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
