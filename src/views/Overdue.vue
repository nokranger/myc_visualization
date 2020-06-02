<template>
  <div>
    {{timestamp}}
    <b-container>
      <br>
      <b-row>
        <b-col cols="2">
          <div>
          </div>
        </b-col>
        <b-col cols="8">
          <!-- <b-progress :value="value" :max="max" height="3rem" show-progress animated></b-progress> -->
          <b-progress :max="max" height="3rem" show-progress animated>
            <b-progress-bar :value="value" :label="`${((value))}`"></b-progress-bar>
          </b-progress>
        </b-col>
        <b-col cols="2">
          Sale Amount
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      value: 20,
      max: 100,
      timestamp: '',
      sales: [],
      overdue: []
    }
  },
  created () {
    this.getOverdue()
    this.getNow()
  },
  mounted () {
    setInterval(this.timer, 900000)
    setInterval(this.getOverdue, 10000)
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
    setInterval(this.getNow, 1000)
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
      axios.all([axios.get('http://127.0.0.1:3000/overdue')]).then(axios.spread((resSale) => {
        console.log('over1')
        this.overdue = resSale.data.result
        this.value = this.overdue[0].data[0].paid
        this.max = this.overdue[0].data[0].monthly_total_sales
        // console.log(this.overdue[0].data.paid)
        this.sales = resSale.data.result.map((data, i) => {
          return {
            error_code: data.error_code,
            error_desc: data.error_desc,
            data: data.data.map(Overdue => {
              return {
                paid: Overdue.paid,
                monthly_total_sales: Overdue.monthly_total_sales
              }
            })
          }
        })
        // console.log('ss', this.sales[0].data[0].paid)
        // for (let i = 0; i < this.sales.length; i++) {
        //   this.overdue = [{
        //     error_code: this.sales[i].error_code,
        //     error_desc: this.sales[i].error_desc,
        //     data: this.sales[i].data.map(overdueItem => {
        //       return {
        //         paid: overdueItem.paid,
        //         monthly_total_sales: overdueItem.monthly_total_sales
        //       }
        //     })
        //   }]
        // }
        // console.log('ov', this.overdue.data)
        // this.value = this.sales[0].data
        // for (let i = 0; i < this.sales.length; i++) {
        //   // console.log('aa')
        //   this.value = this.value + this.sales[i].value
        //   this.max = this.max + this.sales[i].max
        //   // console.log(this.max)
        //   // console.log(this.value)
        // }
        // console.log(resSale.data.result.length)
      }))
    }
  },
  metaInfo () {
    return {
      title: 'Overdue',
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
