# @trapar-waves/react-three-maplibre

![версия npm](https://img.shields.io/npm/v/@trapar-waves/react-three-maplibre)
![npm dm](https://img.shields.io/npm/dm/@trapar-waves/react-three-maplibre)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/Trapar-waves/react-three-maplibre)

> Библиотека на базе React, объединяющая Three.js, MapLibre и AntV для создания передовых 3D-визуализаций географических данных.

## ✨ Основные возможности

* **Географическая визуализация:** Эффективно сочетает `@antv/l7` и `maplibre-gl`, обеспечивая мощный рендеринг геоданных через настраиваемые слои карт.
* **3D-рендеринг с React:** Использует `@react-three/fiber` и `@react-three/drei`, позволяя интегрировать Three.js в рабочий процесс React для декларативного управления 3D-сценами.
* **Плавная интеграция с пользовательским интерфейсом:** Обеспечивает удобную совместимость с React (`react`, `react-dom`) для создания интерактивных географических приложений.
* **Гибкие стили:** Использует `tailwindcss` для быстрого и гибкого стилизирования компонентов и макетов.
* **Безопасность типов:** Основана на TypeScript, что гарантирует точность типов и повышает удобство разработки.
* **Оптимизированный рабочий процесс:** Воспользуется `rsbuild` для быстрой сборки проекта и высокой производительности сервера разработки.
* **Разнообразные компоненты:** Интегрирует `three-stdlib` и `@react-three/drei`, предоставляя богатую библиотеку инструментов и готовых компонентов для Three.js.
* **Интерактивные карты:** Поддерживает `react-map-gl` для удобного управления картами и клиентской навигации в географических приложениях.
* **Дополнительные инструменты AntV:** Включает `@antv/l7-maps` для расширенных возможностей слоев карт и визуализации данных.

## 🚀 Начало работы

Чтобы запустить проект локально, следуйте этим инструкциям.

### Предварительные требования

* Убедитесь, что у вас установлено следующее:
    * Node.js (рекомендуется версия >= 18.x)
    * Менеджер пакетов (npm, yarn или pnpm)
    ```bash
    node -v
    npm -v # или yarn -v или pnpm -v
    ```

### Установка

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/Trapar-waves/react-three-maplibre.git
    cd react-three-maplibre
    ```
2. Установите зависимости:
    ```bash
    # Выберите предпочитаемый менеджер пакетов
    npm install
    # или
    yarn install
    # или
    pnpm install
    ```

## 🛠️ Использование

После установки вы можете запустить проект следующим образом.

### Доступные команды

Вот список команд, доступных через `npm run <команда>`, `yarn <команда>` или `pnpm <команда>`:

* `dev`: Запускает сервер разработки с поддержкой горячей замены модулей (HMR) с использованием Rsbuild.
* `build`: Создает оптимизированную сборку для продакшена.
* `preview`: Позволяет локально просмотреть продакшен-сборку.

Пример:
```bash
# Запуск сервера разработки
npm run dev 

# Создание продакшен-сборки
npm run build 

# Предварительный просмотр продакшен-сборки
npm run preview
```

## 💻 Технологический стек

Основные технологии, используемые в проекте:

* **Фреймворк/Библиотека:** React
* **Инструменты UI/Стилизация:** Tailwind CSS
* **3D-рендеринг:** Three.js (`@react-three/fiber`, `@react-three/drei`)
* **Географические библиотеки:** MapLibre GL, AntV L7
* **Инструмент сборки:** Rsbuild
* **Язык программирования:** TypeScript

Для полного списка зависимостей обратитесь к файлу [package.json](package.json).

## 🤝 Вклад

Мы приветствуем любые вклады! Если у вас есть идеи или вы нашли ошибку, создайте issue или отправьте pull request.

## 📄 Лицензия

Проект распространяется под лицензией **MIT**. Подробности смотрите в файле `LICENSE`.

## 👤 Автор

* **Rikka** ([admin@rikka.cc](mailto:admin@rikka.cc))
* GitHub: [@Muromi-Rikka](https://github.com/Muromi-Rikka)

## 🔗 Ссылки

* **Репозиторий:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
* **Домашняя страница:** [https://github.com/Trapar-waves/react-three-maplibre](https://github.com/Trapar-waves/react-three-maplibre)
* **Проблемы:** [https://github.com/Trapar-waves/react-three-maplibre/issues](https://github.com/Trapar-waves/react-three-maplibre/issues)
