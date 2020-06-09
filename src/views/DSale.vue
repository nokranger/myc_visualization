<template>
  <div v-bind:style="{background: colors, width: '100%', height: '5000px'}">
    {{timestamp}}
    <b-container>
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
              <!-- <b-progress :value="saless.value" :max="saless.max" height="3rem" :label="'${(value)}'" show-progress animated></b-progress> -->
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
    </b-container>
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
      colors: 'radial-gradient(circle, rgba(20,94,238,0.6867121848739496) 0%, rgba(173,245,255,1) 100%)'
    }
  },
  created () {
    this.getNow()
  },
  mounted () {
    console.log('sale', this.$route.params)
    setInterval(this.timer, 900000)
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
    setInterval(this.getNow, 1000)
    // this.getSale()
    axios.all([axios.get('http://192.168.1.46:1308/sales')]).then(axios.spread((resSale) => {
      console.log(resSale.data.data)
      this.sales = {
        max: resSale.data.data.sales_target,
        value: resSale.data.data.total_sales,
        saler_list: resSale.data.data.saler_list
      }
      // console.log(this.sale)
      this.max = this.sales.max
      this.value = this.sales.value
      console.log(this.sales.saler_list[0].sales_target)
      // console.log(this.max)
      // this.sales = resSale.data.data.map((data, i) => {
      //   return {
      //     // name: data.name,
      //     // value: data.value,
      //     // max: data.max
      //   }
      // })
      // for (let i = 0; i < this.sales.length; i++) {
      //   // console.log('aa')
      //   this.value = this.value + this.sales[i].value
      //   this.max = this.max + this.sales[i].max
      //   // console.log(this.max)
      //   // console.log(this.value)
      // }
      // console.log(resSale.data.result.length)
    }))
    // console.log('ds', localStorage.getItem('login'))
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
