<template>
  <div class="web-list">
      <dl class="web-list__form-item">
          <dt class="web-list__form-item--title">
              选择爬取模式
          </dt>
          <dd class="web-list__form-item--content">
              
              <el-button type="primary" icon="el-icon-search">搜索</el-button>
              {{  value  }}
          </dd>
      </dl>
  </div>
</template>


<script scoped>

export default {
  data(){
    return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        value: '选项1'
    } 
  },
  created(){},
  mounted(){},
  methods: {

  },
  components: {}
}

</script>

<style lang="css" scoped>
    .web-list{
        width:100%;height:auto;position:relative;
    }

</style>