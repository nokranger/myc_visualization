<template>
<div>
  <meta charset="utf-8">
  <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
  <div v-if="local === '1'">
    <div>
      Setting
    </div>
    <div>
      <b-container>
          <b-tabs content-class="mt-3" fill>
          <b-tab title="Brand" active>
            <app-brands></app-brands>
          </b-tab>
          <b-tab title="Brand Group">
            <app-brandsg></app-brandsg>
          </b-tab>
          <b-tab title="Seller">
            <app-sale></app-sale>
          </b-tab>
          <b-tab title="Account">
            <app-account></app-account>
          </b-tab>
          <b-tab title="Custimer Location">
            <app-location></app-location>
          </b-tab>
        </b-tabs>
      </b-container>
    </div>
  </div>
  <div v-if="local === '0'">
    <app-changepassword></app-changepassword>
  </div>
</div>
</template>
<script>
// import axios from 'axios'
import changePassword from './changePassword'
import brands from '../components/brands'
import brandsg from '../components/brandsGroup'
import sales from '../components/sales'
import account from '../components/account'
import customerlocation from '../components/customerLocation'
export default {
  components: {
    'app-changepassword': changePassword,
    'app-brands': brands,
    'app-brandsg': brandsg,
    'app-sale': sales,
    'app-account': account,
    'app-location': customerlocation
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
  beforeCreate () {
    var localjwt = sessionStorage.getItem('login')
    if (localjwt !== null) {
    } else {
      location.replace('/')
    }
  },
  mounted () {
    this.local = sessionStorage.getItem('level')
  },
  methods: {
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
