<template>
  <div class="login">
    <p class="title">网源录入插件登录</p>
    <p class="mb30">
      <span class="label">账号</span>
      <el-input v-model.trim="loginNumber" size="small" placeholder="请输入账号" class="input"></el-input>
    </p>
    <p class="mb30">
      <span class="label">密码</span>
      <el-input v-model.trim="passWord" size="small" placeholder="请输入密码" @keyup.enter.native="login" show-password class="input"></el-input>
    </p>
    <p>
      <el-button type="primary" size="small" class="input ml15" @click="login">登 录</el-button>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loginNumber: "hzli01",
      passWord: "123456"
    };
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      // 获取当前登录状态 { loginStatus: true, token: token, userName: data.userName }
      chrome.storage.sync.get({loginInfo: {}},(item) => {
        if(!item) return;
        // 判断是否登录状态
        if(typeof item.loginInfo !== "undefined" && item.loginInfo.loginStatus){
          this.$router.push("switchPage");
        }
      });
    },
    // 登录账号
    login() {
      if(this.loginNumber ===''){
        this.$message({
          message: '请输入账号!',
          type: 'warning'
        });
        return 
      }
      if(this.passWord ===''){
        this.$message({
          message: '请输入密码!',
          type: 'warning'
        });
        return
      }
      let url = `${this.loginService}auths/user/login`;
      let data = {
        loginName: this.loginNumber,
        loginPwd: this.passWord,
        system: "S11SU01",
        validCode: "string"
      };
      this.axios
        .post(url, data)
        .then(res => {
           let token = res.data.data
           this.$store.commit('changehasToken', token)
           this.getUserInfo(token)
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取用户信息
     getUserInfo (token) {
      let url = `${this.loginService}auths/userInfo`
      let header = { headers: { 'token': token } }
      this.axios.get(url, header)
        .then(res => {
          let CODE = res.data.code
          if (CODE.search(/^R/) > -1) {
            let data = res.data.data;
            
            // 设置当前的 登录 状态
            let info = {
              loginStatus: true,
              token: token,
              userName: data.userName,
              userInfo: data
            }
            this.$store.commit('changeuserInfo', info);
            chrome.storage.sync.set({loginInfo:info});
            this.$router.push("switchPage");
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  computed: {
    ...mapState(["loginService"])
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  height: 300px;
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
