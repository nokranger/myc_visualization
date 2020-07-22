<template>
<div>
  <div v-if="local == '1'">
    Map Admin
  </div>
  <div v-else-if="local == '0'">
    Map User
    <div>
      <iframe width="1020" height="680" :src="iframe.src" frameborder="0" allowFullScreen="true"></iframe>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      local: '',
      value: 0,
      max: 0,
      timestamp: '',
      sales: [],
      colors: 'radial-gradient(circle, rgba(20,94,238,0.6867121848739496) 0%, rgba(173,245,255,1) 100%)',
      iframe: {
        src: ''
      },
      data: []
    }
  },
  mounted () {
    // setInterval(this.timer, 900000)
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
    this.local = JSON.parse(sessionStorage.level)
    this.data = {
      session_id: JSON.parse(sessionStorage.getItem('login')),
      data: {}
    }
    axios.post('http://192.168.43.190:1308/map', this.data).then(response => {
      this.iframe = {
        src: response.data.data.link
      }
    })
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
