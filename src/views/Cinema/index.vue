<template>
  <div>
    <Header :title="logo" />
    <topBar>
      <router-link
        tag="div"
        to="/movie/city"
        @touchstart.native="handleToCitylist"
        class="citychoose"
      >
        北京
        <i
          :class="[
            'iconfont',
            active ? 'icon-sanjiaodown' : 'icon-shangjiantou',
          ]"
        ></i>
      </router-link>
      <router-link tag="div" to='' class="conetentSearch">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" v-model='msg' />
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
.citychoose{
  flex:1;
  width:80px;
  height:40px;
  line-height: 40px;
}
.contentsearch{
  flex:1
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