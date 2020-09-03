<template>
  <div>
    <iframe width="1020" height="680" :src="iframe.src" frameborder="0" allowFullScreen="true"></iframe>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
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
  created () {
    this.getNow()
  },
  mounted () {
    console.log('sale', this.$route.params)
    // setInterval(this.timer, 900000)
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
    setInterval(this.getNow, 1000)
    this.data = {
      session_id: JSON.parse(sessionStorage.getItem('login')),
      data: {}
    }
    axios.post('http://192.168.10.2:1308/hr', this.data).then(response => {
      console.log('res')
      console.log(response)
      this.iframe = {
        src: response.data.data.link
      }
    })
  },
  methods: {
    getSale () {
    },
    getNow () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      this.timestamp = dateTime
    },
    timer () {
      console.log('end')
      sessionStorage.removeItem('login')
      sessionStorage.removeItem('jwt')
      window.location.reload()
    }
  },
  metaInfo () {
    return {
      title: 'HR',
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
