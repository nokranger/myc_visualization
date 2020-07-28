<template>
  <div>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1,minimal-ui" name="viewport">
    <b-container style="border: solid 5px gray">
      <div class="align-left" style="font-weight:bolder;color: #4f4f4f!important;font-size:24px;color: #333;">
        Change Password
      </div>
      <p style="color:red">{{checkpassword}}</p>
      <b-row style="solid 2px #E0e0e0">
        <b-col cols="12" sm="12" md="12" lg="3" xl="3">
            <b-form-group id="input-group-2">
              <b-row>
                <b-col>
                  <div class="align-left">
                    <label style="font-size: 16px;">Old Password</label>
                  </div>
                </b-col>
                <!-- <b-col>
                  <div class="align-right">
                    <a href="/changepassword">Change Password ?</a>
                  </div>
                </b-col> -->
              </b-row>
              <b-form-input
                id="input-2"
                v-model="form.oldpassword"
                type="password"
                required
                placeholder="Enter Old password"
              ></b-form-input>
            </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3">
          <b-form-group id="input-group-3">
              <b-row>
                <b-col>
                  <div class="align-left">
                    <label style="font-size: 16px;">New Password</label>
                  </div>
                </b-col>
              </b-row>
              <b-form-input
                id="input-4"
                v-model="form.newpassword"
                type="password"
                required
                placeholder="Enter New password"
              ></b-form-input>
            </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3">
          <b-form-group id="input-group-4">
              <b-row>
                <b-col>
                  <div class="align-left">
                    <label style="font-size: 16px;">Confirm Password</label>
                  </div>
                </b-col>
              </b-row>
              <b-form-input
                id="input-3"
                v-model="form.confirmnewpassword"
                type="password"
                required
                placeholder="Enter Confirm New password"
              ></b-form-input>
            </b-form-group>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="3" xl="3">
          <div style="margin-top:-10px;">
            <br>
            <b-button style="margin: 6px!important;padding: 13.44px 34.24px!important;" class="btn-block" variant="success" v-on:click="postChangePassword ()">Change Password</b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import md5 from 'md5'
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        oldpassword: '',
        newpassword: '',
        confirmnewpassword: ''
      },
      edit: [],
      show: true
    }
  },
  beforeCreate () {
    var localjwt = sessionStorage.getItem('login')
    if (localjwt !== null) {
    } else {
      location.replace('/')
    }
  },
  created () {},
  beforeUpdate () {},
  updated () {},
  metaInfo () {
    return {
      title: 'Change Password',
      titleTemplate: '%s - MYC'
    }
  },
  beforeMount () {},
  mounted () {
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
    }
    this.form.username = JSON.parse(sessionStorage.getItem('login'))
  },
  methods: {
    postChangePassword () {
      this.edit = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          old_password: md5(this.form.oldpassword),
          new_password: md5(this.form.newpassword)
        }
      }
      axios('http://192.168.10.2:1308/account/change_password', {
        data: this.edit,
        method: 'patch'
      }).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 303) {
          console.log('Change password fail.')
        } else if (response.data.error_code === 0) {
          console.log(response)
          this.form.oldpassword = ''
          this.form.newpassword = ''
          this.form.confirmnewpassword = ''
        }
      }).catch(e => {
      })
      console.log(this.form)
    }
  },
  computed: {
    checkpassword () {
      console.log(typeof (this.form.newpassword))
      if (this.form.confirmnewpassword !== this.form.newpassword) {
        console.log('not same')
        return '** Passwords not match.'
      } else if (this.form.confirmnewpassword === this.form.newpassword) {
        return ''
      }
      return ''
    }
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
