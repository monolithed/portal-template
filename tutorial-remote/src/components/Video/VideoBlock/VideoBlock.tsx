import React from 'react';

import YouTube from 'react-youtube';

import { useAtom } from '@reatom/react';
import { currentVideoIdAtom } from '../atoms';

const VideoBlock = () => {
    const videoId = useAtom(currentVideoIdAtom);

    return <YouTube videoId={videoId} opts={{ height: '405', width: '720' }} />;
};

export { VideoBlock };
