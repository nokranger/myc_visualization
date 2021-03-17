<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="openNav ()">&times;</a>
      <a class="align-left" href="/dashboard"><i class="fas fa-comments-dollar"></i> Dashboard</a>
      <a v-if="local === '0' && accounting === 1" class="align-left" href="/accounting"><i class="fas fa-user-clock"></i> Accounting</a>
      <a v-else-if="local === '1'" class="align-left" href="/accounting"><i class="fas fa-user-clock"></i> Accounting</a>
      <a v-if="local === '0' && management === 1" class="align-left" href="/management"><i class="fas fa-map-marked-alt"></i> Management</a>
      <a v-else-if="local === '1'" class="align-left" href="/management"><i class="fas fa-map-marked-alt"></i> Management</a>
      <a v-if="local === '0' && marketing === 1" class="align-left" href="/marketing"><i class="fas fa-user-alt"></i> Marketing</a>
      <a v-else-if="local === '1'" class="align-left" href="/marketing"><i class="fas fa-user-alt"></i> Marketing</a>
      <!-- <a v-if="local === '0' || '1' && (accounting === 1 || marketing === 1 || purchase === 1 || management === 1)" class="align-left" href="/inventory"><i class="fas fa-archive"></i> Inventory</a> -->
      <a v-if="local === '0' && sales === 1" class="align-left" href="/sale"><i class="fas fa-comments-dollar"></i> Sale</a>
      <a v-else-if="local === '1'" class="align-left" href="/sale"><i class="fas fa-comments-dollar"></i> Sale</a>
      <a v-if="local === '1' || '0'" class="align-left" href="/setting"><i class="fas fa-cog"></i> Setting</a>
      <a class="align-left" href="#" v-on:click="logOut"><i class="fas fa-sign-out-alt"></i> Log Out</a>
    </div>
    <div>
      <br>
      <b-container class="bv-example-row bv-example-row-flex-cols">
        <b-row>
          <b-col align-self="start"></b-col>
          <b-col align-self="center"></b-col>
          <b-col class="align-right" align-self="end"><span style="font-size:30px;cursor:pointer" v-on:click="openNav ()"><div id="xx"></div></span></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      isTrue: true,
      symbols: '&#9776;',
      local: '',
      set: '',
      datas: [],
      purchase: '',
      management: '',
      accounting: '',
      marketing: '',
      sales: ''
    }
  },
  methods: {
    openNav () {
      var el = document.getElementById('mySidenav')
      if (el.style.width === '250px') {
        el.style.width = '0px'
        // this.symbols = '&#9776;'
        document.getElementById('xx').innerHTML = '<i class="fas fa-align-justify"></i>'
      } else {
        el.style.width = '250px'
        document.getElementById('xx').innerHTML = '<i class="fas fa-align-right"></i>'
      }
    },
    logOut () {
      // console.log(JSON.parse(sessionStorage.getItem('login')))
      this.datas = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {}
      }
      console.log(this.datas)
      axios.post('http://192.168.10.2:1308/logout', this.datas)
        .then(response => {
          console.log(response)
          if (response.data.error_code === 0) {
            console.log('logout')
            sessionStorage.removeItem('login')
            sessionStorage.removeItem('level')
            location.replace('/')
          } else if (response.data.error_code === 201) {
            sessionStorage.removeItem('login')
            sessionStorage.removeItem('level')
            location.replace('/')
          }
        }).catch(e => {
          // this.error.push(e)
        })
    },

    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    }
  },
  mounted () {
    console.log('aaa' + JSON.parse(sessionStorage.getItem('login')))
    console.log('username: ' + JSON.parse(sessionStorage.getItem('username')))
    console.log(JSON.parse(sessionStorage.getItem('level')))
    document.getElementById('xx').innerHTML = '<i class="fas fa-align-justify"></i>'
    if (sessionStorage.getItem('login') === null) {
      // this.local = JSON.parse(sessionStorage.login)
      console.log('null')
    } else if (sessionStorage.getItem('level') === '1') {
      for (let i = 0; i < 10; i++) {
        if (('sales0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.sales = 1
          console.log('this is sales0' + i)
        } else if (('accounting0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.accounting = 1
        } else if (('purchase0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.purchase = 1
        } else if (('management0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.management = 1
        } else if (('marketing0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.marketing = 1
        }
      }
      console.log('admin login')
      this.local = sessionStorage.getItem('level')
    } else if (sessionStorage.getItem('level') === '0') {
      this.local = sessionStorage.getItem('level')
      console.log('userlogin')
      for (let i = 0; i < 10; i++) {
        if (('sales0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.sales = 1
        } else if (('accounting0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.accounting = 1
        } else if (('purchase0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.purchase = 1
        } else if (('management0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.management = 1
        } else if (('marketing0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.marketing = 1
        }
      }
    }
  }
}
</script>
<style scoped src="@/assets/css/header.css">
</style>
