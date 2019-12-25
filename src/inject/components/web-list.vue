<template>
  <div class="web-list">
    <ul>
      <li class="web-list__list">
        <span class="web-list__text">选择爬取模式</span>
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
          <span class="web-list__text_red">*</span>网源名称
        </span>
        <el-input v-model="webName" size="small" placeholder="请输入" class="web-list__input"></el-input>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 网站类型
        </span>
        <el-select v-model="value" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list" style="margin-bottom: 0;">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 行业类别
        </span>
        <div class="web-list__group_box">
          <el-checkbox-group v-model="checkboxGroup" size="small" class="web-list__group">
            <el-checkbox
              :label="item.label"
              border
              v-for="(item,index) in labelList"
              :key="index"
              class="web-list__group--checkbox"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 爬取级别
        </span>
        <el-select v-model="value" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 语言类型
        </span>
        <el-select v-model="value" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list" style="line-height: 35px;">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 是否海内外
        </span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </li>
      <li class="web-list__list" style="line-height: 35px;">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 是否动态网站
        </span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <el-button type="primary" plain size="small" class="web-list__list_ml30">校验</el-button>
      </li>
      <!-- 仅列表模式显示 -->
      <li class="web-list__list" v-if="type===2">
        <span class="web-list__text">选择列表</span>
        <el-input v-model="webName" size="small" placeholder="请输入" class="web-list__input"></el-input>
      </li>
      <!-- 仅列表模式显示 -->
      <li class="web-list__list" v-if="type===2">
        <span class="web-list__text">下一页</span>
        <el-input v-model="webName" size="small" placeholder="请输入" class="web-list__input"></el-input>
      </li>
      <li class="web-list__list" style="margin-bottom: 0;">
        <span class="web-list__text">自定义标签</span>
        <div class="web-list__group_box">
          <el-checkbox-group v-model="checkboxGroup" size="small" class="web-list__group">
            <el-checkbox
              :label="item.label"
              border
              v-for="(item,index) in labelList"
              :key="index"
              class="web-list__group--checkbox"
            ></el-checkbox>
          </el-checkbox-group>
        </div>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 所属地域
        </span>
        <el-select v-model="province" placeholder="请选择" size="small" style="width:83px">
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="city" placeholder="请选择" size="small" style="width:83px">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="area" placeholder="请选择" size="small" style="width:83px">
          <el-option
            v-for="item in areaList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 爬取深度
        </span>
        <el-select v-model="value" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      options: [
        { value: 1, label: "全局模式" },
        { value: 2, label: "列表模式" }
      ],
      options1: [
        { value: 1, label: "通用网站" },
        { value: 2, label: "论坛" },
        { value: 3, label: "纸媒" },
        { value: 4, label: "问答" },
        { value: 5, label: "自媒体" }
      ],
      options2: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" }
      ],
      options3: [
        { value: 1, label: "中文" },
        { value: 2, label: "英文" },
        { value: 3, label: "藏文" },
        { value: 4, label: "维文" },
        { value: 5, label: "日语" },
        { value: 6, label: "法语" }
      ],
      labelList: [
        { value: 1, label: "公安类" },
        { value: 2, label: "房产类" },
        { value: 3, label: "金融类" },
        { value: 4, label: "能源类" }
      ],
      provinceList: [{ value: 1, label: "省" }],
      cityList: [{ value: 1, label: "市" }],
      areaList: [{ value: 1, label: "区" }],
      province: "",
      city: "",
      area: "",
      value: 1,
      type: 1, //爬取模式
      radio: 1,
      webName: "",
      checkboxGroup: []
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
  padding: 20px 0;
}
.web-list .web-list__text {
  width: 108px;
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
  width: 255px;
}
.web-list .web-list__list {
  margin-bottom: 10px;
  list-style-type: none;
  display: inline-block;
}
.web-list .web-list__list .web-list__list--submit {
  width: 100px;
  margin-top: 10px;
  margin-left: 140px;
}
.web-list .web-list__list .web-list__list_ml30 {
  margin-left: 30px;
}
</style>