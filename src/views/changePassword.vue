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
            <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;font-size:24px;color: #333;">Change your password</strong>
            <br>
            <br>
          </div>
          <br>
          <b-card>
          <b-form v-if="show">
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
                    <label>Old Password</label>
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
            <b-form-group id="input-group-3">
              <b-row>
                <b-col>
                  <div class="align-left">
                    <label>New Password</label>
                  </div>
                </b-col>
              </b-row>
              <b-form-input
                id="input-3"
                v-model="form.newpassword"
                type="password"
                required
                placeholder="Enter New password"
              ></b-form-input>
            </b-form-group>
            <div>
            <b-button style="margin: 6px!important;padding: 13.44px 34.24px!important;" class="btn-block" variant="success" v-on:click="postChangePassword ()">Change Password</b-button><br>
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
import md5 from 'md5'
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        oldpassword: '',
        newpassword: ''
      },
      show: true
    }
  },
  metaInfo () {
    return {
      title: 'Change Password',
      titleTemplate: '%s - MYC'
    }
  },
  mounted () {
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
    this.form.username = JSON.parse(sessionStorage.getItem('login'))
  },
  methods: {
    postChangePassword () {
      this.form = {
        username: this.form.username,
        oldpassword: md5(this.form.oldpassword),
        newpassword: md5(this.form.newpassword)
      }
      axios.post('http://192.168.43.190:1308/changepassword', this.form).then(response => {
        console.log('done')
      }).catch(e => {
      })
      console.log(this.form)
    }
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
