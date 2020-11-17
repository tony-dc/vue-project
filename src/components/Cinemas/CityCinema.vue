<template>
  <div class="cinema_body">
    <ul>
      <li v-for="(item,index) in cinemalist" :key="index">
        <div>
          <span>{{item.nm}}</span>
          <span class="q">
            <span class="price">{{item.sellPrice}}</span> 元起
          </span>
        </div>
        <div class="address">
          <span>{{item.addr}}</span>
          <span>{{item.distance}}</span>
        </div>
        <div class="card">
          <div>小吃</div>
          <div>折扣卡</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "CityCinema",
  data(){
     return {
         cinemalist:[]
     }
  },
  mounted(){
     this.$api.getCinameData(10).then(res=>{
         this.cinemalist=res.cinemas
     })
     
  },
};
</script>
<style lang="scss" scoped>
#content .cinema_body {
  position: absolute;
  top: 95px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: auto;
  ul {
    padding: 20px;
    li {
      margin-bottom: 20px;
      border-bottom: 1px solid #e6e6e6;
      div {
        margin-bottom: 10px;
        .q {
          font-size: 11px;
          color: #f03d37;
        }
        .price {
          font-size: 18px;
          margin-left: 10px;
        }
      }
      .address {
        font-size: 13px;
        color: #666;
        display: flex;
        justify-content: space-between;
        span:nth-of-type(1) {
          margin: 0;
          padding: 0;
          display: block;
          width: 220px;
          line-height: 1.4em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span:nth-of-type(2) {
          display: block;
          line-height: 1.4em;
        }
      }
      .card {
        display: flex;
        div {
          padding: 0 3px;
          height: 15px;
          line-height: 15px;
          border-radius: 2px;
          color: #f90;
          border: 1px solid #f90;
          font-size: 13px;
          margin-right: 5px;
        }
        div.or {
          color: #f90;
          border: 1px solid #f90;
        }
        div.bl {
          color: #589daf;
          border: 1px solid #589daf;
        }
      }
    }
  }
}
</style>