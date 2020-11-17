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
  mounted() {
    //因为axios是异步请求，所以需要让数据先请求加载完，在执行better-scroll代码，根据同步和异步的先后顺序，
    setTimeout(() => {
    //在nextTick里面执行，确保数据加载渲染已经完成
      this.$nextTick(() => {
        new BScroll(this.$refs.swrpper, {
          tap: true,
          probeType: 1,
        });
      });
    },1000);
  },
};
</script>
<style lang="scss" scoped>
.swrpper {
  height: 100%;
}
</style>