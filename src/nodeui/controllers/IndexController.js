const Index = require('../models/Index.js');
const { URLSearchParams } = require('url');
class IndexController{
    actionIndex() {
        return async(ctx, next) => {
            // ctx.body = 'hello world'
            // header 是由ctx的ctx.body 设置的
            // 输出的内容 以最后一次
            const index = new Index();
            const result = await index.getData();
            console.log(result.data.data.rows)
            ctx.body = await ctx.render('index.html', {
                data: result.data.data.rows
            })
        }
    }
    actionCreate() {
        return async(ctx, next) => {
            ctx.body = await ctx.render('create.html')
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