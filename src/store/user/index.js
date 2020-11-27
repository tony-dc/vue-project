const state = {
    searchHistory: window.localStorage.getItem('searchHistory') || {
        movies: { data: [], type: 'movies' },
        cinemas: { data: [], type: 'cinemas' }
    }
}
const mutations = {
    updateSearchHistory(state, history) {
        console.log(state.searchHistory)
        const { data, type } = history
        console.log(data, type)
        state.searchHistory[type].data.push(...data)
        console.log(state.searchHistory)
            // state.searchHistory = history
            // window.localStorage.setItem('searchHistory', history)
    }
}
const actions = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}