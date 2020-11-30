<template>
  <div class="MostComing-movie">
     <Movielist :List='ComingData'>
        
     </Movielist>
    <!-- <div class="movies_items" v-for="(item,index)in ComingData" :key="index">
      <p class="playing-data"></p>
      <div>
        <common :List="item.data" />
      </div>
    </div> -->
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more">我也是有底线的</div>
    </infinite-loading>
  </div>
</template>
<script>
import Movielist from '../../common'
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
     
  },
  methods: {
   infiniteHandler($state) {
      let { total, limit, offset, movieIds, ...param } = this.Comingparams;
      if (offset > total) return;
        movieIds=movieIds.slice(offset,offset+limit).join()
       let params={params:{limit,movieIds,...param}}
       let result=offset?this.$api.getMoreComingList(params):this.$api.getComingSoonList(params)
       result.then(res=>{
          console.log(res)
         const {coming,movieIds}=res
         if(movieIds){
             this.Comingparams.movieIds=movieIds
             this.Comingparams.total=movieIds.length
         }
         return coming
       }).then(data=>{
         if(data.length){
           console.log(data)
             this.Comingparams.offset+=data.length
             this.ComingData.push(...data)
             $state.loaded()
         }
         else{
            $state.complete()
         }
       })
    },
  },
  components:{
    Movielist
  }
};
</script>