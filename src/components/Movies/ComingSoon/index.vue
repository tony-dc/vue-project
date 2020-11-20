<template>
  <div class="movie_body">
    <BScroll>
      <movielist :List="MovieData" />
    </BScroll>
  </div>
</template>
<script>
import movielist from "../common";
export default {
  name: "comingsoon",
  data() {
    return {
      MovieData: [],
    };
  },
  mounted() {
    const cityId = this.$store.state.city.id;
    this.$api.getComingSoonList(cityId).then((res) => {
      if (res) {
        this.MovieData = res.coming;
      }
    });
  },
  components: {
    movielist,
  },
};
</script>
