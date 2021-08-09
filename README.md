# @monolithed/portal-template

Пример шаблона портального архетипа

## Установка

```
git clone git@github.com:monolithed/portal-template.git
```

## Запуск

### Платформа 

1. Перейдите в директорию `platform`
2. Выполните `npm install`
3. Запустите `npm start`
4. Откройте в браузере `http://localhost:3001`

### Стрим 

1. Перейдите в директорию `stream`
2. Повторите шаги выше
3. Откройте в браузере `http://localhost:3006`

У вас будет запущено 2 процесса: на порту 3001 будет корневое приложение (портал), а на 3006 стрим (приложение, которое подгрузится в портал).


## TODO

1. Добавить примеры использования Consta
2. Поддержать PostCSS
3. Добавить мокер
4. Добавить тесты
5. Разнести пример на разные репозитории
6. Генерировать структура проекта автоматически
7. Написать документацию
    * Генерация проекта
    * Где взять шаблоны и как написать свои
    * Сборка
    * Деплой
    * Моки
    * Как работать с API
    * Тесты (как готовить код для e2e тестов, как писать модульные тесты)

### Механика работы 

1. Вебпак собирает 2 независимых приложения по схеме [Module Federation](https://webpack.js.org/concepts/module-federation/). Сценарий подгрузки подробно описан в здесь [Module Federation Loader](https://github.com/monolithed/module-federation-loader).
3. Все бандлы, которые загружатся доступны по прямому обращению через глобальное простанство имен (к сложалению, так придумали в вебапке).
Имя банала задается в конфиге стрима: `new ModuleFederationPlugin({name: '__tutorial_stream__'})`. Так мы создаем глобальную переменную `window.__tutorial_stream__`, которую впоследствии используем для обращения к компонентам бандла.
Чтобы избежать конфликта имен старайтесь давать названиям ваших бандлов уникальные префиксы.
4. Хеши и и нвазания сборок должны забираться из файла `assets-manifest.json`

## Как пользоваться

1. Разнесите platform и stream на два независимых репозитория (стримов может быть неограниченное количество).
2. Соберите platform и разложите на стенд.
3. Соберите стримы.
4. Сборки со стримами положите на CDN, а пути к ним хеши положите в базу данных, чтобы в последствии их можно было запросить у сервера.
5. Создайте эндпоинт, который будет возвращать по названию бандла его src и integrity (опционально).  
6. При каждом обращении к внешнему компоненту будет делаться запрос за сборкой.
7. Чтобы использовать стратегию кеширования и откатов имена сборок должны быть с хешами.
8. В директории `api/workspace/bundle.json` лежат заглушки для тестового примера.  

## Лицензия

MIT
