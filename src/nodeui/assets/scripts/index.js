// console.log(Vue);
// var app6 = new Vue({
//     el:'#app-6',
//     data: {
//         message: 'hello vue'
//     }
// })
// // 前台 访问node接口
// fetch('/index/data')
//     .then(res  =>{
//         return res.json();
//     })
//     .then(res => {
//         console.log(res);
//     })
class Create{
    constructor() {
        this.elBth = $('#js-btn');
    }
    fn() {
        this.elBth.click(function(){
            alert(1);
        })
    }
}
export default Create;