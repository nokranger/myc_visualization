<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>Account</div>
      <b-row>
        <b-col class="my-1">
          <div style="margin-top:-9.5px;">
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </div>
        </b-col>
        <b-col class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
        <b-col class="my-1">
          <b-form-input
            v-model="filter"
            type="search"
            id="filterInput"
            size="sm"
            placeholder="Type to Search"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-table ref="table" :items="items" :fields="fields" :filter="filter" :current-page="currentPage"
      :per-page="perPage" class="mt-3" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
        <template v-slot:cell(function)="data">
          <b-button
            variant="danger"
            size="sm"
            class="mr-2"
            v-b-modal="'modal-delete' + data.item.Username"
          >Delete</b-button>
          <b-modal :id="'modal-delete' + data.item.Username" hide-footer>
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
                    <b-button variant="danger" v-on:click="ondelete (data.item.Username)">Confirm</b-button>
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
                    <b-input :ref="'uusername' + data.item.Username" type="text" v-model="data.item.Username" readonly></b-input>
                  </b-col>
                  <b-col>
                    <div>Level</div>
                    <b-input :ref="'ulevel' + data.item.Username" type="text"></b-input>
                  </b-col>
                  <b-col>
                    <div>New assword</div>
                    <b-input :ref="'upassword' +  data.item.Username" type="password" v-model="user.password"></b-input>
                  </b-col>
                  <b-col>
                    <div>Confirm password</div>
                    <b-input :ref="'ucpassword' +  data.item.Username" type="password" v-model="user.cpassword"></b-input>
                  </b-col>
                  <b-col>
                    <div>
                      <div style="margin-top:-1px;">
                        <br />
                      </div>
                      <b-button variant="success" v-on:click="updateuser ('uusername' + data.item.Username, 'ulevel' + data.item.Username, 'oldpassword' + data.item.Username, 'upassword' + data.item.Username, 'ucpassword' + data.item.Username, data.item.Username)">Update</b-button>
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
                <div>Username</div>
                <b-input ref="username" type="text" v-model="user.username"></b-input>
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
      fields: [{ key: 'Username', sortable: true }, { key: 'Level', sortable: true }, { key: 'last_update', sortable: true }, 'function'],
      items: [
        { Username: 'Dickerson', Level: '0', sales_target: 1100, last_update: '2020-07-16' },
        { Username: 'Larsen', Level: '1', sales_target: 1200, last_update: '2020-07-15' },
        { Username: 'Geneva', Level: '1', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Jami', Level: '2', sales_target: 1500, last_update: '2020-07-13' },
        { Username: 'Geneva', Level: '3', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Geneva', Level: '0', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Geneva', Level: '1', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Geneva', Level: '2', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Geneva', Level: '0', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Geneva', Level: '1', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Geneva', Level: '3', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Geneva', Level: '2', sales_target: 1200, last_update: '2020-07-14' },
        { Username: 'Geneva', Level: '0', sales_target: 1200, last_update: '2020-07-14' }
      ],
      newItems: [],
      edit: [],
      deleteaccount: [],
      settings: [],
      user: [{
        username: '',
        password: '',
        cpassword: ''
      }
      ],
      level: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15]
    }
  },
  beforeCreate () {
  },
  created () {
  },
  beforeUpdate () {},
  updated () {},
  beforeMount () {},
  mounted () {
    this.settings = {
      session_id: JSON.parse(sessionStorage.getItem('login')),
      data: {}
    }
    axios.post('http://192.168.10.2:1308/setting', this.settings).then(response => {
      if (response.data.error_code === 201) {
        console.log('Session not found.')
      } else if (response.data.error_code === 202) {
        console.log('Permission denied.')
      } else if (response.data.error_code === 303) {
        console.log('Add brand fail.')
      } else if (response.data.error_code === 0) {
        this.items = response.data.data.account_list
        this.totalRows = this.items.length
        this.$refs.table.refresh()
      }
    })
  },
  methods: {
    addData () {
      this.newItems = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          username: this.$refs.username.localValue,
          password: md5(this.$refs.password.localValue)
        }
      }
      axios.post('http://192.168.10.2:1308/account/register', this.newItems).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('Register account fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.account_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
          this.$refs.username.localValue = ''
          this.$refs.password.localValue = ''
          this.$refs.cpassword.localValue = ''
        }
      })
    },
    ondelete (indexusername) {
      this.deleteaccount = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          username: indexusername
        }
      }
      axios('http://192.168.10.2:1308/account/delete', {
        data: this.deleteaccount,
        method: 'post'
      }).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('Delete account fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.account_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
        }
      })
    },
    updateuser (uusername, ulevel, oldpasswords, upassword, ucpassword, index) {
      console.log(this.$refs[uusername].localValue, ulevel, oldpasswords, upassword, ucpassword, index)
      if (this.$refs[ulevel].localValue === '') {
        this.edit = {
          session_id: JSON.parse(sessionStorage.getItem('login')),
          data: {
            username: this.$refs[uusername].localValue,
            password: md5(this.$refs[upassword].localValue)
          }
        }
        axios('http://192.168.10.2:1308/account/change_password', {
          data: this.edit,
          method: 'patch'
        }).then(response => {
          if (response.data.error_code === 201) {
            console.log('Session not found.')
          } else if (response.data.error_code === 303) {
            console.log('Update account password fail.')
          } else if (response.data.error_code === 0) {
            this.items = response.data.data.account_list
            this.totalRows = this.items.length
            this.$refs.table.refresh()
            this.$refs[ucpassword].localValue = ''
            this.$refs[upassword].localValue = ''
          }
        })
      } else if (this.$refs[upassword].localValue === '' && this.$refs[ucpassword].localValue === '') {
        this.level = {
          session_id: JSON.parse(sessionStorage.getItem('login')),
          data: {
            username: this.$refs[uusername].localValue,
            level: this.$refs[ulevel].localValue
          }
        }
        axios('http://192.168.10.2:1308/account/change_level', {
          data: this.level,
          method: 'patch'
        }).then(response => {
          if (response.data.error_code === 201) {
            console.log('Session not found.')
          } else if (response.data.error_code === 202) {
            console.log('Permission denied.')
          } else if (response.data.error_code === 303) {
            console.log('Update account level fail.')
          } else if (response.data.error_code === 0) {
            this.items = response.data.data.account_list
            this.totalRows = this.items.length
            this.$refs.table.refresh()
            this.$refs[ulevel].localValue = ''
          }
        })
      }
    }
  },
  computed: {
    checkpassword () {
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
