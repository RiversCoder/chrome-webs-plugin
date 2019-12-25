<template>
  <div class="content">
    <div class="top">
      <p class="title">网源录入插件</p>
      <p class="message">
        <el-avatar size="small" :src="circleUrl" class="img"></el-avatar>
        <span>{{userName}}</span>
        <span class="line">|</span>
        <span class="login_out" @click="loginOut">退出</span>
      </p>
    </div>
    <div class="buts">
      <el-button type="primary" size="small" plain class="but1" @click="startEntry">{{buttonText}}</el-button>
    </div>
    <div class="buts">
      <el-button type="primary" size="small" plain class="but2" @click="switchList" :disabled="buttonShow">切换录入列表/模板</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png", // 头像图片地址
      userName: "张三", //当前用户名
      buttonText: "开启录入模式", // 按钮文本
      buttonShow:false,
    };
  },
  methods: {
    //退出登录
    loginOut() {
      this.$router.push("/");
    },
    //开启录入模式
    startEntry() {
      // 按钮文字内容
      if (!this.buttonShow) {
        this.buttonText = "关闭录入模式";
      } else {
        this.buttonText = "开启录入模式";
      }
      this.buttonShow = !this.buttonShow;
      this.messageModal(this.buttonShow);
    },
    //切换录入列表/模板
    switchList() {},
    // 开关录入录取模式
    messageModal(onoff){
      const event = { event: 'popup-content-onoff' };
      console.log({ data:{onoff}, ...event });
      chrome.runtime.sendMessage( { data:{onoff}, ...event }, function(response) {
          console.log('收到来自页面脚本的回复：' + response);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 400px;
  height: 500px;
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
      margin-top: 100px;
    }
    .but2 {
      width: 135px;
      margin-bottom: 20px;
    }
  }
}
</style>