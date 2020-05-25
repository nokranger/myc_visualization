<template>
  <div v-if="local == 'admin'">
    Map Admin
  </div>
  <div v-else-if="local == 'user'">
    Map User
  </div>
</template>
<script>
export default {
  data () {
    return {
      local: ''
    }
  },
  mounted () {
    if (localStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
    this.local = JSON.parse(localStorage.login)
  },
  metaInfo () {
    return {
      title: 'Map',
      titleTemplate: '%s - MYC'
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
div {
  font-family: 'Kanit', sans-serif;
  font-size: 30px;
}
</style>
