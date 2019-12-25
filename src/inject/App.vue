<template>
  <div id="kedun_web_plugin">
    <!-- 网源插件列表 -->
   <WebList></WebList>

   <!-- 网站模板 -->
    <!-- <webTemplate></webTemplate> -->

  </div>
</template>

<script>
import WebList from './components/web-list.vue'
import webTemplate from './components/web-template.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    WebList,webTemplate
  }
}
</script>

<style lang="css" scoped>
  #kedun_web_plugin{
    width:400px;height:700px;overflow-y: auto;background-color:#fff;position:fixed;right:10px;bottom:10px;z-index:100;border-radius:10px;box-shadow: 0 0 10px #333;
  }
</style>


