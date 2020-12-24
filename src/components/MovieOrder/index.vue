<template>
  <div class="Order_container">
    <Loading v-if="loading" />
    <div v-else>
      <Header title="确认订单" class="Header">
        <i class="iconfont icon-zuojiantou back" @touchstart="handleToBack"></i>
      </Header>
      <div class="moviedetail">
        <div class="movieInfo">
          <div class="posterImg">
            <img :src="movieItem.img | movieData" alt v-if="movieItem.img" />
          </div>
          <div class="movieItem">
            <p class="movieNm">{{ movieItem.nm }}</p>
            <p class="same showtime">{{ movieShowTime.dt.slice(2) }} {{ showtime }} ({{ tp }})</p>
            <p class="same cinema">{{ cinemaTitle }}</p>
            <p class="same place">{{ movieShowTime.th }}</p>
            <div class="price">
              <span class="ItemPrice">
                <i>￥</i>
                {{ movieShowTime.vipPrice }}
              </span>
              <div class="changenum">
                <span class="reduce" @click="numReduce">-</span>
                <input type="Number" v-model="mount" class="num" />
                <span class="add" @click="numAdd">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="payShow">
        <div class="many">
          <div class="allPrice">
            <span class="title">票价合计：</span>
            <span class="price">
              <i>￥</i>
              {{ totalPrice }}
            </span>
          </div>
          <div class="payment" @click="qrcodeScan()">
            <span>结算({{ mount }})</span>
          </div>
        </div>
      </div>
      <div class="paycode_cover" v-show="qrcodeshow">
        <div class="qrcodes">
          <p>请用支付宝扫码支付</p>
          <div id="qrcode" ref="qrcode"></div>
          <div class="paydown" @touchstart="closed">完成支付</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  name: "movieOrder",
  data() {
    return {
      movieDetail: {},
      cinemaTitle: "",
      movieShowTime: {},
      mount: 1,
      loading: true,
      qrcodeshow: false
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
    },
    totalPrice() {
      const price = this.movieShowTime.vipPrice || 0,
        total = (this.mount * price).toFixed(1);
      return total;
    }
  },
  filters: {
    movieData(val) {
      return val.replace(/w\.h/, "128.168");
    }
  },
  created() {
    const { movieId, shows, cinemaId } = this.$route.params;
    this.movieShowTime = shows;
    this.$api.getcinemaDetail({ params: { cinemaId } }).then(res => {
      this.cinemaTitle = res.cinemaData.nm;
    });
    this.$api.getMovieDetail({ params: { movieId } }).then(res => {
      this.movieDetail = res.detailMovie;
      this.loading = false;
    });
  },
  methods: {
    handleToBack() {
      this.$router.back();
    },
    numReduce() {
      if (this.mount <= 1) return;
      this.mount--;
    },
    numAdd() {
      if (this.mount > 4) return;
      this.mount++;
    },
    //二维码函数
    qrcodeScan() {
      this.qrcodeshow = true;
      const qrcodes = new QRCode("qrcode", {
        width: 200,
        height: 200,
        text: this.totalPrice,
        colorDark: "rgba(0,0,0,.9)",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H,
        render: "canvas"
      });
      console.log(qrcodes);
    },
    closed(){
       this.$refs.qrcode.innerHTML = ''
       this.qrcodeshow=false;
    }
  }
};
</script>
<style lang="scss">
.Order_container {                                                    
  background-color: #f0f0f0;
  width: 100%;
  height: 100vh;
  position: relative;
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
          font-size: 24px;
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
            float: left;
            border: 1px solid #444;
          }
          .num {
            width: 40px;
            border-left: none;
            border-right: none;
            outline: none;
          }
          span.show {
            color: #888;
          }
          .reduce {
            border-radius: 7px 0 0 7px;
            font-size: 20px;
          }
          .add {
            border-radius: 0 7px 7px 0;
            font-size: 20px;
          }
        }
      }
    }
  }
  .payShow {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 64px;
    border-top: 1px solid rgb(219, 199, 199);
    .many {
      height: 44px;
      line-height: 44px;
      padding: 10px;
      background-color: #fff;
      display: flex;
      .allPrice {
        flex: 1;
        font-size: 18px;
        color: red;
        .title {
          font-size: 20px;
          color: rgba(0, 0, 0, 0.8);
        }
        .price {
          i {
            font-style: normal;
            font-size: 12px;
          }
        }
      }
      .payment {
        width: 130px;
        height: 44px;
        position: relative;
        background: linear-gradient(
          to right,
          #ef4238 50%,
          rgb(199, 20, 20) 100%
        );
        border-radius: 44px;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 19px;
        }
      }
    }
  }
  .paycode_cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1111;
    background-color: rgba(0, 0, 0, 0.5);
    .qrcodes{
      position: absolute;
      left: 50%;
      top: 50%;
      width:220px;
      border-radius:5px;
      transform: translate(-50%, -50%);
      z-index: 9999;
      background-color:#eee;
      p{
        height:30px;
        line-height:30px;
        text-align:center;
      }
      #qrcode{
        border: 3px solid #fff;
      }
      .paydown{
        height:32px;
        width:100%;
        margin:0 auto;
        line-height: 32px;
        background-color: rgb(241, 225, 228);
        text-align:center;
        color:#333;
      }

    }
  }
}
</style>