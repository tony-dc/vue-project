<template>
  <div class="History-list">
    <div class="hot" v-if="hot">
      <p class="msg">热门搜索</p>
    </div>
    <div v-else class="histort-title iconfont icon-time">历史记录:</div>
    <div class="history-content">
      <div class="history-item" v-for="(item,index) in history.data" :key="index">
        <div class="history-info" @touchstart="handleSearch(item)">{{item}}</div>
        <div class="del iconfont icon-shanchu" @touchstart="handleDel(index)"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "history",
  props: {
    history: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    hot() {
      //判断是否是搜索电影
      return this.history.type === "movies";
    }
  },
  methods: {
    ...mapMutations("user", ["updateSearchHistory"]),
    handleSearch(result) {
      this.$emit("Tosearch", result);
    },
    handleDel(index) {
      const data = this.history.data;
      //splice改变原数组
      data.splice(index, 1);
      this.updateSearchHistory({
        type: this.history.type,
        data
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.History-list {
  // padding-left: 15px;
  background: #fff5f0;
  .histort-title {
    margin: 4px 0;
    height: 28px;
    line-height: 28px;
    background-color: #f0f0f0;
  }
  .history-content {
    display: flex;
    justify-content: flex-start;
     padding-left: 15px;
    flex-wrap: wrap;
    .history-item {
      width: 32%;
      height:30px;
      display: flex;
      justify-content: space-between;
      border: 1px solid #e6e6e6;
      line-height: 30px;
      margin-right: 2px;
      align-items: center;
      .history-info {
        width: 60px;
        padding: 0 10px;
        color: #333;
        font-size: 15px;
        flex: 1 1 auto;
        text-align: center;
        display: inline-block;
      }
      .iconfont {
        width: 40px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #888;
      }
    }
  }
  .hot{
    padding:0 0 3px 0px;
    background-color: #fff;
    .msg{
       background-color: #f0f0f0;
      padding:5px 0 5px;
      font-size:15px;
      color:#666;
    }
  }
}
</style>