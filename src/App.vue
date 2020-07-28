<template>
  <div id="app" v-bind:style="cssProps">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.0/css/all.css"  crossorigin="anonymous">
    <div v-if="name === 'login'">
    </div>
    <!-- <div v-else-if="name === 'change'">
    </div> -->
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
      colors: 'radial-gradient(circle, rgba(20,94,238,0.6867121848739496) 0%, rgba(173,245,255,1) 100%)',
      heights: '1200px',
      imgH: '../assets/Page Home_Manoyont.png',
      cssProps: {
        backgroundImage: `url(${require('@/assets/Home_Manoyont.png')})`,
        width: '100%',
        maxWidth: '100%',
        backgroundPosition: 'center',
        height: 'auto',
        objectFit: 'contain',
        backgroundSize: 'cover',
        position: 'relative'
      }
    }
  },
  created () {
  },
  mounted () {
    console.log(window.location.pathname)
    if (window.location.pathname === '/') {
      // console.log(screen.height)
      this.name = 'login'
      this.cssProps.height = 1025 + 'px'
      console.log('login')
    } else if (window.location.pathname === '/sale') {
      this.cssProps.height = '1025px'
    } else if (window.location.pathname === '/overdue') {
      this.cssProps.height = '1025px'
    } else if (window.location.pathname === '/map') {
      this.cssProps.height = '1025px'
    } else if (window.location.pathname === '/setting') {
      // console.log(scrollbars.screen)
      this.cssProps.height = 'auto'
    } else if (window.location.pathname === '/changepassword') {
      // console.log(scrollbars.screen)
      this.cssProps.height = '1025px'
      // this.name = 'change'
    } else if (window.location.pathname === '/register') {
      // console.log(scrollbars.screen)
      this.cssProps.height = '1025px'
      // this.name = 'change'
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
