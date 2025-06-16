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

スクリプトの実行

```bash
pnpm create trapar-waves
```

依存関係のインストール

```bash
npm install
yarn install
pnpm install
```

## 🤝 コントリビューション

貢献は歓迎され、非常に高く評価されています！貢献するには以下の手順に従ってください：

1. リポジトリをフォークする
2. 機能ブランチを作成する（`git checkout -b feature/amazing-feature`）
3. 変更をコミットする（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュする（`git push origin feature/amazing-feature`）
5. Pull Requestを開く

## 👤 Author

- **Rikka:** (admin@rikka.cc)
- **GitHub Profile:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 Links

- **リポジトリ:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **ホームページ:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **イシュー:** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
