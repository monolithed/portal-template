import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {createStore} from '@reatom/core';
import {context as ReatomContext} from '@reatom/react';

import Video from './modules/Video';
import {Routes} from './routes';

const App = () => {
    const store = createStore();

    return (
        <ReatomContext.Provider value={store}>
            <BrowserRouter>
                <Route path={Routes.HOME}>
                    <Video />
                </Route>
            </BrowserRouter>
        </ReatomContext.Provider>
    );
};

export {App};
