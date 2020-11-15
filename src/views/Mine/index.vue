<template>
  <div>
      <Header title='登录酷喵' />
      <div id="content">
         <router-view></router-view>
      </div>
      <TabBar />
  </div>
</template>

<script>
export default {
  name: 'movie',
}
</script>