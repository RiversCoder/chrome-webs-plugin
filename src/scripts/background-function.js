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


// 通用版请求JSON接口 
/*
    @attrs 
        url : String | default: ''
        method : String | default: 'get'
        type: 'json'，'urlencoded'
*/
export function requestJsonData({url,method,body,headers,type}){

    // 搜集配置信息
    url = url || '';
    method = method || 'get';
    body = body || {};
    type = type || 'json';
    let headerConfig = { 'Content-Type': type === 'json' ? 'application/json' : 'application/x-www-form-urlencoded' };
    headers = headers ? {...headers,...headerConfig} : headerConfig ; //发送数据方式为json / 表单提交 
    let basicConfig = {
        headers: headers,
        method: method,
        cache: "no-cache", // default, reload, no-cache
        credentials: 'same-origin',//omit 不携带 same-origin 同源请求携带 include 无论跨域还是同源请求都会携带
        mode: 'cors' //cors, no-cors, same-origin, navigate
    };
    let config  = method.toUpperCase() === 'POST' ? Object.assign(basicConfig,{body:json.stringify(body)}) : basicConfig;

    // 调用接口
    return fetch( url, config).then(res => res.json()).then(res => {
        return res;
    })
}