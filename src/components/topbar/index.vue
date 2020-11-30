<template>
    <header class="hearderBar">
         <router-link to="/movie/city"  tag="div" class="citySearch">
            {{$store.state.city.nm}}
         </router-link>
        <!-- 匿名插槽 -->
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name="search"></slot>
    </header>
</template>
<script>
export default {
    name:'searchBar'
}
</script>
<style lang="scss" scoped> 
//引入scss预处理器样式
@import '../../scss/index.scss';
.hearderBar{
    display:flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    height:$topbarHeight;
    line-height: $topbarHeight;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(37,47,57,.1);
    border-bottom:1px solid #e6e6e6;
    .citySearch{
        position: relative;
        padding:0 15px;
        font-size:15px;
        color:#666;
        //after伪元素生成三角型
        &::after{
            content:'';
            display: block;
            position: absolute;
            top:50%;
            right:4px;
            border:4px solid transparent;
            border-top-color:#888
        }
    }

}
 div.router-link-active{
         color:#ef4238 !important;
         border-bottom:2px solid #ef4238 !important;
       }
    
</style>