import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis,
  ResponsiveContainer, Tooltip, Legend, Cell, ComposedChart
} from "recharts";
import {
  AlertTriangle, AlertCircle, CheckCircle2, TrendingUp, TrendingDown,
  MapPin, Droplet, Zap, Wind, Cloud, Lock, Bell, Settings, Download,
  Eye, EyeOff, Map as MapIcon, Database, Cpu, Gauge, Activity,
  Filter, RefreshCw, ZoomIn, ChevronDown, BarChart3, LineChart as LineChartIcon,
  FileText, Info
} from "lucide-react";

const eroding = [
  { time: "00:00", soilMoisture: 65, waterQuality: 78, erosionIndex: 35, temperature: 22 },
  { time: "04:00", soilMoisture: 72, waterQuality: 75, erosionIndex: 42, temperature: 18 },
  { time: "08:00", soilMoisture: 58, waterQuality: 82, erosionIndex: 55, temperature: 24 },
  { time: "12:00", soilMoisture: 45, waterQuality: 70, erosionIndex: 68, temperature: 28 },
  { time: "16:00", soilMoisture: 52, waterQuality: 68, erosionIndex: 72, temperature: 26 },
  { time: "20:00", soilMoisture: 68, waterQuality: 79, erosionIndex: 48, temperature: 20 },
  { time: "24:00", soilMoisture: 75, waterQuality: 85, erosionIndex: 38, temperature: 19 }
];

const riskData = [
  { zone: "Zone A", riskLevel: 85, status: "critical" },
  { zone: "Zone B", riskLevel: 62, status: "warning" },
  { zone: "Zone C", riskLevel: 38, status: "moderate" },
  { zone: "Zone D", riskLevel: 25, status: "low" },
  { zone: "Zone E", riskLevel: 45, status: "moderate" }
];

const sensorHealth = [
  { sensor: "LiDAR-01", status: "online", latency: "42ms", accuracy: "99.2%" },
  { sensor: "LiDAR-02", status: "online", latency: "45ms", accuracy: "99.1%" },
  { sensor: "Soil-Moisture-01", status: "online", latency: "28ms", accuracy: "98.8%" },
  { sensor: "Water-Quality-01", status: "online", latency: "35ms", accuracy: "98.9%" },
  { sensor: "Water-Quality-02", status: "offline", latency: "—", accuracy: "—" }
];

const alerts = [
  {
    id: 1,
    severity: "critical",
    zone: "Zone A",
    message: "High erosion risk detected in riparian zone",
    time: "2 minutes ago",
    action: "View Analysis"
  },
  {
    id: 2,
    severity: "warning",
    zone: "Zone B",
    message: "Soil moisture below critical threshold",
    time: "15 minutes ago",
    action: "View Details"
  },
  {
    id: 3,
    severity: "info",
    zone: "Zone C",
    message: "Water quality monitoring initiated",
    time: "1 hour ago",
    action: "View Data"
  }
];

const recommendations = [
  {
    id: 1,
    type: "Urgent",
    zone: "Zone A",
    title: "Implement Bioswale System",
    description: "Construct vegetated swales to reduce surface runoff and stabilize slopes",
    confidence: 94,
    estimatedImpact: "40% erosion reduction"
  },
  {
    id: 2,
    type: "High Priority",
    zone: "Zone A & B",
    title: "Bank Stabilization with Native Vegetation",
    description: "Plant native riparian vegetation to strengthen bank stability and increase biodiversity",
    confidence: 87,
    estimatedImpact: "35% erosion reduction"
  },
  {
    id: 3,
    type: "High Priority",
    zone: "Zone B",
    title: "Sediment Control Measures",
    description: "Deploy sediment traps and erosion control blankets in vulnerable areas",
    confidence: 85,
    estimatedImpact: "25% sediment load reduction"
  }
];

export default function AccessDashboard() {
  const { t } = useTranslation();
  const [selectedZone, setSelectedZone] = useState("Zone A");
  const [showDataDetails, setShowDataDetails] = useState(false);
  const [alertsExpanded, setAlertsExpanded] = useState(true);
  const [liveDataEnabled, setLiveDataEnabled] = useState(true);

  const getRiskColor = (level: number) => {
    if (level >= 70) return "text-red-500";
    if (level >= 50) return "text-orange-500";
    if (level >= 30) return "text-yellow-500";
    return "text-green-500";
  };

  const getRiskBg = (level: number) => {
    if (level >= 70) return "bg-red-500/10 border-red-500/20";
    if (level >= 50) return "bg-orange-500/10 border-orange-500/20";
    if (level >= 30) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-green-500/10 border-green-500/20";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Access Dashboard</h1>
              <p className="text-muted-foreground text-lg">
                Real-time erosion monitoring and early warning system for the Ganga Basin
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button size="sm" className="gap-2">
                <Bell className="w-4 h-4" />
                Alert Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>System Status</span>
                <Activity className="w-4 h-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold text-green-500">4/5</div>
                <span className="text-xs text-muted-foreground">sensors online</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">1 sensor offline (needs maintenance)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>Critical Alerts</span>
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold text-red-500">1</div>
                <span className="text-xs text-muted-foreground">active</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Zone A requires immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>Avg Erosion Risk</span>
                <TrendingUp className="w-4 h-4 text-orange-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold text-orange-500">51%</div>
                <span className="text-xs text-muted-foreground">moderate</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Up 5% from last 24h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>AI Confidence</span>
                <Cpu className="w-4 h-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold text-primary">92%</div>
                <span className="text-xs text-muted-foreground">excellent</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Model accuracy strong</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Main Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Data Visualization */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <LineChartIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Real-Time Environmental Monitoring</CardTitle>
                      <CardDescription>IoT sensor data - 24 hour trend</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="erosion" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="erosion">Erosion Index</TabsTrigger>
                    <TabsTrigger value="moisture">Soil Moisture</TabsTrigger>
                    <TabsTrigger value="water">Water Quality</TabsTrigger>
                    <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  </TabsList>

                  <TabsContent value="erosion" className="space-y-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={eroding}>
                        <defs>
                          <linearGradient id="colorErosion" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                        <Area type="monotone" dataKey="erosionIndex" stroke="hsl(var(--destructive))" fill="url(#colorErosion)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                    <Alert className="bg-orange-500/10 border-orange-500/20">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <AlertTitle>Erosion index increasing</AlertTitle>
                      <AlertDescription>
                        Trend shows peak erosion risk at 12:00-16:00. Recommend monitoring intensification.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="moisture" className="space-y-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={eroding}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                        <Line type="monotone" dataKey="soilMoisture" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                      </LineChart>
                    </ResponsiveContainer>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Moisture dip detected</AlertTitle>
                      <AlertDescription>
                        Soil moisture dropped to 45% at 12:00. Consider irrigation intervention if continues.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="water" className="space-y-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={eroding}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                        <Bar dataKey="waterQuality" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <Alert className="bg-green-500/10 border-green-500/20">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertTitle>Water quality stable</AlertTitle>
                      <AlertDescription>
                        Quality metrics within acceptable range. Current trend is positive.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="temperature" className="space-y-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={eroding}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                        <Bar dataKey="temperature" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                        <Line type="monotone" dataKey="temperature" stroke="hsl(var(--accent))" strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Risk Assessment by Zone */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <BarChart3 className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle>Erosion Risk by Zone</CardTitle>
                      <CardDescription>Current risk assessment across monitored areas</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="zone" type="category" stroke="hsl(var(--muted-foreground))" width={60} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }} />
                    <Bar dataKey="riskLevel" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                      {riskData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.status === "critical" ? "hsl(var(--destructive))" : entry.status === "warning" ? "hsl(var(--chart-2))" : "hsl(var(--chart-1))"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Alerts & Insights */}
          <div className="space-y-6">
            {/* Active Alerts */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Active Alerts
                  </CardTitle>
                  <Badge variant="secondary">{alerts.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-lg border-l-4 space-y-2 ${
                      alert.severity === "critical"
                        ? "bg-red-500/10 border-l-red-500"
                        : alert.severity === "warning"
                        ? "bg-orange-500/10 border-l-orange-500"
                        : "bg-blue-500/10 border-l-blue-500"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {alert.severity === "critical" ? (
                          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        ) : alert.severity === "warning" ? (
                          <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{alert.zone}</div>
                          <div className="text-xs text-muted-foreground">{alert.time}</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                    <Button size="sm" variant="ghost" className="w-full h-7 text-xs">
                      {alert.action}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Sensor Health Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="w-5 h-5 text-primary" />
                  Sensor Network Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sensorHealth.map((sensor) => (
                  <div key={sensor.sensor} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="text-xs font-semibold">{sensor.sensor}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${sensor.status === "online" ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                        <span className="text-[10px] text-muted-foreground capitalize">{sensor.status}</span>
                      </div>
                    </div>
                    {sensor.status === "online" && (
                      <div className="text-right">
                        <div className="text-[10px] text-muted-foreground">{sensor.latency}</div>
                        <div className="text-[10px] font-mono text-primary">{sensor.accuracy}</div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Metrics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Gauge className="w-5 h-5 text-primary" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-medium">Data Processing</span>
                    <span className="text-xs text-primary">98%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "98%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-medium">Model Latency</span>
                    <span className="text-xs text-primary">142ms</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Within target range</div>
                </div>
                <Separator />
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Last Updated: 2 minutes ago</div>
                  <div>Data Sync: 99.7% complete</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Restoration Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <ZoomIn className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>AI-Driven Restoration Recommendations</CardTitle>
                  <CardDescription>Site-specific strategies based on erosion analysis and Digital Twin simulations</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {recommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: rec.id * 0.1 }}
                  className={`p-4 rounded-lg border ${getRiskBg(rec.confidence)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      variant="outline"
                      className={rec.type === "Urgent" ? "bg-red-500/10 text-red-700" : "bg-orange-500/10 text-orange-700"}
                    >
                      {rec.type}
                    </Badge>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Confidence</div>
                      <div className={`font-bold ${getRiskColor(rec.confidence)}`}>{rec.confidence}%</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                    <div className="flex items-center gap-2 p-2 bg-primary/5 rounded text-xs font-medium text-primary">
                      <TrendingUp className="w-3 h-3" />
                      Impact: {rec.estimatedImpact}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Simulate
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Digital Twin Integration</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Visualize and test restoration strategies in our virtual environment before implementation. Compare multiple scenarios to optimize environmental impact and cost-effectiveness.
                  </p>
                  <Button size="sm" variant="outline" className="gap-2">
                    <MapIcon className="w-4 h-4" />
                    Launch Digital Twin Simulator
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map View Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Spatial Risk Analysis</CardTitle>
                  <CardDescription>Geographic distribution of erosion risk zones</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <ZoomIn className="w-4 h-4" />
                  View Map
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-border flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551109729-4bae89b53caf?q=80&w=2070&auto=format&fit=crop"
                alt="Ganga Basin Map"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-start p-6">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
                  <div className="font-semibold mb-2">Risk Zone Legend</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-xs">Critical Risk (70+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-xs">High Risk (50-70)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-xs">Moderate Risk (30-50)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Export & Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Data Access & Documentation</CardTitle>
            <CardDescription>Download reports, datasets, and technical documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4 gap-4 text-left" asChild>
                <a href="#" className="flex-1">
                  <Download className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">Export Daily Report</div>
                    <div className="text-xs text-muted-foreground">PDF - Last 24 hours data</div>
                  </div>
                </a>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 gap-4 text-left" asChild>
                <a href="#" className="flex-1">
                  <Database className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">Download Dataset</div>
                    <div className="text-xs text-muted-foreground">CSV - Raw sensor data</div>
                  </div>
                </a>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 gap-4 text-left" asChild>
                <a href="#" className="flex-1">
                  <Settings className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">API Documentation</div>
                    <div className="text-xs text-muted-foreground">Integrate with your systems</div>
                  </div>
                </a>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4 gap-4 text-left" asChild>
                <a href="#" className="flex-1">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold">Technical Whitepaper</div>
                    <div className="text-xs text-muted-foreground">Methodology & accuracy</div>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
