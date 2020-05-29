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
    setInterval(this.timer, 900000)
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
    this.local = JSON.parse(sessionStorage.login)
  },
  methods: {
    timer () {
      console.log('end')
      sessionStorage.removeItem('login')
      sessionStorage.removeItem('jwt')
      window.location.reload()
    }
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
