<template>
  <div>
    {{timestamp}}
    <b-container>
      <br>
      <b-row>
        <b-col cols="2">Total</b-col>
        <b-col cols="8">
          <div>
            <b-progress :value="value" height="3rem" show-progress animated></b-progress>
          </div>
        </b-col>
        <b-col cols="2">Monthly Setting</b-col>
      </b-row>
      <div v-for="(saless, index) in sales" :key="index">
        <br>
        <b-container>
          <b-row>
            <b-col cols="2">
              {{saless.name}}
            </b-col>
            <b-col cols="8">
              <router-link :to="'/sale/' + saless.name">
              <b-progress :value="saless.value" height="3rem" show-progress animated></b-progress>
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
      sales: []
    }
  },
  mounted () {
    setInterval(this.getNow, 1000)
    // this.getSale()
    axios.all([axios.get('http://127.0.0.1:3000/test')]).then(axios.spread((resSale) => {
      this.sales = resSale.data.result.map((data, i) => {
        return {
          name: data.name,
          value: data.value,
          max: data.max
        }
      })
      for (let i = 0; i < this.sales.length; i++) {
        console.log('aa')
        this.value = this.value + this.sales[i].value
        this.max = this.max + this.sales[i].max
        console.log(this.max)
        console.log(this.value)
      }
      // console.log(resSale.data.result.length)
    }))
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
    }
  },
  metaInfo () {
    return {
      title: 'Saler',
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
