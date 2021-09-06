# Портальный архетип приложения

Пример шаблона портального архетипа

## Установка

```
git clone git@github.com:monolithed/portal-template.git
```

## Терминология

* **host** - контейнер или родительское приложение
* **remote** - дочернее приложение, которое загружается по сети и встраивается в родительское

## Запуск

При локальной запуске строго соблюдайте последовательность — сперва remote, после host. Это нужно для того, чтобы host мог найти ваши remote's.

### Удаленное приложение

1. Перейдите в директорию `tutorial-video`
2. Выполните `npm install`
3. Запустите `npm start`

### Контейнер

1. Перейдите в директорию `tutorial`
2. Повторите шаги выше

Так у вас появятся 2 процесса: на порту 3001 будет корневое приложение, а на 3006 удаленное.
Порты задаются в самих приложениях, а их маппинг находится в файле `__mocks__/remotes.ts`

### Как добавить новое удаленное приложение (remote)?

Если вы захотите добавить новый remote, то поправьте следующие файлы:

* `__mocks__/remotes.ts` — маппниг хостов. Используется чтобы найти ваши приложения на этапе разработки.
* `src/remotes.ts` — перечислите все remote's, с которыми будет работать ваш контейнер.

### Механика работы

1. Вебпак собирает 2 независимых приложения по схеме [Module Federation](https://webpack.js.org/concepts/module-federation/) (пояснительный пример, как происходит подгрузка бандлов смотрите [здесь](https://github.com/monolithed/module-federation-loader)).
2. Имя сборки задается в конфиге ModuleFederationPlugin. 
3. Артефакты сборки сохраняются в файл `assets-manifest.json`.
4. Как только пользователь запросит страницу сервер должен вернуть файл `assets-manifest.json`.
5. Из полученных данных динамически [создается тэг](https://github.com/monolithed/module-federation-loader/blob/master/src/addScript.ts) `script`.
6. После исполнения [скрипта](https://github.com/monolithed/module-federation-loader/blob/master/src/remoteLoader.ts) отрисовывается компонент.

Поскольку имена бандлов попадают в глобальное пространство имен старайтесь давать им уникальные название (по умолчанию используется название пакета).

6. Обращение к удаленными компонентам происходит так:

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

Настоятельно рекомендуется использовать следующую систему именований:

1. `<project>`
2. `<project>-<stream>`

## Сборка

1. Разнесите host и remote's на два независимые репозитории.
2. Соберите сборки и положите их на CDN.
3. Создайте эндпоинт, который будет возвращать данные из `assets-manifest.json` (по типу запроса `/api/workspace/bundle`).
4. Перед каждым обращением к стриму запрашиваейте у сервера артефакты сборки и передавайте их RemoteLoader.

## Лицензия

MIT
