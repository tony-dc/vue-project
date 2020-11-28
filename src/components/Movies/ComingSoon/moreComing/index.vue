<template>
  <div class="MostComing-movie">
    <div class="movies_items" v-for="(item,index)in ComingData" :key="index">
      <p class="playing-data"></p>
      <div>
        <common :List="item.data" />
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more">我也是有底线的</div>
    </infinite-loading>
  </div>
</template>
<script>
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
  created(){
      const {total,movieIds,...params}=this.Comingparams
      const params={params}
      this.$api.getComingSoonList(params).then(res=>{
          console.log(res)
      })
      
  },
  methods: {
    infiniteHandler() {
      // const { total, limit, offset, movieIds, ...params } = this.Comingparams;
      // if (offset > total) return;
      //   const result=this.$api.
    },
  },
};
</script>