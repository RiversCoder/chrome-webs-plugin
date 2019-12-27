<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  data () {
    return {

    }
  },
  created(){
    this.initCheckToken();
    // this.checkTokenValid({token:'xxx'});
  },
  methods:{
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
        }else{
          this.$router.push('/');
        }
      });
    },
    // 验证 token 是否是失效 有效 -> 进入管理页；无效 -> 清理用户信息及隐藏模块，退出到登录页
    checkTokenValid(loginInfo){
      
      let url = `${this.loginService}auths/platform/verifytoken`
      this.axios.get(url, {
        headers: {
          system: 'S11SU01',
          token: loginInfo.token
        }
      }).then(response => {
        console.log(response);
        if(response.data.code.substr(0,1).toUpperCase() === 'R'){
          this.$router.push('/switchPage');
        }else{
          this.$store.commit('changehasToken', '');
          this.$store.commit('changeuserInfo', null);
          this.$router.push("/");
          // 清除登录状态
          let info = { loginStatus: false, token: '', userName: ''};
          // 移除 loginInfo
          chrome.storage.sync.remove('loginInfo');
          // 把当前的状态存入 storage
          this.buttonShow = false
          chrome.storage.sync.set({kedunWebPluginBoxOnoff: this.buttonShow});
          // 弹出错误信息
          this.$message({type:'error',message:response.data.msg,showClose:true});
        }
      }).catch(error => {
        this.$message({type:'error',message:'网络错误',showClose:true});
        // this.bus.$emit('showNotice', { content: '网络错误', type: 'info' });
      });

      // 跳转到控制面板页面
      // this.$router.push('/switchPage');
    }
  },
  computed:{
    ...mapState(['loginService'])
  }
}
</script>


