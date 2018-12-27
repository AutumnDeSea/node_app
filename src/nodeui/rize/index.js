const Rize = require('rize');
const rize = new Rize({headless: false });
    rize
        .goto('localhost:3000')
        // .waitForNavigation()
        // .assertSee('Node.js')
        // .end()  // Don't forget to call `end` function to exit browser!