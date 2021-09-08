import { useRouter, useRouteNode } from 'react-router5';
import { RouteNode, Route } from 'router5';
import { useEffect, createContext, useContext, useMemo } from 'react';

// важно понимать что имя роута должно быть уникальным,
// по этому рекомендуется добавить хеш при сборке

export const ROUTE_NAME = 'MODULE_VIDEO';
export const ROUTE_PATH = '/:id';

const findNode = (node: RouteNode, name: string): RouteNode | undefined => {
    if (node.name === name) {
        return node;
    }
    if (node.children.length > 0) {
        return node.children.find((node) => findNode(node, name));
    }
};

export const useAddRouteNode = (route: Route) => {
    const router = useRouter();
    const state = router.getState();

    // обязательно следите за тем чтобы RouteNode был добавлен 1раз,
    // router.remove() еще нет
    return useMemo(() => {
        const old = router.rootNode.children.find((node) => findNode(node, route.name));

        if (old) {
            const finalNode: Route = { ...route, name: `${old.name}.${route.name}` };
            return finalNode;
        }

        const finalNode: Route = { ...route, name: `${state.name}.${route.name}` };

        router.add(finalNode);

        return finalNode;
    }, []);
};

const defaultContextValue: Route = {
    path: ROUTE_PATH,
    name: ROUTE_NAME
};

export const RootRouterNodeContext = createContext<Route>(defaultContextValue);

export const useRootRouteNode = () => {
    return useContext(RootRouterNodeContext);
};
