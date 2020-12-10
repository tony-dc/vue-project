<template>
    <div  class="discount_container">
        <div class="discount_content">
           <p class="tag">{{vipInfo.tag}}</p>
           <p class="title">{{vipInfo.title}}</p>
           <p class="process">
               {{vipInfo.process}}
            <!-- <i class="iconfont icon-IOTtubiao_huabanfuben"></i> -->
           </p>
        </div>
    </div>
</template>
<script>
    export default{
        name:'discount',
        props:{
            vipInfo:Object
        }
    }
</script>
<style lang="scss" scoped>
.discount_content{
    width:100%;
    height:50px;
    line-height:50px;
    background-color: #fff5ea;
    padding:10px 2px 10px 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .tag{
        font-size:12px;
        color:#fff;
        padding:0 3px;
        height:26px;
        line-height:26px;
        border-radius:5px;
        background-color: #60b8e1;
        margin-right:10px;
    }
    .title{
        font-size:14px;
        flex:1;
        color:#fa9600;
    }
    .process{
      font-size:13px;
      color:#666;
      &:after{
          display: inline-block;
          content:'';
          width:7px;
          height:7px;
          border-left:1px solid #ccc;
          border-top:1px solid #ccc;
          transform:rotate(135deg);
      }
    }
    
}
</style>