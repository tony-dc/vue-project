<template>
  <div class="Order_container">
    <Header title="确认订单" class="Header">
      <i class="iconfont icon-zuojiantou back" @touchstart="handleToBack"></i>
    </Header>
    <div class="moviedetail">
      <div class="movieInfo">
        <div class="posterImg">
          <img :src="movieItem.img|movieData" alt v-if="movieItem.img" />
        </div>
        <div class="movieItem">
          <p class="movieNm">{{movieItem.nm}}</p>
          <p class="same showtime">{{movieShowTime.dt.slice(2)}} {{showtime}} ({{tp}})</p>
          <p class="same cinema">{{cinemaTitle}}</p>
          <p class="same place">{{movieShowTime.th}}</p>
          <div class="price">
            <span class="ItemPrice">
              <i>￥</i>
              {{movieShowTime.vipPrice}}
            </span>
            <div class="changenum">
              <span class="reduce">-</span>
              <input type="Number" v-model="mount" class="num" />
              <span class="add">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mount">
      <div class="many">
        <span>票价：</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "movieOrder",
  data() {
    return {
      movieDetail: {},
      cinemaTitle: "",
      movieShowTime: {},
      mount: 1
    };
  },
  computed: {
    movieItem() {
      return this.movieDetail || {};
    },
    tp() {
      return this.movieShowTime.lang + this.movieShowTime.tp;
    },
    showtime() {
      return this.movieShowTime.tm + "-" + this.movieShowTime.end;
    }
  },
  filters: {
    movieData(val) {
      return val.replace(/w\.h/, "128.168");
    }
  },
  created() {
    const { movieId, shows, cinemaId } = this.$route.params;
    console.log(shows);
    this.movieShowTime = shows;
    this.$api.getcinemaDetail({ params: { cinemaId } }).then(res => {
      console.log(res);
      this.cinemaTitle = res.cinemaData.nm;
    });
    this.$api.getMovieDetail({ params: { movieId } }).then(res => {
      this.movieDetail = res.detailMovie;
    });
  },
  methods: {
    handleToBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss">
.Order_container {
  background-color: #f0f0f0;
  width: 100%;
  height: 100vh;
  .Header {
    background-color: #fff !important;
    h2 {
      color: #666 !important;
    }
    .back {
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      left: 15px;
      font-size: 24px;
      color: rgba(0, 0, 0, 0.6);
      font-weight: bold;
    }
  }
  .movieInfo {
    padding: 10px 0px 10px 6px;
    display: flex;
    margin-top: 12px;
    background-color: #fff;
    .posterImg {
      width: 128px;
      height: 100%;
      border-radius: 10px;
      img {
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }
    .movieItem {
      flex: 1;
      height: 100%;
      margin-left: 15px;
      .movieNm {
        margin: 10px 0 30px;
        height: 28px;
        line-height: 28px;
        color: rgba(41, 28, 28, 1);
        font-size: 26px;
        font-weight: 900;
      }
      p + p {
        margin-bottom: 15px;
      }
      .same {
        font-size: 15px;
        color: #444;
      }
      .price {
        margin-top: 20px;
        width: 100%;
        height: 30px;
        .ItemPrice {
          font-size: 21px;
          font-weight: bold;
          color: red;
          float: left;
          i {
            font-style: normal;
            font-size: 16px;
          }
        }
        .changenum {
          float: right;
          .reduce,
          .add,
          .num {
            display: block;
            height: 30px;
            width: 30px;
            text-align: center;
            line-height: 30px;
            float: left;
            border: 1px solid #444;
           
          }
          .num {
            width: 40px;
            // font-size:16px;
            // text-align: center;
            border-left: none;
            border-right: none;
            outline: none;
             vertical-align: middle;
          }
          .reduce {
            border-radius: 7px 0 0 7px;
            font-size: 20px;
             vertical-align: middle;
          }
          .add {
            border-radius: 0 7px 7px 0;
            font-size: 20px;
             vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>