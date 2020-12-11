<template>
  <div class="movie_body">
    <movelist :List="movieList"/>
    <!-- 无限加载功能 -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more" class="notice">已经到底啦</div>
    </infinite-loading>
  </div>
</template>
<script>
import movelist from "../common";
export default {
  name: "hotpage",
  data() {
    return {
      loading:false,
      movieList: [],
      movieIds: [],
      beforeId: -1,
      params: {
        token: "",
      },
      pageNo: 0,
      limit: 12,
      total: 0,
    };
  },
  methods: {
    // 无限滚动加载
    infiniteHandler($state) {
      //解构
      const { pageNo, limit, total } = this;
      //拿到储存的城市id值
      const cityId = this.$store.state.city.id;
      let indexfrist = pageNo;
      //当大于总数时，终止执行下面代码
      if (pageNo > total) return;
      //根据pageNo不断变化，不断截取新获取到的数据
      const movieIds = this.movieIds.slice(pageNo+10, pageNo + limit+10).join();
      //定义请求后台数据接口参数
      const params = { params: { cityId, ...this.params, movieIds } };
      //判断用户进去页面时是初始进入还是往下下拉状态，调用不用的数据api接口拿到数据
      const result = indexfrist
        ? this.$api.getMoreMovieList(params)
        : this.$api.getMovieOnInfoList(params);
      result
        .then((res) => {
          // console.log(res);
          //  解构
          let { movieList, movieIds, coming, total } = res;
          if (movieIds) {
            // 根据movieIds判断当首次加载时，获取到对应的数据并赋值
            this.movieIds = movieIds;
            this.total = total;
            this.beforeId=cityId;
            return movieList;
          }
          //如果movieIds为空，这是下拉加载更多，返回对用的数据
          return coming;
        })
        .then((data) => {
          console.log(data)
          //判断返回数据是否有length,
          if (data.length) {
            //通过每次的数据长度来改变pageNo的值来
            this.pageNo += data.length;
            //新拿到的数据添加到电影列表中
            this.movieList.push(...data);
            //页面渲染执行
            $state.loaded();
          } else {
            //页面渲染完成
            $state.complete();
          }
        });
    },
    // async getData() {
    //   const cityId = this.$store.state.city.id;
    //   const movieIds = this.movieIds.join();
    //   const params = { params: { cityId, ...this.params, movieIds } };
    //   if (this.beforeId === cityId) return;
    //   const result = await this.$api.getMovieOnInfoList(params);
    //   if (result.movieList) {
    //     let { movieList, movieIds, total } = result;
    //     console.log(cityId)
    //     this.movieList = movieList;
    //     this.beforeId = cityId;
    //     this.total = total;
    //     this.movieIds = movieIds;
    //     this.total = total;
    //     if(result.movieList.length){
    //        this.pageNo += result.movieList.length;
    //     }
    //   }
    //   console.log(this.beforeId)
    // },
  },
  components: {
    movelist,
  },
};
</script>
<style lang="scss">
.movie_body {
  position: absolute;
  top: 95px;
  left: 0;
  right: 0;
  bottom: 45px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .notice {
    height: 40px;
    line-height: 40px;
    color: #888;
    font-size: 13px;
  }
}
</style>