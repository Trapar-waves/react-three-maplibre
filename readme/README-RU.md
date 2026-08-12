# @trapar-waves/react-three-maplibre

![npm version](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![npm dm](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![License](https://img.shields.io/github/license/Trapar-waves/react-three-maplibre)
![GitHub last commit](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Trapar-waves/react-three-maplibre/release.yml)
![Renovate](https://img.shields.io/badge/renovate-enabled-blue)

---

[English](../README.md) | [中文](./README-CN.md) | [日本語](./README-JP.md)

> Библиотека на базе React, интегрирующая Three.js, MapLibre и AntV для расширенной геопространственной 3D-визуализации.

![react-three-maplibre hero](../assets/readme/hero.svg)

![Features](../assets/readme/headers/features.svg)

- **Геопространственная визуализация:** Комбинирует `@antv/l7` и `maplibre-gl` для мощного рендеринга геопространственных данных с пользовательскими слоями карт.
- **3D-рендеринг с React:** Использует `@react-three/fiber` и `@react-three/drei` для интеграции Three.js в рабочий процесс на базе React для декларативного управления 3D-сценами.
- **Интеграция настраиваемого UI:** Обеспечивает бесперебойную интеграцию с React (`react`, `react-dom`) для создания интерактивных геопространственных приложений.
- **Стилизация с упором на утилиты:** Применяет `tailwindcss` для гибкой и быстрой стилизации компонентов и макетов.
- **Типобезопасность:** Использует TypeScript для обеспечения типобезопасности и улучшения опыта разработчика во время разработки.
- **Быстрый рабочий процесс разработки:** Использует `rsbuild` для оптимизированных сборок и эффективной производительности сервера разработки.
- **Богатая библиотека компонентов:** Интегрируется с `three-stdlib` и `@react-three/drei` для переиспользуемых утилит и компонентов Three.js.
- **Интерактивность карт:** Реализует `react-map-gl` для интерактивных элементов управления картами и навигации на клиентской стороне в геопространственных контекстах.
- **Дополнения AntV:** Включает `@antv/l7-maps` для дополнительных возможностей слоев карт и инструментов визуализации.

![Tech Stack](../assets/readme/headers/tech-stack.svg)

- **Фреймворк/библиотека:** `React`
- **UI-тулкит/стилизация:** `Tailwind CSS`
- **3D-рендеринг:** `Three.js` (`@react-three/fiber`, `@react-three/drei`)
- **Геопространственные библиотеки:** `MapLibre GL`, `AntV L7`
- **Инструмент сборки:** `Rsbuild`
- **Язык:** `TypeScript`

Полный список зависимостей смотрите в [package.json](../package.json).

![Getting Started](../assets/readme/headers/getting-started.svg)

### Предварительные требования

- Node.js (рекомендуется >= 18.x)
- Менеджер пакетов (npm, yarn или pnpm)

### Установка

1. Создайте новый проект с помощью шаблона:

   ```bash
   pnpm create trapar-waves
   ```

2. Перейдите в директорию проекта и установите зависимости:

   ```bash
   pnpm install
   ```

3. Запустите сервер разработки:

   ```bash
   pnpm dev
   ```

![Project Structure](../assets/readme/headers/project-structure.svg)

```
├── public/             # Статические ресурсы
├── src/                # Исходный код
│   ├── App.tsx         # Основной компонент приложения
│   └── index.tsx       # Точка входа
├── rsbuild.config.ts   # Конфигурация Rsbuild
├── tsconfig.json       # Конфигурация TypeScript
├── eslint.config.js    # Конфигурация ESLint
└── package.json        # Зависимости и скрипты проекта
```

![Usage](../assets/readme/headers/usage.svg)

Эта библиотека предназначена для использования в качестве шаблона для создания приложений геопространственной 3D-визуализации. Она предоставляет фундаментальную настройку с React, Three.js, MapLibre GL и AntV L7.

### Базовый пример

Вот простой пример того, как использовать компоненты, предоставляемые этим шаблоном:

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

Этот пример демонстрирует:

- Создание карты MapLibre GL с помощью `react-map-gl`
- Интеграция AntV L7 для визуализации геопространственных данных
- Использование React Three Fiber и Drei для 3D-рендеринга
- Позиционирование 3D-объектов относительно карты с помощью `react-three-map`

### Подложка карты

В шаблоне по умолчанию используется стиль Carto GL без API-ключа (`MAP_STYLE_URL` в `src/App.tsx`). Для другого провайдера (например, MapTiler) задайте `mapStyle` и храните ключи в `.env` / CI.

![Contributing](../assets/readme/headers/contributing.svg)

Вклад в проект приветствуется и очень ценится! Чтобы внести вклад, следуйте этим шагам:

1. Сделайте форк репозитория
2. Создайте ветку с функцией (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте свои изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

![License](../assets/readme/headers/license.svg)

MIT License © 2025 Trapar Waves

## 👤 Автор

- **Rikka:** [admin@rikka.cc](mailto:admin@rikka.cc)
- **Профиль GitHub:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 Ссылки

- **Репозиторий:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **Issues:** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
