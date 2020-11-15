<template>
  <div id="Header">
      <h2 title='title'>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props:{
    title:{
      type:String,
      default:'酷喵电影'
    }
  }
}
</script>
<style lang="scss" scoped>
  #Header{
    width:100%;
    height: 50px;
    background-color: #e54847;
    h2{
      width:100%;
      height:50px;
      line-height: 50px;
      text-align: center;
      font-size:22px;
       color:#fff;
    }
  }
</style>