<template>
  <div class="History-list">
    <div class="history-item" v-for="(item,index) in history.data" :key="index">
      <div class="iconfont icon-time"></div>
      <div class="msg" @touchstart="handleSearch(item)">{{item}}</div>
      <div
       class="del iconfont 
       icon-shanchu"
       @touchstart='handleDel(index)'
       ></div>
       <div
       class="hot"
       v-if="hot"
       >
        <p class="msg">热门搜索</p>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "history",
  props:{
      history:{
          type:Object,
          default(){
              return {}
          }
      }
  },
  computed:{
      hot(){
          //判断是否是搜索电影
          return this.history.type==='movies'
      }
  },
 created(){
  console.log(this.history)
  },
  watch:{
    history(val){
      console.log(val)
    }
  },
  methods:{
      handleSearch(result){
         this.$emit('Tosearch',result)
      },
      handleDel(index){
        console.log(index)
      }
  }
};
</script>
<style lang="scss" scoped>
.History-list{
  padding-left:15px;
  background: #fff;
  .history-item{
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #e5e5e5;
    line-height: 44px;
    align-items: center;
    .msg{
      padding: 0 10px;
      color:#333;
      font-size:15px;
      flex:1 1 auto;
      display: inline-block;
    }
    .iconfont{
      width:40px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      color:#888;
    }
  }
}
</style>