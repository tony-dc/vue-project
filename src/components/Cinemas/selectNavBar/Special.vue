<template>
  <div class="special_content">
    <div class="navlist">
      <div class="navItem" v-for="(item,index) in specialData" :key="index">
        <div class="item_name">{{item.name}}</div>
        <div class="item-list">
          <div
            class="special-item-list"
            v-for="subItem in item.subItems"
            :key="subItem.id"
            :class="{active:subItem.id===cate[item.type]}"
            @touchstart="handleToData(item.type,subItem.id)"
          >{{subItem.name}}</div>
        </div>
      </div>
    </div>
    <div class="special-btn">
      <span class="btn cancel" @click="reset">清空</span>
      <span class="btn confirm-btn" @click="confirm">确定</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Special",
  props: {
    specialData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    ...mapState("city", ["filters"]),
    cate() {
      const { hallType, serviceId } = this.filters;
      return { hallType, serviceId };
    }
  },
  methods: {
    ...mapMutations("city", ["changeFilter"]),
    handleToData(type,id) {
          console.log(type, id)
        const params={}
        params[type]=id
        this.changeFilter({...params})
    },
    //清空函数
    reset(){
       this.changeFilter({
           hallType:-1,
           serviceId:-1
       })
    },
    //确认函数
    confirm(){
        this.$store.dispatch('city/getCinemaList')
        this.$emit('close')
    }
  }
};
</script>
<style lang="scss">
.navlist {
  height: 260px;
  overflow: hidden;
  .item_name {
    margin-top: 10px;
    margin-left: 12px;
    font-size: 15px;
    color: #666;
  }
  .item-list {
    margin: 0 12px 12px;
    height: 52px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .special-item-list {
      //  flex:1;
      // float: left;
      flex-shrink: 0;

      width: 21.3%;
      height: 30px;
      line-height: 30px;
      padding: 3px 0;
      margin-right: 3px;
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      color: #444;
      &.active {
        color: #f03d37;
        background: #fcf0f0;
        border: 1px solid #f03d37;
      }
    }
  }
}
.special-btn{
    width:100%;
    height:60px;
     border-top: 1px solid #e5e5e5;
     margin-top: 10px;
      background: #fafafa;
      .btn{
          display: inline-block;
          height:30px;
          width:21.3%;
          margin:13px 14px;
          border:1px solid #e5e5e5;
          border-radius:6px;
          text-align:center;
          line-height:30px;
          font-size:14px;
      }
      .confirm-btn{
          float:right;
          background:#f03d37;
          border:1px solid #f03d37;
          margin-right:10px;
          color:#fff;
      }
}
</style>