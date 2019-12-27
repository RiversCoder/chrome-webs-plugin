
const $ = global.$;

// 模板选择 添加模板里面的内容 

// 向内扩散 
export function goInset(ele, type, vm){
    if(ele.children.length > 0){
        // 移除样式 给第一个子元素添加样式
        $(ele).removeClass('ws-grab-class-'+type);
        $(ele).removeClass('ws-grab-class');
        $(ele.children[0]).addClass('ws-grab-class-'+type);
        
        // 重新获取元素
        ele = ele.children[0];
        // 重新获取文本
        vm.templateFormData[type].content = $(ele).text().replace(/\s*/ig,'').substring(0,100);
        vm.templateFormData[type].xpath = '';

    }else{
        // $(ele).removeClass('ws-grab-class-hover');
        vm.$message({ type: 'warning', message: '已是最后一级元素', showClose: true })
    }
}


// 向外扩散 
export function goOutset(ele){

}


// 上一个元素
export function goPrev(ele){

}


// 下一个元素
export function goNext(ele){

}


// 重置该项内容
export function goReset(ele){

}

// 预览该项
export function goPreview(ele){

}





