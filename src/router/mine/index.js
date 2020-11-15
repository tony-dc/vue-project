const  mine={
    path:'/mine',
    name:'mine',
    component:()=>import('@/views/Mine'),
    children:[
        {
            path:'login',
            name:'login',
            component:()=>import('@/components/Mines/Login')
        },
        {
            path:'',
            redirect:'/mine/login'
        }
    ]
}
export default mine