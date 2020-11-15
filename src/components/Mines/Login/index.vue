<template>
    <div class="login_body">
    <div>
      <input
        class="login_text"
        type="text"
        placeHolder="账户名/手机号/Email"
      />
    </div>
    <div>
      <input
        class="login_text"
        type="password"
        placeHolder="请输入您的密码"
      />
    </div>
    <div>
      <input
        class="login_text"
        type="text"
        placeHolder="请输入验证码"
      />
    </div>
    <div class="login_btn">
      <input type="submit" value="登录"  />
    </div>
    <div class="login_link">
      <a>立即注册</a>
      <a>找回密码</a>
    </div>
  </div>
</template>
<script>
    export default {
        name:"login"
    }
</script>
<style lang="scss">
  #content .login_body {
  background-color: #fff;
  div {
  .login_text {
      width: 100%;
      height: 40px;
      padding: 0;
      border: none;
      outline: none;
      border-bottom: 1px solid #ccc;
      text-indent: 10px;
      margin-bottom: 5px;
    }
//     .verifylign{
//       display: flex;
//       justify-content: space-evenly;
//       align-items: center;
//       .img{
//            flex:1
//           }
//       .changeImg{
//            flex: 1;
//            display: block;
//            height:30px;
//            width: 140px;
//            line-height: 30px;
//            font-size:18px;
//            color:#e54847;
//            text-align: center;
//            padding: 10px;
//            border:1px solid #eee;
//            border-radius:10px;
//            background-color: #eee;
//       }
//     }
     
     
  }

  .login_btn {
    height: 50px;
    margin: 10px;
    clear: both;
    input {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      border-radius: 3px;
      font-size: 20px;
      color: white;
      background-color: #e54847;
    }
  }
  .login_link {
    display: flex;
    justify-content: space-between;
    a {
      color: #e54847;
      font-size: 10px;
      text-decoration: none;
      margin: 0 5px;
    }
  }
}   
</style>