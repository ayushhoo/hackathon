import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
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
  Fingerprint,
  Waves,
  Mountain,
  Map as MapIcon,
  Wind,
  Info
} from "lucide-react";

// Mock Data extracted from attached imagery
const gangaBasinData = {
  moisture: [
    { month: "Jan", value: 680 }, { month: "Feb", value: 650 },
    { month: "Mar", value: 620 }, { month: "Apr", value: 580 },
    { month: "May", value: 550 }, { month: "Jun", value: 710 },
    { month: "Jul", value: 850 }, { month: "Aug", value: 890 },
    { month: "Sep", value: 820 }, { month: "Oct", value: 775 },
    { month: "Nov", value: 730 }, { month: "Dec", value: 700 }
  ],
  landClassification: [
    { name: "Forests", f1: 0.90, color: "#166534" },
    { name: "Inland Waters", f1: 0.93, color: "#0ea5e9" },
    { name: "Arable Land", f1: 0.88, color: "#84cc16" },
    { name: "Wetlands", f1: 0.80, color: "#065f46" },
    { name: "Urban", f1: 0.82, color: "#64748b" }
  ],
  stats: {
    precipitation: "61 mm",
    runoff: "26 mm",
    evapotranspiration: "120 mm",
    soilMoisture: "775 mm",
    erosionRisk: "Moderate to Severe (Gullied)",
    soilType: "Alluvial / Montane",
    vegetationCover: "72%"
  }
};

export function AnalyticsPreview() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authStage, setAuthStage] = useState('login');
  
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
          <Badge variant="outline" className="text-primary border-primary/50">Ganga Basin Intelligence</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Ganga Basin Command Centre</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Multimodal analysis of the Tehri region and surrounding riparian zones.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Visualization Area */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md relative overflow-hidden">
              {!isAuthenticated && (
                <div className="absolute inset-0 z-20 backdrop-blur-[12px] bg-zinc-950/60 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure Basin Access</h3>
                  <p className="text-zinc-400 text-sm max-w-xs mb-6">
                    Stakeholder credentials required for high-resolution imagery and basin analytics.
                  </p>
                  <Button size="lg" onClick={() => setShowAuthDialog(true)}>
                    Authenticate for Access
                  </Button>
                </div>
              )}

              <CardHeader className={!isAuthenticated ? 'opacity-20' : ''}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-zinc-100">Tehri Region Analysis</CardTitle>
                      <CardDescription className="text-zinc-400 tracking-tighter uppercase text-[10px]">Sentinel-2 & LiDAR Fusion</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active Stream</Badge>
                </div>
              </CardHeader>
              <CardContent className={!isAuthenticated ? 'opacity-20' : ''}>
                <Tabs defaultValue="map">
                  <TabsList className="bg-zinc-800/50 mb-6">
                    <TabsTrigger value="map">Satellite View</TabsTrigger>
                    <TabsTrigger value="moisture">Water Balance</TabsTrigger>
                    <TabsTrigger value="classification">AI Classification</TabsTrigger>
                  </TabsList>

                  <TabsContent value="map" className="space-y-4">
                    <div className="aspect-video rounded-xl border border-zinc-800 overflow-hidden relative group">
                       <img 
                        src="https://attached_assets/WhatsApp_Image_2026-02-11_at_11.01.49_AM_1770788230491.jpeg" 
                        alt="Tehri Map" 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
                      />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="bg-zinc-950/80 backdrop-blur-md p-3 rounded-lg border border-zinc-800">
                          <div className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Erosion Status</div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-sm font-bold">Moderate to Severe</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                           <div className="w-8 h-8 rounded bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-[10px] font-bold">34</div>
                           <div className="w-8 h-8 rounded bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-[10px] font-bold">69</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="moisture" className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={gangaBasinData.moisture}>
                        <defs>
                          <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                        <XAxis dataKey="month" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis stroke="#444" fontSize={10} axisLine={false} tickLine={false} unit="mm" />
                        <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }} />
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="url(#colorMoisture)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  <TabsContent value="classification" className="h-[400px]">
                     <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                        <div className="space-y-6">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-500">AI Confidence Scores (F1)</h4>
                          <div className="space-y-4">
                            {gangaBasinData.landClassification.map((item) => (
                              <div key={item.name} className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>{item.name}</span>
                                  <span className="font-mono text-primary">{(item.f1 * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.f1 * 100}%` }}
                                    className="h-full" 
                                    style={{ backgroundColor: item.color }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="aspect-square rounded-xl bg-zinc-800/20 border border-zinc-800 p-4 flex items-center justify-center relative">
                           <img 
                            src="https://attached_assets/WhatsApp_Image_2026-02-11_at_10.57.55_AM_1770788230492.jpeg" 
                            alt="Erosion Map" 
                            className="w-full h-full object-contain rounded-lg" 
                          />
                          <div className="absolute top-6 right-6 p-2 rounded bg-zinc-950/90 border border-zinc-800 text-[8px] font-mono leading-tight">
                            SYMBOLOGY<br/>
                            1. SLIGHT<br/>
                            <span className="text-emerald-500">2. MODERATE</span><br/>
                            <span className="text-orange-500">3. SEVERE</span><br/>
                            <span className="text-teal-500">4. GULLIED</span>
                          </div>
                        </div>
                     </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Wind className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Precipitation</div>
                  <div className="text-xl font-bold">{gangaBasinData.stats.precipitation}</div>
                </div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Waves className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Runoff</div>
                  <div className="text-xl font-bold">{gangaBasinData.stats.runoff}</div>
                </div>
              </Card>
              <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Mountain className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Soil Moisture</div>
                  <div className="text-xl font-bold">{gangaBasinData.stats.soilMoisture}</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Side Intelligence Panel */}
          <div className="space-y-6">
            <Card className="bg-primary/10 border-primary/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-sm uppercase tracking-widest">Basin Health</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase">Soil Type</span>
                  <div className="font-bold">{gangaBasinData.stats.soilType}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase">Vegetation Index</span>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-bold text-emerald-400">{gangaBasinData.stats.vegetationCover}</div>
                    <div className="text-xs text-zinc-500 mb-1">Stable</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase">Erosion Risk</span>
                  <div className="px-2 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold text-center">
                    {gangaBasinData.stats.erosionRisk}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">System Ingestion</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Database className="w-3 h-3" />
                    Sentinel-2
                  </div>
                  <span className="text-xs font-mono text-primary">Live</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Server className="w-3 h-3" />
                    LiDAR Cluster
                  </div>
                  <span className="text-xs font-mono text-zinc-500">Idle</span>
                </div>
                <div className="pt-4 border-t border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase mb-2">ML Inference Latency</div>
                  <div className="text-xl font-mono text-zinc-300">142ms</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Dialog (Preserved) */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
          <AnimatePresence mode="wait">
            {authStage === 'login' && (
              <motion.div key="login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display">Stakeholder Login</DialogTitle>
                  <DialogDescription className="text-zinc-400">Ganga Basin Intelligence Unit Access</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                      <Input id="email" type="email" placeholder="stakeholder@ganga.gov" className="pl-10 bg-zinc-800 border-zinc-700" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Security Passphrase</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                      <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-zinc-800 border-zinc-700" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Proceed to Verification <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </form>
              </motion.div>
            )}

            {authStage === 'mfa' && (
              <motion.div key="mfa" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <Fingerprint className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multimodal Verification</h3>
                <p className="text-zinc-400 text-sm mb-6">Please verify your identity via secure key.</p>
                <Button className="w-full" onClick={handleMFA}>Complete Verification</Button>
              </motion.div>
            )}

            {authStage === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Access Granted</h3>
                <p className="text-zinc-400 text-sm">Decrypting Ganga Basin telemetry...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
