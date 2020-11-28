//引入store.js模块，自动完成本地储存的序列化操作，简化代码
import storage from 'store'
const state = {
    searchHistory: storage.get('searchHistory') || {
        movies: { data: [], type: 'movies' },
        cinemas: { data: [], type: 'cinemas' }
    }
}
const mutations = {
    updateSearchHistory(state, history) {
        console.log(history)
        const list = []
        list[history.type] = history
        state.searchHistory = {
                ...list
            }
            //本地存储
        storage.set('searchHistory', state.searchHistory)

    }
}
const actions = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}