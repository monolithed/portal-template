import React, { FunctionComponent, useEffect } from 'react';

import { Content } from './Content';
import { Tabs } from './Tabs';

import { ROUTE_NAME, ROUTE_PATH, useAddRouteNode, RootRouterNodeContext } from './helpers';

type Props = JSX.IntrinsicElements['section'];

export const Video: FunctionComponent<Props> = (props) => {
    // Этот вариант когда удаленное приложение само встраивается в роутер хостового приложения
    // Так же можно прописать все роуты удаленного в хостовоем приложение если есть такая возможность
    // Тогда логика станет намного проще
    // В данном случае показал сложный вариант,
    // когда хостовое приложение не знает какой роут есть у удаленного

    const node = useAddRouteNode({ name: ROUTE_NAME, path: ROUTE_PATH });

    return (
        <RootRouterNodeContext.Provider value={node}>
            <section {...props}>
                <Tabs />
                <Content />
            </section>
        </RootRouterNodeContext.Provider>
    );
};
