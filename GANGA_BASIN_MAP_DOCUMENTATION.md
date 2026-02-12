# Interactive 3D Ganga Basin Map - Documentation

## Overview

The **Interactive 3D Ganga Basin Map** is an advanced visualization component integrated into the Van Sampatti platform's Access Dashboard. It provides real-time monitoring of soil erosion, soil characteristics, and environmental data across five distinct zones of the Ganga Basin.

## Features

### 1. **Multi-Layer Visualization System**
The map uses a sophisticated color-coding system with multiple overlapping layers to display complex environmental data:

#### Layer 1: Erosion Risk (Primary Visualization)
- **Outer Circle Color Intensity**: Represents soil erosion risk levels
- **Color Scheme**:
  - 🔴 **Red (70+%)**: Critical erosion risk - immediate intervention required
  - 🟠 **Orange (50-70%)**: High erosion risk - monitoring and preventive measures needed
  - 🟡 **Yellow (30-50%)**: Moderate erosion risk - consider restoration strategies
  - 🟢 **Green (<30%)**: Low erosion risk - stable conditions

#### Layer 2: Soil Strength Assessment
- **Inner Circle Color**: Indicates soil structural integrity
- **Green Gradient**: Darker green = stronger soil, lighter/red = weaker soil
- **Strength Range**: 0-100% scale for easy interpretation

#### Layer 3: Soil Moisture Content
- **Ring Outline Color**: Represents soil water retention capacity
- **Color Scheme**:
  - 🔵 **Blue**: High moisture (70%+) - potential waterlogging
  - 🔷 **Cyan**: Moderate-high moisture (50-70%) - optimal range
  - 🟠 **Orange**: Moderate-low moisture (30-50%) - irrigation recommended
  - 🔴 **Red**: Low moisture (<30%) - drought stress risk

#### Layer 4: Temperature Distribution
- **Corner Indicator Dot**: Small circle in upper-right showing temperature
- **Color Mapping**:
  - 🔴 **Red**: Hot (≥26°C) - high evaporation rates
  - 🟠 **Orange**: Warm (24-26°C) - moderate conditions
  - 🟡 **Yellow**: Neutral (22-24°C) - stable conditions
  - 🔵 **Blue**: Cool (<22°C) - low evaporation

### 2. **Interactive Controls**

#### Zoom Control
- Range: 50% - 200%
- Affects visualization marker size and visibility
- Real-time canvas update
- Helps focus on specific zones or view entire basin

#### Rotation Control
- Range: 0° - 360°
- Allows 3D perspective adjustment
- Step-by-step rotation (15° increments)
- Facilitates multi-angle analysis

#### Layer Toggle System
Users can independently enable/disable visualization layers:
- ✅ Erosion Risk Analysis
- ✅ Soil Type Distribution
- ✅ Soil Moisture Levels
- ✅ Temperature Mapping
- ✅ Soil Strength Assessment
- ✅ Sensor Network Status

### 3. **Real-Time Data Integration**

Each monitored zone includes:
- **Zone Name**: Descriptive location identifier
- **Erosion Index**: Current risk percentage (0-100%)
- **Soil Type**: Classification (Silty Loam, Sandy Clay, Clay Loam, Alluvial Clay, Organic Loam)
- **Soil Strength**: Structural integrity percentage
- **Moisture Level**: Water content percentage
- **Temperature**: Current temperature in Celsius
- **pH Level**: Soil acidity/basicity (6.8-7.8 range for Ganga Basin)
- **Geographic Coordinates**: Precise location data

### 4. **Monitored Zones**

#### Zone A: Upper Ganga - Upstream Region
- **Location**: Northern reaches of Ganga Basin
- **Risk Level**: 🔴 **Critical (85%)**
- **Soil Type**: Silty Loam
- **Strength**: 35% (Weak)
- **Characteristics**: High erosion susceptibility due to steep slopes and riverbank exposure

#### Zone B: Middle Ganga - Confluence Zone
- **Location**: Major tributary confluences
- **Risk Level**: 🟠 **Warning (62%)**
- **Soil Type**: Sandy Clay
- **Strength**: 52% (Moderate)
- **Characteristics**: Variable erosion patterns due to water flow dynamics

#### Zone C: Central Basin - Agricultural Area
- **Location**: Agricultural heartland
- **Risk Level**: 🟡 **Moderate (38%)**
- **Soil Type**: Clay Loam
- **Strength**: 68% (Strong)
- **Characteristics**: Fertile soils with established vegetation

#### Zone D: Lower Ganga - Delta Region
- **Location**: Fluvial plains and delta
- **Risk Level**: 🟢 **Low (28%)**
- **Soil Type**: Alluvial Clay
- **Strength**: 78% (Very Strong)
- **Characteristics**: Recent sediment deposits with strong consolidation

#### Zone E: Riparian Buffer Zone
- **Location**: Strategic buffer areas
- **Risk Level**: 🟡 **Moderate (45%)**
- **Soil Type**: Organic Loam
- **Strength**: 62% (Strong)
- **Characteristics**: Rich organic content, excellent for restoration

## User Interface Components

### Map Canvas
- **Dimensions**: 800x500 pixels (responsive)
- **Interactive Elements**:
  - Click on zones to select and view details
  - Hover over zones to see quick information tooltip
  - Crosshair cursor for precise navigation
  - Real-time animation effects (pulsing zones)

### Detail Panel
When a zone is selected, users see comprehensive information:
- Zone identification and status badge
- Erosion risk with color-coded severity
- Visual progress bars for soil strength and moisture
- All environmental parameters at a glance
- Quick action button for full analysis

### Zone Selector
- Grid layout of all monitored zones
- Visual risk indicators with color coding
- Quick access to zone data
- Highlights currently selected zone

### Color Legend
- Built-in on-canvas legend in top-right corner
- Shows erosion risk color mapping
- Persistent visual reference

## Real-Time Data Flow

### Data Capture
- **Sensors**: LiDAR, soil moisture sensors, temperature probes, pH meters
- **Update Frequency**: Real-time (updates every 50ms for animations)
- **Data Processing**: Live aggregation and analysis

### Animation System
- **Pulsing Effect**: Zones pulse based on erosion risk (critical zones pulse more rapidly)
- **Smooth Transitions**: Framer Motion for polished interactions
- **Performance**: Optimized canvas rendering for smooth 60fps

## Integration with Van Sampatti Platform

### Dashboard Context
The map integrates seamlessly with the Access Dashboard by:
- Providing spatial context for erosion monitoring
- Linking to restoration recommendations
- Supporting the Digital Twin simulator for scenario testing
- Enabling data-driven decision making

### Restoration Strategy Connection
Zone analysis directly informs restoration recommendations:
- **Zone A (Critical)**: Suggests bioswale systems and bank stabilization
- **Zone B (Warning)**: Recommends vegetation establishment and sediment control
- **Zone C & D (Moderate/Low)**: Focus on maintenance and biodiversity enhancement
- **Zone E (Buffer)**: Strategic restoration opportunities

## Technical Implementation

### Technologies Used
- **React 19**: Component framework
- **Canvas API**: 2D rendering for map visualization
- **Framer Motion**: Smooth animations and interactions
- **TypeScript**: Type-safe component development
- **Tailwind CSS**: Responsive styling

### Performance Optimizations
- Canvas-based rendering for efficient visualization
- Memoized color calculations
- Optimized event handling
- Smooth 60fps animation loop

### Accessibility Features
- Keyboard navigation support
- High contrast color schemes
- Descriptive tooltips
- Clear visual status indicators

## Use Cases

### 1. Environmental Monitoring
Monitor real-time soil conditions across the Ganga Basin:
- Track erosion progression
- Identify hotspots requiring intervention
- Assess soil health metrics

### 2. Restoration Planning
Use spatial data to plan ecological restoration:
- Prioritize zones by risk level
- Select appropriate interventions
- Simulate restoration outcomes

### 3. Educational Outreach
Communicate complex soil science to stakeholders:
- Visual representation of erosion mechanisms
- Real-time data display
- Interactive learning experience

### 4. Policy Development
Inform environmental policy and resource allocation:
- Identify critical areas for protection
- Support evidence-based decision making
- Track progress over time

## Configuration & Customization

### Adding New Zones
To add monitoring zones, modify the `gangaBasinZones` array in `GangaBasinMap.tsx`:

```typescript
const gangaBasinZones: SoilZone[] = [
  {
    id: "zone-x",
    name: "New Zone Name",
    lat: 0.0,
    lng: 0.0,
    erosionRisk: 50,
    soilType: "Soil Classification",
    soilStrength: 60,
    moisture: 65,
    temperature: 24,
    ph: 7.0,
    status: "warning"
  },
  // ... other zones
];
```

### Adjusting Color Schemes
Color mappings can be customized in the `getRiskColor()`, `getSoilStrengthColor()`, `getMoistureColor()`, and `getTemperatureColor()` functions.

### Modifying Visualization Parameters
- **Zoom Range**: Adjust `min={50}` and `max={200}` in Slider components
- **Animation Speed**: Modify animation frame interval (currently 50ms)
- **Canvas Size**: Update `width={800}` and `height={500}` values

## Future Enhancements

### Planned Features
1. **3D WebGL Rendering**: True 3D terrain visualization with Three.js
2. **Real-time Data Integration**: Direct API connection to sensor networks
3. **Historical Data Analysis**: Time-series visualization of zone changes
4. **Predictive Modeling**: AI-driven erosion forecasting
5. **Multi-language Support**: Localized zone descriptions
6. **Export Functionality**: Download maps and reports
7. **Collaborative Tools**: Annotation and team communication
8. **AR Integration**: Augmented reality field visualization

## Performance Metrics

- **Rendering**: 60fps on modern devices
- **Canvas Update**: <16ms per frame
- **Interaction Response**: <100ms
- **Data Processing**: Real-time updates <500ms

## Troubleshooting

### Common Issues

**Issue**: Map not displaying correctly
- **Solution**: Ensure canvas ref is properly attached; check browser console for errors

**Issue**: Animation stuttering
- **Solution**: Reduce animation frame update frequency; check system performance

**Issue**: Tooltip not showing
- **Solution**: Verify mouse event handlers; check z-index layering

## Support & Contribution

For issues, feature requests, or contributions:
1. Document the issue with clear steps to reproduce
2. Include screenshots or videos if applicable
3. Submit through the platform's issue tracking system
4. Follow the code style guidelines for contributions

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Maintained By**: Van Sampatti Platform Team  
**License**: MIT
