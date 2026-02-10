import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import analyticsBg from "@/assets/analytics-bg.png";

const moistureData = [
  { time: "00:00", value: 45 }, { time: "04:00", value: 42 },
  { time: "08:00", value: 55 }, { time: "12:00", value: 62 },
  { time: "16:00", value: 58 }, { time: "20:00", value: 50 },
  { time: "24:00", value: 48 },
];

const qualityData = [
  { time: "Mon", ph: 7.2, do: 8.5 }, { time: "Tue", ph: 7.1, do: 8.2 },
  { time: "Wed", ph: 7.3, do: 8.8 }, { time: "Thu", ph: 6.9, do: 7.9 },
  { time: "Fri", ph: 7.0, do: 8.1 }, { time: "Sat", ph: 7.2, do: 8.4 },
  { time: "Sun", ph: 7.1, do: 8.3 },
];

export function AnalyticsPreview() {
  return (
    <section id="analytics" className="relative py-24 bg-zinc-950 text-zinc-50 overflow-hidden">
      {/* Abstract background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={analyticsBg} alt="" className="w-full h-full object-cover" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="text-primary border-primary/50">AI-Driven Analytics</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Real-time Ecosystem Intelligence</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Our autonomous models detect anomalies and provide site-specific recommendations instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md h-full">
              <CardHeader>
                <CardTitle className="text-zinc-100">Live Sensor Data</CardTitle>
                <CardDescription className="text-zinc-400">Monitoring Zone A-12 (Ganga Basin)</CardDescription>
              </CardHeader>
              <CardContent>
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
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={qualityData}>
                        <defs>
                          <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="time" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                          labelStyle={{ color: '#a1a1aa' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="ph" 
                          stroke="hsl(var(--accent))" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorPh)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Status Panel */}
          <div className="space-y-4">
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-2xl font-bold text-zinc-100">Optimal</span>
                </div>
                <p className="text-xs text-zinc-500 mt-1">Last sync: 2s ago</p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">Anomalies Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-zinc-100">0</span>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">Past 24h</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">ML Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">Erosion Risk</span>
                    <span className="text-emerald-400">Low (12%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[12%]" />
                  </div>
                  
                  <div className="flex justify-between text-sm mt-4">
                    <span className="text-zinc-300">Planting Success</span>
                    <span className="text-accent">High (89%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[89%]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
