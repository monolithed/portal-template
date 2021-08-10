import React, {FunctionComponent} from 'react';
import {LazyModule} from '../../components/LazyModule';
import {Bundles} from '../../Routes';

export const Video: FunctionComponent<any> = () => {
    return (
        <LazyModule bundle={Bundles.TUTORIAL} module="./Tutorial">
            <LazyModule.Component />
        </LazyModule>
    );
};
