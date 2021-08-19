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

export const getItemByVideoId = (videoId: string) => items.find((item) => item.videoId === videoId);
