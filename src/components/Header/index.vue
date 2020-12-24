<template>
  <div id="Header">
      <h2 title='title'>{{title}}</h2>
      <slot />
  </div>
</template>

<script>
export default {
  name: 'Header',
  props:{
    title:String
  }
}
</script>
<style lang="scss" scoped>
  #Header{
    width:100%;
    height: 50px;
    background-color: #e54847;
    position: relative;
    z-index:999;
    h2{
      width:80%;
      margin:0 auto;
      height:50px;
      line-height: 50px;
      text-align: center;
      font-size:22px;
       color:#fff;
       overflow: hidden;
       white-space: nowrap;
       text-overflow: ellipsis
    }
  }
</style>