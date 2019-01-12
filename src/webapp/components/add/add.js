// 代表组件banner 用到所有的 css， js
const add = {
    init() {
        console.log('add');
        xtag.create('x-add', class extends XTagElement {
            constructor() {
                super();
                this.datas = {
                    user: 'lili'
                }
            }
            '::template(true)'() {
                return `<h3>添加图书</h3>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">书名</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="请输入图书名字">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">作者</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="请输入作者">
                            </div>
                            <button id='js-btn' type="submit" class="btn btn-primary">提交</button>
                        </form> `
            }
            "click::event"(e) {
                if(e.target.id == 'js-btn') {
                    // fetch请求
                    alert('请求')
                }
            }
        });
    }
}
export default add;