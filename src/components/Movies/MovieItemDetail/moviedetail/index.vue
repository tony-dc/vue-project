<template>
  <!-- 详情页影片内容 -->
  <div class="detailList">
    <!-- 遮盖层 -->
    <div class="cover" :style="{'background-image':`url(${detail.img.replace(/w\.h/,127.168)})`}"></div>
    <div class="detail_content">
      <!-- 图片及影片短视频 -->
      <div class="logo">
        <img :src="img|setWH('128.168')" alt />
        <!-- <slot name="vedio" /> -->
      </div>
      <!-- 影片主要信息 -->
      <div class="content">
        <h2 class="C_title">{{detail.nm}}</h2>
        <p class="E_title">{{detail.enm}}</p>
        <div class="score_see">
          <slot name="score" />
          <span v-if="detail.globalReleased">({{num}}万人评)</span>
          <span v-else>({{detail.snum}}人想看)</span>
        </div>
        <div class="p_content">
          <p class="ptext">{{detail.cat}}</p>
          <p class="ptext">{{detail.src}}</p>
          <p class="ptext">{{detail.pubDesc}}</p>
        </div>
        <slot name="link" />
        <!-- <router-link v-if="link" :to="'/movie/'+detail.id" class="arrow-right">
        <i class="iconfont icon-iconfontjiantou3 right"></i>
        </router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailList",
  props: {
    detail: Object
  },
  computed:{
     img(){
       return this.detail.img
     },
     num(){
         return parseInt(this.detail.snum / 10000)
     }
  },
  mounted(){
    console.log(this.detail)
  }
};
</script>
<style lang="scss">
.detailList {
  position: relative;
  height: 199px;
  z-index: 99;
  overflow: hidden;
  .cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -10;
    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: #333;
      opacity: 0.6;
    }
  }
  .detail_content{
      display: flex;
      align-items: center;
      height:150px;
      padding:19px 10px 19px 15px;
      .logo{
          position: relative;
          width:110px;
          height:150px;
          box-sizing: border-box;
          img{
              width:100%;
              height:100%;
          }
      }
      .content{
          flex:1;
          overflow-x:hidden;
          margin-left:12.5px;
          line-height: 1;
          color:#fff;
          .C_title{
              font-size:20px;
              margin-top:2px;
              font-weight: 700;
              overflow: hidden;    
          }
          .E_title{
              margin-top:5px;
              font-size:14px;
              line-height: 14px;
              color:#fff;
          }
          .score_see{
              margin-top:11px;
              height:20px;
              line-height: 20px;
              span{
                font-size:12px;
                color:rgba(255,255,255,.8);
              }
              .num{
                float: left;
                 color:#fc0;
                 font-size:18px;
                 margin-right:10px;
                  font-weight: 700;
              }
          }
          .p_content{
             clear: both;
             margin-top:10px;
             .ptext{
                 margin-top:7px;
                 height:16px;
                 line-height: 16px;
                 color:#fff;
                 font-size:13px;
                //  font-weight:500;
             }
          }
        //   align-items: center;
        //   justify-content: center;

      }
  }
}
</style>