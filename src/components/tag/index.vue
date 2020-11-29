<template>
  <div class="tag_content">
    <span>座</span>
    <!-- 根据后台数据判断是否有对用的服务 -->
    <span v-if="tag.allowRefund">退</span>
    <span v-if="tag.endorse">改签</span>
    <span v-if="tag.snack" class="serve">小吃</span>
    <span v-if="tag.vipDesc" class="serve">折扣卡</span>
  </div>
</template>
<script>
export default {
  name: "tag",
  props: {
    tag: Object
  }
};
</script>
<style lang="scss" scoped>
.tag_content {
  margin-top: 7px;
  span {
    border: 1px solid #589daf;
    color: #589daf;
    position: relative;
    display: inline-block;
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    border-radius: 3px;
    font-size:12px;
    margin:0 2px;
  }
  .serve{
      color:#f90;
      border-color:#f90;
  }
}
</style>