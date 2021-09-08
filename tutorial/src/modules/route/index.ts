import { configureRouter } from './configureRouter';
import { routerAtom } from 'reatom-router5';
import { useAtom } from '@reatom/react';

const router = configureRouter();

export const useRouterAtom = () => useAtom(routerAtom);

export { router };
