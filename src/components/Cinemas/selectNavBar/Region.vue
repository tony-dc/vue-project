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
            :key="item.name"
            @touchstart="handleChangeItem(item,currentIndex,index)"
          >{{item.name}}({{item.count}})</div>
        </aside>
        <section class="region-list-content">
          <ul>
            <li
              class="itemListInfo"
              v-for="item in currentSub"
              :key="item.id"
              @touchstart="handleChoose(item,currentIndex)"
            >
              <span>{{item.name}}</span>
              <span>{{item.count}}</span>
            </li>
          </ul>
        </section>
      </section>
    </div>
  </div>
</template>
<script>
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
    // 返回当前选中对应索引
    currentTab() {
      return this.tabs[this.currentIndex];
    },
    //通过计算属性获得点击的元素对应数据
    sidenav() {
      const { currentTab, regionData } = this;
      return regionData[currentTab.title];
    }
  },
  methods: {
    //handleTochange方法是为了改变切换选中索引
    handleTochange(index) {
      this.currentIndex = index;
    }
  },
  created() {
    console.log(this.regionData, this.sidenav);
  }
};
</script>
<style lang="scss">

</style>