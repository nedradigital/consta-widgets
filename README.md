# GPN Components
Репозиторий компонентов и графиков

## Использование

### Установка

Сейчас пакет публикуется в GitHub Packages и для получения доступа на скачивание необходимо пройти авторизацию, подробнее в главе [Подготовка окружения](#подготовка-окружения).

Установка пакета:

```sh
# NPM
$ npm i @csssr/gpn-components

# Yarn
$ yarn add @csssr/gpn-components
```

### Зависимости

Для работы пакета необходимо установить библиотеку [`@gpn-design/uikit`](https://www.npmjs.com/package/@gpn-design/uikit) и [настроить тему](https://gpn-prototypes.github.io/ui-kit/?path=/docsx/ui-kit-theme--documentation).

### Использование компонентов

После установки пакета необходимо подключить стили для компонентов:

```js
import '@csssr/gpn-components/lib/index.css'
```

Для корректной работы скейлинга компонентов, необходимо настроить базовый размер через CSS Custom Properties:

```css
:root {
  --dashboard-constructor-base-size: 16;
}
```

Пример импорта компонента:

```js
import { BarChart } from '@csssr/gpn-components'
```

Кроме кода компонентов, пакет предоставляет декларации типов для TypeScript. Пример импорта типа из компонента:

```ts
import { Data } from '@csssr/gpn-components/lib/BarChart'
```

## Разработка

### Подготовка окружения

Рабочее окружение должно содержать NodeJS и Yarn, необходимые версии можно узнать в файле [package.json](./package.json) в блоке **engines**.

Для установки пакетов из GitHub Packages необходимо пройти авторизацию, подробнее про то как авторизоваться и настроить пакетный менеджер на использование GitHub Packages можно прочитать в [официальной документации](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages).

После авторизации в GitHub Packages у Вас будет достаточно прав на скачивание пакета из реестра и установки зависимостей проекта, для этого можно выполнить команду:

```sh
$ yarn install
```

### Публикация

Способы публикации новой версии пакета в GitHub Packages описаны в разделе документации [Обновление версии и публикация пакета](http://master.gpn-components.csssr.cloud/?path=/docs/документация-обновление-версии-и-публикация-пакета--page).

### Основные команды

```sh
# Сборка и старт Storybook
$ yarn storybook

# Сборка для production
$ yarn run build

# Линтинг всех файлов
$ yarn run lint

# Форматирование всех файлов prettier
$ yarn run format

# Запуск тестов
$ yarn run unit

# Запуск тестов и линтинг файлов
$ yarn test
```

## Документация

См. [раздел «Документация»](http://master.gpn-components.csssr.cloud/?path=/docs/документация-договоренности-по-оформлению-кода--page) в Storybook.
