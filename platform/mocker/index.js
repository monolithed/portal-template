const {resolve} = require('path');
const assets = require('../../stream/dist/assets-manifest.json');
const {devServer} = require('../../stream/webpack.config');

const proxy = {
    'GET /api/workspace/bundle': (request, response) => {
        const {name} = request.query;

        const bundle = {
            ...assets[`${name}.js`]
        };

        const url = new URL('http://localhost');

        console.log(url);

        url.port = devServer.port;
        url.pathname = bundle.src;

        bundle.src = url.href;

        console.info(bundle);

        return response.json(bundle);
    }
};

module.exports = proxy;
