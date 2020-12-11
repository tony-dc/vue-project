import filters from '@/utils/filter.js'
import api from '@/api'
import storage from 'store'
import qs from 'qs'

const state = {
    // nm: window.localStorage.getItem('nm') || '上海',
    // id: window.localStorage.getItem('id') || 10,
    nm: storage.get('nm') || '上海',
    id: storage.get('id') || 10,
    filters,
    cinemaList: [],
    cinemas: storage.get('cinemas')||[],
    currentItemlist: []
}
const mutations = {
    CITYINFO(state, payload) {
        state.nm = payload.nm
        state.id = payload.id
    },
    //异步请求函数执行
    initCinemaList(state, data) {
        console.log(data)
        const { filters } = state
        if (filters.offset === 0) {
            state.cinemaList = data
            state.cinemas = data.cinemas
        } else {
            state.cinemas = [...state.cinemas, ...data.cinemas]
        }
        storage.set('cinemas',state.cinemas)
    },
    changeFilter(state, payload) {

        state.filters = {
            ...state.filters,
            ...payload
        }
        console.log(state.filters)
    },
    updateAdd(state, payload) {

        state.currentItemlist = payload
    }
}
const actions = {
    //异步处理函数
    getCinemaList(storelist) {
        const { filters, id } = storelist.state
        if (filters.offset === 0) {
            storelist.commit('initCinemaList', {})
        }
        return api.getCinameData({ params: {...filters, cityId: id } }).then(data => {
            storelist.commit('initCinemaList', data)
            return data
        })
    },
    postMovie(ctx, payload) {
        const { filters } = ctx.state
        if (filters.offset === 0) {
            ctx.commit('initCinemaList', {})
        }
        return api.getpostMovie({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                ...filters,
                ...payload
            })
        }).then(res => {
            console.log(res)
            ctx.commit('initCinemaList', res)
            return res
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}