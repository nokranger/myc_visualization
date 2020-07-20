<template>
<div>
  <div v-if="local === '1'">
    <div>
      Setting
    </div>
    <app-brands></app-brands>
    <br>
    <app-brandsg></app-brandsg>
    <br>
    <app-sale></app-sale>
    <br>
    <app-account></app-account>
  </div>
  <div v-if="local === '0'">
    <app-changepassword></app-changepassword>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import changePassword from './changePassword'
import brands from '../components/brands'
import brandsg from '../components/brandsGroup'
import sales from '../components/sales'
import account from '../components/account'
export default {
  components: {
    'app-changepassword': changePassword,
    'app-brands': brands,
    'app-brandsg': brandsg,
    'app-sale': sales,
    'app-account': account
  },
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
      product: '',
      datas: [],
      dataSetting: [],
      local: ''
    }
  },
  mounted () {
    // setInterval(this.timer, 900000)
    // console.log(localStorage.login)
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
      // console.log(this.$refs.bb.localValue)
    }
    this.local = sessionStorage.getItem('level')
    // setTimeout(this.getSetting, 3000)
  },
  methods: {
    getSetting () {
      this.datas = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {}
      }
      console.log('test post')
      axios.post('http://192.168.43.190:1308/setting', this.datas).then(response => {
        console.log('res')
        console.log(response)
        this.dataSetting = {
          monthly_sales_target: response.data.data.monthly_sales_target,
          saler_list: response.data.data.saler_list
        }
      })
    },
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
    patchSetting (index) {
      // console.log(this.$refs.sellername[index].localValue)
      // console.log(this.$refs.sellercode[index].localValue)
      // console.log(this.$refs.sellervalue[index].localValue)
      let settingCode = []
      // settingCode = {
      //   session_id: JSON.parse(sessionStorage.getItem('login')),
      //   monthly_sales_target: this.dataSetting.monthly_sales_target,
      //   saler_list: [{
      //     code: this.$refs.sellercode[index].localValue,
      //     value: 22,
      //     salersValue: this.salersValue
      //   }]
      //   // product: this.product
      // }
      settingCode = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          code: this.$refs.sellercode[index].localValue,
          sales_target: this.$refs.sellervalue[index].localValue
        }
        // product: this.product
      }
      console.log(settingCode)
      axios.all([axios.patch('http://192.168.43.190:1308/setting/saler/update_sales_target', settingCode)]).then(axios.spread((resSetting) => {
        console.log(resSetting)
      }))
    },
    patchMonthly () {
      console.log(this.$refs.monthly.localValue)
      let settingMonthly = []
      settingMonthly = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          monthly_sales_target: this.$refs.monthly.localValue
        }
        // product: this.product
      }
      axios.all([axios.patch('http://192.168.43.190:1308/setting/monthly_sales_target', settingMonthly)]).then(axios.spread((resSetting) => {
        console.log(resSetting)
      }))
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
