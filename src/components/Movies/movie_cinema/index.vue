<template>
  <div class="movie-cinema-container">
    <Header :title="cinemaData.nm">
      <i class="iconfont icon-zuojiantou back" @touchstart="handleToBack"></i>
    </Header>
  </div>
</template>
<script>
import Header from "@/components/Header";
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
     }
  },
  created() {
      const cinemaId=this.$route.params.id
      console.log(cinemaId)
      this.$api.getcinemaDetail({params:{cinemaId}}).then(res=>{
         this.detail=res
      })
  },
  methods:{
      handleToBack(){
          this.$router.back()
      }
  },
  components: {
    Header,
  },
};
</script>
<style lang="scss">
</style>