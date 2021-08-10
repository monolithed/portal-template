import React, {
    FunctionComponent
} from 'react';

import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import {
    QueryClient,
    QueryClientProvider
} from 'react-query';

import {
    Theme,
    presetGpnDefault
} from '@consta/uikit/Theme';

import {About} from './pages/About';
import {Video} from './pages/Video';

import {PortalMenu} from './components/PortalMenu';
import {Layout} from './components/Layout';

import {Routes} from './Routes';

type Props = {};

const queryClient = new QueryClient();

const App: FunctionComponent<Props> = () => (
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

                        <Route path={Routes.VIDEO}>
                            <Video />
                        </Route>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </Theme>
    </QueryClientProvider>
);

export {App};
