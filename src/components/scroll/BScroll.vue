<template>
  <div class="swrpper" ref="swrpper">
    <slot></slot>
  </div>
</template>
<script>
//引入better-scroll模块
import BScroll from "better-scroll";
export default {
  name: "BSrcoll",
  data() {
    return {
      timer: null
    };
  },
  //接受父元素传过来的函数
  props: {
    handledownload: {
      type: Function,
      default: function() {}
    },
    handleToend: {
      type: Function,
      default: function() {}
    },
    scrolltype: {
      type: Boolean,
      default: false
    },
    Passthrough: {
      type: String,
      default: ""
    }
  },
  mounted() {
    //因为axios是异步请求，所以需要让数据先请求加载完，在执行better-scroll代码，根据同步和异步的先后顺序，
    this.timer = setTimeout(() => {
    this.$nextTick(() => {
        //在nextTick里面执行，确保数据加载渲染已经完成
        this.scroll = new BScroll(this.$refs.swrpper, {
          tap: true,
          startX: 0,
          scrollX: this.scrolltype,
          eventPassthrough: this.Passthrough,
          probeType: 1,
        });
        //监听位置并将参数传递给父组件
        this.scroll.on("scroll", position => {
          this.handledownload(position);
        });
        //监听点击结束时的位置,传递y轴参数
        this.scroll.on("touchEnd", position => {
          this.handleToend(position.y);
        });
      })
    }, 500);
  }
};
</script>
<style lang="scss" scoped>
.swrpper {
  height: 100%;
}
</style>