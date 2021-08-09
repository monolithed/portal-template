import React, {FunctionComponent} from 'react';
import YouTube from 'react-youtube';

type Props = {};

const Tutorial: FunctionComponent<Props> = () => {
    return (
        <section>
            <YouTube videoId='-ei6RqZilYI' opts={{height: '405', width: '720'}} />
        </section>
    );
};

export {Tutorial};
