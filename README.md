# Портальный архетип приложения

Пример шаблона портального архетипа

## Установка

```
git clone git@github.com:monolithed/portal-template.git
```

## Терминология

* **host** - родительское приложение
* **remote** - дочернее приложение, которое загружается по сети и встраивается в родительское

## Запуск

При локальной запуске строго соблюдайте последовательность — сперва remote, после host. Это нужно для того, чтобы host мог найти ваши remote's.

### Стрим 

1. Перейдите в директорию `tutorial-remote`
2. Выполните `npm install`
3. Запустите `npm start`
4. Откройте в браузере `http://localhost:3006`

### Платформа 

1. Перейдите в директорию `host`
2. Повторите шаги выше
3. Откройте в браузере `http://localhost:3001`

Так у вас появятся 2 процесса: на порту 3001 будет корневое приложение, а на 3006 удаленное.
Порты задаются в самих приложениях, а их маппинг в файле `__mocks__/remotes.ts`, т.е. если вы захотите добавить новый remote, то поправьте этот файл, чтобы host мог его найти.

## TODO

* Добавить примеры использования Consta
* ~~Поддержать PostCSS~~
* ~~Поддержать механизм SRI~~
* ~~Добавить мокер~~
* ~~Добавить тесты Jest~~
* ~~Добавить менеджер состояний (Redux Toolkit)~~
* ~~Разметить data-test-id~~
* Не подгужаются стили в remote
* Поддержать установку через генератор проекта
* Обработать случаи когда не загружается remote (происходит ошибка внутри remoteLoader)
* Добавить ESLint
* react-router-loading?
* react-query?
* Разнести сборочные конфиги на dev и prod
* Возможно стоит подумать как управлять зависимостями (вынести их как в create-react-app)
* Модули
    * Авторизация
    * Портальная навигация
    * Графики

* Написать документацию
    * Генерация проекта
    * Как прокидывать параметр в стрим
    * Где взять шаблоны и как написать свои
    * Сборка
    * Деплой
    * Моки
    * Как работать с API
    * Тесты (как готовить код для e2e тестов, как писать модульные тесты)


### Механика работы

1. Вебпак собирает 2 независимых приложения по схеме [Module Federation](https://webpack.js.org/concepts/module-federation/) (пояснительный пример, как происходит подгрузка бандлов смотрите [здесь](https://github.com/monolithed/module-federation-loader)).
2. Имя сборки прокидывается из конфига ModuleFederationPlugin. 
3. Артефакты сборки сохраняются в файл `assets-manifest.json`.
4. Как только пользователь запросит страницу сервер должен вернуть файл `assets-manifest.json`.
5. Из полученных данных динамически [создается тэг](https://github.com/monolithed/module-federation-loader/blob/master/src/addScript.ts) `script`.
6. После исполнения [скрипта](https://github.com/monolithed/module-federation-loader/blob/master/src/remoteLoader.ts) отрисовывается компонент 

Поскольку имена бандлов попадают в глобальное пространство имен старайтесь давать им уникальные название (по умолчанию используется название пакета).

6. Обращение к компонентам происходит так:

```tsx
import React, {FunctionComponent} from 'react';
import {RemoteLoader} from '../../components/RemoteLoader';
import {Remotes} from '../../bundles';

export const Video: FunctionComponent<any> = () => {
    return (
        <RemoteLoader bundle={Remotes.TUTORIAL} module="./Video">
            <RemoteLoader.Component />
        </RemoteLoader>
    );
};
```

### Система именований

1. `<project>`
2. `<project>-<stream>`

ui-gazprom-neft
ui-gazprom-neft-about
ui-gazprom-neft-login


## Сборка

1. Разнесите host и remote's на два независимые репозитории.
2. Соберите сборки и положите их на CDN.
3. Создайте эндпоинт, который будет возвращать данные из `assets-manifest.json` (по типу запроса `/api/workspace/bundle`).
4. Перед каждым обращением к стриму запрашиваейте у сервера артефакты сборки и передавайте их RemoteLoader.

## Лицензия

MIT
