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

/** Carto 托管的 MapLibre GL 矢量底图，无需 API Key（使用请遵守 https://carto.com/basemaps/ 条款）。 */
const MAP_STYLE_URL = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

function publicAssetUrl(filename: string): string {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const path = filename.startsWith("/") ? filename : `/${filename}`;
  return `${base || ""}${path}`.replaceAll("//", "/");
}

const HOMEPAGE = "https://github.com/Trapar-waves/react-three-maplibre";
const LOGOS_SET_URL = "https://icon-sets.iconify.design/logos/";

interface TechPill {
  id: string;
  label: string;
  iconClass: string;
}

const techStack: TechPill[] = [
  { id: "react", label: "React 19", iconClass: "icon-[logos--react]" },
  { id: "ts", label: "TypeScript", iconClass: "icon-[logos--typescript-icon]" },
  { id: "tailwind", label: "Tailwind 4", iconClass: "icon-[logos--tailwindcss-icon]" },
  { id: "rsbuild", label: "Rsbuild", iconClass: "icon-[logos--webpack]" },
  { id: "maplibre", label: "MapLibre · react-map-gl", iconClass: "icon-[simple-icons--maplibre]" },
  { id: "l7", label: "AntV L7", iconClass: "icon-[logos--markdown]" },
  { id: "r3f", label: "R3F · drei · three-stdlib", iconClass: "icon-[logos--threejs]" },
  { id: "rtmap", label: "react-three-map", iconClass: "icon-[logos--markdown]" },
  { id: "eslint", label: "ESLint", iconClass: "icon-[logos--eslint]" },
  { id: "pnpm", label: "pnpm", iconClass: "icon-[logos--pnpm]" },
  { id: "github", label: "GitHub Actions", iconClass: "icon-[logos--github-icon]" },
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
        fetch(publicAssetUrl("BElVQFEFvpAKzddxFZxJ.txt"))
          .then(res => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
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
          })
          .catch(() => {});
      });
    }
  }
  return (
    <div className="h-screen w-screen relative overflow-hidden" ref={ref}>
      <aside
        className="pointer-events-none absolute left-4 top-4 z-10 max-w-sm motion-safe:transition motion-safe:duration-200"
        aria-label="模板说明"
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
              href={LOGOS_SET_URL}
              className="font-medium text-sky-300 underline decoration-sky-700 underline-offset-2 hover:text-sky-200"
              target="_blank"
              rel="noreferrer"
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
                key={item.id}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-2 py-1 text-xs text-slate-200"
              >
                <span className={`${item.iconClass} text-base text-sky-300`} aria-hidden />
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
            <a href={LOGOS_SET_URL} className="text-sky-400 underline hover:text-sky-300" target="_blank" rel="noreferrer">SVG Logos</a>
            {" "}
            （CC0）。
          </p>
          <a
            href={HOMEPAGE}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            target="_blank"
            rel="noreferrer"
          >
            查看仓库
          </a>
        </div>
      </aside>
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

        <Canvas
          overlay
          id="trapar-r3f-overlay"
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
