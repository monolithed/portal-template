import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { routes, ROUTES_NAMES } from './routes';

const configureRouter = () => {
    const router = createRouter(routes, {
        defaultRoute: ROUTES_NAMES.ROOT
    });

    router.usePlugin(browserPlugin());

    return router;
};

export { configureRouter };
