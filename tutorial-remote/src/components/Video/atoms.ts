import { declareAction, declareAtom, map } from '@reatom/core';

export type Item = {
    name: string;
    videoId: string;
};

export const items: Item[] = [
    {
        name: 'Видео 1',
        videoId: '-ei6RqZilYI',
    },
    {
        name: 'Видео 2',
        videoId: 'nyIpDs2DJ_c',
    },
    {
        name: 'Видео 3',
        videoId: 'zl2xNwX2ZjU',
    },
];

export const changeVideoAction = declareAction<Item>();

export const currentVideoAtom = declareAtom(items[0], (on) => [
    on(changeVideoAction, (state, payload) => payload),
]);

export const currentVideoIdAtom = map(currentVideoAtom, (currentVideo) => currentVideo.videoId);
