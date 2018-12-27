// 接口的初始化
// 引入路由
const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const indexControll = new IndexController();
const init = (app) => {
    app.use(router(_ => {
        _.get('/', indexControll.actionIndex());
    }))
    app.use(router(_ => {
        _.get('/index/create', indexControll.actionCreate());
    }))
    app.use(router(_ => {
        _.get('/index/saveData', indexControll.actionSaveData());
    }))
}
module.exports = init;
