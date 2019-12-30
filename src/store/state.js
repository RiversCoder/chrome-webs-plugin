const dev = {
    domainStatus: 'dev',
    loginService: 'http://121.201.107.114:18013/', // 登录验证服务
    netService: 'http://192.168.1.118:11032/website-manage/', // 插件后台
    userModule: 'http://192.168.1.118:11032/user-module-cq/', //省市区,自定义标签
}
const test = {
    domainStatus: 'test',
    loginService: 'http://121.201.107.118:18012/', // 登录验证服务
    netService: 'http://192.168.1.118:11032/website-manage/', // 插件后台
    userModule: 'http://192.168.1.118:11032/user-module-cq/', //省市区,自定义标签
}
const commonState = {
    foo: 'bar',
    hasToken:'',// token
    userInfo: {},//用户信息
}
export const devState = Object.assign({},dev,commonState)
export const testState = Object.assign({},test,commonState)