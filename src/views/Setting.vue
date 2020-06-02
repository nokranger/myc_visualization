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
              <b-form-input v-model="monthly"></b-form-input>
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
            <b-form-input ref="salerno" v-model="saler" v-on:change="getSalerNo ()"></b-form-input>
          </div>
        </div>
      </b-col>
      <b-col>
        <div style="text-align:left;">
          <!-- <b-form-select id="month" v-model="selected" :options="options"></b-form-select> -->
          <div v-if="saler > 0">Name</div>
          <div v-for="(salers, index) in saler" :key="index">
            <b-form-input ref="salername" v-model="salersName[index]" v-on:change="getSalerName ()" style="display:inline-block"></b-form-input><br>
          </div>
        </div>
      </b-col>
      <b-col>
        <div style="text-align:left">
          <div v-if="saler > 0">
            Value
          </div>
          <div v-for="(salers, index) in saler" :key="index">
            <b-form-input ref="salervalue" v-model="salersValue[index]" v-on:change="getSalerValue ()" style="display:inline-block"></b-form-input>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col style="text-align:right">
        <div>
          Product
          <div style="display:inline-block">
            <b-form-input v-model="product"></b-form-input>
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
    <b-row>
      <b-col></b-col>
      <b-col></b-col>
      <b-col>
        <div class="align-right">
          <b-button type="button" variant="outline-primary" v-on:click="patchSetting()">Submit</b-button>
        </div>
      </b-col>
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
      monthly: null,
      saler: null,
      salersName: [],
      salersValue: [],
      product: ''
    }
  },
  mounted () {
    setInterval(this.timer, 900000)
    // console.log(localStorage.login)
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
      // console.log(this.$refs.bb.localValue)
    }
  },
  methods: {
    getSalerNo () {
      console.log(this.$refs.salerno.localValue)
      // console.log(this.$refs.aa)
      this.saler = parseInt(this.$refs.salerno.localValue, 10)
    },
    getSalerName () {
      console.log('bb', this.salersName[0])
      // console.log(this.$refs.bb[0].localValue)
      // console.log(this.$refs.bb[1].localValue)
      // console.log('aa', parseInt(this.$refs.aa.localValue, 10))
    },
    getSalerValue () {
      console.log('cc', this.salersValue[0])
    },
    timer () {
      console.log('end')
      sessionStorage.removeItem('login')
      sessionStorage.removeItem('jwt')
      window.location.reload()
    },
    patchSetting () {
      let aa = []
      aa = [{
        monthly: this.monthly,
        saler: [{
          salerNo: this.saler,
          salersName: this.salersName,
          salersValue: this.salersValue
        }],
        product: this.product
      }]
      console.log(aa)
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
.align-right {
  text-align: right;
}
</style>
