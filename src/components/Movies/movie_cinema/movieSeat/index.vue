<template>
  <div class="Seat_container">
    <!-- 这是日期结构-->
    <div class="date">
      <div
        class="dateInfo"
        v-for="(item, index) in showData"
        :key="index"
        :class="{ active: currentIndex === index }"
        @touchstart="changeDate(index)"
      >
        {{ item.dateShow }}
      </div>
    </div>
    <!-- 这是折扣卡结构 -->
    <slot name="discount"></slot>
    <!-- 放映的详细信息 -->
    <div class="showInfo">
      <div class="showcontent" v-for="(item, index) in showInfo" :key="index">
        <div class="show showtime">
          <p class="some tm">{{ item.tm }}</p>
          <p class="end">{{ item.end }}完</p>
        </div>
        <div class="show lang">
          <p class="some watch">{{ item.lang }}{{ item.tp }}</p>
          <p class="place">{{ item.th }}</p>
        </div>
        <!-- <div class="price"> -->
        <div class="show showprice">
          <p class="some sellprice">
            <span class="price">{{ item.vipPrice | sellprice }}</span>
            <span class="count">{{ item.vipPriceName }}</span>
            <span class="countprice">{{ item.vipPrice | sellprice }}</span>
          </p>
          <p class="countInfo">{{ item.extraDesc }}</p>
        </div>
        <div class="buy">
          <div class="but_btn">购票</div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
export default {
  name: "movieSeat",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    date: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showData() {
      return this.date.shows || [];
    },
    showInfo() {
      const data = this.showData[this.currentIndex].plist || [];
      const dur = this.date.dur;
      const Infodata = data
        ? data.map((item) => {
            console.log(item);
            const start = item.dt.replace(/-/g, "/") + " " + item.tm;
            const times = new Date(start).getTime() + dur * 60 * 1000;
            //对时间做处理
            const date = new Date(times);
            //对字符串做处理
            const th = item.th.split(" ")[0];
            return {
              ...item,
              th,
              end: `${this.Twotimes(date.getHours())}:${this.Twotimes(
                date.getMinutes()
              )}`,
            };
          })
        : [];
      return Infodata;
    },
  },
  filters: {
    sellprice(value) {
      return "￥" + value;
    },
  },
  methods: {
    changeDate(index) {
      this.currentIndex = index;
    },
    Twotimes(data) {
      return data < 10 ? "0" + data : data;
    },
  },
  created() {
    console.log(this.date);
  },
};
</script>
<style lang="scss" scoped>
.Seat_container {
  position: relative;
  .date {
    width: 100%;
    height: 42px;
    line-height: 42px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
    .dateInfo {
      display: inline-block;
      text-align: center;
      width: 126px;
      height: 40px;
      line-height: 40px;
      position: relative;
      &.active {
        color: #f03d37;
        &:before {
          position: absolute;
          content: "";
          height: 100%;
          left: 0;
          right: 0;
          border-bottom: 2px solid #f03d37;
        }
      }
    }
  }
  .showInfo {
    width:100%;
    height:220px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    top:92px;
    left:0;
    background-color: #fff5ea;
    display: flex;
    flex-direction: column;
    .showcontent {
      display: flex;
      padding: 8px 0px 8px 10px;
      align-items: center;
      background-color: #fff;
      margin-bottom: 5px;
      .show {
        display: flex;
        flex-direction: column;
        margin-right: 10px;
        align-items: center;
        .some {
          width: 100%;
          height: 28px;
          line-height: 28px;
          margin-bottom: 5px;
          //
        }
        .tm {
          font-size: 21px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          //  margin-bottom: 10px;
        }
        .end {
          font-size: 14px;
          color: #777;
        }
        .watch {
          font-size: 15px;
          color: #222;
        }
        .place {
          //   width:50px;
          // padding: 5px 0;
          font-size: 13px;
          color: #777;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .sellprice {
          padding: 0 6px;
          .price {
            color: #ee3630;
            font-size: 22px;
            float: left;
          }
          .count {
             float:right;
            font-size: 14px;
            color: #fff;
            background-color: #fa9600;
          }
          .countprice {
            float:right;
            border: 1px solid #fa9600;
            font-size: 14px;
            color: #fa9600;
          }
        }
        .countInfo {
          width: 100%;
          font-size: 13px;
          color: #777;
        }
      }
      .showprice{
        width:169px;
      }
      .lang {
        width: 53px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .buy {
        flex: 1;
        height: 52px;
        position: relative;
        .but_btn {
          width: 30px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          padding: 5px;
          background-color: #f03d37;
          font-size: 14px;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
  }
   }
</style>