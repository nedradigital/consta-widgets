# Dashboard constructor
Репозиторий для констркутора дашбордов

## Использование

Если виджеты используются отдельно от конструктора, то для корректного отображения
необходимо добавить настройку базового размера элементов для скейлинга, эту настройку
необходимо добавлять в `:root`:

```css
:root {
  --dashboard-constructor-base-size: 16;
}
```

По необходимости можно увеличивать или уменьшать это значение.

## Установка, обновление, публикация и подключение пакета

Инструкции находятся в пакете [gpn-configs](https://github.com/CSSSR/gpn-configs)

## Зависимости
- NodeJS >= 10
- Yarn >= 1.16

## Установка зависимостей

```bash
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

## Документация

См. [раздел «Документация»](http://master.dashboard-constructor.csssr.cloud/?path=/docs/документация) в Storybook
