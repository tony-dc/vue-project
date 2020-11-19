<template>
    <div class="container">
         <h3 class="title">电影</h3>
          <slot name='result'></slot>
          <div class="title">{{tips}}</div>
    </div>
</template>
<script>
export default {
    name:'content'
}
</script>
<style lang="scss" scoped>
    
</style>