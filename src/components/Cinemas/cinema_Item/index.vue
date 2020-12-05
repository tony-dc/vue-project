<template>
  <div class="cinema_item">
    <div class="cinemaInfo">
      <p class="name-price">
        <span class="cinemaName">{{cinemaList.nm}}</span>
        <span class="sellPrice">{{cinemaList.sellPrice}}</span>
        <span class="msg">元起</span>
      </p>
      <p class="adr">{{cinemaList.addr}}</p>
      <!-- 处理票退改签及小吃折扣组件 -->
      <tags :tag="tag"></tags>
      <div
        class="cinema_discount"
        v-if="cinemaList.promotion&&cinemaList.promotion.cardPromotionTag"
      >
        <span class="cinema-discount-label">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg=="
            alt
          />
        </span>
          {{cinemaList.promotion.cardPromotionTag}}
      </div>
    </div>
    <div class="distance">{{cinemaList.distance}}</div>
  </div>
</template>
<script>
import tags from "../../tag";
export default {
  name: "cinema_Item",
  props: {
    cinemaList: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    tag() {
      return this.cinemaList.tag || this.cinemaList;
    }
  },
  components: {
    tags
  }
};
</script>
<style lang="scss" scoped>
.cinema_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 15px 0;
  border-bottom: 1px solid #f5f5f5;
  .cinemaInfo {
    margin: 1px 0 0 15px;
    font-size: 16px;
    color: #000;
    margin-bottom: 6px;
    overflow: hidden;
    .name-price {
      margin-bottom:7px;
      .cinemaName {
        display: inline-block;
        width:200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 15px;
      }
      .sellPrice {
        color: #ef4238;
        font-size: 17px;
      }
    }

    .msg,
    .adr {
      color: #999;
      font-size: 13px;
    }
    .cinema_discount{
      color:#999;
      margin:4px 0;
      font-size:12px;
      .cinema-discount-label{
        display: inline-block;
        width:15px;
        height:14px;
        position: relative;
        top:3px;
        img{
          width:100%;
          height:100%;
        }
      }

    }
  }
}
</style>