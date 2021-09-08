import React, { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './App';
import './index.css';

import { RouterProvider } from 'react-router5';
import { router } from './modules/route';

import { subscribe, routerAtom } from 'reatom-router5';
import { createStore } from '@reatom/core';
import { Provider } from '@reatom/react';

const Root: React.FC = () => {
    const store = createStore(routerAtom);

    subscribe(store, router);

    router.start();

    return (
        <StrictMode>
            <Provider value={store}>
                <RouterProvider router={router}>
                    <App />
                </RouterProvider>
            </Provider>
        </StrictMode>
    );
};

render(<Root />, document.getElementById('root'));
