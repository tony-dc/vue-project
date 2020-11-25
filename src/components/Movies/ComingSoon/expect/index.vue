<template>
  <div class="expect-container">
    <h2 class="title">近期最受期待电影</h2>
    <div class="expect-content">
      <BScroll :scrolltype="scrolltype" :Passthrough="Passthrough" :handledownload="handleToscroll"
      :data='expectMovies'
      ref="scroll"
      >
        <ul class="expect-wrapper" ref="expectWrapper">
          <router-link :to="path+item.id" v-for="(item, index) in expectMovies" :key="index" class="expectItem">
            <div class="poster">
              <img :src="item.img | setWH('128.168')" alt />
              <span class="wish">{{ item.wish }}人想看</span>
            </div>
            <h4 class="name">{{ item.nm }}</h4>
            <p class="date">{{ item.comingTitle }}</p>
          </router-link>
        </ul>
      </BScroll>
    </div>
  </div>
</template>
<script>
export default {
  name: "expect",
  data() {
    return {
      path:'/movie/detail/',
      expectMovies: [],
      expectLoading: false,
      total: 0,
      scrolltype: true,
      Passthrough: "vertical",
      hasMore: true,
      //配置请求访问更多需要的参数
      expectparams: {
        ci: this.$store.state.city.id,
        limit: 10,
        offset: 0,
        token: ""
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async handleToscroll(pos) {
      const width = this.$refs.expectWrapper.offsetWidth;
      if (pos.x < -(width / 2)) {
        if(this.expectparams.offset==34) return
        this.getList();
      }
    },
    async getList() {
      const { ...data } = this.expectparams;
      const params = { params: data };
      const result = await this.$api.getMostExpected(params);
      const { coming, paging } = result;
      if (coming) {
        this.total = paging.total;
        this.hasMore = paging.hasMore;
        this.expectparams.offset += coming.length;
        this.expectMovies.push(...coming);
        this.$refs.expectWrapper.style.width =
        this.expectMovies.length * 95 + "px";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: none;
}
.expect-container {
  padding: 10px 0 10px 4px;
  margin-bottom: 10px;
  background: #fff;
  border-bottom: 1px solid rgba(233, 233, 233, 0.8);
  .title {
    margin: 0 0 12px;
    font-size: 14px;
    color: #333;
  }
  .expect-content {
    height: 160px;
    width: 100%;
    overflow: hidden;
    .expect-wrapper {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      &::-webkit-scrollbar {
        display: none;
      }
      .expectItem {
        display: inline-block;
        width: 85px;
        overflow: hidden;
        margin-right: 10px;
        .poster {
          width: 85px;
          height: 115px;
          position: relative;
          margin-bottom: 6px;
          img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
          .wish {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 3px 0;
            width: 100%;
            color: #faaf00;
            font-size: 11px;
            text-align: center;
            background: rgba(0, 0, 0, 0.2);
          }
        }
        .name {
          font-size: 10px;
          color: #222;
        }
        .date {
          margin: 0;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>