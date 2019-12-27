<template>
  <div class="content">
    <div class="top">
      <p class="title">网源录入插件</p>
      <p class="message">
        <el-avatar size="small" :src="circleUrl" class="img"></el-avatar>
        <span>{{userInfo.userName}}</span>
        <span class="line">|</span>
        <span class="login_out" @click="loginOut">退出</span>
      </p>
    </div>
    <div class="buts">
      <el-button type="primary" size="medium"  class="but1" @click="startEntry">{{buttonText}}</el-button>
    </div>
    <div class="buts">
      <el-button type="success" size="small" plain class="but2" @click="switchList" :disabled="disableStatus">{{switchButtonText}}</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", // 头像图片地址
      userName: "张三", //当前用户名
      buttonText: "开启录入模式", // 按钮文本
      switchButtonText: "切换录入列表/模板", // 切换录入列表/模板
      buttonShow: false,
      disableStatus: true,
      listTemplateIndexStatus: 1 // 1 代表 网源录入列表框 2 代表模板录入框
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    // 初始化方法
    init(){
      // 获取当前盒子的的状态
      chrome.storage.sync.get({kedunWebPluginBoxOnoff: false, listTemplateIndexStatus: 1},(item) => {
        if(!item) return;

        // 判断是否存在初始化盒子存在的状态
        if(typeof item.kedunWebPluginBoxOnoff !== "undefined"){
          this.buttonShow = item.kedunWebPluginBoxOnoff;
          if (this.buttonShow) {
            this.buttonText = "关闭录入模式";
            this.disableStatus = false;
          } else {
            this.buttonText = "开启录入模式";
            this.disableStatus = true;
          }
        }

        // 判断是否存在切换状态
        if(typeof item.listTemplateIndexStatus !== "undefined"){
          this.listTemplateIndexStatus = item.listTemplateIndexStatus;
        }
      });
    },
    //退出登录
     loginOut () {
      let url = `${this.loginService}user/loginout`
      this.axios.get(url, {
        headers: {
          system: 'S11SU01',
          token: this.hasToken
        }
      }).then(response => {
        this.$store.commit('changehasToken', '')
        this.$router.push("/");
      })
        .catch(error => {
          this.bus.$emit('showNotice', { content: '网络错误', type: 'info' })
        });
    },
    // 向页面窗口发送信息
    sendMessageToContentScript(message, callback){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response)
            {
                if(callback) callback(response);
            });
        });
    },
    //开启录入模式
    startEntry() {

      // 按钮文字内容
      if (!this.buttonShow) {
        this.buttonText = "关闭录入模式";
        this.disableStatus = false;
      } else {
        this.buttonText = "开启录入模式";
        this.disableStatus = true;
      }
      
      this.buttonShow = !this.buttonShow;

      // 把当前的状态存入 storage
      chrome.storage.sync.set({kedunWebPluginBoxOnoff: this.buttonShow});
      this.messageModal(this.buttonShow);
    },
    // 切换录入列表/模板
    switchList() {
      // 切换模板录入列表
      if(this.listTemplateIndexStatus == 1){
        this.listTemplateIndexStatus = 2;
      }else{
        this.listTemplateIndexStatus = 1;
      }
      // 设置当前的 列表/模板 状态
      chrome.storage.sync.set({listTemplateIndexStatus: this.listTemplateIndexStatus});
      this.sendMessageToContentScript({data:{listTemplateIndexStatus:this.listTemplateIndexStatus},event:'popup-content-status'}, (res) => {
        console.log('收到来自页面脚本的回复：' + response);
      });
    },
    // 开关录入录取模式
    messageModal(onoff){
      const event = { event: 'popup-content-onoff' };
      console.log({ data:{onoff}, ...event });
      this.sendMessageToContentScript({ data:{onoff}, ...event }, function(response) {
          console.log('收到来自页面脚本的回复：' + response);
      });
    }
  },
  computed:{
    ...mapState(['loginService','userInfo','hasToken'])
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 400px;
  height: 300px;
  font-size: 14px;
  color: #3b3b3b;
  .top {
    .title {
      float: left;
    }
    .message {
      float: right;
    }
    .img {
      float: left;
      margin-right: 8px;
      margin-top: -5px;
    }
    .line {
      margin-left: 8px;
      margin-right: 8px;
      color: #dcdfe6;
    }
    .login_out {
      cursor: pointer;
    }
  }

  .buts {
    text-align: center;
    clear: both;
    .but1 {
      width: 135px;
      margin-bottom: 20px;
      margin-top: 50px;
    }
    .but2 {
      width: 135px;
      margin-bottom: 20px;
    }
  }
}
</style>