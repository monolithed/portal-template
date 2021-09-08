import React from 'react';

import { createStore } from '@reatom/core';

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import Video from './modules/Video';

const App = () => {
    return (
        <Theme preset={presetGpnDefault}>
            <Video />
        </Theme>
    );
};

export { App };
