
const $ = global.$;

// 模板选择 添加模板里面的内容 

// 向内扩散 
export function goInset(ele, type, vm){
    console.log(ele, ele.children);
    if(ele.children.length > 0){
        // 移除样式 给第一个子元素添加样式
        $(ele).removeClass('ws-grab-class-'+type);
        $(ele).removeClass('ws-grab-class');
        $(ele.children[0]).addClass('ws-grab-class-'+type);
        
        // 重新获取元素
        vm.current.currentClickElem = ele.children[0];
        // 重新获取文本
        vm.templateFormData[type].content = $(ele.children[0]).text().replace(/\s*/ig,'').substring(0,100);
        vm.templateFormData[type].xpath = readXPath(ele.children[0]);
    }else{
        // $(ele).removeClass('ws-grab-class-hover');
        vm.$message({ type: 'warning', message: '已是最后一级元素', showClose: true })
    }
}


// 向外扩散 
export function goOutset(ele, type, vm){
    if(ele.parentNode){
        // 移除样式 给第一个子元素添加样式
        $(ele).removeClass('ws-grab-class-'+type);
        $(ele).removeClass('ws-grab-class');
        $(ele.parentNode).addClass('ws-grab-class-'+type);
        
        // 重新获取元素
        vm.current.currentClickElem = ele.parentNode;
        // 重新获取文本
        vm.templateFormData[type].content = $(ele.parentNode).text().replace(/\s*/ig,'').substring(0,100);
        vm.templateFormData[type].xpath = readXPath(ele.parentNode);

    }else{
        // $(ele).removeClass('ws-grab-class-hover');
        vm.$message({ type: 'warning', message: '已是顶级元素', showClose: true })
    }
}


// 上一个元素
export function goPrev(ele, type, vm){
    if(ele.previousElementSibling){
        // 移除样式 给第一个子元素添加样式
        $(ele).removeClass('ws-grab-class-'+type);
        $(ele).removeClass('ws-grab-class');
        $(ele.previousElementSibling).addClass('ws-grab-class-'+type);
        
        // 重新获取元素
        vm.current.currentClickElem = ele.previousElementSibling;
        
        // 重新获取文本
        vm.templateFormData[type].content = $(ele.previousElementSibling).text().replace(/\s*/ig,'').substring(0,100);
        vm.templateFormData[type].xpath = readXPath(ele.previousElementSibling);

    }else{
        // $(ele).removeClass('ws-grab-class-hover');
        vm.$message({ type: 'warning', message: '已是当前兄弟元素第一个元素', showClose: true })
    }
}


// 下一个元素
export function goNext(ele, type, vm){
    if(ele.nextElementSibling){
        // 移除样式 给第一个子元素添加样式
        $(ele).removeClass('ws-grab-class-'+type);
        $(ele).removeClass('ws-grab-class');
        $(ele.nextElementSibling).addClass('ws-grab-class-'+type);
        
        // 重新获取元素
        vm.current.currentClickElem = ele.nextElementSibling;
        // 重新获取文本
        vm.templateFormData[type].content = $(ele.nextElementSibling).text().replace(/\s*/ig,'').substring(0,100);
        vm.templateFormData[type].xpath = readXPath(ele.nextElementSibling);

    }else{
        // $(ele).removeClass('ws-grab-class-hover');
        vm.$message({ type: 'warning', message: '已是当前兄弟元素最后一个元素', showClose: true })
    }
}


// 重置该项内容
export function goReset(ele, type, vm){
     
    // 移除样式 给第一个子元素添加样式
     $(ele).removeClass('ws-grab-class-'+type);
     $(ele).removeClass('ws-grab-class');

     // 重新设置文本和xpath内容
     vm.templateFormData[type].content = '';
     vm.templateFormData[type].xpath = '';
}

// 预览该项
export function goPreview(ele, type, vm){
    vm.dialog.visible = true;
    vm.dialog.content = vm.current.currentClickElem.innerHTML;
}

// 获取元素的 xpath 路径
export function readXPath(element) {
    
    if (element.id !== "") {//判断id属性，如果这个元素有id，则显 示//*[@id="xPath"]  形式内容
        return '//*[@id=\"' + element.id + '\"]';
    }

    //这里需要需要主要字符串转译问题，可参考js 动态生成html时字符串和变量转译（注意引号的作用）
    if (element == document.body) {//递归到body处，结束递归
        return '/html/' + element.tagName.toLowerCase();
    }
    var ix = 1,//在nodelist中的位置，且每次点击初始化
        siblings = element.parentNode.childNodes;//同级的子元素

    for (var i = 0, l = siblings.length; i < l; i++) {
        var sibling = siblings[i];
        //如果这个元素是siblings数组中的元素，则执行递归操作
        if (sibling == element) {
            return readXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix) + ']';
            //如果不符合，判断是否是element元素，并且是否是相同元素，如果是相同的就开始累加
        } else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
            ix++;
        }
    }
}

// 通过 xpath 获取 元素
export function getElemByXpath(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    
    /*var xnodes = [];
    var xres;
    while (xres = ) {
        xnodes.push(xres);
    }*/

    return xresult.iterateNext();
}



