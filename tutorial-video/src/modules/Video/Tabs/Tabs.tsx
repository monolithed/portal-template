import React, { useEffect } from 'react';
import { Tabs as ConstaTabs } from '@consta/uikit/Tabs';

import { Item, items, getItemByVideoId } from '../data';

import { useRoute, useRouteNode } from 'react-router5';

import { useRootRouteNode } from '../helpers';

type Props = JSX.IntrinsicElements['section'];

const Tabs: React.FunctionComponent<Props> = () => {
    const rootNode = useRootRouteNode();
    const { route, router } = useRoute();

    return (
        <ConstaTabs
            items={items}
            onChange={({ value }) => router.navigate(rootNode.name, { id: value.videoId })}
            getLabel={(item) => item.name}
            value={getItemByVideoId(route.params.id)}
        />
    );
};

export { Tabs };
