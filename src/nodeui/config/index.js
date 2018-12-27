import {join} from 'path';
import _  from 'lodash';
let config = {
    "viewDir": join(__dirname,'..',"views"),
    "staticDir": join(__dirname, "..","assets")
}
if(process.env.NODE_ENV == 'development'){
    const localConfig = {
        port: 3000,
        baseUrl: 'http://localhost:8080/basic/web/index.php?r=',
    }
    config = _.extend(config, localConfig)
}
if(false) {
    console.log('🍎🍎🍎🍎')
}
// 留给大家 pm2 启动
if(process.env.NODE_ENV == 'production'){
    const proConfig = {
        port: 3000,
        baseUrl: 'http://localhost:8080/basic/web/index.php?r=',
    }
    config = _.extend(config, proConfig)
}
module.exports = config;