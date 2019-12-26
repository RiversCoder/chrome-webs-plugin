<template>
  <div class="web-list">
    <ul style="padding: 0;">
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
        <div class="web-list__group_box web-list__input">
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
        <div class="web-list__input" style="margin-top: 10px;">
          <el-radio-group v-model="radio" class="web-list__input">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
      </li>
      <li class="web-list__list" style="line-height: 35px;">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 是否动态网站
        </span>
        <div class="web-list__input">
        <el-radio-group v-model="staticDynamic">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <el-button type="primary" plain size="small" class="web-list__list_ml30" @click="checkWebsiteDynamic">校验</el-button>
        </div>
      </li>
      <!-- 仅列表模式显示 -->
      <li class="web-list__list" v-if="type===2">
        <span class="web-list__text">选择列表</span>
        <el-input v-model="selectListContent.content" size="small" placeholder="请输入" class="web-list__input" @focus="grabData"></el-input>
      </li>
      <!-- 仅列表模式显示 -->
      <li class="web-list__list" v-if="type===2">
        <span class="web-list__text">下一页</span>
        <el-input v-model="selectNextPageContent.content" size="small" placeholder="请输入" class="web-list__input" @focus="grabDataPage"></el-input>
      </li>
      <li class="web-list__list" style="margin-bottom: 0;">
        <span class="web-list__text">自定义标签</span>
        <div class="web-list__group_box web-list__input">
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
        <div class="web-list__input" style="width: 265px;">
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
        </div>
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

const $ = global.$;

import { mapState } from "vuex";
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
      type: 2, //爬取模式
      radio: 1,
      staticDynamic: 1, // 是否为动态网站 1 动态网站 0 静态网站
      webName: "",
      selectListContent: { // 选择列表内容
        content: '',  // 展示内容
        value: ''  // 像后台传递的内容
      }, // 选择页面列表内容
      selectNextPageContent:{  // 选择上下页的内容
        content: '',
        value: ''
      },
      checkboxGroup: []
    };
  },
  created() {},
  mounted() {
    // this.initEvent();
    // console.log(this.loginService)
  },
  methods: {
    getlist(){
      let url = ''
      axios.get(url)
      .then( res => {
        console.log(res)
      }).catch( err => {
        console.log(err)
      })
    },
    initEvent(){
      // console.log('监听来自popup的消息')
      // 监听来自popup的消息
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
      {
          console.log('收到来自content-script的消息：');
          console.log(request);
          console.log(sender);
          switch(request.event){
            case 'popup-content-onoff':
              //
              break;
            case 'other':
              // 
              break;
          }
          // sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
      });
    },
    // 校验当前网站是否是动态网站
    checkWebsiteDynamic(){
      chrome.runtime.sendMessage({data:{ href: location.href, contentSource: document.body.innerHTML }, event:'checkWebsitesDynamic', eventName:'检测当前网站是否为动态网站'}, (res) => {
          this.$message({ type:'success', message: `当前网站为：${res==1?'动态网站':'静态网站'}`, showClose: true, duration: 2000 });
          this.staticDynamic = res;
      });
    },
    // 选择上一页 下一页 内容
    grabDataPage(v){
       this.bindEvent(v.target, (ele) => {
        this.selectNextPageContent.content = $(ele).text().replace(/\s*/ig,'').substring(0,100);
        this.selectNextPageContent.value = this.readXPath(ele);
      });
    },
    // 选择列表 聚焦
    grabData(v){
      this.bindEvent(v.target, (ele) => {
        this.selectListContent.content = $(ele).text().replace(/\s*/ig,'').substring(0,100);
        this.selectListContent.value = this.readXPath(ele);
      });
    },
    // 根据元素获取xpath
    readXPath(element) {
        if (element.id !== "") {//判断id属性，如果这个元素有id，则显 示//*[@id="xPath"]  形式内容
            return '//*[@id=\"' + element.id + '\"]';
        }
        //这里需要需要主要字符串转译问题，可参考js 动态生成html时字符串和变量转译（注意引号的作用）
        if (element == document.body) {//递归到body处，结束递归
            return '/html/' + element.tagName.toLowerCase();
        }
        var ix = 1,//在nodelist中的位置，且每次点击初始化
            siblings = element.parentNode.childNodes;//同级的子元素
    
        for (var i = 0, l = siblings.length; i < l; i++) {
            var sibling = siblings[i];
            //如果这个元素是siblings数组中的元素，则执行递归操作
            if (sibling == element) {
                return this.readXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix) + ']';
                //如果不符合，判断是否是element元素，并且是否是相同元素，如果是相同的就开始累加
            } else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
                ix++;
            }
        }
    },
    // 给元素绑定事件 且获取元素的内容
    bindEvent(v, fn){
        let This  = this;
        
        //清除所有样式
        function removeAllClass(){
            $('*').each(function(){
                $(this).removeClass('ws-grab-class');
            })
        }

        $('*').on('mouseover',function(e){

            //清除所有
            removeAllClass();

            //添加样式
            $(this).addClass('ws-grab-class');

            $(this).on('click',function(e){

                removeAllClass();
                $(this).addClass('ws-grab-class');

                // callback
                fn&&fn(this);

                $("*").off();
                // This.$emit('rebind');
                //取消默认事件
                e.preventDefault();
                return false;
                
            });

            //取消冒泡
            e.cancelBubble = true;
            e.stopPropagation();
        });

        $('#kedun_web_plugin').find('*').on('mouseover',function(e){
            $(this).removeClass('ws-grab-class');
            e.cancelBubble = true;
            e.stopPropagation();
        });
    }

  },
   computed: {
    // ...mapState(["loginService"]),
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
  /* margin-left: 140px; */
}
.web-list .web-list__list .web-list__list_ml30 {
  margin-left: 30px;
}
</style>