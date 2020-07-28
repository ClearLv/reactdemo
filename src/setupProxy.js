// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://localhost:8080/',
        pathRewrite: {
            "^/api": "/"
        },
        changeOrigin:true,
    }));
    // app.use(proxy('/auth', {
    //     target: 'http://127.0.0.1:4002/',
    //     pathRewrite: {
    //         "^/auth": "/"
    //     }
    // }));
};
