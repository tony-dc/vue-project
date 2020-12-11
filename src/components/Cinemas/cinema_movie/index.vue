<template>
  <div>
    <!-- <loading v-if="isloading" /> -->
    <div class="cinema-movie-container">
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
      <Loading v-if="loading" />
      <div class="cinemaList" v-else>
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
import { mapState} from "vuex";
export default {
  name: "cinema_movie",
  data() {
    return {
      isloading: false,
      loading: false,
      movie_detail: {},
      results: {},
      movieid: 0,
      dates: [],
      offsetHeight: 0,
      cityId:-1
    };
  },
  computed: {
    ...mapState("city", ["id", "cinemas"])
  },
  created() {
     this.loading = true;
    const movieId = +this.$route.params.id; 
    this.movieid = movieId;
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
     if(this.cityId!==this.id){
        this.$api.getCinameData({params:{ci:this.id}}).then(res=>{
        //初次进去页面从状态管理中存取数据
        this.$store.commit('city/initCinemaList',res)
           this.loading=false
           this.cityId=this.id
    })
     }
  },
  components: {
    Header,
    movieDetail,
    selectNavBar,
    cinemaItem
  },
  methods: {
    handleToBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss">
.cinema-movie-container {
  display: flex;
  flex-direction: column;
  .movieDetail {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 50%;
  }
  .back {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 20px;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }
  .cinemaList {
    flex: 1;
    position: absolute;
    top: 278px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      border: none;
    }
  }
}
</style>