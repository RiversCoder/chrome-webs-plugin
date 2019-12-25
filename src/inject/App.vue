<template>
  <div id="kedun_web_plugin">
    <!-- 网源插件列表 -->
    <WebList></WebList>

    <!-- 网站模板 -->
    <!-- <webTemplate></webTemplate> -->
  </div>
</template>

<script>
import WebList from "./components/web-list.vue";
import webTemplate from "./components/web-template.vue";
export default {
  data() {
    return {};
  },
  components: {
    WebList,
    webTemplate
  }
};
</script>

<style lang="css" scoped>
#kedun_web_plugin {
  width: 400px;
  height: 400px;
  overflow-y: auto;
  background-color: #fff;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 100;
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


