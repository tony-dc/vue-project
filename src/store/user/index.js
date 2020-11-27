const state = {
    searchHistory: window.localStorage.getItem('searchHistory') || {
        movies: { data: [], type: 'movies' },
        cinemas: { data: [], type: 'cinemas' }
    }
}
const mutations = {
    updateSearchHistory(state, history) {
        console.log(history)
        const list=[]
        list[history.type]=history
        state.searchHistory={
            ...list
        }
        console.log( state.searchHistory)
        //本地存储
        window.localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory))
    }
}
const actions = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}