import React, { FunctionComponent } from 'react';
import { LazyBundle } from '../../components/LazyBundle';
import { Bundles } from '../../bundles';

const RouterExample: FunctionComponent<any> = () => {
    return (
        <LazyBundle bundle={Bundles.TUTORIAL} module="./VideoWithRouter">
            <LazyBundle.Component />
        </LazyBundle>
    );
};

export { RouterExample };
