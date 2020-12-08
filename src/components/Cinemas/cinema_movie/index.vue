<template>
  <div class="cinema-movie-container">
    <!-- topBar组件 -->
    <Header :title="movie_detail.nm">
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
    <div class="choose">
      <Date :dates="dates" />
      <selectNavBar :results="results" />
    </div>
    <div class="cinemaList">
      <cinemaItem v-for="item in cinemas" :key="item.id" :cinemaList="item"></cinemaItem>
    </div>
     <infinite-loading @infinite="infiniteHandler"></infinite-loading>
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
    this.movieid=movieId
    this.$api.getDetailMovie({ params: { movieId } }).then(res => {
      this.movie_detail = res.detailMovie;
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
    infiniteHandler(){
      this.loading&&this.postMovie({movieId:this.movieid,updateShowDay: !this.dates.length, cityId: this.id }).then(res=>{
          console.log(res)
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.cinema-movie-container {
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
}
</style>