<template>
  <div id="kedun_web_plugin" v-show="onoff">
    <section >
      <!-- 网源插件列表 -->
      <WebList v-show="status == 1"></WebList>

      <!-- 网站模板 -->
      <webTemplate v-show="status == 2"></webTemplate>
    </section>
  </div>
</template>

<script>
import WebList from "./components/web-list.vue";
import webTemplate from "./components/web-template.vue";
export default {
  data() {
    return {
      onoff: false,
      status: 1 // 1 代表网源插件表单框 2 代表网站模板盒子
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
  },
  methods:{
    // 初始化方法 本地存储的一些状态都可以放在 init 方法里面
    init(){
      // 获取当前盒子的的状态
      chrome.storage.sync.get({kedunWebPluginBoxOnoff: false, listTemplateIndexStatus: 1},(item) => {
        this.onoff = item.kedunWebPluginBoxOnoff;
        this.status = item.listTemplateIndexStatus;
      });
    },
     initEvent(){
      // console.log('监听来自popup的消息')
      // 监听来自popup的消息
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
          console.log(request);
          switch(request.event){
            case 'popup-content-onoff':
              // 切换网源盒子显示
              this.toggleBoxOff(request.data);
              break;
            case 'popup-content-status':
              this.toggleBoxContent(request.data);
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
    }
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
</style>


