
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
        vm.templateFormData[type].xpath = '';
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
        vm.templateFormData[type].xpath = '';

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
        vm.templateFormData[type].xpath = '';

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
        vm.templateFormData[type].xpath = '';

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





