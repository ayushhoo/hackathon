import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import analyticsBg from "@/assets/analytics-bg.png";
import { 
  LayoutDashboard, 
  Lock, 
  User, 
  ShieldCheck, 
  Server, 
  Cloud,
  Database,
  ArrowRight,
  Fingerprint
} from "lucide-react";

// Mock "Backend" Data Generators
const generateMoisture = () => Array.from({ length: 7 }, (_, i) => ({
  time: `${i * 4}:00`,
  value: 40 + Math.random() * 30
}));

export function AnalyticsPreview() {
  const [moistureData, setMoistureData] = useState(generateMoisture());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authStage, setAuthStage] = useState('login'); // 'login' | 'mfa' | 'success'
  
  // Real-time "Backend" update effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMoistureData(generateMoisture());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthStage('mfa');
  };

  const handleMFA = () => {
    setAuthStage('success');
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowAuthDialog(false);
    }, 1500);
  };

  return (
    <section id="analytics" className="relative py-24 bg-zinc-950 text-zinc-50 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={analyticsBg} alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="text-primary border-primary/50">AI-Driven Analytics</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Real-time Ecosystem Intelligence</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Our autonomous models detect anomalies and provide site-specific recommendations instantly via our secure cloud infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md h-full relative group overflow-hidden">
              {!isAuthenticated && (
                <div className="absolute inset-0 z-20 backdrop-blur-[8px] bg-zinc-950/40 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure Dashboard Access</h3>
                  <p className="text-zinc-400 text-sm max-w-xs mb-6">
                    Real-time data streams from Van Sampatti sensor nodes are encrypted and restricted to authorized stakeholders.
                  </p>
                  <Button size="lg" onClick={() => setShowAuthDialog(true)}>
                    Authenticate to View Data
                  </Button>
                </div>
              )}

              <CardHeader className={!isAuthenticated ? 'opacity-20 select-none' : ''}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-zinc-100 flex items-center gap-2">
                      <LayoutDashboard className="w-5 h-5 text-primary" />
                      Live Sensor Data
                    </CardTitle>
                    <CardDescription className="text-zinc-400">Monitoring Zone A-12 (Ganga Basin)</CardDescription>
                  </div>
                  {isAuthenticated && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Encrypted Stream
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className={!isAuthenticated ? 'opacity-20 select-none' : ''}>
                <Tabs defaultValue="moisture">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-zinc-800 text-zinc-400">
                      <TabsTrigger value="moisture">Soil Moisture</TabsTrigger>
                      <TabsTrigger value="quality">Water Quality</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="moisture" className="h-[300px] w-full mt-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={moistureData}>
                        <defs>
                          <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                          labelStyle={{ color: '#a1a1aa' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorMoisture)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="quality" className="h-[300px] w-full mt-0">
                    <div className="flex items-center justify-center h-full text-zinc-500 italic">
                      Initialising Water Quality Stream...
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Backend Cluster Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-2xl font-bold text-zinc-100">Optimal</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase">Nodes</span>
                    <span className="text-xs font-mono text-zinc-300">12 Active</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 uppercase">Latency</span>
                    <span className="text-xs font-mono text-zinc-300">24ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Ingestion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-zinc-100">1.2 GB/s</span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">High Load</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Cloud className="w-4 h-4" />
                  ML Prediction Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">Restoration Fit</span>
                    <span className="text-accent">High (89%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent"
                      animate={{ width: ["80%", "89%", "87%"] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Hardcoded Auth Simulation Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
          <AnimatePresence mode="wait">
            {authStage === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display">Stakeholder Login</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    Enter your credentials to access the secure monitoring portal.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                      <Input id="email" type="email" placeholder="name@org.gov" className="pl-10 bg-zinc-800 border-zinc-700" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Security Passphrase</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                      <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-zinc-800 border-zinc-700" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Proceed to Verification
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            )}

            {authStage === 'mfa' && (
              <motion.div
                key="mfa"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Fingerprint className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multimodal Verification</h3>
                <p className="text-zinc-400 text-sm mb-6">
                  Please verify your identity using your security key or MFA application.
                </p>
                <Button className="w-full" onClick={handleMFA}>
                  Complete Verification
                </Button>
              </motion.div>
            )}

            {authStage === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Authentication Granted</h3>
                <p className="text-zinc-400 text-sm">
                  Establishing secure tunnel to Van Sampatti backend...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
