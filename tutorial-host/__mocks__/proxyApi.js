const fetch = require('node-fetch');
const bundles = require('./bundles');

module.exports = {
    _proxy: {
        header: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    },

    // Этот метод возвращает объект сборки (src и integrity)
    // В локальной среде данные берутся из файлов assets-manifest.json
    'GET /api/workspace/bundle': async (request, response) => {
        const assetsUrl = `${bundles.tutorial}/assets-manifest.json`;
        const {name} = request.query;

        const assetsRequest = await fetch(assetsUrl);
        const assets = await assetsRequest.json();
        const {src, integrity} = assets[`${name}.js`];

        const url = new URL(assetsUrl);
        url.pathname = src;

        return response.json({
            src: url,
            integrity
        });
    }
};

