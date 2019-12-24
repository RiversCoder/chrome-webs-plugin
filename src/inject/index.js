import Vue from 'vue';
const $ = window.$;
import ElementUI from 'element-ui';
import '#/element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
const content_script = ` 
    <div id="WebSubscription"></div>
`;


$(document).ready(()=>{  
    $('body').append(content_script);
    // 等页面加载完成后执行执行
    setTimeout(() => {
        new Vue({
            el: '#WebSubscription',
            render: h => h(App)
        })
    },500);
});


