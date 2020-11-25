<template>
  <div class="moreOffers">
    <div class="content">特惠购票</div>
     <div class="dec">
        {{detail.dra}}
     </div>
  </div>
</template>
<script>
export default {
  name: "moreoffers",
  props:{
      detail:{
          type:Object,
          default(){
             return {}
          }
      }
  }
};
</script>
<style lang="scss">
.moreOffers {
     margin-top: 10px;
     width: 100%;
     padding: 0 12px;
     height: 40px;
    line-height: 40px;
    box-sizing: border-box;
  .content {
    color: #fff;
    text-align: center;
    border-radius:5px;
    background-color: rgb(229, 72, 71);
  }
  .dec{
       display: -webkit-box;
       -webkit-box-orient:horizontal;
       -webkit-line-clamp:3;
  }
}
</style>