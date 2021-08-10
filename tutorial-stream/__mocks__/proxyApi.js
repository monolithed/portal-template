const assets = require('../dist/assets-manifest.json');
const {devServer} = require('../webpack.config');

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

        const bundle = {
            ...assets[`${name}.js`]
        };

        const url = new URL('http://localhost');

        url.port = devServer.port;
        url.pathname = bundle.src;

        bundle.src = url.href;

        console.info(bundle);

        return response.json(bundle);
    }
};

module.exports = proxy;
