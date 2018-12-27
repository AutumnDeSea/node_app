const fetch = require('node-fetch');
// fetch('http://localhost/basic/web/index.php?r=books')
//     .then(res => res.json()) // expecting a json response
//     .then(json => console.log(json[0].name));
const { URLSearchParams } = require('url');
const params = new URLSearchParams();
// Book[bookId]: 1232
// Book[bookName]: 一本好书
// Book[author]: 孔丽丽
// Book[price]: 122
// Book[borrowTime]: 21323
// Book[borrowDuration]: 12
// Book[isBorrow]: 232
params.append("Book[bookName]", "测试的数据");
params.append("Book[author]", "测试作者");
params.append("Book[bookId]", 12132422324);
params.append("Book[price]", 121324324);
params.append("Book[borrowTime]", 121324324);
params.append("Book[borrowDuration]", 24324);
params.append("Book[isBorrow]", 432);
fetch('http://localhost:8080/basic/web/index.php?r=book/create', {
        method: 'POST',
        body:params
    })
    .then(res => res.json()) // expecting a json response
    .then(json => console.log(json))
    .catch((err)=>{
        console.log(`😢${err}`);
    })