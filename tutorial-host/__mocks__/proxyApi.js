const {resolve} = require('path');

const getRemoteAssets = () => {
    const file = resolve(__dirname, '../../tutorial-remote/dist/assets-manifest.json');

    return require(file);
};

const proxy = {
    _proxy: {
        header: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    },

    // Этот метод возвращает объект сборки (src и integrity)
    // В локальной среде данные берутся из файла assets-manifest.json
    'GET /api/workspace/bundle': (request, response) => {
        const {name} = request.query;
        const assets = getRemoteAssets();

        const bundle = {
            ...assets[`${name}.js`]
        };

        const url = new URL('http://localhost:3006');
        url.pathname = bundle.src;

        bundle.src = url.href;

        return response.json(bundle);
    }
};

module.exports = proxy;
