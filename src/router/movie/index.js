const movie = {
    path: '/movie',
    name: 'movie',
    component: () =>
        import ('@/views/Movie'),
    //配置二级路由菜单
    children: [{
            path: 'nowplaying',
            name: 'nowplaying',
            component: () =>
                import ('@/components/Movies/Nowplaying/index.vue')
        },
        {
            path: 'comingsoon',
            name: 'comingsoon',
            component: () =>
                import ('@/components/Movies/ComingSoon')
        },
        {
            path: 'city',
            name: 'city',
            component: () =>
                import ('@/components/Movies/City')
        },
        {
            path: 'search',
            name: 'search',
            component: () =>
                import ('@/components/Movies/movieSearch')
        },
        {
            path:'detail/:movieid',
            components:{
                // default:()=> import("@/components/Movies/Nowplaying"),
                detail:()=>import("@/components/Movies/MovieItemDetail")

            },
            // props:{
            //     detail:true
            // }
        },
        //首页加载时,重定向到指定页面
        {
            path: '/movie',
            redirect: '/movie/nowplaying'
        }
    ]
}
export default movie