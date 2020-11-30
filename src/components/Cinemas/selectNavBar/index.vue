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
      >{{tab.text}}</div>
    </div>
    <!-- 显示导航内容区 -->
    <div class="nav_content"></div>
  </div>
</template>
<script>
export default {
  name: "select_main",
  data() {
    return {
      selected: "",
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
  }
};
</script>
<style lang="scss" scoped>
.select-container {
  flex: 1;
  width: 100%;
  .Tab {
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 1px 2px 0 rgba(37, 47, 57, 0.1);
    z-index: 999;
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .select-shadow {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .tablist {
      position: relative;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      font-size: 13px;
       &:before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 70%;
        border: 4px solid transparent;
        // border-top-color: $selectDefaultColor;
      }
    //   &::after {
    //     content: "";
    //     display: block;
    //     position: absolute;
    //     height: 20px;
    //     top: 10px;
    //     left: 0;
    //     border-left: 1px solid #e8e8e8;
    //   }
    }
  }
}
</style>