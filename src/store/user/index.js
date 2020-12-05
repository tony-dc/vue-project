import filters from '@/utils/filter.js'
//引入store.js模块，自动完成本地储存的序列化操作，简化代码
import storage from 'store'
const state = {
    searchHistory: storage.get('searchHistory') || {
        movies: { data: [], type: 'movies' },
        cinemas: { data: [], type: 'cinemas' }
    },
    filters
}
const mutations = {
    updateSearchHistory(state, history) {
        console.log(history)
        const list = []
        list[history.type] = history
            //对面中在相同键名情况下，后面的会覆盖前面的
        state.searchHistory = {
            ...state.searchHistory,
            ...list
        }
            //本地存储
        storage.set('searchHistory', state.searchHistory)
    },
    changeFilter(state,payload){
       
        state.filters={
            ... state.filters,
            ...payload
        }
        console.log(state.filters)
    }
}
const actions = {
   
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}