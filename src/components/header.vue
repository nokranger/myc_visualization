<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="openNav ()">&times;</a>
      <a class="align-left" href="/sale"><i class="fas fa-comments-dollar"></i> Sale</a>
      <a class="align-left" href="/overdue"><i class="fas fa-user-clock"></i> Overdue</a>
      <a v-if="local === '1'" class="align-left" href="/setting"><i class="fas fa-cog"></i> Setting</a>
      <!-- <a v-if="local !== 'admin'" class="align-left" href="/setting"><i class="fas fa-cog"></i> Setting</a> -->
      <a class="align-left" href="/map"><i class="fas fa-map-marked-alt"></i> Map</a>
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
      datas: []
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
      axios.post('http://192.168.1.46:1308/logout', this.datas)
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
    console.log(JSON.parse(sessionStorage.getItem('login')))
    console.log('aa', this.$route.params)
    document.getElementById('xx').innerHTML = '<i class="fas fa-align-justify"></i>'
    if (sessionStorage.getItem('login') === null) {
      // this.local = JSON.parse(sessionStorage.login)
      console.log('null')
    } else if (sessionStorage.getItem('level') === '1') {
      console.log('admin')
      this.local = sessionStorage.getItem('level')
    }
  }
}
</script>
<style scoped src="@/assets/css/header.css">
</style>
