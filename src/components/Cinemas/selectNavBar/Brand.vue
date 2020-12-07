<template>
  <div class="brand_content">
    <div
      class="brand_list"
      v-for="(item,index) in brandData.subItems"
      :key="item.id"
      :class="{active:item.id===subItemsIndex}"
      @touchstart='handleToShow(item,index)'
    >
    <!-- {{subItemsIndex}} -->
    <span>{{item.name}}</span>
    <span class="count">{{item.count}}</span>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "Brand",
  data(){
    return {
        currentIndex:0
    }
  },
  computed:{
      ...mapState('city',['filters']),
     subItemsIndex(){
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
  handleToShow(data,index){
      this.currentIndex=index
     console.log(data,index)
  }
},
  created() {
    console.log(this.brandData);
  },
};
</script>
<style lang="scss">
@import '../../../scss/index';
.brand_content{
    padding-right: 20px;
    height:320px;
    overflow: scroll;
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