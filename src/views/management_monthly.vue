<template>
  <div>
    <div>
      <iframe width="1140" height="620" :src="iframe.src" frameborder="0" allowFullScreen="true"></iframe>
    </div>
    <!-- {{timestamp}}
    <b-container>
      <br>
      <b-row>
        <b-col cols="2">
          <div>
          </div>
        </b-col>
        <b-col cols="8">
          <b-progress :value="value" :max="max" height="3rem" show-progress animated></b-progress>
          <b-progress :max="max" height="3rem" show-progress animated>
            <b-progress-bar :value="value" :label="`${((value))}`"></b-progress-bar>
          </b-progress>
        </b-col>
        <b-col cols="2">
          Sale Amount
        </b-col>
      </b-row>
    </b-container> -->
  </div>
</template>
<script>
import apiURL from '../assets/js/connectionAPI'
import axios from 'axios'
export default {
  data () {
    return {
      apiURL: apiURL,
      value: 20,
      max: 100,
      timestamp: '',
      sales: [],
      overdue: [],
      iframe: {
        src: ''
      },
      data: []
    }
  },
  beforeCreate () {
    // var localjwt = sessionStorage.getItem('login')
    // if (localjwt !== null) {
    //   const id = JSON.parse(sessionStorage.getItem('username'))
    //   if (id.includes('management') || JSON.parse(sessionStorage.getItem('username')) === 'admin') {
    //     // console.log('accounting', JSON.parse(sessionStorage.getItem('username')).slice(0, 10))
    //   } else {
    //     location.replace('/dashboard')
    //   }
    //   // location.replace('/sale')
    // } else {
    //   location.replace('/')
    // }
  },
  created () {
    this.getOverdue()
    this.getNow()
  },
  mounted () {
    // setInterval(this.timer, 900000)
    // setInterval(this.getOverdue, 10000)
    // if (sessionStorage.getItem('login') === null) {
    //   location.replace('/')
    //   // console.log('testL')
    // }
    // setInterval(this.getNow, 1000)
    this.data = {
      session_id: 2,
      data: {}
    }
    axios.post(this.apiURL + '/emp/managements', this.data).then(response => {
      this.iframe = {
        src: response.data.data.link
      }
    })
  },
  methods: {
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
    },
    getOverdue () {
      axios.all([axios.get('http://192.168.1.46:1308/overdue')]).then(axios.spread((resSale) => {
        console.log('over1')
        this.overdue = resSale.data.data
        this.value = this.overdue.paid
        this.max = this.overdue.monthly_total_sales
        // console.log(this.overdue[0].data.paid)
        // this.sales = resSale.data.result.map((data, i) => {
        //   return {
        //     error_code: data.error_code,
        //     error_desc: data.error_desc,
        //     data: data.data.map(Overdue => {
        //       return {
        //         paid: Overdue.paid,
        //         monthly_total_sales: Overdue.monthly_total_sales
        //       }
        //     })
        //   }
        // })
      }))
    }
  },
  metaInfo () {
    return {
      title: 'Management',
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
