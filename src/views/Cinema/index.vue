<template>
  <div>
    <Header :title="logo" />
    <topBar>
      <router-link
       tag="div" 
       :to="{name:'cinemaSearch',params:{searchtype:'cinema',type:2}}"
       class="headerSearch"
       slot='search'
       >
         <i class="iconfont icon-sousuo search"></i>
        搜索影院
      </router-link>
    </topBar>
    <div id="content">
      <div class="cinema_menu">
        <div class="city_switch">
          全城
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="brand_swtich">
          品牌
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="feature_switch">
          特色
          <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>
      <CityCinema />
    </div>
    <TabBar />
  </div>
</template>

<script>
import topBar from "@/components/topbar";
import CityCinema from "@/components/Cinemas/CityCinema.vue";
export default {
  name: "cinema",
  data() {
    return {
      logo: "酷喵影院",
    };
  },
  components: {
    CityCinema,
    topBar,
  },
};
</script>
<style lang="scss" scoped>
.headerSearch{
  flex:1;
  position: relative;
  margin:0 15px;
  height:28px;
  line-height: 28px;
  text-align:center;
  font-size:13px;
  font-weight:400;
  border:0.5px solid rgba(222,222,222,.4);
  border-radius:4px;
  background-color: #fff;
  color:#888;
  .search{
    position: absolute;
    top:1px;
    left:98px
  }
}
#content .cinema_menu {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
}
</style>