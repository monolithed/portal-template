import React from 'react';
import { Video } from './components/Video/Video';
import { VideoWithRouter } from './components/VideoWithRouter/VideoWithRouter';
import { createStore } from '@reatom/core';
import { context as ReatomContext } from '@reatom/react';
import { BrowserRouter } from 'react-router-dom';

import { Route } from 'react-router-dom';

const App = () => {
    const store = createStore();

    return (
        <ReatomContext.Provider value={store}>
            <BrowserRouter>
                <Route path="/">
                    <Video />
                    <VideoWithRouter />
                </Route>
            </BrowserRouter>
        </ReatomContext.Provider>
    );
};

export { App };
