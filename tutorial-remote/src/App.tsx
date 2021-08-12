import React from 'react';
import Video from './components/Video';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';

const App = () => {
    const store = createStore();

    return (
        <context.Provider value={store}>
            <Video />
        </context.Provider>
    );
};

export { App };
