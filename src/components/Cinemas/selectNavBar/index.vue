<template>
  <div class="select-container">
    <!-- 导航条 -->
    <div class="Tab">
      <!-- 遮罩层 -->
      <div v-if="selected" class="select-shadow"></div>
      <div
        v-for="tab in tabs "
        :key="tab.text"
        class="tablist"
        :class="selected===tab.name?'active':''"
        @touchstart="handleTocheck(tab)"
      >{{tab.text}}</div>
    </div>
    <!-- 显示导航内容区 -->
    <div class="nav_content" v-if="selected">
      <!-- 地区组件 -->
      <Region :regionData="regionData" v-if="selected==='region'" @close='choseShow'/>
      <!-- 品牌组件 -->
      <Brand :brandData="brandData" v-if="selected==='brand'" @close='choseShow'/>
      <!-- 特殊服务组件 -->
      <Special :specialData="specialData" v-if="selected==='special'" @close='choseShow'/>
    </div>
  </div>
</template>
<script>
import Brand from "./Brand";
import Region from "./Region";
import Special from "./Special";
export default {
  name: "select_main",
  data() {
    return {
      selected: "",
      isShow: false,
      samenm:'',
      tabs: [
        {
          name: "region",
          text: "全城"
        },
        {
          name: "brand",
          text: "品牌"
        },
        {
          name: "special",
          text: "特色"
        }
      ]
    };
  },
  props: {
    results: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    //全程数据
    regionData() {
      const { district, subway } = this.results;
      console.log( district, subway )
      return {
        district,
        subway
      };
    },
    //品牌数据
    brandData() {
      console.log(this.results)
      const { brand } = this.results;
      return {
        ...brand
      };
    },
    //特殊服务数据
    specialData() {
      //解构出对应的对象，并且处理成想要的数据格式
      const { service, hallType } = this.results;
      return [
        { ...service, type: "serviced" },
        { ...hallType, type: "hallType" }
      ];
    }
  },
  methods: {
    //完成点击显示与隐藏的切换
    handleTocheck(val) {
      if( this.samenm===val.name){
       this.selected = this.isShow?'': val.name;
       this.isShow = !this.isShow;
      }else{
        this.selected =val.name
         this.isShow =true
      }
       this.samenm=val.name
    },
    choseShow(){
        console.log(1)
        this.selected =''
        this.isShow=false
    }
  },
  components: {
    Brand,
    Region,
    Special
  }
};
</script>
<style lang="scss" scoped>
@import "../../../scss/color.scss";
.select-container {
  flex: 1;
  width: 100%;
  z-index:999;
  .Tab {
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 1px 2px 0 rgba(37, 47, 57, 0.1);
    z-index: 999;
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    color: #666;
    justify-content: space-between;
    align-items: center;
    .select-shadow {
      position: fixed;
      top: 90px;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgba(0, 0, 0, 0.1);
    }
    .tablist {
      position: relative;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      background-color: #fff;
      z-index:100;
      text-align: center;
      font-size: 14px;
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 70%;
        border: 5px solid transparent;
        border-top-color: $contentColor;
      }
      & + .tablist::after {
        content: "";
        display: block;
        position: absolute;
        height: 40px;
        top: 0px;
        left: 0;
        border-left: 1px solid #e8e8e8;
      }
      &.active {
        color: $contentColor;
      }
      &.active:before {
        top: 40%;
        border-top-color: transparent;
        border-bottom-color:  $contentColor;
      }
    }
  }
  .nav_content{
    background-color: #fff;
  }
}
</style>