const Mocha = require('mocha');
const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: './docs/mochawesome-reporter',
      }
});
mocha.addFile('./test/services/router.spec.js');
mocha.run(function(errorLenth) {
    if(errorLenth >0)  {
        console.log('error 😢😢')
        process.exit(1)
    }else {
        console.log('单元结束done');
        process.exit()
    }
})