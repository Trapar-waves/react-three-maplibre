# @trapar-waves/react-three-maplibre

![npm月下载量](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![npm版本](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![许可证](https://img.shields.io/badge/license-MIT-green)
![GitHub最近一次提交](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)

> 一个基于React的库，整合了Three.js、MapLibre和AntV，用于高级的地理空间3D可视化。

## ✨ 核心特性

* **强大的地理空间数据可视化：** 借助`@antv/l7`和`maplibre-gl`，通过自定义地图图层实现高效且灵活的地理空间数据渲染。
* **在React中实现3D渲染：** 借助`@react-three/fiber`和`@react-three/drei`，将Three.js无缝集成到React工作流中，支持声明式的3D场景管理，简化开发流程。
* **灵活的UI集成：** 提供与React生态（`react`、`react-dom`）的无缝对接，方便构建交互式地理空间应用。
* **实用至上的样式设计：** 使用`tailwindcss`快速实现组件和布局的灵活样式设计，提升开发效率。
* **类型安全保障：** 基于TypeScript开发，提供类型安全支持，提升开发体验。
* **高效开发流程：** 使用`rsbuild`优化构建过程，显著提升开发服务器性能，助力快速迭代。
* **丰富的Three.js组件库：** 集成`three-stdlib`和`@react-three/drei`，提供大量可复用的Three.js工具和组件，降低开发复杂度。
* **交互式地图功能：** 借助`react-map-gl`，提供强大的地图交互能力，支持地理空间环境中的导航与操作。
* **AntV扩展功能：** 集成`@antv/l7-maps`，进一步增强地图分层能力，提供更多可视化选项。

## 🚀 快速入门

按照以下步骤在本地运行项目。

### 环境要求

* 确保已安装以下工具：
    * Node.js（推荐版本 >= 18.x）
    * 包管理器（npm、yarn 或 pnpm）
    ```bash
    node -v
    npm -v # 或 yarn -v 或 pnpm -v
    ```

### 安装步骤

1. 克隆代码仓库：
    ```bash
    git clone https://github.com/Trapar-waves/react-three-maplibre.git
    cd react-three-maplibre
    ```
2. 安装依赖：
    ```bash
    # 使用您偏好的包管理器
    npm install
    # 或
    yarn install
    # 或
    pnpm install
    ```

## 🛠️ 使用说明

安装完成后，您可以按照以下方式运行和使用项目。

### 常用命令

通过`npm run <命令>`、`yarn <命令>`或`pnpm <命令>`运行以下脚本：

* `dev`：使用Rsbuild启动开发服务器，并支持热模块替换（HMR）。
* `build`：生成项目的生产版本。
* `preview`：在本地预览生产版本。

示例：
```bash
# 启动开发服务器
npm run dev 

# 生成生产版本
npm run build 

# 预览生产版本
npm run preview
```

## 💻 技术栈

项目中使用的核心技术包括：

* **框架/库：** React
* **样式工具：** Tailwind CSS
* **3D渲染：** Three.js（`@react-three/fiber`、`@react-three/drei`）
* **地理空间支持：** MapLibre GL、AntV L7
* **构建工具：** Rsbuild
* **编程语言：** TypeScript

更多信息请查看[package.json](package.json)文件，以获取完整的依赖项列表。

## 🤝 贡献指南

欢迎任何形式的贡献！如果您有任何改进建议或发现问题，请随时提交Pull Request或Issue。

## 📄 许可证

本项目基于**MIT**许可证发布。更多信息请参阅`LICENSE`文件。

## 👤 作者

* **Rikka**（[admin@rikka.cc](mailto:admin@rikka.cc)）
* GitHub：[@Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 相关链接

* **项目仓库：** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
* **项目主页：** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
* **问题反馈：** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
