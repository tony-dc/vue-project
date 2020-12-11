<template>
  <div>  
   <loading v-if="isloading" />
  <div v-else class="cinema-movie-container">
    <!-- topBar组件 -->
    <Header :title="movie_detail.nm" v-show="movie_detail.nm">
      <i class="iconfont icon-zuojiantou back" @touchstart="handleToBack"></i>
    </Header>
    <!-- 影片详细信息组件 -->
    <div class="movieDetail">
      <movieDetail :detail="movie_detail" v-if="movie_detail.nm">
        <div slot="score">
          <span v-if="movie_detail.globalReleased" class="num">{{movie_detail.sc}}</span>
        </div>
      </movieDetail>
    </div>
    <!--selectpancel组件 -->
      <selectNavBar :results="results" />
    <div class="cinemaList">
      <cinemaItem v-for="item in cinemas" :key="item.id" :cinemaList="item"></cinemaItem>
    </div>
     
  </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import movieDetail from "@/components/Movies/MovieItemDetail/moviedetail";
import selectNavBar from "../selectNavBar";
import { getDay } from "@/utils/date.js";
import cinemaItem from "../cinema_Item";
import { mapState,mapMutations,mapActions } from "vuex";
export default {
  name: "cinema_movie",
  data() {
    return {
      isloading:false,
      loading:false,
      movie_detail: {},
      results: {},
      movieid: 0,
      dates: [],
      offsetHeight: 0
    };
  },
  computed: {
    ...mapState("city", ["id","cinemas"])
  },
  created() {
    const movieId = +this.$route.params.id;
     this.isloading=true
    console.log(movieId)
    this.movieid=movieId
    this.$api.getDetailMovie({ params: { movieId } }).then(res => {
      this.movie_detail = res.detailMovie;
      this.isloading=false
    });
    const day = getDay();
    this.$api
      .getFilterCinemas({
        params: {
          movieId,
          day
        }
      })
      .then(res => {
        this.results = res;
      });
  },
  components: {
    Header,
    movieDetail,
    selectNavBar,
    cinemaItem
  },
  methods: {
      ...mapMutations('city',['changeFilter','emptyCinemaList','resetFilter']),
      ...mapActions('city',['postMovie']),
    handleToBack() {
      this.$router.back();
    },
    // infiniteHandler(){
    //   this.postMovie({movieId:this.movieid,updateShowDay:true, cityId: this.id }).then(res=>{
    //     console.log(res)
    //       const {paging}=res
    //       this.loading=true
    //       if(!this.dates.length){
    //         this.dates=paging.showDays.dates
    //       }
    //       console.log(this.dates)
    //   })
    // }
  }
};
</script>
<style lang="scss">
.cinema-movie-container {
    display: flex;
    flex-direction: column;
  .movieDetail{
     overflow: hidden;
     width:100%;
     height:0;
     padding-bottom:50%;
    }
  .back {
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }
  .cinemaList{
    flex:1;
    position: absolute;
    top:278px;
    left:0;
    bottom:0;
    width:100%;
    overflow: scroll;
    &::-webkit-scrollbar{
      border:none
    }
  }
}
</style>