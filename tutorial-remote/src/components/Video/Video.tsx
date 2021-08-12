import React, { FunctionComponent } from 'react';

import { VideoBlock } from './VideoBlock/VideoBlock';
import { Tabs } from './Tabs/Tabs';

type Props = JSX.IntrinsicElements['section'];

const Video: FunctionComponent<Props> = (props) => (
    <section {...props}>
        <Tabs />
        <VideoBlock />
    </section>
);

export { Video };
