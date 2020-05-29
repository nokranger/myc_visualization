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
export default {
  data () {
    return {
      value: 20,
      max: 100,
      timestamp: ''
    }
  },
  mounted () {
    setInterval(this.timer, 900000)
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
