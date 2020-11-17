import { BaseData } from './base'
//创建一个子类继承父类方法
class API extends BaseData {
    //正在热映接口
    getMovieOnInfoList(params) {
            //直接调用父类的get方法
            return this.get('/ajax/movieOnInfoList?cityId=' + params)
        }
        //获取即将上映接口数据
    getComingSoonList(cityId) {
            return this.get('/ajax/comingList?' + `ci=${cityId}&token=&limit=10`)
        }
        //获取搜索接口数据,newVal表示实时更新的input值
    getSearchList(newVal, cityId) {
            return this.get(`/ajax/search?kw=${newVal}&cityId=${cityId}`)
        }
        //获取城市接口数据,
    getCityList() {
        return this.get('/dianying/cities.json')
    }
}
//导出这个类的实例
export default new API()