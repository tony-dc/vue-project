import filters from '@/utils/filter.js'

const state = {
    nm: window.localStorage.getItem('nm') || '上海',
    id: window.localStorage.getItem('id') || 10,
    filters,
    cinemaList:[],
    cinemas:[]
}
const mutations = {
    CITYINFO(state, payload) {
        state.nm = payload.nm
        state.id = payload.id
    },
    initCinemaList(state,data){
      console.log(state,data)
    }
}
const actions = {
     //异步处理函数
     getCinemaList(storelist){
        const {filters,id}=storelist.state
        console.log(storelist)
        if(filters.offset===0){
            storelist.commit('initCinemaList',{})
        }
        return this.$api.getCinameData({params:{...filters,cityId:id}}).then(data=>{
            console.log(data)
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}