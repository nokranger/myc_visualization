<template>
  <div>
    <!-- {{timestamp}} -->
    <iframe width="1020" height="680" :src="iframe.src" frameborder="0" allowFullScreen="true"></iframe>
    <!-- <b-container>
      <br>
      <b-row>
        <b-col cols="2">Total</b-col>
        <b-col cols="8">
          <div>
            <b-progress :max="max" height="3rem" show-progress animated>
              <b-progress-bar :value="value" :label="`${((value))}`"></b-progress-bar>
            </b-progress>
          </div>
        </b-col>
        <b-col cols="2">Monthly Setting</b-col>
      </b-row>
      <div v-for="(saless, index) in sales.saler_list" :key="index">
        <br>
        <b-container>
          <b-row>
            <b-col cols="2">
              {{saless.name}}
            </b-col>
            <b-col cols="8">
              <router-link :to="'/sale/' + saless.code">
                <b-progress :max="saless.sales_target" height="3rem" show-progress animated>
                  <b-progress-bar :value="saless.sales_values" :label="`${((saless.sales_values))}`"></b-progress-bar>
                </b-progress>
              </router-link>
            </b-col>
            <b-col cols="2">
              {{saless.max}}
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-container> -->
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
    axios.post('http://192.168.43.190:1308/sale', this.data).then(response => {
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
      title: 'Seller',
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
