<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <ul>
        <li>
          <div class="img"><img src="/images/movie_1.jpg" /></div>
          <div class="info">
            <p><span>无名之辈</span><span>8.5</span></p>
            <p>A Cool Fish</p>
            <p>剧情,喜剧,犯罪</p>
            <p>2018-11-16</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "search",
};
</script>
<style lang="scss" scoped>
#content .search_body {
  width: 100%;
  flex: 1;
  overflow: auto;
  .search_input {
    padding: 8px 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    .search_input_wrapper {
      padding: 0 10px;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      line-height: 20px;
      i {
        font-size: 16px;
        padding: 4px 0;
      }
      input {
        width: 100%;
        border: none;
        font-size: 13px;
        outline: none;
        color: #333;
        padding: 4px 0;
        margin-left: 5px;
      }
    }
  }
  .search_result {
    background-color: #fff;
    h3 {
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      font-weight: 600;
      color: #999;
      padding: 9px 15px;
      border-bottom: 1px solid #e5e5e5;
    }
    ul li {
      border-bottom: 1px dashed #c9c9c9;
      padding: 10px 15px;
      box-sizing: border-box;
      display: flex;
      .img {
        width: 60px;
        img {
          width: 100%;
        }
      }
      .info {
        margin-left: 15px;
        flex: 1;
        p {
          height: 22px;
          display: flex;
          line-height: 22px;
          font-size: 12px;
        }
        p:nth-of-type(1) {
          span:nth-of-type(1) {
            font-size: 18px;
            flex: 1;
          }
          span:nth-of-type(2) {
            font-size: 16px;
            color: #fc7103;
          }
        }
      }
    }
  }
}
</style>