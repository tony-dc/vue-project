<template>
  <div class="content">
    <Header title="酷喵电影" />
    <div class="search-header">
      <div class="search_wrapper">
        <i class="iconfont icon-sousuo suosou"></i>
        <input
          type="text"
          v-model="SearchMsg"
          @input="handleSearchInfo"
          class="S_input"
          placeholder="搜索影院"
        />
        <span v-if="SearchMsg" @touchstart="Text_empty" class="iconfont icon-sousuo"></span>
      </div>
      <div @touchstart='handleCancelTouch' class="cancel">
       取消
      </div>
    </div>
    <infinite-loading v-if='Searching'>
        <div class="loading" slot='load'>
             Loading...
        </div>
    </infinite-loading>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "SearchPage",
  data() {
    return {
      SearchMsg: "",
      searchtype:{
          movie:{
              type:-1,
              name:"搜电影",
              title:'movies'
          },
          cinema:{
              type:2,
              name:"搜影院",
              title:'cinemas'
          }
      },
      Movies_List:{},
      Cinema_List:{},
      max:3,
      Searching:false
    };
  },
  watch:{
     SearchMsg(newVal){
         if(!newVal){
             this.Movies_List={}
             this.Cinema_List={}
         }
     } 
  },
  computed:{
      //拿到vuex中存储的数据
      ...mapState(['city','searchHistory']),
      cityId(){
          return this.city.id
      },
      panel(){
          const {searchtype,$route:{params}}=this
            return  (searchtype,{$route:{params}})
      
      }
  },
  mounted(){
   console.log(this.panel)
  },
  methods: {
    handleSearchInfo() {},
    Text_empty() {}
  }
};
</script>
<style lang="scss">
.content{
    min-height:100vh;
    background-color: #f5f5f5;
    .search-header{
        position: relative;
        display: flex;
        align-items: center;
        padding:8px 0 8px 10px;
        border-bottom:1px solid #e5e5e5;
       .search_wrapper{
           position: relative;
           flex:1;
           padding:0 30px;
           border:1px solid #e6e6e6;
           border-radius:5px;
           background-color: #fff;
         .S_input{
             padding:5px 0;
             width:100%;
             font-size:13px;
             color:#333;
             line-height:20px;
             border:none;
             &:focus{
                 outline:none
             }
         }
         .suosou{
             position: absolute;
             top:0;
             left:0;
             color:#b3b0b0;
             padding:0 6px;
             line-height:32px;
         }
       }
       .cancel{
           padding:0 10px;
           height:30px;
           line-height: 30px;
           font-size:14px;
           color:#f03d37;
       }
    }
    .loading{
       padding:10px 0;
    }
    
}
</style>