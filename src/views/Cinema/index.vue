<template>
  <div>
     <Header :title="logo" />
      <div id="content">

      </div>
     <TabBar />
  </div>
</template>

<script>
export default {
  name: 'cinema',
  data(){
    return {
      logo:'酷喵影院'
    }
  }
}
</script>