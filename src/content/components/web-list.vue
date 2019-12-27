<template>
  <div class="web-list">
    <ul style="padding: 0;">
      <li class="web-list__list">
        <span class="web-list__text">选择爬取模式</span>
        <el-select v-model="crawlMode" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.name"
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
        <el-select v-model="websiteType" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="(item,index) in options1"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list" style="margin-bottom: 0;">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 行业类别
        </span>
        <div class="web-list__group_box web-list__input">
          <el-checkbox-group v-model="tradesId" size="small" class="web-list__group">
            <el-checkbox
              :label="item.name"
              border
              v-for="(item,index) in labelList1"
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
        <el-select v-model="level" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="(item,index) in options2"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 语言类型
        </span>
        <el-select v-model="language" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="(item,index) in options3"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list" style="line-height: 35px;">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 是否海内外
        </span>
        <div class="web-list__input" style="margin-top: 10px;">
          <el-radio-group v-model="oversea" class="web-list__input">
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
      <li class="web-list__list" v-if="crawlMode==='LIST'">
        <span class="web-list__text">选择列表</span>
        <el-input v-model="selectListContent.content" size="small" placeholder="请输入" class="web-list__input" @focus="grabData"></el-input>
      </li>
      <!-- 仅列表模式显示 -->
      <li class="web-list__list" v-if="crawlMode==='LIST'">
        <span class="web-list__text">下一页</span>
        <el-input v-model="selectNextPageContent.content" size="small" placeholder="请输入" class="web-list__input" @focus="grabDataPage"></el-input>
      </li>
      <li class="web-list__list" style="margin-bottom: 0;">
        <span class="web-list__text">自定义标签</span>
        <div class="web-list__group_box web-list__input">
          <el-checkbox-group v-model="customTagsId" size="small" class="web-list__group">
            <el-checkbox
              :label="item.name"
              border
              v-for="(item,index) in labelList2"
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
          <el-select v-model="province" placeholder="请选择" size="small" style="width:83px" @change="getCityList(province)">
            <el-option
              v-for="(item,index) in provinceList"
              :key="index"
              :label="item.proviceName"
              :value="item.proviceId"
            ></el-option>
          </el-select>
          <el-select v-model="city" placeholder="请选择" size="small" style="width:83px" @change="getCountysList(city)" >
            <el-option
              v-for="(item,index) in cityList"
              :key="index"
              :label="item.cityName"
              :value="item.cityId"
            ></el-option>
          </el-select>
          <el-select v-model="area" placeholder="请选择" size="small" style="width:83px">
            <el-option
              v-for="(item,index) in areaList"
              :key="index"
              :label="item.countyName"
              :value="item.countyId"
            ></el-option>
          </el-select>
        </div>
      </li>
      <li class="web-list__list">
        <span class="web-list__text">
          <span class="web-list__text_red">*</span> 爬取深度
        </span>
        <el-select v-model="maxDepth" placeholder="请选择" size="small" class="web-list__input">
          <el-option
            v-for="(item,index) in options4"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="web-list__list" style="text-align: center;">
        <el-button type="primary" size="small" class="web-list__list--submit" @click="submit">提交</el-button>
      </li>
    </ul>
  </div>
</template>


<script scoped>
import { mapState } from 'vuex';
const $ = global.$;

export default {
  data() {
    return {
      options: [
        { value: 1, name: "全局模式" },
        { value: 2, name: "列表模式" }
      ],
      options1: [
        { value: 1, name: "通用网站" },
        { value: 2, name: "论坛" },
        { value: 3, name: "纸媒" },
        { value: 4, name: "问答" },
        { value: 5, name: "自媒体" }
      ],
      options2: [
        { value: 1, name: "1" },
        { value: 2, name: "2" },
        { value: 3, name: "3" },
        { value: 4, name: "4" },
        { value: 5, name: "5" },
        { value: 6, name: "6" }
      ],
      options3: [
        { value: 1, name: "中文" },
        { value: 2, name: "英文" },
        { value: 3, name: "藏文" },
        { value: 4, name: "维文" },
        { value: 5, name: "日语" },
        { value: 6, name: "法语" }
      ],
      options4:[],
      nameList: [
        { value: 1, name: "公安类" },
        { value: 2, name: "房产类" },
        { value: 3, name: "金融类" },
        { value: 4, name: "能源类" }
      ],
      labelList:[],//行业类别
      labelList1:[],//行业类别
      labelList2:[],//自定义标签
      provinceList: [{ value: 1, name: "省" }],
      cityList: [{ value: 1, name: "市" }],
      areaList: [{ value: 1, name: "区" }],
      province: "",
      city: "",
      area: "",
      value: 1,
      websiteType:'',//网源类型 网站类型
      level:'',//网源优先级 爬取级别
      crawlMode:'LIST',//爬取模式
      language:'',//语言类型
      sourceTags:'',//来源标签
      oversea:0,//是否境外
      customTagsId:[], //自定义标签id集合
      tradesId:[], //行业标签id集合
      maxDepth:'',//爬取深度
      radio: 1,
      staticDynamic: 0, // 是否为动态网站 1 动态网站 0 静态网站
      webName: "", //网源名称
      selectListContent: { // 选择列表内容
        content: '',  // 展示内容
        value: ''  // 像后台传递的内容
      }, // 选择页面列表内容
      selectNextPageContent:{  // 选择上下页的内容
        content: '',
        value: ''
      },
      checkboxGroup: [],
      token:''
    };
  },
  mounted() {
    // this.initEvent();
    // console.log(this.loginService)
    chrome.storage.sync.get('loginInfo',(item) => {
        if(!item) return;
        this.token = item.loginInfo.token
      });
        setTimeout(()=>{
        this.getList() //获取各个选项数据
        },1000)
    
  },
  methods: {
    getList(){
      // 0、爬取模式 1、语言类别 2、状态类别 3、网站类型 4、爬取级别 5、爬取深度
      this.getTemplateList(0,'爬取模式') //获取爬取模式列表
      this.getTemplateList(3,'网站类型') //获取网站类型列表
      this.getTemplateList(4,'爬取级别') //获取爬取级别列表
      this.getTemplateList(1,'语言类别') //获取语言类别列表
      this.getTemplateList(5,'爬取深度') //获取爬取深度列表
      this.getTradeType()//获行业列表
      this.getCustomList()//获取自定义标签列表
      this.getProvinceList(); //获取省级
    },
    //获取爬取模式列表
    getTemplateList(type,name){

        let domain = global.location.host;
        let url = `${this.netService}options/${type}`;
        let headers = { system: 'S11SU01', token: this.token };
        
        // 获取选项列表
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:`请求：获取${name}选项列表`}, (response) => {
          console.log(`请求：获取${name}选项列表`,response)
          if(response.code == 0){
            if(type===0){ //爬取模式列表
              this.options = response.data
            }else if(type===3){ //网站类型列表
              this.options1 = response.data
            }else if(type===4){ //爬取级别列表
              this.options2 = response.data
            }else if(type===1){ //爬取语言类别列表
              this.options3 = response.data
            }else if(type===5){ //爬取爬取深度列表
              this.options4 = response.data
            }
            
          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });

      },
    //获行业列表
    getTradeType(){
        let domain = global.location.host;
        let url = `${this.netService}tag/tradeType/list/NORMAL`;
        let headers = { system: 'S11SU01', token: this.token };
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:`请求：获取行业列表`}, (response) => {
          console.log('获取行业列表',response)
          if(response.code == 0){
            this.labelList1 = response.data
          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });

      },
    //获取自定义标签列表
    getCustomList(){
        let domain = global.location.host;
        let url = `${this.synthesisApi}api/tag/custom/list/valid`;
        let headers = { system: 'S11SU01', token: this.token };
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:`请求：获取自定义标签列表`}, (response) => {
          console.log('获取自定义标签列表',response)
           let code = response.code
          if(code.charAt(0) == "R"){
            this.labelList2 = response.data
          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });

      },
    //获取自定义标签列表provinceList: [{ value: 1, name: "省" }],
      // cityList: [{ value: 1, name: "市" }],
      // areaList: [{ value: 1, name: "区" }],
    getProvinceList(){
        let domain = global.location.host;
        let url = `${this.monitorApi}positionApi/provice`;
        let headers = { system: 'S11SU01', token: this.token };
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:`请求：获取省级列表`}, (response) => {
          console.log('请求：获取省级列表',response)
           let code = response.code
          if(code.charAt(0) == "R"){
            console.log('请求：获取省级列表',response)
            this.provinceList = response.data
          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });

      },
      //请求市级列表
    getCityList(proviceId){
        let domain = global.location.host;
        let url = `${this.monitorApi}positionApi/citys/${proviceId}`;
        let headers = { system: 'S11SU01', token: this.token };
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:`请求：获取市级列表`}, (response) => {
          console.log('请求：获取市级列表',response)
           let code = response.code
          if(code.charAt(0) == "R"){
            this.cityList = response.data
          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });
      },
      //请求区级列表
    getCountysList(cityId){
        let domain = global.location.host;
        let url = `${this.monitorApi}positionApi/countys/${cityId}`;
        let headers = { system: 'S11SU01', token: this.token };
        chrome.runtime.sendMessage({ data:{ url, headers }, event:'requestJsonData', eventName:`请求：获取区级列表`}, (response) => {
          console.log('请求：获取区级列表',response)
           let code = response.code
          if(code.charAt(0) == "R"){
            this.areaList = response.data
          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });
      },
      //用于网源录入插件请求新增网源
      submit(){
        let region = []
        let tradesId = []
        let customTagsId = []
        region.push(this.province)
        region.push(this.city)
        region.push(this.area)
        this.labelList1.forEach(res=>{
          this.tradesId.forEach(item=>{
          if(res.name ==item){
            tradesId.push(res.id)
          }
        })
        })
        this.labelList2.forEach(res=>{
          this.customTagsId.forEach(item=>{
          if(res.name ==item){
            tradesId.push(res.id)
          }
        })
        })
        
       let param =  {
            "name": this.webName,
            "region": region,
            "provinceId": this.province,
            "countyId": this.area,
            "cityId": this.city,
            "websiteType": this.websiteType,
            "level": this.level,
            "crawlMode": this.crawlMode,
            "language": this.language,
            "tradesId": tradesId,
            "customTagsId": customTagsId,
            "listPaths": [this.selectListContent.value],
            // "sysUserId": 19999,
            "pagePath": this.selectNextPageContent.value,
            "oversea": this.oversea==1?true:false,
            "dynamic": this.staticDynamic==1?true:false,
            "domain": global.location.host,
            "homepage": global.location.href,
            "maxDepth": this.maxDepth
        }
        let domain = global.location.host;
        let url = `${this.netService}web-module`;
        let headers = { system: 'S11SU01', token: this.token };

        console.log('网源录入插件请求新增网源',{ url, headers, method:'post', body:param })
        chrome.runtime.sendMessage({ data:{ url, headers, method:'post', body:param }, event:'requestJsonData', eventName:`请求：网源录入插件请求新增网源`}, (response) => {
          
          console.log('网源录入插件请求新增网源',response)
           if(response.code == 0){
            this.initData() // 新增成功初始化数据
             this.$message({ type:'success', message: `操作成功！`, showClose: true, duration: 2000 });
          }else{
            this.$message({ type:'error', message: response.msg, showClose: true});
          }
        });
      },
      // 初始化数据
      initData(){
      this.websiteType = '';//网源类型 网站类型
      this.level= '';//网源优先级 爬取级别
      this.crawlMode ='LIST';//爬取模式
      this.language= ''; //语言类型
      this.sourceTags= '';//来源标签
      this.oversea = 0;//是否境外
      this.customTagsId = []; //自定义标签id集合
      this.tradesId = []; //行业标签id集合
      this.maxDepth= '';//爬取深度
      this.staticDynamic =  0; // 是否为动态网站 1 动态网站 0 静态网站
      this.webName =  ""; // 网源名称
      this.province =  ""; // 省
      this.city =  ""; // 市
      this.area =  ""; // 区
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
  computed:{
      ...mapState(['loginService','userInfo','netService','monitorApi','synthesisApi'])
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