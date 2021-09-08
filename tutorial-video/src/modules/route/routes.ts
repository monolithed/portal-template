const ROUTES_NAMES = {
    ROOT: 'ROOT'
} as const;

export type RouteName = keyof typeof ROUTES_NAMES;

type Route = {
    name: RouteName;
    path: string;
};

const routes: Route[] = [
    {
        name: ROUTES_NAMES.ROOT,
        path: '/'
    }
    // { name: 'VIDEO', path: '/video' }
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

export { getRoute, routes, ROUTES_NAMES, routesMap };
