<template>
  <div class="login">
    <p class="title">网源录入插件登录</p>
    <p class="mb30">
      <span class="label">账号</span>
      <el-input v-model="loginNumber" size="small" placeholder="请输入账号" class="input"></el-input>
    </p>
    <p class="mb30">
      <span class="label">密码</span>
      <el-input v-model="passWord" size="small" placeholder="请输入密码" class="input"></el-input>
    </p>
    <p><el-button type="primary" size="small" class="input ml15" @click="login">登 录</el-button></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginNumber: "",
      passWord: ""
    };
  },
  methods:{
    //登录账号
    login(){
       this.$router.push('switchPage')
    },
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  height: 500px;
  font-size: 16px;
  color: #3b3b3b;
  .title {
    text-align: center;
    margin: 50px 0;
  }
  .label {
    width: 15%;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .input {
    width: 80%;
    font-size: 14px;
  }
}
.mb30 {
  margin-bottom: 30px;
}
.ml15 {
  margin-left: 15%;
}
</style>
