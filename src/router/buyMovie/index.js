const buyMovie={
    path:"/buyMovie/:movieId",
    name:"buyMovie",
    component:()=>import("@/components/MovieOrder")    
}
export default buyMovie