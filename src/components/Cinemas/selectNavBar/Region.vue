<template>
  <div class="tab-main">
    <div class="region-nav">
      <ul class="region-tab">
        <li
          class="region-item"
          v-for="(item,index) in tabs"
          :key="item.title"
          :class="currentIndex===index?'active':''"
          @touchstart="handleTochange(index)"
        >{{item.name}}</li>
      </ul>
      <section class="region-list">
        <aside class="leftnav" v-if="sidenav">
          <div
            class="district-item"
            v-for="(item,index) in sidenav.subItems"
            :key="item.id"
            @touchstart="handleChangeItem(item,currentIndex,index)"
            :class="{active:item.id===currentCate.index}"
          >{{item.name}}({{item.count}})</div>
        </aside>
        <section class="region-list-content">
          <div
            class="itemListInfo"
            v-for="item in currentItemlist"
            :key="item.id"
            @touchstart="handleChoose(item,currentIndex)"
            :class="{active:item.id===currentCate.subIndex}"
          >{{item.name}}{{item.count}}</div>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Region",
  data() {
    return {
      currentIndex: 0,
      tabs: [
        {
          title: "district",
          name: "商圈"
        },
        {
          title: "subway",
          name: "地铁站"
        }
      ]
      // currentItemlist: []
    };
  },
  props: {
    regionData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    ...mapState("city", ["filters", "currentItemlist"]),
    // 返回当前选中对应索引
    currentTab() {
      return this.tabs[this.currentIndex];
    },
    //通过计算属性获得点击的元素对应数据
    sidenav() {
      const { currentTab, regionData } = this;
      return regionData[currentTab.title];
    },
    cate() {
      const { districtId, areaId, lineId, stationId } = this.filters;
      return [
        {
          type: "districtId",
          subType: "areaId",
          index: districtId,
          subIndex: areaId
        },
        {
          type: "lineId",
          subType: "stationId",
          index: lineId,
          subIndex: stationId
        }
      ];
    },
    currentCate() {
      return this.cate[this.currentIndex];
    }
  },
  methods: {
    ...mapMutations("city", ["changeFilter"]),
    //handleTochange方法是为了改变切换选中索引
    handleTochange(index) {
      this.currentIndex = index;
      // this.$emit('change')
    },
    handleChangeItem(item, currentIndex, index) {
      this.currentCate.index = item.id;
      this.cate[currentIndex].index = item.id;
      if (currentIndex === 0) {
        this.$store.commit("city/updateAdd", item.subItems);
        if (index === 0) {
          const cate = this.cate[currentIndex];
          let params = {};
          params[cate.type] = -1;
          params[cate.subType] = -1;
          this.changeFilter({ ...params, offset: 0 });
          this.$emit("close");
          this.$store.dispatch("city/getCinemaList");
        }
      }else{
         this.$store.commit("city/updateAdd", '');
        if (index === 0) {
          const cate = this.cate[currentIndex];
          let params = {};
          params[cate.type] = -1;
          params[cate.subType] = -1;
          this.changeFilter({ ...params, offset: 0 });
          // this.$emit("close");
          // this.$store.dispatch("city/getCinemaList");
        }
      }
    },
    handleChoose(item, currentIndex) {
      if (currentIndex === 0) {
        let params = {};
        this.currentCate.subIndex = item.id;
        this.cate[currentIndex].subIndex = item.id;
        this.cate.forEach(item => {
          params[item.type] = item.index;
          params[item.subType] = item.subIndex;
        });
        this.changeFilter({ ...params, offset: 0 });
        this.$emit("close");
        this.$store.dispatch("city/getCinemaList");
      }
    }
  },
  created() {
    // console.log(this.regionData, this.sidenav);
  }
};
</script>
<style lang="scss">
.tab-main {
  .region-nav {
    height: 44px;
    background-color: #fff;
    z-index: 999;
    .region-tab {
      display: flex;
      justify-content: space-evenly;
      height: 100%;
      .region-item {
        position: relative;
        flex: 1;
        color: #666;
        text-align: center;
        padding: 0 10px;
        height: 100%;
        line-height: 44px;
        &.active {
          color: #f03d37;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 90%;
            border-bottom: 2px solid #f03d37;
          }
        }
      }
    }
    .region-list {
      display: flex;
      height: 300px;
      background-color: #f5f5f5;
      .leftnav {
        width: 35%;
        height: 100%;
        background-color: #f5f5f5;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        .district-item {
          padding: 0px 15px;
          height: 44px;
          line-height: 44px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          background-color: #fff;
          &.active {
            color: #f03d37;
            background-color: #f5f5f5;
          }
        }
      }
      .region-list-content {
        position: relative;
        flex: 1;
        overflow: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
        // ul {
        //   position: relative;
        //   overflow-y: scroll;
        .itemListInfo {
          position: relative;
          height: 44px;
          line-height: 44px;
          padding: 0 15px;
          &.active {
            color: #f03d37;
          }
        }
        // }
      }
    }
  }
}
</style>