<template>
  <div class="expect-container">
    <h2 class="title">近期最受期待电影</h2>
    <div class="expect-content">
      <ul
        class="expect-wrapper"
        v-infinite-scroll="loadMoreMostExpected"
        infinite-scroll-disable="expectLoading"
        infinite-scroll-distance="20"
        infinite-scroll-throttle-delay
      >
        <li
          v-for="(item, index) in expectMovies"
          :key="index"
          class="expectItem"
        >
          <div class="poster">
            <img :src="item.img | setWH('128.168')" alt />
            <span class="wish">{{ item.wish }}人想看</span>
          </div>
          <h4 class="name">{{ item.nm }}</h4>
          <p class="date">{{ item.comingTitle }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "expect",
  data() {
    return {
      expectMovies: [],
      expectLoading: true,
      total: 0,
      //配置请求访问更多需要的参数
      expectparams: {
        ci: this.$store.state.city.id,
        limit: 10,
        offset: 0,
        token: "",
        hasMore: true,
      },
    };
  },
  methods: {
    async loadMoreMostExpected() {
      //执行函数以后滚轮禁止
      // this.expectLoading = true;
      const { hasMore, ...data } = this.expectparams;
      const params = { params: data };
      if (!hasMore) {
        this.expectLoading = true;
        return;
      }
      const res = await this.$api.getMostExpected(params);
      console.log(res)
      const { coming, paging } = res;
          this.total = paging.total;
          this.expectparams.hasMore = paging.hasMore;
          this.expectparams.offset += coming.length;
          this.expectMovies.push(...coming);
          this.expectLoading = false;
  
      //     const { coming, paging } = res;
      //     if (!hasMore) {
      //       this.expectLoading = true;
      //       return;
      //     }
      //     this.total = paging.total;
      //     this.expectparams.hasMore = paging.hasMore;
      //     this.expectparams.offset += coming.length;
      //     this.expectMovies.push(...coming);
      //     this.expectLoading = false;
      //   });
    },
  },
};
</script>
<style lang="scss" scoped>
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
      overflow-x: scroll;
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
          //   margin: 0 0 3px;
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