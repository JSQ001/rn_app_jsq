const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/app', {
        target: 'http://192.168.0.220:8080',
        "changeOrigin": true,
        "pathRewrite": {
        "^/app": "/"
        }
    }));
    app.use(proxy('/profile', {
        target: 'http://192.168.0.220:8080',
        "changeOrigin": true,
        "pathRewrite": {
        "^/profile": "/profile-service"
        }
    }));


    app.use(proxy('/cust', {
        target: 'http://192.168.0.220:8080',
        "changeOrigin": true,
        "pathRewrite": {
        "^/cust": "/cust-service"
        }
    }));

    app.use(proxy('/webshop', {
        target: 'http://192.168.0.220:8080',
        "changeOrigin": true,
        "pathRewrite": {
        "^/webshop": "/webshop-service"
        }
    }));


    app.use(proxy('/payment', {
        target: 'http://192.168.0.220:8080',
        "changeOrigin": true,
        "pathRewrite": {
        "^/payment": "/payment-service"
        }
    }));

    app.use(proxy('/repayacct', {
        target: 'http://192.168.0.220:8080',
        "changeOrigin": true,
        "pathRewrite": {
        "^/repayacct": "/repay-acct-service"
        }
    }));
};
