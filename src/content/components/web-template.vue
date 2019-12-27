<template>
  <div class="web-list">
    <ul style="padding: 0;">
      <li class="web-list__list">
        <span class="web-list__text">选择网源</span>
        <el-select v-model="type" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">选择已有模板</span>
        <el-select v-model="type" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>模板名称
        </span>
        <el-input v-model="webName" size="small" placeholder="请输入" class="web-list__input"></el-input>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>标题
        </span>
        <el-input v-model="webName" size="small" placeholder="暂无数据" :disabled="true" class="web-list__input"></el-input>
        <el-button type="primary" plain size="small" @click="activeHoverClick">激活</el-button>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>作者
        </span>
        <el-input v-model="webName" size="small" placeholder="暂无数据" :disabled="true" class="web-list__input"></el-input>
        <el-button type="primary" plain size="small">激活</el-button>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>时间
        </span>
        <el-input v-model="webName" size="small" placeholder="暂无数据" :disabled="true" class="web-list__input"></el-input>
        <el-button type="primary" plain size="small" class="web-list__button_l5">激活</el-button>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>内容
        </span>
        <el-input v-model="webName" size="small" type="textarea" :rows="5" placeholder="暂无数据" :disabled="true" class="web-list__input"></el-input>
        <el-button type="primary" plain size="small">激活</el-button>
      </li>
      <li class="web-list__list" style="text-align: center;">
        <el-button type="primary" plain size="small" class="web-list__list--submit">向内扩散</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit">向外扩散</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit">上一个元素</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit">下一个元素</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit">重置该项</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit">预览该项</el-button>
      </li>
      <li class="web-list__list" style="text-align: center;">
        <el-button type="primary" size="small" class="web-list__list--submit">提交</el-button>
      </li>
    </ul>
  </div>
</template>


<script scoped>
  export default {
    data() {
      return {
        options: [],
        type: "",  //
        webName: ""
      };
    },
    created() {},
    mounted() {
      this.initEvent();
    },
    methods: {
      initEvent(){
        // ... 
      },
      activeHoverClick(){
        // 开始获取当前页面里面的内容
      }
    },
    components: {}
  };
</script>

<style lang="css" scoped>
  .web-list {
    width: 100%;
    height: auto;
    position: relative;
    padding: 20px 0;
  }
  .web-list .web-list__text {
    width: 100px;
    float: left;
    font-weight: 100;
    font-size: 14px;
    display: inline-block;
    line-height: 35px;
    text-align: right;
    padding-right: 10px;
  }
  .web-list .web-list__text .web-list__text_red {
    color: red;
    padding-right: 3px;
  }
  .web-list .web-list__group_box {
    display: inline-flex;
    width: 230px;
  }
  .web-list .web-list__group_box .web-list__group {
    width: 250px;
    display: inline;
  }
  .web-list .web-list__group_box .web-list__group--checkbox {
    float: left;
    margin-bottom: 10px;
    margin-right: 10px;
    margin-left: 0 !important;
  }
  .web-list .web-list__input {
    width: 200px;
    float: left;
    text-align: left;
  }
  .web-list .web-list__list {
    margin-bottom: 10px;
    list-style-type: none;
    display: inline-block;
    width: 100%;
  }
  .web-list .web-list__list .web-list__list--submit {
    width: 100px;
    margin-top: 10px;
    margin-left: 0;
  }
  .web-list .web-list__list .web-list__list_ml30 {
    margin-left: 30px;
  }
  .web-list .el-select-dropdown{
    z-index: 9999999 !important;
  }
</style>