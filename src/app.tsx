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

// eslint-disable-next-line unicorn/no-top-level-side-effects -- R3F extend must run before render
extend({ LineMaterial, LineSegments2, LineSegmentsGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    lineMaterial: Partial<LineMaterial> & ThreeElements["material"];
    lineSegments2: ThreeElements["object3D"] & { children?: ReactNode };
    lineSegmentsGeometry: ThreeElements["bufferGeometry"];
  }
}

const latLon = {
  latitude: 31.215175,
  longitude: 121.417463,
};

/**
 * Carto 托管的 MapLibre GL 矢量底图，无需 API Key（使用请遵守 https://carto.com/basemaps/ 条款）。
*/
const MAP_STYLE_URL = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

function publicAssetUrl(filename: string): string {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const path = filename.startsWith("/") ? filename : `/${filename}`;
  return `${base || ""}${path}`.replaceAll("//", "/");
}

const HOMEPAGE = "https://github.com/Trapar-waves/react-three-maplibre";
const LOGOS_SET_URL = "https://icon-sets.iconify.design/logos/";

interface TechPill {
  iconClass: string;
  id: string;
  label: string;
}

const techStack: TechPill[] = [
  { iconClass: "icon-[logos--react]", id: "react", label: "React 19" },
  { iconClass: "icon-[logos--typescript-icon]", id: "ts", label: "TypeScript" },
  { iconClass: "icon-[logos--tailwindcss-icon]", id: "tailwind", label: "Tailwind 4" },
  { iconClass: "icon-[material-icon-theme--rstack]", id: "rsbuild", label: "Rsbuild" },
  { iconClass: "icon-[simple-icons--maplibre]", id: "maplibre", label: "MapLibre · react-map-gl" },
  { iconClass: "icon-[logos--markdown]", id: "l7", label: "AntV L7" },
  { iconClass: "icon-[logos--threejs]", id: "r3f", label: "R3F · drei · three-stdlib" },
  { iconClass: "icon-[logos--markdown]", id: "rtmap", label: "react-three-map" },
  { iconClass: "icon-[logos--eslint]", id: "eslint", label: "ESLint" },
  { iconClass: "icon-[logos--pnpm]", id: "pnpm", label: "pnpm" },
  { iconClass: "icon-[logos--github-icon]", id: "github", label: "GitHub Actions" },
];

const readmeFeatures: string[] = [
  "MapLibre 与 AntV L7 组合，自定义地图与点层渲染。",
  "@react-three/fiber、drei 将 Three.js 以声明式接入 React。",
  "react-three-map 与 MapLibre 视口同步；Canvas 使用 overlay 模式使 Three 叠在 L7 点层之上。",
  "Tailwind CSS 快速布局与面板样式。",
  "TypeScript 覆盖地图与场景相关类型。",
  "Rsbuild 开发与生产构建。",
  "react-map-gl 提供交互与导航体验。",
  "three-stdlib 与 drei 复用常用几何与调试组件。",
  "GitHub Pages 支持 BASE_PATH 与 404.html SPA 部署。",
  "默认 Carto Basemaps GL 样式，本地与 CI 均无需地图 API Key。",
];

const readmeTechNote = "演示使用 @react-three/drei 的 Stats；生产可按需移除。若需其他底图，可在 App.tsx 中替换 MAP_STYLE_URL 并自行处理鉴权。";

function App() {
  const divReference = useRef<HTMLDivElement>(null!);
  const mapReference = useRef<MapRef>(null!);
  function initL7() {
    if (!mapReference.current) {
      return;
    }

    const scene = new Scene({
      id: "map",
      map: new MapLibre({
        mapInstance: mapReference.current.getMap(),
      }),
    });
    scene.on("loaded", async () => {
      try {
        const response = await fetch(publicAssetUrl("BElVQFEFvpAKzddxFZxJ.txt"));
        if (!response.ok) {
          return;
        }
        const data = await response.text();
        const pointLayer = new PointLayer({
          blend: "additive",
        })
          .source(data, {
            parser: {
              type: "csv",
              x: "lng",
              y: "lat",
            },
          })
          .size(0.5)
          .color("#080298");

        scene.addLayer(pointLayer);
      }
      catch {}
    });
  }
  return (
    <div className="h-screen w-screen relative overflow-hidden" ref={divReference}>
      <aside
        aria-label="模板说明"
        className="pointer-events-none absolute left-4 top-4 z-10 max-w-sm motion-safe:transition motion-safe:duration-200"
      >
        <div
          className="pointer-events-auto max-h-[min(70vh,560px)] overflow-y-auto overscroll-contain rounded-xl border border-white/15 bg-slate-950/80 p-4 text-sm text-slate-100 shadow-xl backdrop-blur-md"
        >
          <p className="font-semibold text-white">react-three-maplibre</p>
          <p className="mt-2 leading-relaxed text-slate-300">
            MapLibre 与 react-three-map 同屏；L7 点层叠加 CSV，Three 方体经
            {" "}
            <code className="rounded bg-slate-800 px-1">overlay</code>
            {" "}
            画布叠在 L7 之上。底图为 Carto 公开 GL 样式，无需地图服务 API Key。技术图标见
            {" "}
            <a
              className="font-medium text-sky-300 underline decoration-sky-700 underline-offset-2 hover:text-sky-200"
              href={LOGOS_SET_URL}
              rel="noreferrer"
              target="_blank"
            >
              Iconify logos
            </a>
            。
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500">
            技术栈
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {techStack.map(item => (
              <span
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1 text-xs text-slate-200"
                key={item.id}
              >
                <span aria-hidden className={`${item.iconClass} text-base text-sky-300`} />
                {item.label}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">
            README 摘要
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-400">
            {readmeFeatures.map(line => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs italic leading-relaxed text-slate-500">
            {readmeTechNote}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            品牌图标来自
            {" "}
            <a className="text-sky-400 underline hover:text-sky-300" href={LOGOS_SET_URL} rel="noreferrer" target="_blank">SVG Logos</a>
            {" "}
            （CC0）。
          </p>
          <a
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            href={HOMEPAGE}
            rel="noreferrer"
            target="_blank"
          >
            查看仓库
          </a>
        </div>
      </aside>
      <Map
        id="map"
        initialViewState={{
          ...latLon,
          pitch: 64.88,
          zoom: 11,
        }}
        mapStyle={MAP_STYLE_URL}
        onLoad={initL7}
        ref={mapReference}
      >
        <Stats className="stats" parent={divReference} />

        <Canvas
          id="trapar-r3f-overlay"
          overlay
          {...latLon}
        >
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
