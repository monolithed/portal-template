import React from 'react';

import { Tabs as ConstaTabs } from '@consta/uikit/Tabs';

import { items, getItemByVideoId } from '../helpers';

import { useRouteMatch, useParams, useHistory } from 'react-router-dom';

type Props = JSX.IntrinsicElements['section'];

const Tabs: React.FunctionComponent<Props> = (props) => {
    const { url } = useRouteMatch();
    const { videoId } = useParams<{ videoId: string }>();
    const history = useHistory();

    const rootPath = url === '/' ? url : `${url}/`;

    return (
        <ConstaTabs
            items={items}
            onChange={({ value }) => history.push(value.videoId)}
            getLabel={(item) => item.name}
            value={getItemByVideoId(videoId)}
        />
    );
};

export { Tabs };
