# @trapar-waves/react-three-maplibre

![npm version](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![npm dm](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![License](https://img.shields.io/github/license/Trapar-waves/react-three-maplibre)
![GitHub last commit](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Trapar-waves/react-three-maplibre/release.yml)
![Renovate](https://img.shields.io/badge/renovate-enabled-blue)

---

[English](../README.md) | [日本語](/readme/README-JP.md) | [Русский язык](/readme/README-RU.md)

> 一个基于React的库，集成了Three.js、MapLibre和AntV，用于高级地理空间3D可视化。

## ✨ 特性

- **地理空间可视化:** 结合`@antv/l7`和`maplibre-gl`，通过自定义地图图层实现强大的地理空间数据渲染。
- **React 3D渲染:** 利用`@react-three/fiber`和`@react-three/drei`将Three.js集成到基于React的工作流中，实现声明式3D场景管理。
- **可定制UI集成:** 提供与React（`react`、`react-dom`）的无缝集成，用于构建交互式地理空间应用。
- **实用优先的样式:** 采用`tailwindcss`为组件和布局提供灵活快速的样式设计。
- **类型安全:** 使用TypeScript确保类型安全，提升开发过程中的开发者体验。
- **快速开发工作流:** 利用`rsbuild`实现优化构建和高效的开发服务器性能。
- **丰富的组件库:** 与`three-stdlib`和`@react-three/drei`集成，提供可重用的Three.js工具和组件。
- **地图交互性:** 实现`react-map-gl`，用于地理空间环境中的交互式地图控制和客户端导航。
- **AntV增强功能:** 整合`@antv/l7-maps`，提供额外的地图分层功能和可视化工具。

## 💻 技术栈

- **框架/库:** React
- **UI工具包/样式:** Tailwind CSS
- **3D渲染:** Three.js（`@react-three/fiber`、`@react-three/drei`）
- **地理空间库:** MapLibre GL、AntV L7
- **构建工具:** Rsbuild
- **语言:** TypeScript

完整依赖列表参见[package.json](package.json)。

## 🚀 开始使用

按照以下说明在本地运行项目。

### 前提条件

确保已安装以下软件：

- Node.js (推荐 >= 18.x 版本)
- 包管理器 (npm, yarn 或 pnpm)

```bash
node -v
npm -v
```

### 安装步骤

1. 使用模板创建新项目：

```bash
pnpm create trapar-waves
```

2. 进入项目目录并安装依赖：

```bash
cd your-project-name
pnpm install
# or
npm install
# or
yarn install
```

### 开发

启动带热重载的开发服务器：

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

默认情况下，应用程序将在 `http://localhost:3000` 可用。

### 构建生产版本

创建生产构建：

```bash
pnpm build
# or
npm run build
# or
yarn build
```

在本地预览生产构建：

```bash
pnpm preview
# or
npm run preview
# or
yarn preview
```

## 📦 使用方法

该库被设计为用于创建地理空间3D可视化应用程序的模板。它提供了一个基础设置，包括 React、Three.js、MapLibre GL 和 AntV L7。

### 基本示例

以下是一个如何使用此模板提供的组件的简单示例：

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

这个示例演示了：

- 使用 `react-map-gl` 创建 MapLibre GL 地图
- 集成 AntV L7 进行地理空间数据可视化
- 使用 React Three Fiber 和 Drei 进行 3D 渲染
- 使用 `react-three-map` 将 3D 对象相对于地图进行定位

### 环境变量

要使用 MapTiler 等地图服务，您需要设置环境变量。在项目根目录创建一个 `.env` 文件：

```
PUBLIC_MAPTILER_KEY=your_maptiler_api_key_here
```

确保将 `.env` 添加到 `.gitignore` 中以保证密钥安全。

## 🤝 贡献指南

欢迎贡献，非常感谢您的支持！请按照以下步骤进行贡献：

1. Fork 本仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交您的更改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开Pull Request

请确保您的代码遵循现有风格并通过所有测试。

## 👤 Author

- **Rikka:** (admin@rikka.cc)
- **GitHub Profile:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 Links

- **仓库:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **主页:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **问题:** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
