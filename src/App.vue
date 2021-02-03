<template>
  <div id="app" :style="cssProps">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.0/css/all.css"  crossorigin="anonymous">
    <div v-if="name === 'login'">
    </div>
    <div v-else>
      <app-header></app-header>
    </div>
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
      windows: {
        width: 0,
        height: 0
      },
      name: '',
      colors: 'radial-gradient(circle, rgba(20,94,238,0.6867121848739496) 0%, rgba(173,245,255,1) 100%)',
      heights: '1200px',
      imgH: '../assets/Page Home_Manoyont.png',
      cssProps: {
        backgroundImage: `url(${require('@/assets/Home_Manoyont.png')})`,
        width: 0,
        backgroundPosition: 'center',
        height: 0,
        backgroundSize: 'cover'
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {
    console.log('aaaa', this.cssProps.height)
    console.log('bbbb', this.cssProps.width)
    // console.log(this.window.width)
    console.log(window.location.pathname)
    if (window.location.pathname === '/') {
      // console.log(screen.height)
      this.name = 'login'
      // this.cssProps.height = this.window.height
      // console.log('ssssss', this.cssProps.height)
      // if (screen.height >= ) {
      //   this.cssProps.height = '1400px'
      // } else {
      //   this.cssProps.height = '1400px'
      // }
    } else if (window.location.pathname === '/sale') {
      // if (screen.height >= 1080) {
      //   this.cssProps.height = 'auto'
      // } else {
      //   this.cssProps.height = '1400px'
      // }
    } else if (window.location.pathname === '/overdue') {
      // if (screen.height >= 1080) {
      //   this.cssProps.height = 'auto'
      // } else {
      //   this.cssProps.height = '1400px'
      // }
    } else if (window.location.pathname === '/map') {
      // console.log(screen.height)
      // if (screen.height >= 1080) {
      //   this.cssProps.height = 'auto'
      // } else {
      //   this.cssProps.height = '1400px'
      // }
    } else if (window.location.pathname === '/setting') {
      // if (screen.height >= 1080) {
      //   this.cssProps.height = 'auto'
      // } else {
      //   this.cssProps.height = '1400px'
      // }
    } else if (window.location.pathname === '/changepassword') {
      // if (screen.height >= 1080) {
      //   this.cssProps.height = 'auto'
      // } else {
      //   this.cssProps.height = '1400px'
      // }
    } else if (window.location.pathname === '/register') {
      // if (screen.height >= 1080) {
      //   this.cssProps.height = 'auto'
      // } else {
      //   this.cssProps.height = '1400px'
      // }
    }
    // console.log(this.name)
  },
  methods: {
    closeTab () {
      // localStorage.removeItem('login')
    },
    handleResize () {
      this.cssProps.width = window.innerWidth + 'px'
      this.cssProps.height = window.innerHeight + 'px'
    }
  },
  computed: {
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
