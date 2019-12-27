import Vue from 'vue';
const $ = global.$;
import ElementUI from 'element-ui';
import '@/css/index.css';
import App from './App.vue';
import store from '../store';
import axios from './config/axios';

Vue.use(ElementUI);
Vue.prototype.axios = axios;
const content_script = ` 
    <div id="WebSubscription"></div>
    <style type="text/css">
        /* @import url("https://cdn.bootcss.com/element-ui/2.12.0/theme-chalk/index.css"); */
        .ws-grab-class, .ws-grab-class-title, .ws-grab-class-author, .ws-grab-class-content, .ws-grab-class-createdAt{
            border:2px solid red !important;box-sizing: border-box;
        }
        .ws-grab-class-hover{
            border:2px solid orange !important;box-sizing: border-box;
        }

        .el-select-dropdown{
            z-index: 9999999 !important;
        }
    </style>
`;

$(document).ready(()=>{  
    $('body').append(content_script);
    // 等页面加载完成后执行执行
    const timer = setTimeout(() => {
        new Vue({
            el: '#WebSubscription',
            store,
            render: h => h(App)
        });
        // clearTimeout(timer)
    },500);
});


