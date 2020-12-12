<template>
  <div class="Order_container">
    <Header title="确认订单" class="Header">
      <i class="iconfont icon-zuojiantou back" @touchstart="handleToBack"></i>
    </Header>
    <div class="moviedetail">
      <div class="movieInfo">
         <div class="posterImg">
          <img :src="movieItem.img|movieData" alt="" v-if="movieItem.img">
         </div>
         <div class="movieItem">
          <p class="movienm">{{movieItem.nm}}</p>
          <p class="showtime">{{movieItem}}</p>
          <p class="cinema">{{movieItem}}</p>
          <p class="place">{{movieItem}}</p>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "movieOrder",
  data(){
      return {
         movieDetail:{}
      } 
  },
  computed:{
       movieItem(){
           return this.movieDetail||{}
       }
  },
  filters:{
      movieData(val){
         return val.replace(/w\.h/,"128.168")
      }
  },
  created() {
    const movieId = this.$route.params.movieId;
    this.$api.getMovieDetail({ params: { movieId } }).then((res) => {
     this.movieDetail=res.detailMovie
     console.log( this.movieDetail)
    });
  },
  methods: {
    handleToBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss">
.Order_container {
    background-color: #eee;
    width: 100%;
   height:100vh;
  .Header {
    background-color: #fff !important; 
    h2{
      color:#666!important;  
    }
    .back {
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      left: 15px;
      font-size: 24px;
      color: rgba(0,0,0,.6);
      font-weight: bold;
    }
  }
  .movieInfo{
      padding:10px 15px;
      display: flex;
      margin-top:2px;
      height:200px;
      background-color: #fff;
      .posterImg{
          width:128px;
          border-radius:10px;
          img{
            border-radius:10px;
              width:100%;
              height:100%;
          }
      }
      .movieItem{
          flex:1 0 auto;
          height:100%;
          margin-left:5px;
          background-color: #eee;
      }

  }
}
</style>