<template>
  <div class="common_body">
    <!-- 电影列表左边图片懒加载 -->
    <img v-lazy="img" class="img movieImg" />
    <!-- 右边电影信息列表布局 -->
    <div class="movieInfo">
      <!-- 图片名称与是否为3D影片 -->
      <h4 class="movieName">
        {{ movie.nm }} <img class='versionImg' src="@/assets/maxs.png" alt="Imax" v-if='movie.version'> 
      </h4>
      <!-- 内置一个有名插槽，方便插入不同内容 -->
      <slot name="movie_content" />
    </div>
    <!-- 显示购买或者预售 -->
    <div class="movie_sell">
      <slot name="movie_item" />
      <div class="btns" v-if="showdata">
        <span class="btn" :class="showdata.cls">{{ showdata.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "movies_common",
  data() {
    return {
      show: {
        1: {
          name: "想看",
          cls: "want"
        },
        3: {
          name: "购票",
          cls: "buy"
        },
        4: {
          name: "预售",
          cls: "pre"
        }
      }
    };
  },
  props: {
    movie: Object
  },
  computed: {
    img() {
          return this.movie.img.replace("w.h", "128.168");
    },
    showdata() {
      const { show, movie } = this;
      return show[movie.showst];
    }
  }
};
</script>
<style lang="scss" scoped>
.common_body {
  display: flex;
  padding: 12px 0;
  min-height: 90px;
  border-bottom: 1px solid #e6e6e6;
  .movieImg {
    display: block;
    background-color: #eee;
    width: 64px;
    height: 90px;
    margin: 0 4px;
  }
  .movieInfo {
    flex: 1;
    overflow: hidden;
    .movieName {
      // margin-top: 2px;
      position: relative;
      display: inline-block;
      width:100%;
      max-height: 24px;
      color: #222;
      font-weight: 700;
      font-size: 17px;
      .versionImg{
        position: absolute;
        right:15px;
        top:0;
        height:100%;
      }
    }
  }
  .movie_sell {
    width:60px;
    margin-top: 25px;
    margin-right: 5px;
    .score {
      color: #fa0;
      font-size: 10px;
      flex-shrink: 0;
      padding-left: 5px;
      &.no-score {
        font-size: 14px;
        color: #666;
        flex-shrink: 0;
      }
    }
    .btns {
      margin-top: 15px;
      text-align: right;
      .btn {
        display: inline-block;
        width: 48px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border: none;
        color: #fff;
        font-size: 12px;
        border-radius: 5px;
      }
      .want {
        background-color: #faaf00;
      }
      .buy {
        background-color: #ef4238;
      }
      .pre {
        background-color: #3c9fe6;
      }
    }
  }
}
</style>