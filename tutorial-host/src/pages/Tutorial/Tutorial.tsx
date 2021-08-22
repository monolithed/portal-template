import React, {FunctionComponent} from 'react';
import {LazyBundle} from '../../components/LazyBundle';
import {Bundles} from '../../bundles';

type Props = {};

const Tutorial: FunctionComponent<Props> = () => {
    return (
        <LazyBundle bundle={Bundles.TUTORIAL} module="./Video">
            <LazyBundle.Component />
        </LazyBundle>
    );
};

export {Tutorial};
