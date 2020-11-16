import { BaseData } from './base'
//创建一个子类继承父类方法
class API extends BaseData {
    //正在热映接口
    getMovieOnInfoList(params) {
        //直接调用父类的get方法
        return this.get('/ajax/movieOnInfoList?cityId=' + params)
    }
}
export default new API