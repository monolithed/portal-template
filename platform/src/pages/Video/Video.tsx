import React, {FunctionComponent} from 'react';
import {LazyModule} from '../../components/LazyModule';

export const Video: FunctionComponent<any> = () => {
    return (
        <LazyModule bundle="__tutorial_stream__" module="./Tutorial">
            <LazyModule.Component />
        </LazyModule>
    );
};
