<template>
    <div class="searchBar">
        <!-- 匿名插槽 -->
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name="search"></slot>
    </div>
</template>
<script>
export default {
    name:'searchBar'
}
</script>
<style lang="scss" scoped> 
.searchBar{
    height:40px;
    width:100%;
    display:flex;
    justify-content: space-evenly;
    border:1px solid #e6e6e6;
}
    
</style>