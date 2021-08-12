import React, { FunctionComponent } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import { createStore } from '@reatom/core';
import { context } from '@reatom/react';

import { About } from './pages/About';
import { Tutorial } from './pages/Tutorial';

import { PortalMenu } from './components/PortalMenu';
import { Layout } from './components/Layout';

import { Routes } from './routes';

type Props = {};

const queryClient = new QueryClient();

const App: FunctionComponent<Props> = () => {
    const store = createStore();

    return (
        <context.Provider value={store}>
            <QueryClientProvider client={queryClient}>
                <Theme preset={presetGpnDefault}>
                    <BrowserRouter>
                        <Layout header={<PortalMenu />}>
                            <Switch>
                                <Route path={Routes.HOME} exact={true}>
                                    <About />
                                </Route>

                                <Route path={Routes.ABOUT}>
                                    <About />
                                </Route>

                                <Route path={Routes.TUTORIAL}>
                                    <Tutorial />
                                </Route>
                            </Switch>
                        </Layout>
                    </BrowserRouter>
                </Theme>
            </QueryClientProvider>
        </context.Provider>
    );
};

export { App };
