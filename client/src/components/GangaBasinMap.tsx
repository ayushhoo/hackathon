import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { motion } from "framer-motion";
import {
  MapPin, Layers, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw, Info,
  Droplet, Wind, Gauge, AlertTriangle, CheckCircle2, Shield, Database
} from "lucide-react";

interface SoilZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  erosionRisk: number;
  soilType: string;
  soilStrength: number;
  moisture: number;
  temperature: number;
  ph: number;
  status: "critical" | "warning" | "moderate" | "low";
}

interface MapLayerVisibility {
  erosion: boolean;
  soilTypes: boolean;
  moisture: boolean;
  temperature: boolean;
  strength: boolean;
  sensors: boolean;
}

const gangaBasinZones: SoilZone[] = [
  {
    id: "zone-a",
    name: "Upper Ganga - Upstream Region",
    lat: 40.2,
    lng: 30.1,
    erosionRisk: 85,
    soilType: "Silty Loam",
    soilStrength: 35,
    moisture: 45,
    temperature: 22,
    ph: 6.8,
    status: "critical"
  },
  {
    id: "zone-b",
    name: "Middle Ganga - Confluence Zone",
    lat: 35.8,
    lng: 32.5,
    erosionRisk: 62,
    soilType: "Sandy Clay",
    soilStrength: 52,
    moisture: 68,
    temperature: 24,
    ph: 7.2,
    status: "warning"
  },
  {
    id: "zone-c",
    name: "Central Basin - Agricultural Area",
    lat: 33.2,
    lng: 34.1,
    erosionRisk: 38,
    soilType: "Clay Loam",
    soilStrength: 68,
    moisture: 72,
    temperature: 26,
    ph: 7.5,
    status: "moderate"
  },
  {
    id: "zone-d",
    name: "Lower Ganga - Delta Region",
    lat: 30.5,
    lng: 35.8,
    erosionRisk: 28,
    soilType: "Alluvial Clay",
    soilStrength: 78,
    moisture: 82,
    temperature: 28,
    ph: 7.8,
    status: "low"
  },
  {
    id: "zone-e",
    name: "Riparian Buffer Zone",
    lat: 32.1,
    lng: 33.2,
    erosionRisk: 45,
    soilType: "Organic Loam",
    soilStrength: 62,
    moisture: 75,
    temperature: 25,
    ph: 7.1,
    status: "moderate"
  }
];

export default function GangaBasinMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedZone, setSelectedZone] = useState<SoilZone | null>(gangaBasinZones[0]);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [layers, setLayers] = useState<MapLayerVisibility>({
    erosion: true,
    soilTypes: true,
    moisture: true,
    temperature: false,
    strength: true,
    sensors: true
  });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; zone: SoilZone } | null>(null);
  const [animationFrame, setAnimationFrame] = useState(0);

  // Color mapping functions
  const getRiskColor = (riskLevel: number): string => {
    if (riskLevel >= 70) return "#ef4444"; // red
    if (riskLevel >= 50) return "#f97316"; // orange
    if (riskLevel >= 30) return "#eab308"; // yellow
    return "#22c55e"; // green
  };

  const getSoilStrengthColor = (strength: number): string => {
    if (strength >= 70) return "#16a34a"; // strong green
    if (strength >= 50) return "#84cc16"; // lime
    if (strength >= 30) return "#facc15"; // lighter yellow
    return "#f87171"; // light red
  };

  const getMoistureColor = (moisture: number): string => {
    if (moisture >= 70) return "#0ea5e9"; // sky blue
    if (moisture >= 50) return "#06b6d4"; // cyan
    if (moisture >= 30) return "#f59e0b"; // amber
    return "#dc2626"; // red
  };

  const getTemperatureColor = (temp: number): string => {
    if (temp >= 26) return "#dc2626"; // hot red
    if (temp >= 24) return "#f97316"; // warm orange
    if (temp >= 22) return "#eab308"; // neutral yellow
    return "#3b82f6"; // cool blue
  };

  // Draw 3D map visualization on canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, width, height);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#e0f2fe");
    gradient.addColorStop(1, "#f0fdf4");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw 3D effect base
    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(0, height * 0.7, width, height * 0.3);

    // Draw Ganga River path
    ctx.strokeStyle = "#0ea5e9";
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.2);
    ctx.quadraticCurveTo(width * 0.4, height * 0.35, width * 0.6, height * 0.55);
    ctx.quadraticCurveTo(width * 0.8, height * 0.75, width * 0.95, height * 0.85);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Function to convert lat/lng to canvas coordinates
    const toCanvasCoord = (lat: number, lng: number) => {
      const x = (lng / 40) * (width * 0.8) + width * 0.1;
      const y = (lat / 40.5) * (height * 0.6) + height * 0.15;
      return { x, y };
    };

    // Draw zones with layers
    gangaBasinZones.forEach((zone, index) => {
      const coords = toCanvasCoord(zone.lat, zone.lng);
      const baseRadius = (zoom / 100) * 25;

      // Animated pulse effect
      const pulseScale = 1 + Math.sin(animationFrame * 0.05 + index) * 0.1;

      // Layer 1: Erosion Risk (main visualization)
      if (layers.erosion) {
        ctx.fillStyle = getRiskColor(zone.erosionRisk);
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, baseRadius * pulseScale, 0, Math.PI * 2);
        ctx.fill();

        // Erosion indicator rings
        ctx.strokeStyle = getRiskColor(zone.erosionRisk);
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.4;
        for (let i = 1; i <= 3; i++) {
          ctx.beginPath();
          ctx.arc(coords.x, coords.y, baseRadius * i * 0.6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;

      // Layer 2: Soil Strength (inner circle)
      if (layers.strength) {
        ctx.fillStyle = getSoilStrengthColor(zone.soilStrength);
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, baseRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Layer 3: Moisture visualization (outline)
      if (layers.moisture) {
        ctx.strokeStyle = getMoistureColor(zone.moisture);
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, baseRadius * 0.8, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Layer 4: Temperature (corner indicator)
      if (layers.temperature) {
        const tempColor = getTemperatureColor(zone.temperature);
        ctx.fillStyle = tempColor;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(
          coords.x + baseRadius * 0.6,
          coords.y - baseRadius * 0.6,
          baseRadius * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw zone ID/label
      ctx.fillStyle = "#1f2937";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(zone.name.split(" - ")[0], coords.x, coords.y + baseRadius + 20);

      // Highlight selected zone
      if (selectedZone?.id === zone.id) {
        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, baseRadius * 1.3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    // Draw legend
    const legendX = width - 180;
    const legendY = 20;
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.fillRect(legendX - 10, legendY - 10, 170, 160);
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 1;
    ctx.strokeRect(legendX - 10, legendY - 10, 170, 160);

    // Legend title
    ctx.fillStyle = "#1f2937";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Erosion Risk Legend", legendX, legendY + 15);

    // Legend items
    const legendItems = [
      { color: "#ef4444", label: "Critical (70+)" },
      { color: "#f97316", label: "High (50-70)" },
      { color: "#eab308", label: "Moderate (30-50)" },
      { color: "#22c55e", label: "Low (<30)" }
    ];

    legendItems.forEach((item, i) => {
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(legendX + 8, legendY + 35 + i * 25, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#374151";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(item.label, legendX + 20, legendY + 38 + i * 25);
    });

    // Draw coordinates info
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`Rotation: ${rotation}°`, 10, height - 10);
    ctx.fillText(`Zoom: ${zoom}%`, 10, height - 25);
  }, [zoom, rotation, selectedZone, layers, animationFrame]);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(f => (f + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if mouse is over any zone
    const toCanvasCoord = (lat: number, lng: number) => {
      const width = canvas.width;
      const height = canvas.height;
      const x = (lng / 40) * (width * 0.8) + width * 0.1;
      const y = (lat / 40.5) * (height * 0.6) + height * 0.15;
      return { x, y };
    };

    const baseRadius = (zoom / 100) * 25;

    for (const zone of gangaBasinZones) {
      const coords = toCanvasCoord(zone.lat, zone.lng);
      const distance = Math.sqrt(
        Math.pow(mouseX - coords.x, 2) + Math.pow(mouseY - coords.y, 2)
      );

      if (distance < baseRadius * 1.2) {
        setTooltip({ x: mouseX, y: mouseY, zone });
        return;
      }
    }
    setTooltip(null);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Interactive 3D Ganga Basin Map</CardTitle>
              <CardDescription>
                Real-time soil erosion, characteristics, and environmental data
              </CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setZoom(100);
                setRotation(0);
              }}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Map Canvas */}
        <div className="relative">
          <motion.canvas
            ref={canvasRef}
            width={800}
            height={500}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={() => setTooltip(null)}
            onClick={(e) => {
              const rect = canvasRef.current?.getBoundingClientRect();
              if (!rect) return;

              const toCanvasCoord = (lat: number, lng: number) => {
                const canvas = canvasRef.current;
                if (!canvas) return { x: 0, y: 0 };
                const width = canvas.width;
                const height = canvas.height;
                const x = (lng / 40) * (width * 0.8) + width * 0.1;
                const y = (lat / 40.5) * (height * 0.6) + height * 0.15;
                return { x, y };
              };

              const baseRadius = (zoom / 100) * 25;

              for (const zone of gangaBasinZones) {
                const coords = toCanvasCoord(zone.lat, zone.lng);
                const distance = Math.sqrt(
                  Math.pow(e.clientX - rect.left - coords.x, 2) +
                  Math.pow(e.clientY - rect.top - coords.y, 2)
                );

                if (distance < baseRadius * 1.2) {
                  setSelectedZone(zone);
                  return;
                }
              }
            }}
            className="w-full border border-border rounded-lg cursor-crosshair bg-white dark:bg-slate-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Tooltip */}
          {tooltip && (
            <motion.div
              className="absolute bg-black/90 text-white p-3 rounded-lg text-xs z-10 pointer-events-none"
              style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="font-semibold">{tooltip.zone.name}</div>
              <div className="text-xs text-gray-300 mt-1">
                <div>Risk: {tooltip.zone.erosionRisk}%</div>
                <div>Soil: {tooltip.zone.soilType}</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Map Controls */}
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Zoom</label>
                <span className="text-sm text-primary">{zoom}%</span>
              </div>
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                min={50}
                max={200}
                step={10}
              />

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Rotation</label>
                <span className="text-sm text-primary">{rotation}°</span>
              </div>
              <Slider
                value={[rotation]}
                onValueChange={(value) => setRotation(value[0])}
                min={0}
                max={360}
                step={15}
              />
            </div>
          </div>

          {/* Layer Controls */}
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Visualization Layers
              </h4>
              <div className="space-y-2">
                {[
                  { key: "erosion", label: "Erosion Risk", icon: AlertTriangle },
                  { key: "soilTypes", label: "Soil Types", icon: Database },
                  { key: "moisture", label: "Soil Moisture", icon: Droplet },
                  { key: "temperature", label: "Temperature", icon: Wind },
                  { key: "strength", label: "Soil Strength", icon: Shield },
                  { key: "sensors", label: "Sensor Network", icon: Gauge }
                ].map(({ key, label, icon: Icon }) => (
                  <Toggle
                    key={key}
                    pressed={layers[key as keyof MapLayerVisibility]}
                    onPressedChange={() =>
                      setLayers((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof MapLayerVisibility]
                      }))
                    }
                    className="w-full justify-start"
                  >
                    {layers[key as keyof MapLayerVisibility] ? (
                      <Eye className="w-4 h-4 mr-2" />
                    ) : (
                      <EyeOff className="w-4 h-4 mr-2" />
                    )}
                    {label}
                  </Toggle>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zone Details */}
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-lg p-6"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Zone Name</div>
                <div className="text-lg font-semibold">{selectedZone.name}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <AlertTriangle className="w-4 h-4" />
                  Erosion Risk
                </div>
                <div className="text-lg font-semibold">{selectedZone.erosionRisk}%</div>
                <Badge variant="outline" className={`text-xs ${
                  selectedZone.status === "critical" ? "bg-red-500/10 text-red-700" :
                  selectedZone.status === "warning" ? "bg-orange-500/10 text-orange-700" :
                  selectedZone.status === "moderate" ? "bg-yellow-500/10 text-yellow-700" :
                  "bg-green-500/10 text-green-700"
                }`}>
                  {selectedZone.status.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  Soil Strength
                </div>
                <div className="text-lg font-semibold">{selectedZone.soilStrength}%</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-green-500"
                    style={{ width: `${selectedZone.soilStrength}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Droplet className="w-4 h-4" />
                  Soil Moisture
                </div>
                <div className="text-lg font-semibold">{selectedZone.moisture}%</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-blue-500"
                    style={{ width: `${selectedZone.moisture}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-4 pt-4 border-t border-border">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Soil Type</div>
                <div className="font-semibold text-sm">{selectedZone.soilType}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Temperature</div>
                <div className="font-semibold text-sm">{selectedZone.temperature}°C</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">pH Level</div>
                <div className="font-semibold text-sm">{selectedZone.ph}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Coordinates</div>
                <div className="font-semibold text-sm text-xs">{selectedZone.lat}°N, {selectedZone.lng}°E</div>
              </div>
              <Button size="sm" className="w-full mt-auto">
                View Full Analysis
              </Button>
            </div>
          </motion.div>
        )}

        {/* Zone Selector */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="text-sm font-semibold mb-3">Monitored Zones</h4>
          <div className="grid md:grid-cols-5 gap-2">
            {gangaBasinZones.map((zone) => (
              <motion.button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg border-2 transition-all text-left text-xs ${
                  selectedZone?.id === zone.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 bg-background"
                }`}
              >
                <div className="font-semibold truncate">{zone.name.split(" - ")[0]}</div>
                <div className="flex items-center gap-1 mt-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getRiskColor(zone.erosionRisk) }}
                  />
                  <span className="text-xs text-muted-foreground">{zone.erosionRisk}%</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Information Panel */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-2">
              <p className="font-semibold text-sm">Color Coding Guide</p>
              <p className="text-muted-foreground">
                <strong>Outer Circle:</strong> Red/Orange/Yellow/Green indicates erosion risk levels from critical to low.
                <br />
                <strong>Inner Circle:</strong> Green shades show soil strength - darker green = stronger soil.
                <br />
                <strong>Ring Color:</strong> Blue indicates soil moisture levels.
                <br />
                <strong>Corner Dot:</strong> Temperature indicator - red = hot, blue = cool.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
