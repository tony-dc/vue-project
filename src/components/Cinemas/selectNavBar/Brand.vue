<template>
  <div class="brand_content">
    <div
      class="brand_list"
      v-for="item in brandData.subItems"
      :key="item.id"
      :class="{active:item.id===subItemsIndex}"
      @touchstart='handleToShow(item)'
    >
    <span>{{item.name}}</span>
    <span class="count">{{item.count}}</span>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "Brand",
  computed:{
      ...mapState('city',['filters']),
     subItemsIndex(){
       //实时通过状态管理拿到数据
         const {brandId}=this.filters
         return brandId
     }
  },
  props: {
    brandData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
methods:{
  ...mapMutations('city',['changeFilter']),
  handleToShow(data){
      const brandId=data.id
      //改变filters里面brandId的值
      this.changeFilter({brandId})
      //清除遮罩层
      this.$emit('close')
      //发起异步请求,刷新页面数据
      this.$store.dispatch('city/getCinemaList')
  }
}
};
</script>
<style lang="scss">
@import '../../../scss/index';
.brand_content{
    padding-right: 20px;
    height:320px;
    overflow: scroll;
     &::-webkit-scrollbar {
          display: none;
        }
  .brand_list{
      position: relative;
     display: flex;
      height:44px;
      line-height: 44px;
      padding:0 15px 0 26px;
      border-bottom: 1px solid #e5e5e5;
      color:#666;
      span{
          flex:1;
      }
      .count{
          text-align:right;
      }
      &.active{
          color:#dd403b;
          &:before{
              @extend .selected;
              left:8px;
              top:18px;
              width:11.5px;
              height:8px;
          }
      }
  }
}
</style>