# @trapar-waves/react-three-maplibre

![npm version](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![npm dm](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![License](https://img.shields.io/github/license/Trapar-waves/react-three-maplibre)
![GitHub last commit](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/Trapar-waves/react-three-maplibre/release.yml)
![Renovate](https://img.shields.io/badge/renovate-enabled-blue)

---

[English](../README.md) | [中文](/readme/README-CN.md) | [日本語](/readme/README-JP.md)

> Библиотека на базе React, интегрирующая Three.js, MapLibre и AntV для расширенной геопространственной 3D-визуализации.

## ✨ Особенности

- **Геопространственная визуализация:** Комбинирует `@antv/l7` и `maplibre-gl` для мощного рендеринга геопространственных данных с пользовательскими слоями карт.
- **3D-рендеринг с React:** Использует `@react-three/fiber` и `@react-three/drei` для интеграции Three.js в рабочий процесс на базе React для декларативного управления 3D-сценами.
- **Интеграция настраиваемого UI:** Обеспечивает бесперебойную интеграцию с React (`react`, `react-dom`) для создания интерактивных геопространственных приложений.
- **Стилизация с упором на утилиты:** Применяет `tailwindcss` для гибкой и быстрой стилизации компонентов и макетов.
- **Типовая безопасность:** Использует TypeScript для обеспечения типовой безопасности и улучшения опыта разработчика во время разработки.
- **Быстрый рабочий процесс разработки:** Использует `rsbuild` для оптимизированных сборок и эффективной производительности сервера разработки.
- **Богатая библиотека компонентов:** Интегрируется с `three-stdlib` и `@react-three/drei` для переиспользуемых утилит и компонентов Three.js.
- **Интерактивность карт:** Реализует `react-map-gl` для интерактивных элементов управления картами и навигации на клиентской стороне в геопространственных контекстах.
- **Дополнения AntV:** Включает `@antv/l7-maps` для дополнительных возможностей слоев карт и инструментов визуализации.

## 💻 Технологический стек

- **Фреймворк/Библиотека:** React
- **UI-тулкит/Стилизация:** Tailwind CSS
- **3D-рендеринг:** Three.js (`@react-three/fiber`, `@react-three/drei`)
- **Геопространственные библиотеки:** MapLibre GL, AntV L7
- **Инструмент сборки:** Rsbuild
- **Язык:** TypeScript

Полный список зависимостей см. в [package.json](package.json).

## 🚀 Начало работы

Следуйте этим инструкциям, чтобы запустить проект локально.

### Предварительные требования

Убедитесь, что у вас установлены следующие компоненты:

- Node.js (рекомендуется версия >= 18.x)
- Пакетный менеджер (npm, yarn или pnpm)

```bash
node -v
npm -v
```

### Установка

1. Создайте новый проект с помощью шаблона:

```bash
pnpm create trapar-waves
```

2. Перейдите в каталог вашего проекта и установите зависимости:

```bash
cd your-project-name
pnpm install
# or
npm install
# or
yarn install
```

### Разработка

Запустите сервер разработки с горячей перезагрузкой:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Приложение будет доступно по адресу `http://localhost:3000` по умолчанию.

### Сборка для продакшена

Чтобы создать сборку для продакшена:

```bash
pnpm build
# or
npm run build
# or
yarn build
```

Предварительный просмотр сборки продакшена локально:

```bash
pnpm preview
# or
npm run preview
# or
yarn preview
```

## 📦 Использование

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
const MAP_STYLE_URL =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

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

## 🤝 Участие в разработке

Вклад в проект приветствуется и очень ценится! Чтобы внести вклад, следуйте этим шагам:

1. Сделайте форк репозитория
2. Создайте ветку с функцией (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте свои изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

Пожалуйста, убедитесь, что ваш код соответствует существующему стилю и проходит все тесты.

## 👤 Author

- **Rikka:** (admin@rikka.cc)
- **GitHub Profile:** [Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 Links

- **Репозиторий:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **Домашняя страница:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
- **Проблемы:** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
