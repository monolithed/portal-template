import React, {
    FunctionComponent
} from 'react';

import YouTube from 'react-youtube';

type Props = JSX.IntrinsicElements['section'];

const Video: FunctionComponent<Props> = (props) => (
    <section {...props}>
        <YouTube videoId='-ei6RqZilYI' opts={{height: '405', width: '720'}} />
    </section>
);

export {Video};
