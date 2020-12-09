import Vue from 'vue'
import VueRouter from 'vue-router'
import movie from './movie'
import cinema from './cinema'
import mine from './mine'
import cinemaSearch from './search'
import cinema_movie from './cinema_movie'
import movie_cinema from './movie_cinema'
Vue.use(VueRouter)

const routes = [
    movie,
    cinema,
    mine,
    cinemaSearch,
    cinema_movie,
    movie_cinema,
    //当url地址不对已经后面没有拼接地址时，直接访问/movie
    {
        path: '/*',
        redirect: '/movie'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router