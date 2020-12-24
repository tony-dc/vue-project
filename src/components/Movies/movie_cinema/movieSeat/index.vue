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
    <div class="showInfo"  v-if="showInfo.length">
      <div class="showcontent" v-for="(item, index) in showInfo" :key="index" >
        <div class="show showtime">
          <p class="some tm">{{ item.tm }}</p>
          <p class="end">{{ item.end }}完</p>
        </div>
        <div class="show lang">
          <p class="some watch">{{ item.lang }}{{ item.tp }}</p>
          <p class="place">{{ item.th }}</p>
        </div>
        <div class="show showprice">
          <p class="some sellprice">
            <span class="price">{{ item.vipPrice | sellprice }}</span>
            <span class="count">{{ item.vipPriceName }}</span>
            <span class="countprice">{{ item.vipPrice | sellprice }}</span>
          </p>
          <p class="countInfo">{{ item.extraDesc }}</p>
        </div>
        <div class="buy">
            <router-link :to="{name:'buyMovie',params:{movieId:date.id,shows:showInfo[index],cinemaId}}"  class="but_btn" tag="div">购票</router-link>
        </div>
      </div>
    </div>
    <div v-else class="notice">
        <div class="ntext">
            {{notice}}
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
    cinemaId(){
      return this.$root.$route.params.id
    },
    showData() {
      return this.date.shows || [];
    },
    showInfo() {
      const data = this.showData[this.currentIndex].plist || [];
      const dur = this.date.dur;
      const Infodata = data
        ? data.map((item) => {
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
    notice(){
        return  this.date.globalReleased ? '今日场次已映完' : '影片未上映'
    },
  },
  filters: {
    sellprice(value) {
      if(!value) value="暂无"
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
  }
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
        }
        .tm {
          font-size: 21px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
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
          font-size: 13px;
          color: #777;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .sellprice {
          padding: 0 6px;
          text-align: left;
          .price {
            color: #ee3630;
            font-size: 20px;
            margin-right:5px;
          }
          .count {
            font-size: 12px;
            color: #fff;
            border-radius:2px;
            background-color: #fa9600;
          }
          .countprice {
            border: 1px solid #fa9600;
            font-size: 12px;
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
        width:155px;
        text-align:center;
      }
      .lang {
        width: 64px;
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
  .notice{
    width:100%;
    height:40px;
    line-height:40px;
    text-align: center;
    .ntext{
        font-size:15px;
        color:#666;
        border-bottom:1px solid #eee;
    }
  }
   }
</style>