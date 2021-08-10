# Портальный архетип приложения

Пример шаблона портального архетипа

## Установка

```
git clone git@github.com:monolithed/portal-template.git
```

## Запуск

При локальной запуске строго соблюдайте последовательность — сперва стрим, после хост. Это нужно для того, чтобы хост мог найти сборку из стрима.

### Стрим 

1. Перейдите в директорию `stream`
2. Выполните `npm install`
3. Запустите `npm start`
4. Откройте в браузере `http://localhost:3006`

### Платформа 

1. Перейдите в директорию `host`
2. Повторите шаги выше
3. Откройте в браузере `http://localhost:3001`

У вас будет запущено 2 процесса: на порту 3001 будет корневое приложение (портал), а на 3006 стрим (приложение, которое подгрузится в портал).

## TODO

* Добавить примеры использования Consta
* ~~Поддержать PostCSS~~
* ~~Поддержать механизм SRI~~
* ~~Добавить мокер~~
* ~~Добавить тесты Jest~~
* Добавить ESLint
* Добавить менеджер состояний (Redux Toolkit)
* Поддержать установку через генератор проекта
* react-router-loading?
* react-query?
* Разметить data-testid
* Разнести сборочные конфиги на dev и prod
* Возможно стоит подумать как управлять зависимостями (вынести их как в create-react-app)
* Модули
    * Авторизация
    * Портальная навигация
    * Графики

* Написать документацию
    * Генерация проекта
    * Где взять шаблоны и как написать свои
    * Сборка
    * Деплой
    * Моки
    * Как работать с API
    * Тесты (как готовить код для e2e тестов, как писать модульные тесты)

### Механика работы

1. Вебпак собирает 2 независимых приложения по схеме [Module Federation](https://webpack.js.org/concepts/module-federation/) (сценарий подгрузки бандлов подробно описан в [здесь](https://github.com/monolithed/module-federation-loader)).
2. Через файл `assets-manifest.json` мы получаем пути и хеши сборок.
3. Динамически создаем тэг script.
4. Скрипт выполняется через глобальную переменную (ее создает сам вебпак):

```js
new ModuleFederationPlugin({
    name: '__tutorial_stream'
});
```

По этой причине старайтесь избежать конфликта имен и давайте названиям бандлов уникальные префиксы.

6. Обращение к компонентам происходит так:

```tsx
import React, {FunctionComponent} from 'react';
import {LazyModule} from '../../components/LazyModule';
import {Bundles} from '../../bundles';

export const Video: FunctionComponent<any> = () => {
    return (
        <LazyModule bundle={Bundles.TUTORIAL} module="./Video">
            <LazyModule.Component />
        </LazyModule>
    );
};
```

## Как пользоваться

1. Разнесите host и stream на два независимых репозитория (стримов может быть неограниченное количество).
2. Соберите host и разложите на стенд.
3. Соберите стримы.
4. Сборки со стримами положите на CDN.
5. Создайте эндпоинт, который будет возвращать `assets-manifest.json`.

## Лицензия

MIT
