import React from 'react';

import YouTube from 'react-youtube';

import { useParams } from 'react-router-dom';

const VideoBlock = () => {
    const { videoId } = useParams<{ videoId: string }>();
    return <YouTube videoId={videoId} opts={{ height: '405', width: '720' }} />;
};

export { VideoBlock };
