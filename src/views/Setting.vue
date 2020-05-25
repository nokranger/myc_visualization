<template>
  <div>
    Setting
  <b-container>
    <b-row>
      <b-col>
        <div>
          <div style="text-align:right">
            Monthly
          </div>
        </div>
      </b-col>
      <b-col>
        <div style="text-align:left">
          <b-form-select id="month" v-model="selected" :options="options"></b-form-select>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col>
        <div style="text-align:right">
          Saler Name
        </div>
      </b-col>
      <b-col>
        <div style="text-align:left">
          <b-form-select id="month" v-model="selected" :options="options"></b-form-select>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col style="text-align:right">
        <div>
          Product
        </div>
      </b-col>
      <b-col style="text-align:left">
        <div>
          <b-form-select id="month" v-model="selected" :options="options"></b-form-select>
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: null,
      options: [
        {
          value: null, text: 'Jan'
        },
        {
          value: 1, text: 'Fab'
        }
      ]
    }
  },
  mounted () {
    // console.log(localStorage.login)
    if (localStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
  },
  metaInfo () {
    return {
      title: 'Setting',
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
