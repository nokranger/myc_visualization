<template>
  <div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="openNav ()">&times;</a>
      <a class="align-left" href="/sale"><i class="fas fa-comments-dollar"></i> Sale</a>
      <a class="align-left" href="/overdue"><i class="fas fa-user-clock"></i> Overdue</a>
      <a v-if="local === 'admin'" class="align-left" href="/setting"><i class="fas fa-cog"></i> Setting</a>
      <!-- <a v-if="local !== 'admin'" class="align-left" href="/setting"><i class="fas fa-cog"></i> Setting</a> -->
      <a class="align-left" href="/map"><i class="fas fa-map-marked-alt"></i> Map</a>
      <a class="align-left" v-on:click="logOut"><i class="fas fa-sign-out-alt"></i> Log Out</a>
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
      <!-- <b-container>
        <b-row>
          <b-col>
            aaa
          </b-col>
          <b-col>
            aaa
          </b-col>
          <b-col>
            aaa
          </b-col>
        </b-row>
      </b-container> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isTrue: true,
      symbols: '&#9776;',
      local: '',
      set: ''
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
      // console.log('log')
      localStorage.removeItem('login')
      localStorage.removeItem('set')
      localStorage.removeItem('jwt')
      location.replace('/')
    },

    closeNav () {
      document.getElementById('mySidenav').style.width = '0'
    }
  },
  mounted () {
    document.getElementById('xx').innerHTML = '<i class="fas fa-align-justify"></i>'
    this.local = JSON.parse(localStorage.login)
    // this.set = JSON.parse(localStorage.set)
    // console.log('bb', JSON.parse(localStorage.getItem('login')))
    // if (localStorage.getItem('login') === null) {
    //   // location.replace('/')
    //   console.log('testL')
    // }
  }
}
</script>
<style scoped src="@/assets/css/header.css">
</style>
