import React from 'react';
import YouTube from 'react-youtube';

import { Item, items } from '../data';

import { useRoute } from 'react-router5';
const Content = () => {
    const { route } = useRoute();
    const [defaultItem] = items;
    const { id = defaultItem.videoId } = route.params;

    return (
        <YouTube
            videoId={id}
            opts={{
                height: '405',
                width: '720'
            }}
        />
    );
};

export { Content };
