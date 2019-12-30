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
        <el-input v-model="templateFormData.name" size="small" placeholder="请输入" class="web-list__input"></el-input>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>标题
        </span>
        <el-input v-model="templateFormData.title.content" size="small" placeholder="暂无数据" :disabled="true" class="web-list__input"></el-input>
        <el-button type="primary" plain size="small" @click="activeHoverClick('title')">激活</el-button>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>作者
        </span>
        <el-input v-model="templateFormData.author.content" size="small" placeholder="暂无数据" :disabled="true" class="web-list__input"></el-input>
        <el-button type="primary" plain size="small" @click="activeHoverClick('author')">激活</el-button>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>时间
        </span>
        <el-input v-model="templateFormData.createdAt.content" size="small" placeholder="暂无数据" :disabled="true" class="web-list__input"></el-input>
        <el-button type="primary" plain size="small" class="web-list__button_l5" @click="activeHoverClick('createdAt')">激活</el-button>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span>内容
        </span>
        <el-input v-model="templateFormData.content.content" size="small" type="textarea" :rows="5" placeholder="暂无数据" :disabled="true" class="web-list__input"></el-input>
        <el-button type="primary" plain size="small" @click="activeHoverClick('content')">激活</el-button>
      </li>
      <li class="web-list__list" style="text-align: center;">
        <el-button type="primary" plain size="small" class="web-list__list--submit" @click="interactiveElement('inset')">向内扩散</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit" @click="interactiveElement('outset')">向外扩散</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit" @click="interactiveElement('prev')">上一个元素</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit" @click="interactiveElement('next')">下一个元素</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit" @click="interactiveElement('reset')">重置该项</el-button>
        <el-button type="primary" plain size="small" class="web-list__list--submit" @click="interactiveElement('preview')">预览该项</el-button>
      </li>
      <li class="web-list__list" style="text-align: center;">
        <el-button type="primary" size="small" class="web-list__list--submit" @click="submitTemplateForm">提交</el-button>
      </li>
    </ul>

    <!-- 内容弹出框 -->
    <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.visible"
    width="60%">
      <span v-html="dialog.content ? dialog.content : '请选择内容'"></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog.visible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script scoped>
  import { mapState } from 'vuex';
  import { goInset, goOutset, goPrev, goNext, goReset, goPreview, readXPath, getElemByXpath } from '../scripts/data';

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
            value: '',
            titleXpath: '',
            authorXpath: '',
            createdAtXpath: '',
            contentXpath: '',
            websiteAttrId: '',
            websiteModulesId: '',
            checkNumber: 0 // 检测碰撞数值
          }*/]
        },
        // 表单数据
        templateFormData: {
          name: '', // 模板名称,
          title: { xpath: '', content: '' }, // 模板标题
          author: { xpath: '', content: '' }, // 模板标题
          createdAt: { xpath: '', content: '' }, // 模板标题
          content: { xpath: '', content: '' } // 模板标题
        },
        templateContentKeys: ['title','author','createdAt','content'],
        // 当前 元素盒子 及 状态数据存储
        current: {
           bodyStyleElem: null, // body盒子内容
           currentClickElem: null, // 当前选中的内容
           currentType: '' // 当前选中的类型
        },
        // 预览弹窗内容 相关信息
        dialog:{
          visible: false,
          title: '预览内容',
          content: ''
        },
        // 用户相关信息
        userInfos:{
          token: ''
        },
        userInfo: {},
        // 挡圈
        options: [],
        type: "",  //
        webName: ""
      };
    },
    created() {

      chrome.storage.sync.get('loginInfo',(item) => {
        if(!item) return;
        // this.userInfo.token = item.loginInfo.token
      });

      
    },
    mounted() {
      this.initEvent();
    },
    methods: {
      initEvent(){
        // ... 
        // 初始化style标签元素
        this.bodyStyleElem = document.createElement('style');
        this.bodyStyleElem.setAttribute('type','text/css');
        document.body.append(this.bodyStyleElem);

        // 获取token
        chrome.storage.sync.get('loginInfo',(item) => {
            if(!item) return;
            console.log(item);
            this.token = item.loginInfo.token
            this.userId = item.loginInfo.userId
            this.userInfo = item.loginInfo.userInfo
            this.userInfo.token = item.loginInfo.token;
            // console.log(item.loginInfo, this.userInfo)
            
            // 1. 获取网源列表
            this.initRequest();
        });

      },
      // 初始化请求 获取网源列表
      initRequest(){
        
        let domain = global.location.host;
        let url = `${this.netService}web-module/domain?domain=${domain}`;
        let headers = { system: 'S11SU01', token: this.userInfo.token };
        console.log(headers)
        debugger
        
        // 获取网源列表
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:'请求：获取网源列表'}, (response) => {
          console.log(response)
          if(response.code == 0){
            this.webSource.options = [];
            response.data.forEach(v => {
              this.webSource.options.push({ label: v.name, value: v.id });
            });
            // 初始化显示第一个网源
            if(this.webSource.options.length > 0){
              this.webSource.value = this.webSource.options[0].value;
            }
          }else{
            this.$message({ type:'error', message: response.msg ? response.msg : '网络异常', showClose: true});
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
                name: v.name,
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
        if( this.templateList.elementsInfo.length === 0 || this.templateList.elementsInfo[0].checkNumber <= 0){
          // 全部不匹配 选择新增模板
          this.templateList.value = "add-template-content";
          // 清空所有页面上的 红色边框焦点
          this.clearTemplateRedActiveBox();
        }else{
          // 若有匹配 选择第一个
          this.templateList.value = this.templateList.elementsInfo[0].id;
          // 选择当前模板之后 在页面里面选中当前模板的内容
          this.autoActiveCurrentTemplateForm(this.templateList.elementsInfo[0]);
        }

      },
      // 页面值初始化 红色框框选中 表单内容自动填充
      autoActiveCurrentTemplateForm(content){
        const xpath_keys = ['titleXpath','authorXpath','createdXpath','contentXpath'];
        //let content = {"titleXpath":"//*[@id=\"3\"]/h3[1]/a[1]","authorXpath":"//*[@id=\"3\"]/div[1]","createdAtXpath":"//*[@id=\"3\"]/div[2]","contentXpath":"//*[@id=\"4\"]","websiteAttrId":"","sysUserId":100434,"websiteModulesId":["5e0336382cc3501392cb5684"],"status":"VAILD","name":"sxdasxasxa"};
        
        // 回显 模板内容表单
        this.templateFormData.name = content.name;
        let ele = '';
        this.templateContentKeys.forEach(key => {
          try{
            ele = getElemByXpath(content[key+'Xpath']);
          }catch(e){ /* console.log(e); */ }
          if(ele){
            $(ele).addClass('ws-grab-class-'+key);
            this.templateFormData[key].content = ele.innerHTML;
            this.templateFormData[key].xpath = content[key+'Xpath'];
          }
        })

      },
      // 匹配当前的元素内容 红色框框选中, 并把这些内容存放在表单框中 
      matchPageElementsBy(){
        
        // 1. 清空信息
        this.clearTemplateRedActiveBox()

        // 2. 获取当前的xpath信息
        let currentContent = this.templateList.elementsInfo.filter((v,index,arr) => (v.id == this.templateList.value))[0];
        this.autoActiveCurrentTemplateForm(currentContent);
      },
      // 清理页面所有红色框框 和 表单内容
      clearTemplateRedActiveBox(){
        
        this.templateContentKeys.forEach(key => {
          $('*').removeClass('ws-grab-class');
          $('*').removeClass('ws-grab-class-'+key);
        });

         // 清空表单
        this.templateFormData.name = '';
        this.templateContentKeys.forEach(key => {
          this.templateFormData[key].content = '';
          this.templateFormData[key].xpath = '';
        })

      },
      // 选择模板内容
      getChangeTemplate(){
        // 如果选择 新增模板 然后进行选择
        if(this.templateList.value == 'add-template-content'){
          // 清空所有页面上的 红色边框焦点
          this.clearTemplateRedActiveBox();
        }else{
          // 匹配当前的元素内容 并把这些内容存放在表单框中
          this.matchPageElementsBy();
        }
      },
      // 激活按钮
      activeHoverClick(attr){
        // 开始获取当前页面里面的内容
        this.bindEvent(attr,(ele) => {
          this.templateFormData[attr].content = $(ele).text().replace(/\s*/ig,'').substring(0,100);
          this.templateFormData[attr].xpath = readXPath(ele);
        });
      },
      bindEvent(type,fn){
          let This  = this;
          
          //清除所有样式
          function removeAllClass(){
              $('*').each(function(){
                  $(this).removeClass('ws-grab-class-'+type);
              })
          }
          // this.bodyStyleElem.innerHTML = ` *:hover{border:2px solid red;box-sizing:border-box;} `;

          // 定义初始元素
          let prevEle = null;

          // 给所有元素添加 红色边框 和 变异盒子类型  
          $('*').on('mouseover',function(e){
              //清除所有
              removeAllClass();
              //添加样式
              $(this).addClass('ws-grab-class-'+type);
              prevEle = $(this);

              $(this).on('click',function(e){
                  // removeAllClass();
                  $(this).addClass('ws-grab-class-'+type);
                  // get current element
                  This.current.currentClickElem = this;
                  This.current.currentType = type;
                  // callback
                  fn&&fn(this);

                  $("*").off();
                  //取消默认事件
                  e.preventDefault();
                  return false;
              });

              //取消冒泡
              e.cancelBubble = true;
              e.stopPropagation();
          });

          $('*').on('mouseoout',function(e){
              prevEle.removeClass('ws-grab-class-'+type);
              //取消冒泡
              e.cancelBubble = true;
              e.stopPropagation();
          });

          $('#kedun_web_plugin').find('*').on('mouseover',function(e){
              $(this).removeClass('ws-grab-class');
              e.cancelBubble = true;
              e.stopPropagation();
          });
      },
      // 元素交互
      interactiveElement(type){
        // 判断交互类型
        switch(type){
          case 'inset': /* 向内扩散 */
            goInset(this.current.currentClickElem, this.current.currentType, this); 
            break;
          case 'outset': /* 向外扩散 */
            goOutset(this.current.currentClickElem, this.current.currentType, this);
            break;
          case 'prev': /* 上一个元素 */
            goPrev(this.current.currentClickElem, this.current.currentType, this);
            break;
          case 'next':  /* 下一个元素 */
            goNext(this.current.currentClickElem, this.current.currentType, this);
            break;
          case 'reset':  /* 重置该项选择内容 */
            goReset(this.current.currentClickElem, this.current.currentType, this);
            break;
          case 'preview': /* 预览 该表单项所看到的内容 */
            goPreview(this.current.currentClickElem, this.current.currentType, this)
            break;
        }
      },
      // 验证 表单 必填项
      checkFormContent(){
        // 验证
        /*
          templateFormData: {
            name: '', // 模板名称,
            title: { xpath: '', content: '' }, // 模板标题
            author: { xpath: '', content: '' }, // 模板标题
            createdAt: { xpath: '', content: '' }, // 模板标题
            content: { xpath: '', content: '' } // 模板标题
          },
        */
        let result = { message: '', value: true, showClose: true, type: 'error' };
        let keys = ['title','author','createdAt','content'];

        // 检测网源 是否存在
        if(result.value && this.webSource.value.replace(/\s*/g,'') === ''){
          result.value = false;
          result.message = '请选择或添加网源';
        }


        // 检测 模板名称不能为空
        if(result.value && this.templateFormData.name.replace(/\s*/g,'') === ''){
          result.value = false;
          result.message = '模板名称不能为空';
        }

        // 检测 xpath是否为空
        for(let i=0;i<keys.length;i++){
          if(this.templateFormData[keys[i]].xpath == '' && result.value){
            result.value = false;
            result.message = '表单内容不能为空';
            break;
          }
        }

        return result;
      },
      // 提交模板表单
      submitTemplateForm(){
        /*
           {
              "sysUserId": "5b1a184f4cedfd20bc6f8bfa",
              "titleXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/h1[1]",
              "authorXpath": "",
              "createdAtXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]",
              "contentXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[3]",
              "websiteAttrId": "5c986e802d98403f00561fa8",
              "websiteModulesId": [
                  "5b2a0bb052faff000197ac42"
              ],
              "dynamic": false,
              "name": "国际经济",
              "status": "NORMAL",
              "createdAt": 1529482231596
            }
        */

        // 验证 表单内容
        if(!this.checkFormContent().value){
          this.$message(this.checkFormContent());
          return;
        }

        // 判断 绑定网源 web-module/web-template
        if(this.templateList.value !== 'add-template-content'){
           let url1 = `${this.netService}web-module/web-template`;
           let body1 = { "webTemplateId": this.templateList.value, "webModuleId": this.webSource.value };
           let headers = { system: 'S11SU01', token: this.userInfo.token };
           
           // 请求 绑定网站
           chrome.runtime.sendMessage({ data:{ method:'post', body: body1, url: url1, headers }, event:'requestJsonData', eventName:'绑定网源'}, (response) => {
             if(response.code == 0){
               this.$message({type:'success',message:'绑定网源成功',showClose:true});
             }
             console.log(response);
           });

            return;
        }

        // 1. 获取内容的xpath字段
        const xpathKeys = ['title','author','createdAt','content'];
        // 2. 基础的其他参数
        let basicConfig = {
          websiteAttrId:"", sysUserId: this.userInfo.userInfo.userId, websiteModulesId: [this.webSource.value], status: "VAILD", name: this.templateFormData.name
        };
        // 3. 获取xpqathConfig
        let basicXpathConfig = (() => {
          let config = {};
          xpathKeys.forEach(key => {
            config[key+'Xpath'] = this.templateFormData[key].xpath;
          })
          return config;
        })();
        // 4. 获得最终的 config 配置信息
        let resultConfig = Object.assign({},basicXpathConfig,basicConfig);
        
        // 5. 请求接口内容
        let url = `${this.netService}web-template`;
        let headers = { system: 'S11SU01', token: this.userInfo.token };

        // 获取网源模板列表
        chrome.runtime.sendMessage({ data:{ method:'post', body: resultConfig, url, headers }, event:'requestJsonData', eventName:'新增网源模板'}, (response) => {
          if(response.code == 0){
            this.$message({type:'success',message:'新增模板并绑定成功',showClose:true});
          }
        })
        
      }
    },
    components: {},
    computed:{
      ...mapState(['loginService','netService'])
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