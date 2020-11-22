<template>
  <div class="MostComing-movie">
    <div class="movies_items" v-for="(item,index) in ComingData" :key="index">
      <p class="playing-data">{{item.comingTitle}}</p>
      <div>
        <common :List="item.data" />
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <!-- <div slot="no-more" class="notice">我也是有底线的</div> -->
    </infinite-loading>
  </div>
</template>
<script>
import common from "../../common";
export default {
  name: "moreComing",
  data() {
    return {
      ComingData: [],
      Comingparams: {
        ci: this.$store.state.city.id,
        token: "",
        limit: 10,
        offset: 0,
        total: 0,
        movieIds: [],
      },
    };
  },
  components: {
    common
  },
  methods: {
    infiniteHandler($state) {
      let { total, offset, movieIds, limit, ...paramslist } = this.Comingparams;
      movieIds = movieIds.slice(offset, offset + limit).join();
      const params = { params: { movieIds, limit, ...paramslist } };
      if (offset > total) return;
      const result = offset
        ? this.$api.getMoreComingList(params)
        : this.$api.getComingSoonList(params);
      result
        .then(res => {
          const { coming, movieIds } = res;
          if (movieIds) {
            //将二维数组扁平化变成一维数组
            this.Comingparams.movieIds = movieIds.flat();
            this.Comingparams.total = movieIds.length;
          }
          return coming;
        })
        .then(data => {
          if (data.length) {
            this.Comingparams.offset += data.length;
            this.ComingData.push(...data);
            this.ComingData = this.handleData(this.ComingData);
            console.log(this.ComingData);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    handleData(list) {
      let cominglist = [];
      list.forEach(item => {
        if (item.comingTitle) {
          cominglist.push({ comingTitle: item.comingTitle, data: [item] });
        }
      });
      return cominglist;
    }
  }
};
</script>
<style lang="scss">
  .MostComing-movie{
    height:100%;
    .movies_items{
      width:100%;
      .playing-data{
        width:100%;
        box-sizing: border-box;
        padding:5px 4px;
        height:25px;
        line-height: 25px;
        color:#666;
      }
    }
    .notice{
      height:26px;
      line-height: 26px;
    }
  }
</style>