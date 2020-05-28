<template>
  <div>
    Setting
  <b-container>
    <b-row>
      <b-col>
        <div>
          <div style="text-align:right">
            Monthly
            <div style="display:inline-block">
              <b-form-input></b-form-input>
            </div>
          </div>
        </div>
      </b-col>
      <b-col>
        <div style="text-align:left">
          <!-- <b-form-select id="month" v-model="selected" :options="options"></b-form-select> -->
        </div>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col>
        <div style="text-align:right">
          Saler
          <div style="display:inline-block">
            <b-form-input ref="aa" v-on:change="aa ()"></b-form-input>
          </div>
        </div>
      </b-col>
      <b-col>
        <div style="text-align:left;">
          <!-- <b-form-select id="month" v-model="selected" :options="options"></b-form-select> -->
          <div v-if="test > 0">Name</div>
          <div v-for="(tests, index) in test" :key="index">
            <b-form-input style="display:inline-block"></b-form-input><br>
          </div>
        </div>
      </b-col>
      <b-col>
        <div style="text-align:left">
          <div v-if="test > 0">
            Value
          </div>
          <div v-for="(tests, index) in test" :key="index">
            <b-form-input style="display:inline-block"></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col style="text-align:right">
        <div>
          Product
          <div style="display:inline-block">
            <b-form-input></b-form-input>
          </div>
        </div>
      </b-col>
      <b-col style="text-align:left">
        <div>
          <!-- <b-form-select id="month" v-model="selected" :options="options"></b-form-select> -->
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
      ],
      test: 0
    }
  },
  mounted () {
    // console.log(localStorage.login)
    if (localStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
  },
  methods: {
    aa () {
      console.log(this.$refs.aa.localValue)
      this.test = parseInt(this.$refs.aa.localValue, 10)
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
