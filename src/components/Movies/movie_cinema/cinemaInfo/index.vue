<template>
  <div class="info_content">
    <div class="info">
      <p class="title">{{cinemaInfo.nm}}</p>
      <p class="address">{{cinemaInfo.addr}}</p>
    </div>
    <div class="location">
      <i class="iconfont icon-play"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "cinemaInfo",
  props: {
    cinemaInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style lang="scss">
.info_content {
  margin: 10px 0;
  position: relative;
  width: 100%;
  height: 70px;
  display: flex;
  .info {
    width: 65%;
    padding: 10px 15px;
    p {
      height: 20px;
      line-height: 20px;
    }
    .title {
      color: rgba(0, 0, 0, 0.8);
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .address {
      font-size: 14px;
      color: #777;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
  }

  .location {
    flex: 1;
    text-align: center;
    position: relative;
    line-height: 70px;
    i {
      color: lightblue;
      font-size: 24px;
    }
  }
 .location::after {
      content: "";
      position: absolute;
      top: 15px;
      left:0;
      bottom:15px;
      border-left: 1px solid #e5e5e5;
    }
  //   .location::before{
  //     position: absolute;
  //     content:'';
  //     top:10px;
  //     bottom:10px;
  //     border-left:1px solid red
  //  }
}
</style>