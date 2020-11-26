<template>
    <div class="footer">
       <div class="copyright">
           <span>© 酷喵电影 客服电话： <a href="tel:10012333">10012333</a></span>
       </div>
       <p class="icp">
      <span>沪ICP备24633566号-1</span>
      <span>沪公网安备126786544号</span>
    </p>
    <p class="comp">
          上海前端font-tony
    </p>
    </div>
</template>
<script>
    export default {
        name:'Footer'
    }
</script>
<style lang="scss">
.footer {
  padding-top: 20px;
  text-align: center;
  .copyright {
    a {
      color: #df3434;
      text-decoration: underline;
    }
  }
  .icp {
    margin: 20px 0 10px;
    font-size: 12px;
    color: #9e9e9e;
    text-decoration: none;
    span {
      margin-left: 9px;
    }
  }
  .comp {
    margin: 10px 0;
    font-size: 14px;
    color: #9e9e9e;
    text-decoration: none;
  }
}
</style>