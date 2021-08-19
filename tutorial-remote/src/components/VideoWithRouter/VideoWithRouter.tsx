import React, { useEffect } from 'react';

import { VideoBlock } from './VideoBlock/VideoBlock';
import { Tabs } from './Tabs/Tabs';

import { Route, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { items } from './helpers';

type Props = JSX.IntrinsicElements['section'];

const VideoWithRouter: React.FC<Props> = (props) => {
    const { url } = useRouteMatch();
    const history = useHistory();
    const rootPath = url === '/' ? url : `${url}/`;
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === url) {
            history.replace(`${rootPath}${items[0].videoId}`);
        }
    }, [location]);

    return (
        <section {...props}>
            <Route path={`${rootPath}:videoId`}>
                <Tabs />
                <VideoBlock />
            </Route>
        </section>
    );
};

export { VideoWithRouter };
