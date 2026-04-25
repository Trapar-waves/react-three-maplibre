# @trapar-waves/react-three-maplibre

![npm version](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![npm dm](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![License](https://img.shields.io/github/license/Trapar-waves/react-three-maplibre)
![GitHub last commit](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Trapar-waves/react-three-maplibre/release.yml)
![Renovate](https://img.shields.io/badge/renovate-enabled-blue)

---

[English](../README.md) | [中文](/readme/README-CN.md) | [Русский язык](/readme/README-RU.md)

> Three.js、MapLibre、AntVを統合したReactベースのライブラリで、高度な地理空間3D可視化を実現します。

## ✨ 特徴

- **地理空間可視化:** `@antv/l7`と`maplibre-gl`を組み合わせ、カスタムマップレイヤーを使用した強力な地理空間データレンダリングを実現します。
- **Reactによる3Dレンダリング:** `@react-three/fiber`と`@react-three/drei`を活用し、Three.jsをReactベースのワークフローに統合し、宣言型3Dシーン管理を実現します。
- **カスタマイズ可能なUI統合:** React（`react`、`react-dom`）とのシームレスな統合を提供し、インタラクティブな地理空間アプリケーションを構築します。
- **ユーティリティファーストのスタイリング:** `tailwindcss`を採用し、コンポーネントとレイアウトの柔軟で迅速なスタイリングを実現します。
- **型安全性:** TypeScriptを使用して型安全性を確保し、開発中の開発者エクスペリエンスを向上させます。
- **高速開発ワークフロー:** `rsbuild`を活用して最適化されたビルドと効率的な開発サーバーパフォーマンスを実現します。
- **充実したコンポーネントライブラリ:** `three-stdlib`および`@react-three/drei`と統合し、再利用可能なThree.jsユーティリティとコンポーネントを提供します。
- **マップインタラクティビティ:** `react-map-gl`を実装し、地理空間コンテキストにおけるインタラクティブなマップコントロールとクライアント側ナビゲーションを提供します。
- **AntV拡張機能:** `@antv/l7-maps`を組み込み、追加のマップレイヤリング機能と可視化ツールを提供します。

## 💻 技術スタック

- **フレームワーク/ライブラリ:** React
- **UIツールキット/スタイリング:** Tailwind CSS
- **3Dレンダリング:** Three.js（`@react-three/fiber`、`@react-three/drei`）
- **地理空間ライブラリ:** MapLibre GL、AntV L7
- **ビルドツール:** Rsbuild
- **言語:** TypeScript

依存関係の完全なリストについては[package.json](package.json)を参照してください。

## 🚀 始め方

以下の手順に従ってプロジェクトをローカルで実行してください。

### 前提条件

以下がインストールされていることを確認してください：

- Node.js (推奨バージョン >= 18.x)
- パッケージマネージャー (npm, yarn または pnpm)

```bash
node -v
npm -v
```

### インストール

1. テンプレートを使用して新しいプロジェクトを作成します：

```bash
pnpm create trapar-waves
```

2. プロジェクトディレクトリに移動し、依存関係をインストールします：

```bash
cd your-project-name
pnpm install
# or
npm install
# or
yarn install
```

### 開発

ホットリロード付きの開発サーバーを起動します：

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

アプリケーションはデフォルトで `http://localhost:3000` で利用可能です。

### 本番用ビルド

本番用のビルドを作成します：

```bash
pnpm build
# or
npm run build
# or
yarn build
```

ローカルで本番ビルドをプレビューします：

```bash
pnpm preview
# or
npm run preview
# or
yarn preview
```

## 📦 使用方法

このライブラリは、地理空間3D可視化アプリケーションを作成するためのテンプレートとして設計されています。React、Three.js、MapLibre GL、AntV L7を使用した基本的なセットアップを提供します。

### 基本的な例

このテンプレートが提供するコンポーネントの使用方法の簡単な例を以下に示します：

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

この例では以下を示しています：

- `react-map-gl` を使用して MapLibre GL マップを作成する
- 地理空間データの可視化のために AntV L7 を統合する
- 3D レンダリングのために React Three Fiber と Drei を使用する
- `react-three-map` を使用して 3D オブジェクトをマップに対して配置する

### 環境変数

MapTiler などのマップサービスを使用するには、環境変数を設定する必要があります。プロジェクトのルートに `.env` ファイルを作成します：

```
PUBLIC_MAPTILER_KEY=your_maptiler_api_key_here
```

キーを安全に保つために、`.env` を `.gitignore` に追加してください。

## 🤝 コントリビューション

貢献は歓迎され、非常に高く評価されています！貢献するには以下の手順に従ってください：

1. リポジトリをフォークする
2. 機能ブランチを作成する（`git checkout -b feature/amazing-feature`）
3. 変更をコミットする（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュする（`git push origin feature/amazing-feature`）
5. Pull Requestを開く

コードが既存のスタイルに従い、すべてのテストに合格することを確認してください。

## 👤 Author

- **Rikka:** (admin@rikka.cc)
- **GitHub Profile:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 Links

- **リポジトリ:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **ホームページ:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **イシュー:** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
