# @trapar-waves/react-three-maplibre

![npm version](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![npm dm](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![License](https://img.shields.io/badge/license-MIT-green)
![GitHub last commit](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)

> Reactベースのライブラリで、Three.js、MapLibre、AntVを統合し、高度な地理空間3Dビジュアライゼーションを実現します。

## ✨ 主な特徴

* **地理空間ビジュアライゼーション:** `@antv/l7`と`maplibre-gl`を組み合わせ、カスタムマップレイヤーを用いて地理空間データの強力なレンダリングが可能です。
* **Reactによる3Dレンダリング:** `@react-three/fiber`と`@react-three/drei`を活用し、Three.jsをReactベースのワークフローに統合。これにより、宣言的な3Dシーンの管理が容易になります。
* **柔軟なUI統合:** Reactおよび`react-dom`とスムーズに統合でき、インタラクティブな地理空間アプリケーションを簡単に構築できます。
* **効率的なスタイリング:** `tailwindcss`を使用して、コンポーネントやレイアウトを柔軟かつ迅速にスタイリングできます。
* **型安全な開発:** TypeScriptを採用し、開発時の型安全性を確保し、開発者体験を向上させます。
* **効率的な開発フロー:** `rsbuild`を利用して、高速なビルドプロセスと効率的な開発サーバーの動作を実現します。
* **豊富な3Dコンポーネント:** `three-stdlib`と`@react-three/drei`を統合し、再利用可能なThree.jsのユーティリティやコンポーネントを提供します。
* **インタラクティブなマップ操作:** `react-map-gl`を採用し、地理空間データを扱う文脈でインタラクティブなマップ操作やクライアント側ナビゲーションを可能にします。
* **AntVの高度な機能:** `@antv/l7-maps`を活用し、追加のマップレイヤーやビジュアライゼーションツールを提供します。

## 🚀 始め方

プロジェクトをローカルで実行する手順を以下に示します。

### 前提条件

* 以下のソフトウェアがインストールされていることを確認してください:
    * Node.js (>= 18.x 推奨)
    * パッケージマネージャ (npm、yarn、または pnpm)
    ```bash
    node -v
    npm -v # または yarn -v または pnpm -v
    ```

### インストール手順

1. リポジトリをクローンします:
    ```bash
    git clone https://github.com/Trapar-waves/react-three-maplibre.git
    cd react-three-maplibre
    ```
2. 依存関係をインストールします:
    ```bash
    # お好みのパッケージマネージャを使用してください
    npm install
    # または
    yarn install
    # または
    pnpm install
    ```

## 🛠️ 使用方法

インストール後のプロジェクトの実行および利用方法を説明します。

### 使用可能なスクリプト

以下のコマンドは、`npm run <script>`、`yarn <script>`、または`pnpm <script>`で実行できます。

* `dev`: Rsbuildを使用して、ホットモジュール置換（HMR）付きの開発サーバーを起動します。
* `build`: プロジェクトのプロダクション用ビルドを生成します。
* `preview`: 生成されたプロダクションビルドをローカルでプレビューします。

例:
```bash
# 開発サーバーを起動
npm run dev

# プロダクションビルドを生成
npm run build

# プロダクションビルドをプレビュー
npm run preview
```

## 💻 使用技術

このプロジェクトで使用されている主要な技術スタックは以下の通りです:

* **フレームワーク/ライブラリ:** React
* **UIスタイリング:** Tailwind CSS
* **3Dレンダリング:** Three.js (`@react-three/fiber`, `@react-three/drei`)
* **地理空間ライブラリ:** MapLibre GL, AntV L7
* **ビルドツール:** Rsbuild
* **言語:** TypeScript

依存関係の詳細は[package.json](package.json)をご覧ください。

## 🤝 貢献について

このプロジェクトへの貢献を歓迎します。詳細は[リポジトリ](https://github.com/Trapar-waves/react-three-maplibre)をご覧ください。

## 📄 ライセンス

**MIT**ライセンスの下で配布されます。詳細は`LICENSE`ファイルをご覧ください。

## 👤 作者

* **Rikka** ([admin@rikka.cc](mailto:admin@rikka.cc))
* GitHub: [@Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 関連リンク

* **リポジトリ:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
* **ホームページ:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
* **問題報告:** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
