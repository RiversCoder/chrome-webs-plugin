<template>
  <div class="web-list">
    <ul style="padding: 0;">
      <li class="web-list__list">
        <span class="web-list__text">选择网源</span>
        <el-select v-model="webSource.value" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="item in webSource.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">选择已有模板</span>
        <el-select v-model="templateList.value" placeholder="请选择" size="small" class="web-list__input" @change="getChangeTemplate">
          <el-option
            v-for="item in templateList.options"
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
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        // 网源列表
        webSource: {
          options: [/*{value:'',label:''}*/],
          value: ''
        },
        // 模板列表
        templateList: {
          options: [/*{value:'',label:''}*/],
          value: '',
          elementsInfo: [/*{
            id: '',
            titleXpath: '',
            authorXpath: '',
            createdAtXpath: '',
            contentXpath: '',
            websiteAttrId: '',
            websiteModulesId: '',
            checkNumber: 0 // 检测碰撞数值
          }*/]
        },
        options: [],
        type: "",  //
        webName: ""
      };
    },
    created() {
      // 1. 获取网源列表
      this.initRequest();
    },
    mounted() {
      this.initEvent();
    },
    methods: {
      initEvent(){
        // ... 
      },
      // 初始化请求 获取网源列表
      initRequest(){

        let domain = global.location.host;
        let url = `${this.netService}web-module/domain?domain=${domain}`;
        let headers = { system: 'S11SU01', token: this.userInfo.token };
        
        // 获取网源列表
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:'请求：获取网源列表'}, (response) => {
          console.log(response)
          if(response.code == 0){
            this.webSource.options = [];
            response.data.forEach(v => {
              this.webSource.options.push({ label: v.name, value: v.id });
            });
            // 初始化显示第一个网源
            this.webSource.value = this.webSource.options[0].value;
          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });

        // 获取模板列表
        this.getTemplateListBySourceId();

      },
      // 根据网源列表ID 获取模板列表
      getTemplateListBySourceId(){

        let domain = global.location.host;
        let url = `${this.netService}web-template/domain/list?domain=${domain}`;
        let headers = { system: 'S11SU01', token: this.userInfo.token };

        // 获取网源模板列表
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:'获取网源模板列表'}, (response) => {
          console.log(response);
          if(response.code == 0){
            this.templateList.options = [];
            this.templateList.elementsInfo = [];
            response.data.forEach(v => {
              this.templateList.options.push({ label: v.name, value: v.id });
              // 获取当前模板对应的xpath信息
              this.templateList.elementsInfo.push({
                id: v.id,
                websiteAttrId: v.websiteAttrId,
                checkNumber: 0,
                titleXpath: v.titleXpath,
                authorXpath: v.authorXpath,
                createdAtXpath: v.createdAtXpath,
                contentXpath: v.contentXpath,
                websiteModulesId: v.websiteModulesId,
              });
            });
            // 新增模板内容
            this.templateList.options.push({ label: '新增模板', value: 'add-template-content' });

            // 遍历xpath信息 获取元素 自动选择模板
            this.eachXpathElements();

          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });

      },
      getElebyXpath(xpath) {
        var result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
        return result.iterateNext()
      },
      // 遍历xpath信息 获取元素 自动选择模板
      eachXpathElements(){
        const xpath_keys = ['titleXpath','authorXpath','createdXpath','contentXpath'];
        let match_times = 0;
        let check_numbers = [];

        this.templateList.elementsInfo.forEach(v => {
          match_times = 0;
          xpath_keys.forEach(key => {
            if(v[key] && this.getElebyXpath(v[key])){
              match_times += 1;
            }
          })
          v.checkNumber = match_times;
          // check_numbers.push({value:v.checkNumber, id: v.id});
        });

        // 排序
        this.templateList.elementsInfo.sort((a, b) => {
          return b.checkNumber - a.checkNumber;
        });

        // 确定是否有匹配 0 全部不匹配
        if(this.templateList.elementsInfo[0].checkNumber <= 0){
          
        }else{

        }
        

      },
      // 选择模板内容
      getChangeTemplate(){
        // 如果选择 新增模板 然后进行选择
        if(this.templateList.value == 'add-template-content'){

        }
      },
      activeHoverClick(){
        // 开始获取当前页面里面的内容
      }
    },
    components: {},
    computed:{
      ...mapState(['loginService','userInfo','netService'])
    }
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