<template>
  <div class="movie_body">
     <keep-alive>
         <Expected />
     </keep-alive>
    <Movielist />
  </div>
</template>
<script>
import Expected from "./expect";
import Movielist from "./moreComing";
export default {
  name: "comingsoon",
  data() {
    return {
      MovieData: []
    };
  },
  components: {
    Movielist,
    Expected
  }
};
</script>
<style lang="scss" scoped>
.movie_body {
  position: absolute;
  top: 95px;
  left: 0;
  right: 0;
  bottom: 45px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

