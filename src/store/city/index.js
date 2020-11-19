const state = {
    nm: window.localStorage.getItem('nm') || '上海',
    id: window.localStorage.getItem('id') || 10
}
const mutations = {
    CITYINFO(state, payload) {
        state.nm = payload.nm
        state.id = payload.id
    }
}
const actions = {}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}