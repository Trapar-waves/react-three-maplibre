# @trapar-waves/react-three-maplibre

![npm version](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![npm dm](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![License](https://img.shields.io/github/license/Trapar-waves/react-three-maplibre)
![GitHub last commit](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Trapar-waves/react-three-maplibre/release.yml)
![Renovate](https://img.shields.io/badge/renovate-enabled-blue)

---

[English](../README.md) | [日本語](./README-JP.md) | [Русский язык](./README-RU.md)

> 一个基于 React 的库，集成了 Three.js、MapLibre 和 AntV，用于高级地理空间 3D 可视化。

## ✨ 特性

- **地理空间可视化：** 结合 `@antv/l7` 和 `maplibre-gl`，通过自定义地图图层实现强大的地理空间数据渲染。
- **React 3D 渲染：** 利用 `@react-three/fiber` 和 `@react-three/drei` 将 Three.js 集成到基于 React 的工作流中，实现声明式 3D 场景管理。
- **可定制 UI 集成：** 提供与 React（`react`、`react-dom`）的无缝集成，用于构建交互式地理空间应用。
- **实用优先的样式：** 采用 `tailwindcss` 为组件和布局提供灵活快速的样式设计。
- **类型安全：** 使用 TypeScript 确保类型安全，提升开发过程中的开发者体验。
- **快速开发工作流：** 利用 `rsbuild` 实现优化构建和高效的开发服务器性能。
- **丰富的组件库：** 与 `three-stdlib` 和 `@react-three/drei` 集成，提供可重用的 Three.js 工具和组件。
- **地图交互性：** 实现 `react-map-gl`，用于地理空间环境中的交互式地图控制和客户端导航。
- **AntV 增强功能：** 整合 `@antv/l7-maps`，提供额外的地图分层功能和可视化工具。

## 💻 技术栈

- **框架/库：** `React`
- **UI 工具包/样式：** `Tailwind CSS`
- **3D 渲染：** `Three.js`（`@react-three/fiber`、`@react-three/drei`）
- **地理空间库：** `MapLibre GL`、`AntV L7`
- **构建工具：** `Rsbuild`
- **语言：** `TypeScript`

查看 [package.json](../package.json) 获取完整的依赖列表。

## 🚀 快速开始

### 前置条件

- Node.js（推荐 >= 18.x）
- 包管理器（npm、yarn 或 pnpm）

### 安装

1. 使用模板创建新项目：

   ```bash
   pnpm create trapar-waves
   ```

2. 导航到项目目录并安装依赖：

   ```bash
   pnpm install
   ```

3. 启动开发服务器：

   ```bash
   pnpm dev
   ```

## 📁 项目结构

```
├── public/             # 静态资源
├── src/                # 源代码
│   ├── App.tsx         # 主应用组件
│   └── index.tsx       # 入口点
├── rsbuild.config.ts   # Rsbuild 配置
├── tsconfig.json       # TypeScript 配置
├── eslint.config.js    # ESLint 配置
└── package.json        # 项目依赖和脚本
```

## 📦 使用方法

该库被设计为用于创建地理空间 3D 可视化应用程序的模板。它提供了一个基础设置，包括 React、Three.js、MapLibre GL 和 AntV L7。

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
const MAP_STYLE_URL
  = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

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
        mapStyle={MAP_STYLE_URL}
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

### 地图底图

模板默认使用无需 API Key 的 Carto GL 样式（见 `src/App.tsx` 中的 `MAP_STYLE_URL`）。若改用 MapTiler 等需鉴权的服务，请自行设置 `mapStyle` 并通过 `.env` / CI 密钥管理凭据。

## 🤝 贡献

欢迎贡献，非常感谢！请按照以下步骤贡献：

1. Fork 仓库
2. 创建特性分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add some amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 创建 Pull Request

## 📄 许可证

MIT License © 2025 Trapar Waves

## 👤 作者

- **Rikka：** [admin@rikka.cc](mailto:admin@rikka.cc)
- **GitHub 主页：** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 链接

- **仓库：** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **Issues：** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
