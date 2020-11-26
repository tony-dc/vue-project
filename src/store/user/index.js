const state={
    searchHistory:window.localStorage.getItem('searchHistory')||{
        movies:{data:[],type:'movies'},cinemas:{data:[],type:'cinemas'}
    }
}
const mutations={
    updateSearchHistory(state,history){
       console.log(history)
    //    state.searchHistory=history
    }
}
const actions={}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}