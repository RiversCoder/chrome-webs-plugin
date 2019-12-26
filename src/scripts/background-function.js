const cheerio = require('cheerio');

// 检测 当前网站是否是动态网站
export function checkWebsiteDynamic({href, contentSource}){
    // 请求这个链接 拿到请求的内容
    return fetch(href).then(res=>res.text()).then(content => {
        const $ = cheerio.load(content);
        const sourceWebTextLen = contentSource.length;
        const httpWebTextLen = $('html body').html().length;

        // 确定校验规则 sourceWebTextLen/httpWebTextLen > 2 即是动态网站 否则是静态网站
        console.log(sourceWebTextLen, httpWebTextLen);
        if(sourceWebTextLen/httpWebTextLen > 2){
            return 1;
        }else{
            return 0;
        }        
    });
}