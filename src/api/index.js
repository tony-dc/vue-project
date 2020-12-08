import { BaseData } from './base'
//创建一个子类继承父类方法
class API extends BaseData {
    //正在热映接口
    getMovieOnInfoList(params) {
            //直接调用父类的get方法
            return this.get('/ajax/movieOnInfoList', params)
        }
        //获取正在热映更多电影列表接口
    getMoreMovieList(params) {
            return this.get('/ajax//moreComingList', params)
        }
        //获取即将上映接口数据
    getComingSoonList(params) {
            return this.get('/ajax/comingList', params)
        }
        //获取更多即将上映接口数据
    getMoreComingList(params) {
            return this.get('/ajax/moreComingList', params)
        }
        //获取最期待电影接口数据
    getMostExpected(params) {
            return this.get('/ajax/mostExpected', params)
        }
        //获取搜索接口数据,newVal表示实时更新的input值
    getSearchList(newVal, cityId) {
            return this.get(`/ajax/search?kw=${newVal}&cityId=${cityId}`)
        }
        //获取城市接口数据,
    getCityList() {
            return this.get('/dianying/cities.json')
        }
        //获取影院接口数据
    getCinameData(params) {
            return this.get('/ajax/cinemaList' , params)
        }
        //获取影片详情api接口数据
    getMovieDetail(params) {
            return this.get('/ajax/detailmovie', params)
        }
        //请求搜索api接口数据
    getSearch(params) {
        return this.get('/ajax/search', params)
    }
    getFilterCinemas(params){
        return this.get('/ajax/filterCinemas',params)
    }
    getDetailMovie(params){
        return this.get('/ajax/detailmovie',params)
    }
    getpostMovie(params){
        return this.post('/ajax/movie',params)
    }
}
//导出这个类的实例
export default new API()