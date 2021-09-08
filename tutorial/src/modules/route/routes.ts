const ROUTES_NAMES = {
    ROOT: 'ROOT',
    ABOUT: 'ABOUT',
    TUTORIAL: 'TUTORIAL'
    // Также возможно прописать все роуты удаленного приложения в хостовом,
    // если конечно есть такая возмржность,
    // это позволит избежать редиректа с в нутренней страници удаленного приложения, при обновлении страницы
    // Почему происходит редирект, при срате приложения инициализируется роутер,
    // и в этот момент удаленное приложение еще не загрузилось,
    // роутер понимает что страници не существует
    // и переадрисовывается на страницу которая указана как дефолтная в настройках
    // Если вам это критичнор есть 2 пути:
    // 1) описать роуты удаленного приложения в хостовом
    // 2) написать мидлвару(https://router5.js.org/advanced/middleware), которая будет остлеживать редирект сразу после инициализации приложения,
    // -- запоминать URL страници которая еще пока не доступна,
    // -- перенаправлять редирект на страницу хостового приложения куда подключено удаленное приложение,
    //    после этого удаленное приложение добавит в роутер свои роуты
    // -- Редирект на страницу исходную страницу удаленного приложения

    // MODULE_TUTORIAL_VIDEO - роут удаленного приложения
    // MODULE_TUTORIAL_VIDEO: 'TUTORIAL.MODULE_VIDEO'
} as const;

export type RouteName = typeof ROUTES_NAMES[keyof typeof ROUTES_NAMES];

type Route = {
    name: RouteName;
    path: string;
    label?: string;
};

// Конфиги могут быть любыми, можно указать сдесь к примеру признак нуждаемости в авторизации,
// в дальнейшем использовать его в мидлваре (https://router5.js.org/advanced/middleware)
// проверять в ней наличия токена, и разрежать или не разрешать доступ к странице

const routes: Route[] = [
    {
        name: ROUTES_NAMES.ROOT,
        path: '/',
        label: 'Локальный модуль'
    },
    {
        name: ROUTES_NAMES.ABOUT,
        path: '/about',
        label: 'Локальный модуль'
    },
    {
        name: ROUTES_NAMES.TUTORIAL,
        path: '/tutorial',
        label: 'Динамический модуль'
    }
    // роут удаленного прилоджения
    // {
    //     name: ROUTES_NAMES.MODULE_TUTORIAL_VIDEO,
    //     path: '/:id',
    //     label: 'Динамический модуль'
    // }
];

const getRoutesMap = () => {
    let routerMap = {};

    for (let index = 0; index < routes.length; index++) {
        routerMap[routes[index].name] = routes[index];
    }

    return routerMap as Record<RouteName, typeof routes[number]>;
};

const routesMap = getRoutesMap();

const getRoute = (name: RouteName) => routesMap[name];
const getLabel = (name: RouteName) => getRoute(name).label;

export { getRoute, getLabel, routes, ROUTES_NAMES, routesMap };
