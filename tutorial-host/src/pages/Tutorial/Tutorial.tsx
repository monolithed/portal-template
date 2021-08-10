import React, {FunctionComponent} from 'react';
import {LazyBundle} from '../../components/LazyBundle';
import {Bundles} from '../../bundles';

const Tutorial: FunctionComponent<any> = () => {
    return (
        <LazyBundle bundle={Bundles.TUTORIAL} module="./Video">
            <LazyBundle.Component />
        </LazyBundle>
    );
};

export {Tutorial};
