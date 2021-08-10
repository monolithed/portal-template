import React, {FunctionComponent} from 'react';
import {LazyModule} from '../../components/LazyModule';
import {Bundles} from '../../bundles';

const Tutorial: FunctionComponent<any> = () => {
    return (
        <LazyModule bundle={Bundles.TUTORIAL} module="./Video">
            <LazyModule.Component />
        </LazyModule>
    );
};

export {Tutorial};
