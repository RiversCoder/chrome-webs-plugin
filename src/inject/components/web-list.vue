<template>
  <div class="web-list">
    <ul>
      <li>
        <span>选择爬取模式</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
    </ul>
  </div>
</template>


<script scoped>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      value: "选项1"
    };
  },
  created() {},
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="css" scoped>
.web-list {
  width: 100%;
  height: auto;
  position: relative;
  padding: 5px;
}
</style>