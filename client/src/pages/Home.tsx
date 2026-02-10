import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { AnalyticsPreview } from "@/components/sections/AnalyticsPreview";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      
      <main>
        <Hero />
        <TechStack />
        <AnalyticsPreview />
        
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
              <Card className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                  <CardTitle>Discussion Forums</CardTitle>
                  <CardDescription>Share insights, ask questions, and collaborate on restoration strategies.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Join Discussion</Button>
                </CardContent>
              </Card>

              <Card className="hover:border-primary/50 transition-colors">
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
      </main>

      <Footer />
    </div>
  );
}
