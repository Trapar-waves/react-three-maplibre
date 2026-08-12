# @trapar-waves/react-three-maplibre

![npm version](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![npm dm](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![License](https://img.shields.io/github/license/Trapar-waves/react-three-maplibre)
![GitHub last commit](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Trapar-waves/react-three-maplibre/release.yml)
![Renovate](https://img.shields.io/badge/renovate-enabled-blue)

---

[中文](./readme/README-CN.md) | [日本語](./readme/README-JP.md) | [Русский язык](./readme/README-RU.md)

> A React-based library integrating Three.js, MapLibre, and AntV for advanced geospatial 3D visualizations.

![react-three-maplibre hero](assets/readme/hero.svg)

![Features](assets/readme/headers/features.svg)

- **Geospatial Visualization:** Combines `@antv/l7` and `maplibre-gl` for powerful geospatial data rendering with custom map layers.
- **3D Rendering with React:** Leverages `@react-three/fiber` and `@react-three/drei` to integrate Three.js into a React-based workflow for declarative 3D scene management.
- **Customizable UI Integration:** Offers seamless integration with React (`react`, `react-dom`) for building interactive geospatial applications.
- **Utility-First Styling:** Employs `tailwindcss` for flexible and rapid styling of components and layouts.
- **Type Safety:** Uses TypeScript to ensure type safety and improve developer experience during development.
- **Fast Development Workflow:** Utilizes `rsbuild` for optimized builds and efficient development server performance.
- **Rich Component Library:** Integrates with `three-stdlib` and `@react-three/drei` for reusable Three.js utilities and components.
- **Map Interactivity:** Implements `react-map-gl` for interactive map controls and client-side navigation in geospatial contexts.
- **AntV Enhancements:** Incorporates `@antv/l7-maps` for additional map layering capabilities and visualization tools.

![Tech Stack](assets/readme/headers/tech-stack.svg)

- **Framework/Library:** `React`
- **UI Toolkit/Styling:** `Tailwind CSS`
- **3D Rendering:** `Three.js` (`@react-three/fiber`, `@react-three/drei`)
- **Geospatial Libraries:** `MapLibre GL`, `AntV L7`
- **Build Tool:** `Rsbuild`
- **Language:** `TypeScript`

See the [package.json](./package.json) for a full list of dependencies.

![Getting Started](assets/readme/headers/getting-started.svg)

### Prerequisites

- Node.js (>= 18.x recommended)
- Package manager (npm, yarn, or pnpm)

### Installation

1. Create a new project using the template:

   ```bash
   pnpm create trapar-waves
   ```

2. Navigate to your project directory and install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

![Project Structure](assets/readme/headers/project-structure.svg)

```
├── public/             # Static assets
├── src/                # Source code
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Entry point
├── rsbuild.config.ts   # Rsbuild configuration
├── tsconfig.json       # TypeScript configuration
├── eslint.config.js    # ESLint configuration
└── package.json        # Project dependencies and scripts
```

![Usage](assets/readme/headers/usage.svg)

This library is designed to be used as a template for creating geospatial 3D visualization applications. It provides a foundational setup with React, Three.js, MapLibre GL, and AntV L7.

### Basic Example

Here's a simple example of how to use the components provided by this template:

```tsx
// App.tsx
import type { ReactNode } from "react";
import type { MapRef } from "react-map-gl/maplibre";
import { PointLayer, Scene } from "@antv/l7";
import { MapLibre } from "@antv/l7-maps";
import { Box, Stats } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useRef } from "react";
import Map from "react-map-gl/maplibre";
import { Canvas } from "react-three-map/maplibre";
import { LineMaterial, LineSegments2, LineSegmentsGeometry } from "three-stdlib";

extend({ LineSegmentsGeometry, LineMaterial, LineSegments2 });

declare module "@react-three/fiber" {
  interface ThreeElements {
    lineSegmentsGeometry: ThreeElements["bufferGeometry"];
    lineMaterial: ThreeElements["material"] & Partial<LineMaterial>;
    lineSegments2: ThreeElements["object3D"] & { children?: ReactNode };
  }
}

const latLon = {
  latitude: 31.215175,
  longitude: 121.417463,
};
const MAPTILER_KEY = import.meta.env.PUBLIC_MAPTILER_KEY;

function App() {
  const ref = useRef<HTMLDivElement>(null!);
  const mapRef = useRef<MapRef>(null!);
  function initL7() {
    if (mapRef.current) {
      const scene = new Scene({
        id: "map",
        map: new MapLibre({
          mapInstance: mapRef.current.getMap(),
        }),
      });
      scene.on("loaded", () => {
        fetch("/BElVQFEFvpAKzddxFZxJ.txt")
          .then(res => res.text())
          .then((data) => {
            const pointLayer = new PointLayer({
              blend: "additive",
            })
              .source(data, {
                parser: {
                  type: "csv",
                  y: "lat",
                  x: "lng",
                },
              })
              .size(0.5)
              .color("#080298");

            scene.addLayer(pointLayer);
          });
      });
    }
  }
  return (
    <div className="h-screen w-screen relative overflow-hidden" ref={ref}>
      <Map
        id="map"
        ref={mapRef}
        initialViewState={{
          ...latLon,
          zoom: 11,
          pitch: 64.88,
        }}
        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`}
        onLoad={initL7}
      >
        <Stats className="stats" parent={ref} />

        <Canvas {...latLon}>
          <hemisphereLight
            args={["#ffffff", "#60666C"]}
            position={[1, 4.5, 3]}
          />
          <object3D scale={500}>
            <Box position={[-1.2, 1, 0]} />
            <Box position={[1.2, 1, 0]} />
          </object3D>
        </Canvas>
      </Map>
    </div>
  );
}

export default App;
```

This example demonstrates:
- Creating a MapLibre GL map with `react-map-gl`
- Integrating AntV L7 for geospatial data visualization
- Using React Three Fiber and Drei for 3D rendering
- Positioning 3D objects relative to the map using `react-three-map`

### Environment Variables

To use map services like MapTiler, you'll need to set up environment variables. Create a `.env` file in your project root:

```
PUBLIC_MAPTILER_KEY=your_maptiler_api_key_here
```

Make sure to add `.env` to your `.gitignore` to keep your keys secure.

![Contributing](assets/readme/headers/contributing.svg)

Contributions are welcome and greatly appreciated! Please follow these steps to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

![License](assets/readme/headers/license.svg)

MIT License © 2025 Trapar Waves

## 👤 Author

- **Rikka:** [admin@rikka.cc](mailto:admin@rikka.cc)
- **GitHub Profile:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 Links

- **Repository:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **Issues:** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
