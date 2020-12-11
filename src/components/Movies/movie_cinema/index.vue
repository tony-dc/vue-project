<template>
  <div>
   <Loading v-if="loading" />
  <div class="movie-cinema-container" v-else>
    <Header :title="cinemaData.nm" v-show="cinemaData.nm">
      <i class="iconfont icon-zuojiantou back" @touchstart="handleToBack"></i>
    </Header>
     <Info :cinemaInfo='cinemaData' />
     <Swrapper :list="movieList" :vip="vipInfo" v-if="movieList.length" />
  </div>
  </div>
</template>
<script>
import Info from './cinemaInfo';
import Swrapper from './swrapper'
export default {
  name: "movie_cinema",
  data(){
     return {
         detail:{},
         isloading:false,
         loading:false
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
      this.loading=true
      console.log(cinemaId)
      this.$api.getcinemaDetail({params:{cinemaId}}).then(res=>{
        console.log(res)
         this.detail=res
         this.loading=false
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
  height:667px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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