# 独立网源后台

###的

## 技术栈
1. spring-webflux
1. mongodb-reactive
1. redis-reactive

## 存储依赖/中间件
1. mongodb
1. redis

## 编码说明
* 该项目采用了非传统式的MVC阻塞模型——`reactive`，故代码内尽量不要出现阻塞，不建议引入阻塞式存储或中间件
* 网络请求统一使用`WebClient`
* 智能网关登记的项目前缀为`webmanage`
* 请求入参中的校验使用`@Validated`
* 服务间调用时Token校验在过滤器`LegalCheckWebFilter`中进行
* 业务异常抛出时统一抛出`WebRuntimeException`异常，全局捕获异常对象会其做处理
* 过滤器中同样可以使用`WebRuntimeException`作为业务异常抛出
* 过滤器排序使用`@Order`注解

## 接口说明

### 网源相关

1. [新增网源](#新增网源)
1. [更新网源](#更新网源)
1. [删除网源](#删除网源)
1. [根据URL查询网源](#根据链接查询网源)
1. [根据域名查询网源](#根据域名查询网源)
1. [网源与模板双向绑定](#网源与模板双向绑定)
### 下拉框相关
1. [根据类型获取下拉列表](#根据类型获取下拉列表)
### 模板相关

1. [新增模板](#新增模板)
1. [更新模板](#更新模板)
1. [删除模板](#删除模板)
1. [根据ID查询模板](#根据ID查询模板)
1. [根据域名获取模板列表](#根据域名获取模板列表)

### 地域相关接口
1. [点击跳转](http://121.201.107.114:19102/swagger-ui.html#/position-controller)

### 行业标签相关

1. [根据状态获取所有行业标签](#根据状态获取所有行业标签)

### 自定义标签相关
1. [点击跳转](http://192.168.1.118:18022/swagger-ui.html#/custom-net-tag-controller)

## 实体对象说明

#### 网源

| 属性 | 字段名 | 类型 | 是否必须 | 可选值 | 默认值 | 索引 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 主键 | id | String | Y | - | - | 主键索引 | - |
| 网源名称 | name | String | Y | - | - | 唯一索引 | - |
| 网源所属地域 | region | collection | Y | - | - | - | - |
| 网源类型 | websiteType | enum | Y | NEWS<br>VIDEO<br>FORUM<br>QA<br>PRINTED_MEDIA<br>BLOG<br>OVERSEA<br>UYGUR<br>TIBETAN<br>WEIBO<br>WECHAT | - | - | - |
| 网源优先级 | level | int | Y | 0<br>1<br>2<br>3<br>4<br>5 | 0 | - | - |
| 爬取模式 | crawlMode | enum | Y | ALL<br>LIST<br>FORUM<br>VIDEO | - | - | - |
| 语言类型 | language | enum | Y | CHINESE<br>ENGLISH<br>JAPANESE<br>GERMAN<br>FRENCH<br>OTHER | - | - | - |
| 行业标签id集合 | tradesId | collection | Y | - | - | - | - |
| 来源标签 | sourceTags | collection | Y | - | - | - | - |
| 自定义标签id集合 | customTagsId | collection | Y | - | - | - | - |
| 列表xpath路径 | listPaths | collection | N | - | - | - | - |
| 翻页xpath路径 | pagePath | String | N | - | - | - | - |
| 是否境外 | oversea | boolean | Y | - | false | - | - |
| 是否动态网站 | dynamic | boolean | Y | - | false | - | - |
| 用户id | sysUserId | string | Y | - | - | 正向索引 | - |
| 对应的模板id | websiteModuleTemplatesId | collection | N | - | - | - | - |
| 页面元数据id | websiteAttrId | string | N | - | - | 正向索引 | - |
| 网源域名 | domain | string | Y | - | - | 正向索引 | - |
| 网源入口URL | homepage | string | Y | - | - | 正向索引 | - |
| 最大爬取深度 | maxDepth | int | Y | - | 3 | - | - |
| 创建时间 | createdAt | long | Y | - | - | 正向索引 | - |
| 状态 | status | enum | Y | NO_ACTIVE<br/>NORMAL<br/>STOP<br/>DELETE<br/>VAILD<br/>DISABLE | - | - |  |

#### 模板

| 属性 | 字段名 | 类型 | 是否必须 | 可选值 | 默认值 | 索引 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 主键 | id | String | Y | - | - | 主键索引 | - |
| 模板名称 | name | String | Y | - | - | 唯一索引 | - |
| 状态 | status | enum | Y | NO_ACTIVE<br>NORMAL<br>STOP<br>DELETE<br>VAILD<br>DISABLE | - | 正向索引 | - |
| 创建时间 | createdAt | long | Y | - | - | 正向索引 | - |
| 用户id | sysUserId | string | Y | - | - | 正向索引 | - |
| 标题xpath路径 | titleXpath | String | Y | - | - | - | - |
| 作者xpath路径 | authorXpath | String | Y | - | - | - | - |
| 时间xpath路径 | createdXpath | String | Y | - | - | - | - |
| 内容xpath路径 | contentXpath | String | Y | - | - | - | - |
| 页面元数据id | websiteAttrId | string | N | - | - | 正向索引 | - |
| 绑定的网源id | websiteModulesId | collection | Y | - | - | - | - |

#### 行业标签

| 属性 | 字段名 | 类型 | 是否必须 | 可选值 | 默认值 | 索引 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 主键 | id | String | Y | - | - | 主键索引 | - |
| 行业名称 | name | String | Y | - | - | 唯一索引 | - |
| 状态 | status | enum | Y | VAILD、STOP | - | - | - |
| 创建时间 | createdAt | long | Y | - | - | - | - |

#### 自定义标签

| 属性 | 字段名 | 类型 | 是否必须 | 可选值 | 默认值 | 索引 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 主键 | id | String | Y | - | - | 主键索引 | - |
| 自定义名称 | name | String | Y | - | - | 唯一索引 | - |
| 创建时间 | createAt | long | Y | - | - | - | - |
| 状态 | status | Integer | Y | 0、1、2 | - | - | 1:正常 0:失效 2:删除 |

#### 下拉选项

| 属性 | 字段名 | 类型 | 是否必须 | 可选值 | 默认值 | 索引 | 备注 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 主键 | id | String | Y | - | - | 主键索引 | - |
| 名称 | name | String | Y | - | - | 索引 | - |
| 值 | value | String | Y | - | - | - | - |
| 下拉类型 | type | byte | Y | 0,1,2,3,4,5 | - |正向索引 | 0、爬取模式 1、语言类别 2、状态类别 3、网站类别 4、爬取级别 5、爬取深度 |

## API列表

#### 新增网源

* 请求地址
  
> POST /web-module

* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
  
> 用于网源录入插件请求新增网源

* 请求参数
    ```json
    {
        "name": "示例",
        "region": [
            "360",
            "360900000000"
        ],
        "websiteType": "FORUM",
        "level": 1,
        "crawlMode": "ALL",
        "language": "CHINESE",
        "tradesId": [
            "5e0331922cc3501392cb567a",
            "5e0331772cc3501392cb5679"
        ],
        "customTagsId": [
            "1",
            "2"
        ],
    "listPaths": [
            "/body[0]/div[4]/div[1]/table[2]/td[1]"
        ],
        "sysUserId": 19999,
        "pagePath": "/body[0]/div[1]/p[2]/div[1]",
        "oversea": false,
        "dynamic": false,
        "domain": "www.baidu.com",
        "homepage": "https://www.baidu.com/",
        "maxDepth": 3
    }
    ```
    
    | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
    | name | 网源名称 | string | Y | - | - |
    | region | 网源所属地域 | array | Y | - | - |
    | websiteType | 网源类型 | string | Y | NEWS<br>VIDEO<br>FORUM<br>QA<br>PRINTED_MEDIA<br>BLOG<br>OVERSEA<br>UYGUR<br>TIBETAN<br>WEIBO<br>WECHAT | - |
    | level | 网源优先级 | integer | Y | 0<br>1<br>2<br>3<br>4<br>5 | - |
    | crawlMode | 爬取模式 | string | Y | ALL<br>LIST<br>FORUM<br>VIDEO | - |
    | language | 语言类型 | string | Y | CHINESE<br>ENGLISH<br>JAPANESE<br>GERMAN<br>FRENCH<br>OTHER | - |
    | tradesId | 行业标签id集合 | array | Y | - | - |
    | sourceTags | 来源标签 | array | Y | - | - |
    | customTagsId | 自定义标签id集合 | array | Y | - | - |
    | listPaths | 列表xpath路径 | array | N | - | - |
    | pagePath | 翻页xpath路径 | string | N | - | - |
    | oversea | 是否境外 | bool | Y | - | - |
    | dynamic | 是否动态网站 | bool | Y | - | - |
    | homepage | 网源入口URL | string | Y | - | - |
    | maxDepth | 最大爬取深度 | integer | Y | - | - |
    
* 请求返回结果
    ```json
    {
        "code": 0,
        "message": "request success",
        "data": {
            "id": "5e0336382cc3501392cb5684",
            "crawlMode": "ALL",
            "name": "示例",
            "websiteType": "FORUM",
            "tradesId": [
                "5e0331922cc3501392cb567a",
                "5e0331772cc3501392cb5679"
            ],
            "level": 1,
            "language": "CHINESE",
            "oversea": false,
            "dynamic": false,
            "customTagsId": [
                "1",
                "2"
            ],
            "region": [
                "360900000000",
                "360"
            ],
            "maxDepth": 3,
            "sourceTags": null,
            "listPaths": [
                "/body[0]/div[4]/div[1]/table[2]/td[1]"
            ],
          "pagePath": "/body[0]/div[1]/p[2]/div[1]",
          "sysUserId": "19999",
          "websiteModuleTemplatesId": null,
          "websiteAttrId": null,
          "domain": "www.baidu.com",
          "homepage": "https://www.baidu.com/",
          "createdAt": 1577268792655,
          "status": null,
          "webTemplates": null
      }
  }
  ```
  
* 请求返回异常
  
    * 500:服务器内部未知异常
    * 10001:无访问权限
    * 10002: 请求中缺少必要参数
    * 10004: 索引项重复,即存在相同信息

#### 更新网源
* 接口描述
    >更新与添加唯一区别,需要传递更新的网源id
#### 删除网源

* 请求地址
    >Delete /web-module/{id}

* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >根据网源id删除网源
* 请求参数

    ```text
    id="5e0336382cc3501392cb5684"
    ````
    | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
    | id | 网源id | string | Y | - | - |
* 请求返回结果
  ```json
    {
        "code": 0,
        "message": "request success"
    }
  ```
  * 请求返回异常
      * 500:服务器内部未知异常
      * 10001:无访问权限
      * 10005:没有该记录


#### 根据链接查询网源

* 请求地址
   >get /web-module/url
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >通过URL查找网源

* 请求参数
    ```text
    url="https://www.baidu.com/"
    ```
    | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
    | url | 网源的homepage值 | string | Y | - | - |
* 请求返回结果
    ```json
    {
        "code": 0,
        "message": "request success",
        "data": {
            "id": "5e0336382cc3501392cb5684",
            "crawlMode": "ALL",
            "name": "示例",
            "websiteType": "FORUM",
            "tradesId": [
                "5e0331922cc3501392cb567a",
                "5e0331772cc3501392cb5679"
            ],
            "level": 1,
            "language": "CHINESE",
            "oversea": false,
            "dynamic": false,
            "customTagsId": [
                "1",
                "2"
            ],
            "region": [
                "360900000000",
                "360"
            ],
            "maxDepth": 3,
            "sourceTags": null,
            "listPaths": [
                "/body[0]/div[4]/div[1]/table[2]/td[1]"
            ],
          "pagePath": "/body[0]/div[1]/p[2]/div[1]",
          "sysUserId": "19999",
          "websiteModuleTemplatesId": null,
          "websiteAttrId": null,
          "domain": "www.baidu.com",
          "homepage": "https://www.baidu.com/",
          "createdAt": 1577268792655,
          "status": null,
          "webTemplates": null
      }
  }
  ```
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限
    
#### 根据域名查询网源

* 请求地址
    >get /web-module/domain
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >通过URL查找网源
* 请求参数
    ```text
    domain="www.baidu.com"
    ```
     | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
        | ---- | ---- | ---- | ---- | ---- | ---- |
        | domain | 网源的所属域名 | string | Y | - | - |
* 请求返回结果
    ```json
    {
        "code": 0,
        "message": "request success",
        "data": {
            "id": "5e0336382cc3501392cb5684",
            "crawlMode": "ALL",
            "name": "示例",
            "websiteType": "FORUM",
            "tradesId": [
                "5e0331922cc3501392cb567a",
                "5e0331772cc3501392cb5679"
            ],
            "level": 1,
            "language": "CHINESE",
            "oversea": false,
            "dynamic": false,
            "customTagsId": [
                "1",
                "2"
            ],
            "region": [
                "360900000000",
                "360"
            ],
            "maxDepth": 3,
            "sourceTags": null,
            "listPaths": [
                "/body[0]/div[4]/div[1]/table[2]/td[1]"
            ],
          "pagePath": "/body[0]/div[1]/p[2]/div[1]",
          "sysUserId": "19999",
          "websiteModuleTemplatesId": null,
          "websiteAttrId": null,
          "domain": "www.baidu.com",
          "homepage": "https://www.baidu.com/",
          "createdAt": 1577268792655,
          "status": null,
          "webTemplates": null
      }
  }
  ```
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限
    
#### 网源与模板双向绑定

* 请求地址
    >post  /web-module/web-template
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >模板与网源双向绑定
* 请求参数
    ```json
    {
    	"webTemplateId":"5e01dfdf224467455d6d3298",
    	"webModuleId":"5e017984a7c57703d823ab67"
    }
    ```
    | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
    | webModuleId | 网源的id | string | Y | - | - |
    | webTemplateId | 模板id | string | Y | - | - |
* 请求返回结果
    ```json
    {
        "code": 0,
        "message": "request success"
    }
  ```
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限
    * 10005:没有该记录

### 根据类型获取下拉列表
* 请求地址
    >get /options/{type}
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >根据类型获取下拉列表
* 请求参数
    ```text
     type=0
    ```
  | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
    | type | 下拉列表类型 | byte | Y | 0,1,2,3,4,5  | 0、爬取模式 1、语言类别 2、状态类别 3、网站类别 4、爬取级别 5、爬取深度 |
* 请求返回结果
    ```json
   {
       "code": 0,
       "message": "request success",
       "data": [
           {
               "id": "5e042c853eeb9a1fcdfda945",
               "name": "列表模式",
               "value": "LIST",
               "type": 0
           },
           {
               "id": "5e042c853eeb9a1fcdfda946",
               "name": "论坛模式",
               "value": "FORUM",
               "type": 0
           },
           {
               "id": "5e042c853eeb9a1fcdfda947",
               "name": "视频模式",
               "value": "VIDEO",
               "type": 0
           },
           {
               "id": "5e042c853eeb9a1fcdfda948",
               "name": "全量模式",
               "value": "ALL",
               "type": 0
           }
       ]
   }
  ```
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限
    
### 新增模板
* 请求地址
    >post /web-template
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >新增网源模板
* 请求参数
    ```json
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
    ```
  | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
  | 主键 | id | String | Y | - | - | 主键索引 | - |
  | 模板名称 | name | String | Y | - | - | 唯一索引 | - |
  | 状态 | status | string | Y | NO_ACTIVE<br>NORMAL<br>STOP<br>VAILD<br>DISABLE | - | 正向索引 | - |
  | 创建时间 | createdAt | long | Y | - | - | 正向索引 | - |
  | 用户id | sysUserId | string | Y | - | - | 正向索引 | - |
  | 标题xpath路径 | titleXpath | string | Y | - | - | - | - |
  | 作者xpath路径 | authorXpath | string | Y | - | - | - | - |
  | 时间xpath路径 | createdXpath | string | Y | - | - | - | - |
  | 内容xpath路径 | contentXpath | string | Y | - | - | - | - |
  | 页面元数据id | websiteAttrId | string | N | - | - | 正向索引 | - |
  | 绑定的网源id | websiteModulesId | collection | Y | - | - | - | - |
  
    
* 请求返回结果
    ```json
   {
       "code": 0,
       "message": "request success",
       "data": {
           "id": "5e01dfdf224467455d6d3298",
           "name": "国际经济",
           "status": "NORMAL",
           "createdAt": 1577181151784,
           "sysUserId": "5b1a184f4cedfd20bc6f8bfa",
           "titleXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/h1[1]",
           "authorXpath": "",
           "createdAtXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]",
           "contentXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[3]",
           "websiteAttrId": "5c986e802d98403f00561fa8",
           "websiteModulesId": [
               "5b2a0bb052faff000197ac42"
           ]
       }
   }
  ```
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限
    * 10002: 请求中缺少必要参数
    * 10004:索引项重复
### 更新模板
* 请求地址
    >put /web-template
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >请求参数必须传入模板id,其他和添加接口保持一致
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限
    * 10002: 请求中缺少必要参数   
    * 10005:没有该记录    
### 删除模板
* 请求地址
    >delete /web-template/{id}
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >根据模板id删除网源模板
* 请求参数
    ```text
      id=5e01dad8e452af4cbbda40e9
    ```
  | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
  | 主键 | id | String | Y | - | - | 主键索引 | - |
    
* 请求返回结果
    ```json
   {
       "code": 0,
       "message": "request success"
   }
    ```
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限
    * 10005:没有该记录
### 根据ID查询模板
* 请求地址
    >get /web-template/{id}
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >根据模板id获取网源模板
* 请求参数
    ```text
      id=5e044c316f9cd8632b749c5c
    ```
  | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
  | 主键 | id | String | Y | - | - | 主键索引 | - |
    
* 请求返回结果
    ```json
   {
       "code": 0,
       "message": "request success",
       "data": {
           "id": "5e044c316f9cd8632b749c5c",
           "name": "国际经济",
           "status": "NORMAL",
           "createdAt": 1577339953330,
           "sysUserId": "5b1a184f4cedfd20bc6f8bfa",
           "titleXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/h1[1]",
           "authorXpath": "",
           "createdAtXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]",
           "contentXpath": "/html[1]/body[1]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[3]",
           "websiteAttrId": "5c986e802d98403f00561fa8",
           "websiteModulesId": [
               "5b2a0bb052faff000197ac42"
           ]
       }
   }
    ```
 
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限
    * 10005:没有该记录
    
### 根据域名获取模板列表  
* 请求地址
    >get /web-template/domain/list?domain={domain}
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >根据域名获取模板列表
* 请求参数
    ```text
      domain=www.baidu.com
    ```
  | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
  | 网站域名 | domain | String | Y | - | - | -正向索引 | - |
    
* 请求返回结果
    ```json
   {
       "code": 0,
       "message": "request success",
       "data": [
           {
               "id": "5e0336382cc3501392cb5684",
               "crawlMode": "ALL",
               "name": "示例",
               "websiteType": "FORUM",
               "tradesId": [
                   "5e0331922cc3501392cb567a",
                   "5e0331772cc3501392cb5679"
               ],
               "level": 1,
               "language": "CHINESE",
               "oversea": false,
               "dynamic": false,
               "customTagsId": [
                   "1",
                   "2"
               ],
               "region": [
                   "360900000000",
                   "360"
               ],
               "crawDepth": 3,
               "sourceTags": null,
               "listPaths": [
                   "/body[0]/div[4]/div[1]/table[2]/td[1]"
               ],
               "pagePath": "/body[0]/div[1]/p[2]/div[1]",
               "sysUserId": "19999",
               "websiteModuleTemplatesId": null,
               "websiteAttrId": null,
               "domain": "www.baidu.com",
               "homepage": "https://www.baidu.com/",
               "createdAt": 1577268792655,
               "status": null,
               "webTemplates": null
           }
       ]
   }
    ```
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限   
    
### 根据状态获取所有行业标签
* 请求地址
    >get /tag/tradeType/list/{status}
* 请求头
    > Content-Type: application/json;charset=UTF-8  
    X-Token: 由智能网关生成(前端请求时不传该参数)  
    token: 用户登录后返回的token

* 接口描述
    >根据状态获取所有行业标签
* 请求参数
    ```text
      status=NORMAL
    ```
  | 字段名 | 字段说明 | 类型 | 是否必须 | 可选值 | 备注 |
    | ---- | ---- | ---- | ---- | ---- | ---- |
  | 状态 | status | string | Y | NORMAL、STOP | - | - | - |
    
* 请求返回结果
    ```json
   {
       "code": 0,
       "message": "request success",
       "data": [
           {
               "id": "5e0331772cc3501392cb5679",
               "name": "公安行业",
               "status": "NORMAL",
               "createdAt": 1577267575179
           },
           {
               "id": "5e0331922cc3501392cb567a",
               "name": "金融类",
               "status": "NORMAL",
               "createdAt": 1577267602171
           },
           {
               "id": "5e0331962cc3501392cb567b",
               "name": "房地产",
               "status": "NORMAL",
               "createdAt": 1577267606146
           },
           {
               "id": "5e03319a2cc3501392cb567c",
               "name": "制造业",
               "status": "NORMAL",
               "createdAt": 1577267610770
           },
           {
               "id": "5e0331a02cc3501392cb567d",
               "name": "能源类",
               "status": "NORMAL",
               "createdAt": 1577267616918
           },
           {
               "id": "5e0331a52cc3501392cb567e",
               "name": "农业",
               "status": "NORMAL",
               "createdAt": 1577267621125
           },
           {
               "id": "5e0331a92cc3501392cb567f",
               "name": "林业",
               "status": "NORMAL",
               "createdAt": 1577267625325
           },
           {
               "id": "5e0331ad2cc3501392cb5680",
               "name": "餐饮业",
               "status": "NORMAL",
               "createdAt": 1577267629282
           },
           {
               "id": "5e0331b32cc3501392cb5681",
               "name": "建筑业",
               "status": "NORMAL",
               "createdAt": 1577267635245
           }
       ]
   }
    ```
* 请求返回异常
    * 500:服务器内部未知异常
    * 10001:无访问权限    

