# Dashboard constructor
Репозиторий для констркутора дашбордов

## Зависимости
- NodeJS >= 10
- Yarn >= 1.16

## Установка зависимостей

```bash
$ npm install
# или
$ yarn install
```
 
## Основные команды

```bash
# Сборка и старт development-сервера
$ yarn start

# Сборка для production
$ yarn run build

# Линтинг всех файлов
$ yarn run lint

# Форматирование всех файлов prettier
$ yarn run format

# Запуск тестов
$ yarn test
```

## Структура

```
.
├── config // Файлы конфигурации для инструментов
│   ├── jest
│   ├── storybook
│   ├── webpack
│   ...
├── public // Публичные файлы (например favicon)
├── scripts // Скрипты для запуска и сборки
├── src
│   ├── components
│   ├── containers
│   ├── static  // Статические файлы – шрифты, css
│   ├── utils // Вспомогательные утилиты и либы
│   ...
├── types // Кастомные типы для модулей
│
├── package.json
├── tslint.json
├── tsconfig.json
├── yarn.lock
└── .prettierrc/.stylelintrc/.editorconfig и др. конфиги
```
