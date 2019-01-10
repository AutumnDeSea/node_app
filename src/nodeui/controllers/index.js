// 接口的初始化
// 引入路由
const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const BookController = require('./BooksController');
const indexControll = new IndexController();
const bookController = new BookController();
const init = (app) => {
    app.use(router(_ => {
        _.get('/', indexControll.actionIndex());
        _.get('/book', bookController.actionIndex());
        _.get('/book/add', bookController.actionCreate());
        _.get('/book/savedata', bookController.actionSaveData());
    }))
    // app.use(router(_ => {
    //     _.get('/index/create', indexControll.actionCreate());
    // }))
    // app.use(router(_ => {
    //     _.get('/index/saveData', indexControll.actionSaveData());
    // }))
}
module.exports = init;
