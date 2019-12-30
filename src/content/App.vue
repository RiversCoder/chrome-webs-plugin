<template>
  <div id="kedun_web_plugin" v-show="onoff">
    <section v-if="refresh">
      <!-- 网源插件列表 -->
      <WebList v-if="status == 1"></WebList>

      <!-- 网站模板 -->
      <webTemplate v-if="status == 2"></webTemplate>
    </section>

    <span class="kedun_web_plugin_dragBox el-icon-position" id="kedun_web_plugin_dragBox" ></span>

  </div>
</template>

<script>
import WebList from "./components/web-list.vue";
import webTemplate from "./components/web-template.vue";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      onoff: false,
      status: 1,  // 1 代表网源插件表单框 2 代表网站模板盒子
      refresh: true,
    };
  },
  components: {
    WebList,
    webTemplate
  },
  mounted(){
    // 初始化相关的状态
    this.init();
    this.initEvent();

    // 初始化验证token
    this.initCheckToken();

    // 初始化拖拽
    this.initDrag();
  },
  methods:{
    // 刷新页面内容
    refeshContent(){
      this.refresh = false;
      setTimeout(() => {
        this.refresh = true;
        // 初始化相关的状态
        this.init();
        this.initEvent();

        // 初始化验证token
        this.initCheckToken();

        // 初始化拖拽
        this.initDrag();

      }, 500);
    },
    // 初始化方法 本地存储的一些状态都可以放在 init 方法里面
    init(){
      // 获取当前盒子的的状态
      chrome.storage.sync.get({kedunWebPluginBoxOnoff: false, listTemplateIndexStatus: 1, loginInfo: {}},(item) => {
        if(item.loginInfo.loginStatus && item.kedunWebPluginBoxOnoff){
          this.onoff = true
        }else{
          this.onoff = false;
        }
        this.status = item.listTemplateIndexStatus;
      });
    },
    initEvent(){
      // 监听来自popup的消息
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
          switch(request.event){
            case 'popup-content-onoff':
              // 切换网源盒子显示
              this.toggleBoxOff(request.data);
              break;
            case 'popup-content-status':
              this.toggleBoxContent(request.data);
              break;
            case 'page-content-refresh':
              this.refeshContent();
              break;
          }
          // sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
      });
    },
    // 根据popup里面的开关来判定是否开关所有的弹窗
    toggleBoxOff(data){
      this.onoff = data.onoff;
    },
    toggleBoxContent(data){
      this.status = data.listTemplateIndexStatus;
    },
    // 刷新时 初始化获取且验证 token
    initCheckToken(){

      // 1. 初始化获取 登录状态 token信息
      // loginInfo -> { loginStatus: true, token: token, userName: data.userName }
      chrome.storage.sync.get('loginInfo',(item) => {
        if(!item) return;
        console.log(item);
        // 判断是否登录状态
        if(typeof item.loginInfo !== 'undefined' && item.loginInfo.loginStatus){
          // 重新往store 存储 token信息
          this.$store.commit('changehasToken',item.loginInfo.token);
          // 往store存储 userinfo 信息
          this.$store.commit('changeuserInfo', item.loginInfo);
          // 验证token是否失效
          this.checkTokenValid(item.loginInfo);
        }
      });
    },
    // 验证 token 是否是失效 有效 -> 进入管理页；无效 -> 清理用户信息及隐藏模块，退出到登录页
    checkTokenValid(loginInfo){
      
      let url = `${this.loginService}auths/platform/verifytoken`;
      let headers = { system: 'S11SU01', token: loginInfo.token };
      
      // 调用接口
      chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:'请求：检测当前Token是否失效'}, (response) => {
        if(response.code.substr(0,1).toUpperCase() !== 'R'){
          this.$store.commit('changehasToken', '');
          this.$store.commit('changeuserInfo', null);
          // 清除登录状态
          let info = { loginStatus: false, token: '', userName: ''};
          // 移除 loginInfo
          chrome.storage.sync.remove('loginInfo');
          // ... 隐藏 把当前的状态存入 storage
          this.onoff = false
          chrome.storage.sync.set({kedunWebPluginBoxOnoff: this.onoff});
          // 弹出错误信息
          this.$message({type:'error',message:response.msg,showClose:true});
        }
      });

    },
    // 初始化拖拽
    initDrag(){
      $('#kedun_web_plugin_dragBox').on('mousedown',function(e){
            let startX = e.clientX;
            let startY = e.clientY;

            let currentLeft = parseInt($('#kedun_web_plugin').css('left'));
            let currentTop = parseInt($('#kedun_web_plugin').css('top'));

            $(document).on('mousemove',function(e){
                let disX = e.clientX - startX;
                let disY = e.clientY - startY;

                $('#kedun_web_plugin').css({
                  left: currentLeft + disX,
                  top: currentTop + disY
                });
            });

            $(document).on('mouseup',function(e){
                $(this).off();
                e.stopPropagation();
            });

            e.stopPropagation();
            e.preventDefault();
            return false;
        });
    }
  },
  computed:{
    ...mapState(['loginService'])
  }
};
</script>

<style lang="css" scoped>
#kedun_web_plugin {
  width: 400px;
  height: 700px;
  overflow-y: auto;
  background-color: #fff;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 999999;
  border-radius: 10px;
  box-shadow: 0 0 10px #333;
}
#kedun_web_plugin::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px !important; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px !important;
}
#kedun_web_plugin::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px !important;
  box-shadow: inset 0 0 5px #DDD !important;
  background: #ddd !important;
}
#kedun_web_plugin::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px #DDD !important;
  border-radius: 10px !important;
  background: #fff !important;
}
#kedun_web_plugin .kedun_web_plugin_dragBox{
  width:38px;height:38px;position:absolute;right:10px;top:10px;background-color:#66b1ff;cursor: move;font-size:20px;color:#fff;text-align:center;line-height:38px;
}
</style>


