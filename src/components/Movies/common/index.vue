<template>
  <ul>
    <router-link to='/movie/detail' v-for="(item, index) in List" :key="index">
      <common :movie="item">
        <div class="movie-item-info" slot="movie_content">
          <div class="movie-same movie-vote" v-if="item.globalReleased">
            观众评
            <span class="grade">{{ item.sc }}</span>
          </div>
          <div v-else class="movie-same person_wantSee">
            <span class="person">{{ item.wish }}人想看</span>
          </div>
          <div class="movie-same movie-star ellipsis">主演：{{ item.star }}</div>
          <div class="movie-same movie-showtime">
            {{ item.showInfo || `${item.rt} 上映` }}
          </div>
        </div>
      </common>
    </router-link>
  </ul>
</template>
<script>
import movies_common from "./movieItem";
export default {
  name: "nowplaying",
  props: ["List"],
  components: {
    common: movies_common,
  }
};
</script>
<style lang="scss" scoped>
.movie-item-info {
  overflow: hidden;
  .movie-same {
    margin-top: 3px;
    font-size: 13px;
    color: #666;
  }
  .grade,
  .person {
    font-weight: 700;
    color: #faaf00;
    font-size: 15px;
  }
  .ellipsis{
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
  }
}
</style>