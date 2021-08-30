import React, {
    FunctionComponent,
    useEffect
} from 'react';

import {
    Route,
    useRouteMatch,
    useHistory,
    useLocation
} from 'react-router-dom';

import {Content} from './Content';
import {Tabs} from './Tabs';
import {items} from './data';

type Props = JSX.IntrinsicElements['section'];

const Video: FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const {url, path} = useRouteMatch();
    const {pathname} = useLocation();

    const [defaultItem] = items;

    useEffect(() => {
        if (pathname === url) {
            history.replace(`${path}/${defaultItem.videoId}`);
        }
    }, [pathname]);

    return (
        <section {...props}>
            <Route path={`${path}/:videoId`}>
                <Tabs />
                <Content />
            </Route>
        </section>
    );
};

export {Video};
