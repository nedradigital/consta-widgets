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
- [Версионирование дашбордов](docs/DASHBOARD_VERSIONING.md)
- [Скейлинг и переменные размеров](docs/SCALING.md)
- [Описание концепции datasets и способов обработки raw data](docs/DATASETS_CONCEPT.md)
- [Правила работы с git и github](docs/GIT.md)
- [Парное программирование](docs/PAIR_PROGRAMMING.md)
- [Задачи на исследование/анализ (research)](docs/RESEARCH_TASKS.md)
- [Обновление версии пакета](docs/VERSION_UPDATE.md)
- [Миксины стилей](docs/STYLES_MIXINS.md)
- [Договоренности по оформлению кода](docs/ARRANGEMENTS_FOR_CODE_STYLE.md)
    - [Оформление директории компонента](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#DirectoryStyle)
    - [Разбивка компонента](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#SplitComponent)
    - [Использование enums](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#Enums)
    - [Наименование boolean-методов и констант для сохранения значения](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#BooleanNames)
    - [Type vs Interface](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#TypeVsInterface)
    - [Default Props](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#DefaultProps)
    - [Комментарии к типам](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#TypeComments)
    - [Стилизация switch конструкций](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#Switch)
    - [Использование formatLabel и unit](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#FormatLabel)
    - [Порядок сущностей внутри *.ts(x) файлов](docs/ARRANGEMENTS_FOR_CODE_STYLE.md#CodeOrder)
- [Дизайн](docs/DESIGN.md)
    - [Цвета и отступы](docs/DESIGN.md#Цвета-и-отступы)
    - [Текст](docs/DESIGN.md#Текст)
    - [Тестирование](docs/DESIGN.md#Тестирование)
