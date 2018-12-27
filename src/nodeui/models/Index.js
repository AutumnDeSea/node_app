/**
 * @fileoverview 实现Index数据模型
 * @author konglili
 */
const SafeRequest = require('../utils/SafeRequest.js');
/**
 * Index类 获取后台的有关于图书相关数据类
 */
class Index{
    /**
     * @constructor
     * @param {string} app Koa2执行上下文的环境
     */
    constructor(app) {

    }
    /**
     * 
     * @param {*} options 配置项
     * @example
     * return new Promise
     * getData(url, options)
     */
    getData(options) {
        const safeRequest = new SafeRequest('book/index', options|| {});
        return safeRequest.fetch();
    }
    /**
     * 
     * @param {*} options  配置项
     * @example
     * return new Promise
     * saveDataf(url, options)
     */
    saveData(options) {
        const safeRequest = new SafeRequest('book/create',{
            method: 'POST',
            params: options.params
        });
        return safeRequest.fetch();
    }
}
module.exports = Index;