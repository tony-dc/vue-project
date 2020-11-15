import Vue from 'vue'
import VueRouter from 'vue-router'
import movie from './movie'
import cinema from './cinema'
import mine from './mine'

Vue.use(VueRouter)

const routes = [
  movie,
  cinema,
  mine
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
