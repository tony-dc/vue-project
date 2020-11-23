<template>
  <div class="main">
    <Header />
    <Topbar>
      <div class="Hot_movie">
        <router-link tag="div" to="/movie/nowplaying" class="hot_item"
          >正在热映</router-link
        >
        <router-link tag="div" to="/movie/comingsoon" class="hot_item"
          >即将上映</router-link
        >
      </div>
      <div class="Movie_search">
        <router-link tag="div" to="/movie/search">
          <i class="iconfont icon-sousuo search"></i>
        </router-link>
      </div>
    </Topbar>
    <!-- 视图出口 -->
      <router-view />
    <TabBar />
    <router-view name="detail" />
  </div>
</template>

<script>
import Topbar from "@/components/topbar";
export default {
  name: "movie",
  data() {
    return {};
  },
  components: {
    Topbar,
  },
};
</script>
<style lang="scss" scoped>
.Hot_movie {
  flex: 3;
  display: flex;
  justify-content: space-evenly;
  div {
    flex: 1;
    height: 40px;
    box-sizing: border-box;
    background-color: #fff;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    color: #777;
  }
}
.Movie_search {
  flex: 1;
  width: 100%;
  text-align: center;
  .search {
    font-size: 24px;
    color: #ef4238;
  }
}
</style>