const {resolve} = require('path');

const getStreamAssets = () => {
    const file = resolve(__dirname, '../../stream/dist/assets-manifest.json');

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

    'GET /api/workspace/bundle': (request, response) => {
        const {name} = request.query;
        const assets = getStreamAssets();

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
