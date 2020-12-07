<template>
  <div class="moreOffers">
    <div class="Content" >特惠购票</div>
    <div class="dec" :class="{showtext:show}">{{detail.dra}}</div>
    <div class="allow iconfont icon-shangjiantou" @touchstart="show=!show" :class="{down:!show}"></div>
  </div>
</template>
<script>
export default {
  name: "moreoffers",
  data() {
    return {
      show: true
    };
  },
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
<style lang="scss">
.moreOffers {
  margin-top: 10px;
  width: 100%;
  padding: 0 12px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  .Content {
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    background-color: rgb(229, 72, 71);
  }
  .dec {
    margin-top: 10px;
    text-overflow: ellipsis;
    line-height: 1.4em;
    color: #444;
  }
  .showtext {
    //自适应布局
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .allow {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #555;
    font-size: 18px;
    &.down {
      transform: rotate(180deg);
    }
  }
}
</style>