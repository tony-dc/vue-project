<template>
  <div class="swrapper">
    <div class="swrapper-nav">
      <div class="post-bg" :style="{background:backgroungImg}"></div>
      <swiper ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="(item,index) in list" :key="index">
          <div class="poster" :class="{active:currentIndex===item.id}">
            <img :src="item.img.replace(/w\.h/,'92.92')" alt />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="movieInfo">
      <div class="movieTitle">
        <span class="title">{{info.nm}}</span>
        <span class="grade">{{tips.num}}{{tips.name}}</span>
      </div>
      <p class="movie-desc">{{info.desc}}</p>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
// import 'swiper/swiper-bundle.css'
export default {
  name: "swrapper",
  data() {
    return {
      currentIndex: 0,
      swiperOption: {
        delay: 2500,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        slideToClickedSlide: true,
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 5
      }
    };
  },
  props: {
    list: Array,
    vip: Object
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper;
    },
    backgroungImg() {
      const imgList = this.list[this.currentIndex] || {};
      const img = imgList.img ? imgList.img.replace('w.h', "140.208") : "";
      return img;
    },
    info() {
      return this.list[this.currentIndex] || {};
    },
     tips () {
      const info = this.info
      if (info.sc === '0.0') {
        return {
          num: info.wish,
          name: '人想看'
        }
      }
      return {
        num: info.sc,
        name: '分'
      }
    }
  },
  // mounted(){
  //     console.log(this.list,this.vip)
  // },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss">
@import '~swiper/swiper-bundle.css';
// @import '~swiper/css/swiper.css';
.swrapper-nav{
    padding:30px 15px 30px 5px;
    // transform: translateZ(0);
    overflow: hidden;
    .post-bg{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index:-1;
        -webkit-filter: blur(30px);
        filter:blur(30px);
         background-position-y: 40%;
    }
    .poster{
        padding-bottom:4px;
        width:65px;
        transition:transform .3s;
        position: relative;
        img{
            width:100%;
            height:96px;
            transform:scale(1);
            vertical-align: middle;
        }
    }
    .swiper-container {
    overflow: visible;
    display: inline-block;
  }
  .swiper-slide {
    width: 65px;
    height: 94px;
  }
}
</style>