import { checkWebsiteDynamic } from './scripts/background-function.js';


// 监听 content-script 传递过来的信息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    switch(request.event){
        // 检测是否为动态网站
        case 'checkWebsitesDynamic':
            checkWebsiteDynamic(request.data).then(result => {
                sendResponse(result);
            })
            break;
        case 'other':
            break;
    }
});

// 监听 tab选项卡 切换 获取当前插件开关状态
chrome.tabs.onActivated.addListener((activeInfo) => {
    // activeInfo -> {tabId:1,windowId:2}
    chrome.storage.sync.get({kedunWebPluginBoxOnoff: false, listTemplateIndexStatus: 1},(item) => {
        if(!item) return;
        // 判断是否存在初始化盒子存在的状态
        if(typeof item.kedunWebPluginBoxOnoff !== "undefined"){
            chrome.tabs.sendMessage(activeInfo.tabId, {event: 'popup-content-onoff', data: {onoff: item.kedunWebPluginBoxOnoff}}, function(res){
                console.log(res)
            });
        }
    });
});


