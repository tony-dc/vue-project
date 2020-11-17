<template>
  <div class="movie_body">
    <BScroll :handledownload="handledownload" :handleToend="handleToend">
      <ul>
        <li v-if="preMsg">{{preMsg}}</li>
        <li v-for="(item,index) in movieList" :key="index">
          <div class="pic_show">
            <img :src="item.img|setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2>
              {{item.nm}}
              <img src="@/assets/maxs.png" v-if="item.version" />
            </h2>
            <p>
              观众评
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </BScroll>
  </div>
</template>
<script>
export default {
  name: "nowplaying",
  data() {
    return {
      movieList: [],
      preMsg: ""
    };
  },
  created() {
    this.$api.getMovieOnInfoList(10).then(res => {
      if (res) {
        this.movieList = res.movieList;
      }
    });
  },
  methods: {
    //下拉加载
    handledownload(y) {
      if (y > 30) {
        this.preMsg = "正在刷新中……";
      }
    },
    //下拉到一定距离触发
    handleToend(y) {
      if (y > 20) {
        this.$api.getMovieOnInfoList(10).then(res => {
          if (res) {
            this.preMsg = "更新已完成";
            setTimeout(() => {
              this.movieList = res.movieList;
              this.preMsg = "";
            }, 1000);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#content .movie_body {
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
</style>