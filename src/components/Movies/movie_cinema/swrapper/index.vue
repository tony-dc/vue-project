<template>
  <div class="swrapper">
    <div class="swrapper-nav">
      <div class="post-bg" :style="{ background: backgroundImg }"></div>
      <Swiper :options="swiperOption" ref="mySwiper">
        <Swiper-slide v-for="(item, index) in list" :key="index">
          <div class="poster" :class="{ active: currentIndex === index }">
            <img :src="item.img.replace(/w\.h/, '92.92')" alt />
          </div>
        </Swiper-slide>
      </Swiper>
    </div>
    <div class="movieInfo">
      <div class="movieTitle">
        <span class="title">{{ info.nm }}</span>
        <span class="grade">{{ tips.num }}{{ tips.name }}</span>
      </div>
      <p class="movie-desc">{{ info.desc }}</p>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
export default {
  name: "swrapper",
  data() {
    return {
      currentIndex: 0,
      swiperOption: {
        delay: 2500,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slideToClickedSlide: true,
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 5,
      },
    };
  },
  props: {
    list: Array,
    vip: Object,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper;
    },
    backgroundImg() {
      const imgList = this.list[this.currentIndex] || {};
      const img = imgList.img ? imgList.img.replace("w.h", "140.208") : "";
      return `url(${img})`;
    },
    info() {
      return this.list[this.currentIndex] || {};
    },
    tips() {
      const info = this.info;
      if (info.sc === "0.0") {
        return {
          num: info.wish,
          name: "人想看",
        };
      }
      return {
        num: info.sc,
        name: "分",
      };
    },
  },
  mounted() {
    console.log(this.backgroundImg);
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
<style lang="scss" scoped>
@import "~swiper/swiper-bundle.css";
.swrapper-nav {
  position: relative;
  padding: 30px 15px 30px 5px;
  // transform: translateZ(0);
  overflow: hidden;
  .post-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    -webkit-filter: blur(30px);
    filter: blur(30px);
  }
  .poster {
    padding-bottom: 4px;
    width: 65px;
    transition: transform 0.3s;
    position: relative;
    &.active {
      position: relative;
      width: 65px;
      height: 94px;
      border: 2px solid #fff;
      transform: scale(1.1);
      &::before{
        position: absolute;
        content:'';
        left:50%;
        bottom:-11px;
        //使其在正中间
        transform: translateX(-50%);
        border:5px solid transparent;
        border-top:5px solid #fff;

      }
  }
    img {
      width: 100%;
      height: 96px;
      transform: scale(1);
      vertical-align: middle;
    }
  }
  .swiper-container {
    overflow: visible;
  }
  .swiper-slide {
    width: 65px;
    height: 94px;
  }
   
}
.movieInfo{
  padding:11px 15px;
  text-align: center;
  background-color: #fff;
  .movieTitle{
     height:24px;
     line-height: 24px;
     font-size:17px;
     color:#222;
     font-weight:700;
     .title{
       line-height: 24px;
     font-size:17px;
     color:#333;
     font-weight:700;
     }
    .grade {
    padding-left: 5px;
    color: #ffb400;
    font-size: 14px;
    }
  }
   .movie-desc{
     margin-top:2px;
     height:18px;
     line-height: 18px;
     color:#777;
     font-size:14px;
   }
}
</style>