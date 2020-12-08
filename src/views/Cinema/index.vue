<template>
  <div class="cinema_menu">
    <!-- 头部公共组件 -->
    <Header :title="logo" />
    <!-- 插入搜索组件 -->
    <topBar>
      <router-link
        tag="div"
        :to="{name:'cinemaSearch',params:{searchtype:'cinema',type:2}}"
        class="headerSearch"
        slot="search"
      >
        <i class="iconfont icon-sousuo search"></i>
        <span class="searchTitle">搜索影院</span>
      </router-link>
    </topBar>
    <!-- 导航主体内容 --> 
       <selectNav class="select-wrapper" :results="results" />
     <div class="cinemalist">
         <cinemaItem 
         v-for='item in cinemas'
         :key="item.id"
         :cinemaList='item'
         > 
         </cinemaItem>
     </div>
    <TabBar />
  </div>
</template>

<script>
import topBar from "@/components/topbar";
import selectNav from '@/components/Cinemas/selectNavBar'
import cinemaItem from "@/components/Cinemas/cinema_Item"
import {mapState} from 'vuex'
export default {
  name: "cinema",
  data() {
    return {
      logo: "酷喵影院",
      results:{},
      cinemadata:[]
    };
  },
  computed:{
      ...mapState('city',['id','cinemas'])
  },
  created(){
    //根据城市id获取影院数据
    this.$api.getFilterCinemas({params:{ci:this.id}}).then(res=>{
      this.results=res
    })
    this.$api.getCinameData({params:{ci:this.id}}).then(res=>{
        //初次进去页面从状态管理中存取数据
        this.$store.commit('city/initCinemaList',res)
    })
  },
  components: {
    topBar,
    selectNav,
    cinemaItem
  }
};
</script>
<style lang="scss" scoped>
.cinema_menu {
  display: flex;
  flex-direction: column;
  .headerSearch {
    flex: 1;
    position: relative;
    margin: 0 15px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    // z-index:999;
    border: 0.5px solid rgba(222, 222, 222, 0.4);
    border-radius: 4px;
    background-color: #fff;
    color: #888;
    // .searchTitle{
    //   margin-left:6px;
    // }
    .search {
      position: absolute;
      top: 0;
      left: 90px;
    }
  }
  .cinemalist{
    flex:1;
    position: absolute;
    top:131px;
    left:0;
    right:0;
    bottom:45px;
    overflow: scroll;
    &::-webkit-scrollbar {
    display: none;
  }
  }
}
// #content .cinema_menu {
//   width: 100%;
//   height: 45px;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   border-bottom: 1px solid #e6e6e6;
//   background-color: #fff;
// }
</style>