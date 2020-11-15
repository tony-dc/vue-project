<template>
  <div class="main">
       <Header />
      <div id="content">
        <ul>
          <router-link tag='li' to='/movie/city' @touchstart.native='handleToCitylist'>
          北京
          <i :class="['iconfont',active?'icon-sanjiaodown':'icon-shangjiantou']"></i>
          </router-link>
          <router-link tag='li' to='/movie/nowplaying' class="hot_item">正在热映</router-link>
          <router-link tag='li' to='/movie/comingsoon' class="hot_item">即将上映</router-link>
          <router-link tag='li' to='/movie/search'>
              <i class="iconfont icon-sousuo search"></i>
          </router-link>
        </ul>
        <!-- 视图出口 -->
        <router-view />
      </div>
      <TabBar />
  </div>
</template>

<script>
export default {
  name: 'movie',
  data(){
    return {
       active:false
    }
  },
  methods:{
    handleToCitylist(){
      this.active=!this.active
    }
  }
}
</script>
<style lang="scss" scoped>
  #content ul{
       width:100%;
       height: 50px;
       display:flex;
       justify-content: space-evenly;
       border:1px solid #e6e6e6;
      li{
         flex:1;
         height:50px;
         padding:5px;
         box-sizing: border-box;
         line-height: 40px;
         text-align: center;
         font-size:16px;
         .search{
           font-size:24px;
           color:#ef4238;
         }
       }
      li.router-link-active{
         color:#ef4238;
         border-bottom:2px solid #ef4238;
       }
      .hot_item{
         font-weight:700;
         color:#666;

       }

       
  }
</style>