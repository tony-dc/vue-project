<template>
  <div class="movie_body">
    <movelist :List="movieList" />
    <!-- 无限加载功能 -->
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>
<script>
import movelist from "../common";
export default {
  name: "hotpage",
  data() {
    return {
      movieList: [],
      movieIds:[],
      params:{
          token:''
      },
      pageNo:0,
      limit:12,
      total:0
    };
  },
  created() {
      this.infiniteHandler()
    // const cityId = this.$store.state.city.id;
    // this.$api.getMovieOnInfoList(cityId).then((res) => {
    //   if (res) {
    //     this.movieList = res.movieList;
    //   }
    // });
  },
  methods:{
    infiniteHandler(){
        const {pageNo,limit,total}=this
        const cityId = this.$store.state.city.id;
        //当大于总数时，终止执行下面代码
        if(pageNo&&pageNo>total) return 
         const movieIds=this.movieIds.slice(pageNo,pageNo+limit).join()
          const params ={params:{cityId,...this.params, movieIds }}  
          console.log(params)
           this.$api.getMovieOnInfoList(params).then(res=>{
               console.log(res)
           })
    }
  },
  components: {
    movelist,
  },
};
</script>
<style>
.movie_body {
  position: absolute;
  top: 95px;
  left: 0;
  right: 0;
  bottom: 45px;
  overflow: scroll;
}
</style>