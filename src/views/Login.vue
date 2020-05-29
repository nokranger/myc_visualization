<template>
  <div>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
    <b-container>
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
        <b-col cols="12" sm="12" md="12" lg="6" xl="6">
          <br>
          <div>
            <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;">Login</strong>
            <br>
            <br>
            <p v-if="error == 'WRONG ID AND PASSWORD'" style="color:red">{{error}}</p>
            <p v-if="error == 'IT CORRECTLY'" style="color:green">{{error}}</p>
          </div>
          <br>
          <b-card>
          <b-form v-if="show">
            <div>
              <b-form-group id="input-group-1">
                <label class="forminput">Username</label>
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="text"
                  required
                  placeholder="Enter username"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-form-group id="input-group-2">
              <label class="forminput">Password</label>
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>

            <!-- <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                <b-form-checkbox value="me">remember me</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group> -->
            <div>
            <b-button class="blue-gradient btn-block" type="submit" v-on:click="postLogin ()">LOGIN</b-button><br>
            <!-- <label>or Sign in with</label> -->
            </div>
            <div>
              <!-- <div style="border-bottom: solid 2px #E0e0e0;">
                <b-button class="socialb" style="margin-right:5px;" @click="socialGoogleLogin"><i class="fab fa-google"></i></b-button>
                <b-button class="socialb"><i class="fab fa-facebook" @click="socialFacecbookLogin"></i></b-button>
              </div> -->
              <div>
                <!-- <br> -->
                <!-- <label class="inputsignup">Not a member ?<router-link to="/signup"> Sign Up</router-link></label> -->
              </div>
            </div>
          </b-form>
          </b-card>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true,
      error: '',
      aa: 55,
      login: [],
      jwt: [],
      set: []
    }
  },
  mounted () {
    // axios.all([axios.get('http://127.0.0.1:3000/login')]).then(axios.spread((resAdmin) => {
    //   console.log('aa')
    //   console.log(this.email)
    //   if (this.email === resAdmin.data.result[0].id) {
    //     console.log('log')
    //   }
    //   console.log(resAdmin.data.result[0].id)
    //   // return {

    //   // }
    // }))
    console.log()
    if (JSON.parse(localStorage.getItem('login')) === 'admin' || JSON.parse(localStorage.getItem('login')) === 'user') {
      location.replace('/sale')
    }
  },
  methods: {
    postLogin () {
      axios.post('http://127.0.0.1:3000/login', this.form)
        .then(response => {
          // console.log(response.data)
          if (response.data.err === 'wrong id and password') {
            this.error = response.data.err
            this.error = this.error.toUpperCase()
          } else if (response.data.token[0].login === 'success') {
            this.error = 'it correctly'
            this.error = this.error.toUpperCase()
            localStorage.setItem('login', JSON.stringify('admin'))
            localStorage.setItem('jwt', JSON.stringify('admin'))
            // localStorage.setItem('set', JSON.stringify('set'))
            // location.replace('/' + JSON.parse(localStorage.getItem('login')) + '/sale')
            location.replace('/sale')
            // if (this.$route.params.nextUrl != null) {
            //   this.$route.push(this.$route.params.nextUrl)
            // } else {
            //   if (is_admin === 1) {

            //   }
            // }
            console.log('cc')
          } else if (response.data.token[0].login === 'successUser') {
            // let is_admin = 0
            this.error = 'it correctly'
            this.error = this.error.toUpperCase()
            localStorage.setItem('login', JSON.stringify('user'))
            localStorage.setItem('jwt', JSON.stringify('user'))
            // location.replace('/' + JSON.parse(localStorage.getItem('login')) + '/sale')
            location.replace('/sale')
          }
        }).catch(e => {
          // this.error.push(e)
        })
    }
  },
  metaInfo () {
    return {
      title: 'Login',
      titleTemplate: '%s - MYC'
    }
  },
  created () {
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
