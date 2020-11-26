<template>
  <div class="History-list">
    <div class="history-item" v-for="(item,index) in history.data" :key="index">
      <div class="iconfont icon-time"></div>
      <div class="msg" @touchstart="handleSearch(item)">{{item}}</div>
      <div
       class="del" iconfont 
       icon-delete
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
  methods:{
      handleSearch(result){
         this.$emit('Tosearch',result)
      }
  }
};
</script>
<style lang="scss" scoped>
</style>