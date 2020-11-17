import request from './request'
//创建一个类
export class BaseData {
    //在constructor添加私有属性handle
    constructor() {
        this.handle = request
    }
    responseData(res) {
        const { data, status } = res
        if (status === 200) return data
        return res
    }
    get(url, data = {}) {
        return this.handle.get(url, data).then(this.responseData)
    }
    post(url, data, config) {
        return this.handle.post(url, data, config).then(this.responseData)
    }
}