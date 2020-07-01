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
            <strong style="text-align:center;font-weight:bolder;color: #4f4f4f!important;font-size:24px;color: #333;">Create your account</strong>
            <br>
            <br>
            <!-- <p v-if="error == 'USERNAME NOT FOUND'" style="color:red">{{error}}</p>
            <p v-if="error == 'IT CORRECTLY'" style="color:green">{{error}}</p> -->
          </div>
          <br>
          <b-card>
          <b-form v-if="show">
            <div>
              <b-form-group id="input-group-1">
                <label class="forminput">Username <label style="color:red">*</label></label>
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
                    <label>Password <label style="color:red">*</label></label>
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
            <b-button style="margin: 6px!important;padding: 13.44px 34.24px!important;" class="btn-block" variant="success" v-on:click="postRegister ()">Create account</b-button><br>
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
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  metaInfo () {
    return {
      title: 'Register',
      titleTemplate: '%s - MYC'
    }
  },
  mounted () {
    // if (sessionStorage.getItem('login') === null) {
    //   location.replace('/')
    //   // console.log('testL')
    // }
  },
  methods: {
    postRegister () {
      this.form = {
        username: this.form.username,
        oldpassword: md5(this.form.oldpassword),
        newpassword: md5(this.form.newpassword)
      }
      console.log(this.form)
    }
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
