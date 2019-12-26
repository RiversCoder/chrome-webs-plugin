const dev = {
    domainStatus: 'dev',
    loginService: 'http://121.201.107.114:18013/', // 登录验证服务
}
const test = {
    domainStatus: 'test',
    loginService: 'http://121.201.107.118:18012/', // 登录验证服务
}
const commonState = {
    foo: 'bar'
  }
export const devState = Object.assign({},dev,commonState)
export const testState = Object.assign({},test,commonState)