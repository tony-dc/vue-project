<template>
  <div class="movieDetails">
    <Header title="影片详情">
      <i class="iconfont icon-zuojiantou back" @touchstart="handleToBack"></i>
    </Header>
    <!-- 父子组件之前传值，如果传的值是需要异步请求得到的数据，需要在父组件通过v-if判断是否有值，在传递 -->
    <movieDetail :detail="detail" v-if="isRead">
      <div slot="score">
        <span v-if="detail.globalReleased" class="num">{{detail.sc}}</span>
      </div>
    </movieDetail>
    <moreoffers :detail="detail"></moreoffers>
    <div class="Medio_swrapper">
      <h2>媒体库</h2>
      <BScroll :scrolltype="scrollX"  :Passthrough="Passthrough" :data='detail.photos'>
        <ul class="medio_list" ref="medio_list">
          <li class="mediophoto medio_video" @click="handlePlay">
            <img v-lazy="detail.videoImg" alt />
            <i class="iconfont icon-play"></i>
          </li>
          <li class="mediophoto" v-for="(item,index) in data.photos" :key="index">
            <img v-lazy="item" class="img" alt />
          </li>
        </ul>
      </BScroll>
    </div>
    <div class="Vd_play" v-if="play">
        <div class="masker" @touchstart="handlePlay" v-if="play"></div>
        <div class="play" v-if="play">
           <video :src="detail.vd" autoplay cntrols></video>
        </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import movieDetail from "./moviedetail";
import moreoffers from "./More offers";
import Footer from './detailFooter'
export default {
  name: "detail",
  data() {
    return {
      detail: {},
      isRead: false,
      scrollX: true,
      Passthrough: "vertical",
      play:false
    };
  },
  computed: {
    data() {
      let medioData = this.detail.photos || [];
      let vedio = this.detail.videoImg;
      medioData.photos = medioData.map(item => item.replace(/w\.h/, "128.168"));
      medioData.vedio = vedio;
      return medioData;
    }
  },
  methods: {
    handleToBack() {
      this.$router.back(-1);
    },
    handlePlay(){
        this.play=!this.play
    }
  },
  created() {
    //获取用户点进来的影片id
    const movieId = this.$route.params.movieid;
    this.$api.getMovieDetail({ params: { movieId } }).then(res => {
      this.detail = res.detailMovie;
      this.isRead = true;
      this.$refs.medio_list.style.width=this.detail.photos.length*95+37+'px'
    });
  },
  components: {
    movieDetail,
    moreoffers,
    Footer
  }
};
</script>
<style lang="scss">
* {
  touch-action: none;
}
.movieDetails {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling:touch;
  // overflow-y: auto;
   &::-webkit-scrollbar {
        display: none;
      }
  overflow-y: auto;
  background-color: #fff;
  .back {
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }
  .Medio_swrapper {
    margin: 10px 0;
    padding-bottom: 10px;
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
    h2 {
      margin: 0;
      padding: 10px 15px;
      color: #666;
      font-size: 16px;
    }
    .medio_list {
      padding-left: 15px;
      margin: 0;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      &::-webkit-scrollbar {
        display: none;
      }
      .mediophoto {
        position: relative;
        list-style: none;
        display: inline-block;
        overflow: hidden;
        width: 90px;
        height: 70px;
        margin-left: 5px;
        &.medio_video {
          width: 127px;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .icon-play {
          position: absolute;
          // top:50%;
          // left:50%;
          // transform: translate(-50%,-50%);
          padding: 5px;
          bottom: 0;
          right: 0;
          z-index: 999;
          font-size: 28px;
          color: #dccece;
        }
      }
    }
  }
  .Vd_play{
      position: fixed;
      left:0;
      bottom:0;
      right:0;
      top:0;
      z-index:9999;
      .masker{
          height:100%;
          width:100%;
          background-color: rgba(0,0,0,.8);
      }
      .play{
          position: absolute;
          top:30%;
          left:0;
          width:100%;
          padding-top:56.25%;
          height:0;
          z-index:9999;
          video{
              position:absolute;
              top:0;
              left:0;
              width:100%;
              height:100%;
          }
      }
      
  }
}
</style>