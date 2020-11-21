<template>
  <div class="movie_body">
    <Expected />
    <Movielist />
        <!-- <BScroll>
      <movielist :List="MovieData" />
    </BScroll> -->
  </div>
</template>
<script>
import Expected from './expect'
import Movielist from "../common";
export default {
  name: "comingsoon",
  data() {
    return {
      MovieData: [],
    };
  },
  // mounted() {
  //   const cityId = this.$store.state.city.id;
  //   this.$api.getComingSoonList(cityId).then((res) => {
  //     if (res) {
  //       this.MovieData = res.coming;
  //     }
  //   });
  // },
  components: {
    Movielist,
    Expected
  },
};
</script>
