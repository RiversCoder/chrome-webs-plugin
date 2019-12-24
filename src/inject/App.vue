<template>
  <div id="kedun_web_plugin">
    <!-- 网源插件列表 -->
   <WebList></WebList>

   <!-- 网站模板 -->
    

  </div>
</template>

<script>
import WebList from './components/web-list.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    WebList
  }
}
</script>

<style lang="css" scoped>
  #kedun_web_plugin{
    width:360px;height:600px;background-color:#fff;position:fixed;right:10px;bottom:10px;z-index:9999;border-radius:10px;box-shadow: 0 0 10px #333;
  }
</style>


