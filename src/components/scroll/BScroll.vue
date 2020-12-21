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
    data:{
       type:Array,
       default:null
    },
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
    setTimeout(() => {
        this.initScroll()
    }, 20);
  },
  methods:{
    //当dom结构发生改变时，重新计算dom元素值进行渲染
    initScroll(){
       this.scroll = new BScroll(this.$refs.swrpper, {
           tap: true,
          scrollX: this.scrolltype,
          eventPassthrough: this.Passthrough,
          probeType: 1,
        });
        console.log(this.scroll)
        //监听位置并将参数传递给父组件
        this.scroll.on("scroll", position => {
          this.handledownload(position);
        });
        //监听点击结束时的位置,传递y轴参数
        this.scroll.on("touchEnd", position => {
          this.handleToend(position.y);
        });
    },
     refresh(){
       this.scroll && this.scroll.refresh()
    },
  },
  watch:{
    data(){
            setTimeout(() => {
                 this.scroll.refresh();
            },20);
        }
  }
};
</script>
<style lang="scss" scoped>
.swrpper {
  height: 100%;
}
</style>