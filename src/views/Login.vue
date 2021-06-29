<template>
  <div>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
    <br>
    <br>
    <b-container>
      <b-row>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3"></b-col>
        <b-col cols="12" sm="12" md="12" lg="6" xl="6">
          <div>
            <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;font-size:24px;color: #333;">LOGIN</strong>
            <br>
            <br>
            <br><br>
            <p v-if="error == 'INVALID USERNAME OR PASSWORD'" style="color:red">{{error}}</p>
            <p v-if="error == 'IT CORRECTLY'" style="color:green">{{error}}</p>
          </div>
          <br>
          <b-card>
          <b-form v-if="show" onsubmit="return false">
            <div>
              <b-form-group id="input-group-1">
                <label class="forminput">Username</label>
                <b-form-input
                  id="input-1"
                  v-model="form.username"
                  type="text"
                  required
                  placeholder="Enter username"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-form-group id="input-group-2">
              <b-row>
                <b-col>
                  <div class="align-left">
                    <label>Password</label>
                  </div>
                </b-col>
              </b-row>
              <b-form-input
                id="input-2"
                v-model="form.password"
                type="password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <div>
            <b-button style="margin: 6px!important;padding: 13.44px 34.24px!important;" class="btn-block" variant="success" type="submit" v-on:click="postLogin ()">LOGIN</b-button><br>
            </div>
            <div>
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
import apiURL from '../assets/js/connectionAPI'
import axios from 'axios'
import md5 from 'md5'
export default {
  data () {
    return {
      apiURL: apiURL,
      form: {
        username: '',
        password: ''
      },
      show: true,
      error: '',
      login: [],
      jwt: [],
      set: [],
      data: []
    }
  },
  beforeCreate () {
  },
  created () {},
  mounted () {
    console.log(this.apiURL)
  },
  methods: {
    loginapi () {
      console.log('logined')
      setTimeout(this.postLogin, 1000)
    },
    postLogin () {
      console.log('sadasdasdsa')
      this.data = {
        session_id: '',
        data: {
          username: this.form.username,
          password: md5(this.form.password)
        }
      }
      axios(this.apiURL + '/emp/login', {
        data: this.data,
        method: 'post'
      })
        .then(response => {
          console.log('data', response.data.data.username)
          console.log(response.data.data.session_id)
          if (response.data.error_code === 101) {
            console.log('ss')
            this.error = 'Invalid Username or Password'
            this.error = this.error.toUpperCase()
          } else if (response.data.error_code === 0) {
            console.log('ssssss')
            this.error = 'it correctly'
            this.error = this.error.toUpperCase()
            sessionStorage.setItem('login', JSON.stringify(response.data.data.department))
            sessionStorage.setItem('level', JSON.stringify(response.data.data.level))
            sessionStorage.setItem('username', JSON.stringify(this.form.username.toLowerCase()))
            location.replace('/dashboard')
            console.log('cc')
          }
        }).catch(e => {
        })
    }
  },
  metaInfo () {
    return {
      title: 'Login',
      titleTemplate: '%s - MYC'
    }
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
