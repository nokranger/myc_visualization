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
                  type="email"
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
            <b-button class="blue-gradient btn-block" type="button">LOGIN</b-button><br>
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
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      show: true
    }
  },
  methods: {
  },
  metaInfo () {
    return {
      title: 'Login',
      titleTemplate: '%s - Login'
    }
  },
  created () {
  }
}
</script>
<style scoped>
@import '../assets/css/login.css';
</style>
