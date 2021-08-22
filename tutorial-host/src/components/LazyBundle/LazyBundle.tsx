import React, {
    FunctionComponent,
    Suspense,
    lazy
} from 'react';

import {remoteLoader} from '@monolithed/module-federation-loader';
import {ErrorBoundary} from '@monolithed/error-boundary-component';
import {SkeletonText} from '@consta/uikit/Skeleton';

import {useBundle} from './useBundle';

type Props = {
    bundle: string;
    module: string;
    children?: any;
};

type ServiceComponent<Props> = FunctionComponent<Props> & {
    Component: FunctionComponent<any>;
};

const LazyBundle: ServiceComponent<Props> = ({children, bundle, module}): JSX.Element => {
    const {loading} = useBundle(bundle);

    if (loading) {
        return <SkeletonText rows={4} />;
    }

    const remoteModule = remoteLoader({bundle, module});
    const Component = lazy(remoteModule);

    return (
        <ErrorBoundary>
            <Suspense fallback={<SkeletonText rows={4} />}>
                <Component>{...children.props}</Component>
            </Suspense>
        </ErrorBoundary>
    );
};

const Component: FunctionComponent<any> = (props) => {
    return <div {...props} />;
};

LazyBundle.Component = Component;

export {LazyBundle};
export type {Props};
