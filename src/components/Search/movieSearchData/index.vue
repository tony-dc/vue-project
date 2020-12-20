<template>
  <div class="movie_list">
    <Content :title="title" :tips="tips" @handleShow="handleShow">
      <div slot="result" class="MovieItem">
        <router-link v-for="item in movieItemlist" :key="item.id" :to="'/movie/detail/'+item.id">
          <movieItem :movie="item">
            <div slot="movie_content" class="movie-info">
              <h4 class="enm line ellipsis">{{item.enm}}</h4>
              <p class="cat ellipsis">{{item.cat}}</p>
              <p class="ellipsis line">{{item.pubDesc}}</p>
            </div>
            <div class="right-info" slot="movie_item">
              <!-- 有多少人想看 -->
              <div class="wish" v-if="item.showst===1">
                <span class="wishPeople">{{item.wish}}</span>
                人想看
              </div>
              <!-- 有无评分块 -->
              <div class="score" v-if="item.globalReleased">
                <span v-if="item.sc">
                  <span class="num">{{item.sc}}</span> 分
                </span>
                <span v-if="!item.sc" class="no-sc">暂无评分</span>
              </div>
            </div>
          </movieItem>
        </router-link>
      </div>
    </Content>
  </div>
</template>
<script>
import Content from "../content";
import movieItem from "../../Movies/common/movieItem";
export default {
  name: "movieSearchData",
  data() {
    return {
      title: "电影/影视/综艺",
      isShow: true
    };
  },
  props: {
    MovieData: {
      type: Object,
      default() {
        return {};
      }
    },
    max: Number
  },
  created() {
    console.log(this.MovieData);
  },
  computed: {
    tips() {
      const total = this.MovieData.total || 0;
      if (total > this.max) {
        return "查看全部" + total + "家影视剧";
      }
      return "";
    },
    movieItemlist() {
      const list = this.MovieData.list || [];
      if (!this.isShow) {
        return list;
      }
      return list.slice(0, 3);
    }
  },
  watch: {
    MovieData(newVal) {
      if (newVal) this.isShow = true;
    }
  },
  methods: {
    handleShow(result) {
      this.isShow = result;
      this.MovieData.total = 0;
    }
  },
  components: {
    Content,
    movieItem
  }
};
</script>
<style lang="scss" scoped>
.movie_list {
  margin-top: 10px;

  .MovieItem {
   
    overflow-x: hidden;
    overflow-y: scroll;
    position: absolute;
    top: 215px;
    left: 0;
    bottom: 0;
     padding: 0 15px;
    .ellipsis {
      font-size: 13px;
      color: #666;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      margin-top: 2px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .line {
      line-height: 1.8em;
    }
  }
}
</style>