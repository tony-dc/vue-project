<template>
  <div class="Search_container">
    <div class="Search_content">
        <!-- 命名式路由导航 -->
        <router-link 
        class="searchMsg" 
        :to="{name:'cinemaSearch',params:{searchtype:'movie',type:-1}}"
        tag="div"
        >
           <i class="iconfont icon-sousuo"></i>
           <span>电影/电视剧/综艺</span>
        </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "movieSearch"
};
</script>
<style lang="scss" scoped>
.Search_container {
  width: 100%;
  flex: 1;
  overflow: auto;
  background-color: #fff;
  .Search_content {
    padding: 8px 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    .searchMsg{
        width:100%;
        height:28px;
        line-height:28px;
        border:0.5px solid rgba(222,222,222,.4);
        border-radius:4px;
        text-align: center;
        color:#888;
        background-color: #fff;

    }
  }
}
</style>