<template>
  <div id="tabbar">
      <router-link to="/movie"  tag="div">
        <i class="iconfont icon-dianying"></i>
        <p>电影</p>
      </router-link>
      <router-link to="/cinema" tag="div">
        <i class="iconfont icon-yingyuan"></i>
        <p>影院</p>
      </router-link>
      <router-link to='/mine'  tag="div">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </router-link>
  </div>
</template>
<script>
export default {
  name: 'Tabbar',
}
</script>
<style lang='scss' scoped>
#tabbar{
  position:fixed;
  left:0;
  bottom:0px;
  right:0;
  width:100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  border-top:1px solid rgba(0,0,0,0.1);
  div.router-link-active{
     color:#f03d37
  }
  div{
    flex:1;
    height: 50px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    i{
      margin-top:10px;
      width: 20px;

    }
    p{
      font-size:12px;
      line-height: 18px;
    }
  }

}
</style>