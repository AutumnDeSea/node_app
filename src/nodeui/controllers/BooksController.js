const Index = require('../models/Index.js');
const { URLSearchParams } = require('url');
const cheerio = require('cheerio')
class IndexController{
    actionIndex() {
        return async(ctx, next) => {
            // ctx.body = 'hello world'
            // header 是由ctx的ctx.body 设置的
            // 输出的内容 以最后一次
            const index = new Index();
            const result = await index.getData();
            const html = await ctx.render('books/pages/index', {
                data: result.data.data.rows
            })
            if(ctx.request.header['x-pjax']) {
                const $ = cheerio.load(html);
                ctx.body = $("#js-hooks-data").html();
            }else {
                ctx.body = html;
            }
        }
    }
    actionCreate() {
        return async(ctx, next) => {
           const html = await ctx.render('books/pages/add');
            if(ctx.request.header['x-pjax']) {
                const $ = cheerio.load(html);
                let _result = "";
                $('.pjaxcontent').each(function() {
                    _result += $(this).html();
                })
                $('.lazyload-js').each(function(){
                    // activeJs($(this).attr('src'))
                    _result += `<script src="${$(this).attr('src')}"></script>`
                })
                // $('.lazyload-css').each(function(){
                //     _result += `<script src="${$(this).attr('src')}"></script>`
                // })
                console.log('🌹', _result);
                ctx.body = _result;
            }else {
                ctx.body = html;
            }
        }
    }
    actionSaveData() {
        return async(ctx, next) => {
            // ctx.body = {
            //     res: 0
            // }
        
            // 取倒前端发过来的数据
            const params = new URLSearchParams();
            params.append("Book[bookName]", "测试的数据");
            params.append("Book[author]", "测试作者");
            params.append("Book[bookId]", 12132422324);
            params.append("Book[price]", 121324324);
            params.append("Book[borrowTime]", 121324324);
            params.append("Book[borrowDuration]", 24324);
            params.append("Book[isBorrow]", 432);
            const index = new Index();
            const result = await index.saveData({params});
            // ctx.body = await ctx.redirect('index.html', {
            //     data: result.data.data.rows[0]['bookName']
            // })
        }
    }
}
module.exports = IndexController;