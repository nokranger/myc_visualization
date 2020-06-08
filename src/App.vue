<template>
  <div id="app" v-bind:style="{background: colors, width: '100%', height: '1200px'}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.0/css/all.css"  crossorigin="anonymous">
    <div v-if="name === 'login'">
    </div>
    <div v-else>
      <app-header></app-header>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
import Header from './components/header'
export default {
  components: {
    'app-header': Header
  },
  data () {
    return {
      name: '',
      colors: 'radial-gradient(circle, rgba(20,94,238,0.6867121848739496) 0%, rgba(173,245,255,1) 100%)'
    }
  },
  created () {
  },
  mounted () {
    console.log(window.location.pathname)
    if (window.location.pathname === '/') {
      this.name = 'login'
      console.log('login')
    }
    // console.log(this.name)
  },
  methods: {
    closeTab () {
      // localStorage.removeItem('login')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
