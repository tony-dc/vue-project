<template>
  <div>
    <Header :title="logo" />
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
import CityCinema from '@/components/Cinemas/CityCinema.vue'
export default {
  name: "cinema",
  data() {
    return {
      logo: "酷喵影院"
    };
  },
  components:{
    CityCinema
  }
};
</script>
<style lang="scss" scoped>
 #content .cinema_menu{
        width:100%;
        height:45px;
        display:flex;
        justify-content: space-around;
        align-items: center;
        border-bottom:1px solid #e6e6e6;
        background-color: #fff;
    }
</style>