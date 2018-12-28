// http://localhost:8080/basic/web/index.php?r=book/index
console.log('取到的环境变量---》》', process.env.NODE_ENV);
// 跑自动化测试的一定要退出这个exit
// process.exit();
import koa from 'koa';
import init from './controllers';
import  config from './config';
import log4js from 'log4js';
import  errorHandler from './middlewares/errorHandler';
import co from 'co';
const app = new koa();
// co的作用是把* 函数全部自动向下执行 next -》next-》 done
// async await 是 *函数的 语法糖 版本
// koa-swig并没有为koa2 作详细的升级
// koa1转换器
// const convert = require('koa-convert');
// 指定静态资源目录
import serve from 'koa-static';
app.use(serve(config.staticDir));

//引入模版
import render from 'koa-swig';
app.context.render = co.wrap(render({
	root: config.viewDir,
	autoescape: true,
	cache: 'memory', // disable, set to false
	ext: 'html',
	writeBody: false,
	varControls: ["[[", "]]"]
}));
log4js.configure({
	appenders: {
		cheese: {
			type: 'file',
			filename: './logs/yd-log.log'
		}
	},
	categories: {
		default: {
			appenders: ['cheese'],
			level: 'error'
		}
	}
});
const logger = log4js.getLogger('cheese');
errorHandler.error(app, logger);
init(app);
app.listen(config.port, () => {
	console.log('server is running.....')
});