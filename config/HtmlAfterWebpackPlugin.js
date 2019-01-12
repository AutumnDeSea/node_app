const pluginName = 'htmlAfterWebpackPlugin';
const assetsHelp =(data) => {
    let css = [];  
    let js = [];
    console.log('🍔',data)
    const dir = {
        js: item => `<script class='lazyload-js' src="${item}"></script>`,
        css: item  => `<link class='lazyloadc-css' rel="stylesheet" href="${item}"/>`
    }
    for(let jsitem of data.js) {
        js.push(dir.js(jsitem));
    }
    for(let jsitem of data.js) {
        css.push(dir.css(jsitem));
    }
    return{
        js,
        css
    } 
}
class HtmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            // htmlWebpackPluginAfterHtmlProcessing
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName, htmlPluginData => {
                // console.log(htmlPluginData);
                let _html = htmlPluginData.html;
                _html = _html.replace(/components:/g, "../../../components/");
                _html = _html.replace(/common:/g, '../../common/');
                const result =  assetsHelp(htmlPluginData.assets);
                _html = _html.replace(/<!--injectcss-->/g, result.css.join(""));
                _html = _html.replace(/<!--injectjs-->/g, result.js.join(""));
                console.log('🍔', _html);
                htmlPluginData.html = _html;
            })
        });
    }
}
module.exports = HtmlAfterWebpackPlugin;