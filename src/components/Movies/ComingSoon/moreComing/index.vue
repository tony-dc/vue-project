<template>
  <div class="MostComing-movie">
    <div class="cominglist" v-for="(item,index) in ComingData" :key="index">
      <h4 class="comingTitle">{{item.comingTitle}}</h4>
      <Movielist :List="item.data"></Movielist>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div class="No_info" slot="no-more">我也是有底线的</div>
    </infinite-loading>
  </div>
</template>
<script>
import Movielist from "../../common";
export default {
  name: "moreComing",
  data() {
    return {
      ComingData: [],
      Cominglist: [],
      Comingparams: {
        ci: this.$store.state.city.id,
        token: "",
        limit: 10,
        offset: 0,
        total: 0,
        movieIds: []
      }
    };
  },
  created() {},
  methods: {
    infiniteHandler($state) {
      let { total, limit, offset, movieIds, ...param } = this.Comingparams;
      if (offset > total) return;
      movieIds = movieIds.slice(offset, offset + limit).join();
      let params = { params: { limit, movieIds, ...param } };
      let result = offset
        ? this.$api.getMoreComingList(params)
        : this.$api.getComingSoonList(params);
      result
        .then(res => {
          const { coming, movieIds } = res;
          if (movieIds) {
            this.Comingparams.movieIds = movieIds;
            this.Comingparams.total = movieIds.length;
          }
          return coming;
        })
        .then(data => {
          if (data.length) {
            this.Comingparams.offset += data.length;
            this.Cominglist.push(...data);
            this.ComingData = this.dataChange(this.Cominglist);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    //处理即将上映的电影数据格式
    dataChange(result) {
      if (!result) return;
      let list = [];
      result.map(item => {
        const data = [];
        if (item.comingTitle) {
          data.push(item);
          list.push({
            comingTitle: item.comingTitle,
            data
          });
        }
      });
      return list;
    }
  },
  components: {
    Movielist
  }
};
</script>
<style lang="scss" scoped>
.MostComing-movie {
  overflow: auto;
  margin-top: 10px;
  .comingTitle{
      width:100%;
      height: 33px;
      line-height: 33px;
      color:#666;
      font-size:15px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin-top:10px;
  }
  .No_info{
    height:33px;
    line-height:33px;
    font-size:13px;
    color:#777;

  }
}
</style>