<template>
  <div class="common_body">
    <!-- 电影列表左边图片懒加载 -->
    <img v-lazy="img" class="img movieImg" />
    <!-- 右边电影信息列表布局 -->
    <div class="movieInfo">
      <!-- 图片名称与是否为3D影片 -->
      <h4 class="movieName">
        {{ movie.nm }}
        <span class="version" :class="movie.version"></span>
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
  },
  methods: {}
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
      display: inline-block;
      max-height: 24px;
      color: #222;
      font-weight: 700;
      font-size: 17px;
    }
  }
  .movie_sell {
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
<!-- <style lang="scss" scoped>
.common_body {
  position: absolute;
  top: 95px;
  left: 0;
  right: 0;
  bottom: 45px;
  overflow: auto;
  ul {
    margin: 0 12px;
    overflow: hidden;
    .msg {
      margin: 0;
      padding: 0;
      border: none;
    }
    li {
      margin-top: 12px;
      display: flex;
      align-items: center;
      border-bottom: 1px #e6e6e6 solid;
      padding-bottom: 10px;
      .pic_show {
        width: 64px;
        height: 90px;
        img {
          width: 100%;
        }
      }
      .info_list {
        margin-left: 10px;
        flex: 1;
        position: relative;
        h2 {
          font-size: 17px;
          line-height: 24px;
          width: 150px;
          overflow: hidden;
          font-weight: 700;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        p {
          font-size: 13px;
          color: #666;
          line-height: 22px;
          width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .grade {
          font-weight: 700;
          color: #faaf00;
          font-size: 15px;
        }
        img {
          width: 50px;
          position: absolute;
          right: 10px;
          top: 5px;
        }
      }
    }
  }
  .btn_mall {
    width: 47px;
    height: 27px;
    line-height: 28px;
    text-align: center;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
}
</style> -->