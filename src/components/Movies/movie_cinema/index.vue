<template>
  <div class="movie-cinema-container">
    <Header :title="cinemaData.nm" v-show="cinemaData.nm">
      <i class="iconfont icon-zuojiantou back" @touchstart="handleToBack"></i>
    </Header>
     <Info :cinemaInfo='cinemaData' />
     <Swrapper :list="movieList" :vip="vipInfo" v-if="movieList.length" />
  </div>
</template>
<script>
// import Header from "@/components/Header";
import Info from './cinemaInfo';
import Swrapper from './swrapper'
export default {
  name: "movie_cinema",
  data(){
     return {
         detail:{},
         isloading:false
     }
  },
  computed:{
     cinemaData(){
         return this.detail.cinemaData||{}
     },
     list(){
        const dealList=this.detail.dealList
               return dealList?dealList.dealList:[]
     },
     movieList(){
        const SwrapperData=this.detail.showData
        return SwrapperData?SwrapperData.movies:[]
     },
     vipInfo(){
       const SwrapperData=this.detail.showData
       const vip=SwrapperData?SwrapperData.vipInfo:[]
       return vip?vip[0]:{}
     }
  },
  created() {
      const cinemaId=this.$route.params.id
      console.log(cinemaId)
      this.$api.getcinemaDetail({params:{cinemaId}}).then(res=>{
        console.log(res)
         this.detail=res
      })
  },
  methods:{
      handleToBack(){
          this.$router.back()
      }
  },
  components: {
    // Header,
    Info,
    Swrapper
  },
};
</script>
<style lang="scss">
.movie-cinema-container{
   .back {
    position: absolute;
    top: 12px;
    left: 15px;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }
}
</style>