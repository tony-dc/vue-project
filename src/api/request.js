const axios=require('axios')
//创建一个axios实例
const request=axios.create(
    {
        baseURL: '/api',
        timeout: 10000,
        withCredentials:false,
        headers: {'Content-Type': 'application/json;charset:utf-8'}
    }
)
export default request