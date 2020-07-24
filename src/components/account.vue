<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>Account</div>
      <b-table ref="table" :items="items" :fields="fields" class="mt-3" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
        <!-- <template v-slot:cell(target)="data">
          <b-input style="text-align:center" type="text" v-model="items[data.index].target"></b-input>
        </template>-->
        <template v-slot:cell(function)="data">
          <b-button
            variant="danger"
            size="sm"
            class="mr-2"
            v-b-modal="'modal-delete' + data.index"
          >Delete</b-button>
          <b-modal :id="'modal-delete' + data.index" hide-footer>
            <div class="align-center">
              <p style="font-weight: bold;font-size:20px;" class="my-4">Confirm delete</p>
            </div>
            <b-container>
              <b-row>
                <b-col></b-col>
                <b-col>
                </b-col>
                <b-col>
                  <div>
                    <b-button variant="danger" v-on:click="ondelete (data.index)">Confirm</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-modal>
          <b-button
            variant="primary"
            size="sm"
            class="mr-2"
            v-b-modal="'modal-edit' + data.index"
          >Edit</b-button>
          <b-modal :id="'modal-edit' + data.index" size="xl" hide-footer>
            <div class="align-center">
              <p style="font-weight: bold;font-size:20px;" class="my-4">Change password and level</p>
            </div>
            <div>
              <p style="color:red">{{checkpassword}}</p>
            </div>
            <div>
              <b-container>
                <b-row>
                  <b-col>
                    <div>Username</div>
                    <b-input :ref="'uusername' + data.index" type="text" v-model="items[data.index].username" readonly></b-input>
                  </b-col>
                  <b-col>
                    <div>Level</div>
                    <b-input :ref="'ulevel' + data.index" type="text"></b-input>
                  </b-col>
                  <b-col>
                    <div>Old password</div>
                    <b-input :ref="'oldpassword' + data.index" type="password"></b-input>
                  </b-col>
                  <b-col>
                    <div>New assword</div>
                    <b-input :ref="'upassword' + data.index" type="password" v-model="user.password"></b-input>
                  </b-col>
                  <b-col>
                    <div>Confirm password</div>
                    <b-input :ref="'ucpassword' + data.index" type="password" v-model="user.cpassword"></b-input>
                  </b-col>
                  <b-col>
                    <!-- <div>
                        Date
                        </div>
                    <b-input type="date"></b-input>-->
                    <div>
                      <div style="margin-top:-1px;">
                        <br />
                      </div>
                      <b-button variant="success" v-on:click="updateuser ('uusername' + data.index, 'ulevel' + data.index, 'oldpassword' + data.index, 'upassword' + data.index, 'ucpassword' + data.index, data.index)">Update</b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </b-modal>
        </template>
      </b-table>
      <div>
        <b-button style="width:100%" v-b-modal.modal-account>Add User</b-button>
        <br />
        <br />
      </div>
      <b-modal id="modal-account" size="xl" hide-footer>
        <div class="align-center">
          <p style="font-weight: bold;font-size:20px;" class="my-4">Add your account</p>
        </div>
        <div>
          <b-container>
            <div>
              <p style="color:red">{{checkpassword}}</p>
            </div>
            <b-row>
              <b-col>
                <div>User name</div>
                <b-input ref="username" type="text"></b-input>
              </b-col>
              <b-col>
                <div>Password</div>
                <b-input ref="password" type="password" v-model="user.password"></b-input>
              </b-col>
              <b-col>
                <div>Confirm password</div>
                <b-input ref="cpassword" type="password" v-model="user.cpassword"></b-input>
              </b-col>
              <b-col>
                <!-- <div>
                  Date
                </div>
                <b-input type="date"></b-input>-->
                <div>
                  <div style="margin-top:-1px;">
                    <br />
                  </div>
                  <b-button variant="success" v-on:click="addData ()">Register</b-button>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </div>
      </b-modal>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import md5 from 'md5'
export default {
  data () {
    return {
      isactive: [],
      isBusy: false,
      fields: ['username', 'level', 'lastupdate', 'function'],
      items: [
        { username: 'Dickerson', level: 0, lastupdate: '2020-07-17' },
        { username: 'Larsen', level: 1, lastupdate: '2020-07-17' },
        { username: 'Geneva', level: 1, lastupdate: '2020-07-17' },
        { username: 'Jami', level: 1, lastupdate: '2020-07-17' }
      ],
      newItems: [],
      edit: [],
      deleteaccount: [],
      settings: [],
      user: [{
        password: '',
        cpassword: ''
      }
      ],
      level: []
    }
  },
  // beforeCreate () {
  //   var localjwt = sessionStorage.getItem('login')
  //   if (localjwt !== null) {
  //     location.replace('/sale')
  //   } else {
  //     location.replace('/')
  //   }
  // },
  created () {},
  methods: {
    addData () {
      console.log('addData')
      this.newItems = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          username: this.$refs.username.localValue,
          password: md5(this.$refs.password.localValue)
        }
      }
      axios.post('http://192.168.43.190:1308/register', this.newItems).then(response => {
        console.log(response)
        this.items = response.data.data.account_list
        this.$refs.table.refresh()
      })
      // console.log(this.items)
      // var obj = JSON.parse(this.items)
      // this.items.push(this.newItems)
      // this.$refs.table.refresh()
      // console.log(this.items)
      // console.log(obj)
    },
    onedit (index) {
      console.log(this.items[index].target)
    },
    ondelete (index) {
      // delete this.items[index]
      console.log(this.items[index].username)
      // console.log(this.items)
      this.deleteaccount = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          username: this.items[index].username
        }
      }
      axios('http://192.168.43.190:1308/account/delete', {
        data: this.deleteaccount,
        method: 'delete'
      }).then(response => {
        this.items = response.data.data.account_list
        this.$refs.table.refresh()
      })
    },
    updateuser (uusername, ulevel, oldpasswords, upassword, ucpassword, index) {
      // console.log(this.items[index]._username === this.$refs[uusername].localValue)
      // for (let i = 0; i < this.items.length; i++) {
      //   if (this.items[index]._username === this.$refs[uusername].localValue) {
      //     this.items[index].level = this.$refs[ulevel].localValue
      //   }
      // }
      // console.log(this.$refs[ulevel].localValue)
      if (this.$refs[ulevel].localValue === '') {
        this.edit = {
          session_id: JSON.parse(sessionStorage.getItem('login')),
          data: {
            username: this.$refs[uusername].localValue,
            password: md5(this.$refs[upassword].localValue)
          }
        }
        console.log(this.edit)
        axios('http://192.168.43.190:1308/account/change_password', {
          data: this.edit,
          method: 'patch'
        }).then(response => {
          this.items = response.data.data.account_list
          this.$refs.table.refresh()
        })
      } else if (this.$refs[oldpasswords].localValue === '' && this.$refs[upassword].localValue === '' && this.$refs[ucpassword].localValue === '') {
        console.log('null password')
        this.level = {
          session_id: JSON.parse(sessionStorage.getItem('login')),
          data: {
            username: this.$refs[uusername].localValue,
            level: this.$refs[ulevel].localValue
          }
        }
        axios('http://192.168.43.190:1308/ccount/change_level', {
          data: this.level,
          method: 'patch'
        }).then(response => {
          this.items = response.data.data.account_list
        })
        console.log(this.level)
      }
    }
  },
  mounted () {
    this.settings = {
      session_id: JSON.parse(sessionStorage.getItem('login')),
      data: {}
    }
    axios.post('http://192.168.43.190:1308/setting', this.settings).then(response => {
      this.items = response.data.data.account_list
      this.$refs.table.refresh()
    })
  },
  computed: {
    checkpassword () {
      // console.log(typeof (this.user.password))
      if (this.user.cpassword !== this.user.password) {
        console.log('not same')
        return '** Passwords not match.'
      } else if (this.user.cpassword === this.user.password) {
        return ''
      }
      return ''
    }
  }
}
</script>
<style scoped>
.align-center {
  text-align: center;
}
</style>
