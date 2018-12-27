// 统一代码， 处理容错
const config = require('../config');
const fetch = require('node-fetch');
class SafeRequest {
    constructor(url, options) {
        this.url = url;
        this.options = options;
        this.baseURL = config.baseUrl;
    }
    fetch() {
        return new Promise((resolve, reject) => {
            let result = {
                code: 0,
                message: 'qingqiushbai',
                data: []
            }
            console.log(this.baseURL + this.url)
            let selfFetch = fetch(this.baseURL + this.url);
            if(this.options.params) {
                selfFetch = fetch(this.baseURL + this.url, {
                    method: this.options.method,
                    body: this.options.params
                })
            }
            selfFetch
            .then(res => {
                    // console.log('🍎🍎',res)
                    return res.json();
                })
            .then((json) => {
                    result.data = json;
                    resolve(result);
            }).catch(error => {
                result.code = 1;
                result.message = 'node-fetch请求失败， 后端报警';
                reject(result);
            })
        })
    }
}
module.exports = SafeRequest;