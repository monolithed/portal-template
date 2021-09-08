import React, { FunctionComponent } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { createStore } from '@reatom/core';

import { context as ReatomContext } from '@reatom/react';

import { About } from './pages/About';
import { Tutorial } from './pages/Tutorial';
import { PortalMenu } from './components/PortalMenu';
import { Layout } from './components/Layout';

import { ROUTES_NAMES } from './modules/route/routes';

import { useRouterAtom } from './modules/route';
import { useRouter } from 'react-router5';

type Props = {};

const queryClient = new QueryClient();

const App: FunctionComponent<Props> = () => {
    const { route } = useRouterAtom();

    return (
        <QueryClientProvider client={queryClient}>
            <Theme preset={presetGpnDefault}>
                <Layout header={<PortalMenu />}>
                    {(route?.name === ROUTES_NAMES.ROOT || route?.name === ROUTES_NAMES.ABOUT) && (
                        <About />
                    )}
                    {route?.name.indexOf(ROUTES_NAMES.TUTORIAL) !== -1 && <Tutorial />}
                </Layout>
            </Theme>
        </QueryClientProvider>
    );
};

export { App };
