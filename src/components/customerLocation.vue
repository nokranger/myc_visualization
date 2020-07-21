<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>Customer location</div>
      <b-table ref="table" :items="items" :fields="fields" class="mt-3" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
        <!-- <template v-slot:cell(target)="data">
          <b-input style="text-align:center" type="text" v-model="items[data.index].target"></b-input>
        </template>-->
        <template v-slot:cell(function)="data">
          <b-button
            variant="danger"
            size="sm"
            class="mr-2"
            v-b-modal="'modal-delete-location' + data.index"
          >Delete</b-button>
          <b-modal :id="'modal-delete-location' + data.index" hide-footer>
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
            v-b-modal="'modal-edit-location' + data.index"
          >Edit</b-button>
          <b-modal :id="'modal-edit-location' + data.index" size="xl" hide-footer>
            <p class="my-4">Change password and level</p>
            <div>
              <b-container>
                <b-row>
                  <b-col>
                    <div>User name</div>
                    <b-input :ref="'uusername' + data.index" type="text" v-model="items[data.index]._username" readonly></b-input>
                  </b-col>
                  <b-col>
                    <div>Level</div>
                    <b-input :ref="'ulevel' + data.index" type="text"></b-input>
                  </b-col>
                  <b-col>
                    <div>Password</div>
                    <b-input :ref="'upassword' + data.index" type="password"></b-input>
                  </b-col>
                  <b-col>
                    <div>Confirm password</div>
                    <b-input :ref="'ucpassword' + data.index" type="password"></b-input>
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
                      <b-button variant="success" v-on:click="updateuser ('uusername' + data.index, 'ulevel' + data.index, 'upassword' + data.index, 'ucpassword' + data.index, data.index)">Update</b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </b-modal>
        </template>
      </b-table>
      <div>
        <b-button style="width:100%" v-b-modal.modal-location>Add User</b-button>
        <br />
        <br />
      </div>
      <b-modal id="modal-location" size="xl" hide-footer>
        <div class="align-center">
          <p style="font-weight: bold;font-size:20px;" class="my-4">Add your location</p>
        </div>
        <div>
          <b-container>
            <b-row>
              <b-col>
                <div>User name</div>
                <b-input ref="username" type="text"></b-input>
              </b-col>
              <b-col>
                <div>Password</div>
                <b-input ref="password" type="password"></b-input>
              </b-col>
              <b-col>
                <div>Confirm password</div>
                <b-input ref="cpassword" type="password"></b-input>
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
export default {
  data () {
    return {
      isactive: [],
      isBusy: false,
      fields: ['_username', 'level', 'lastupdate', 'function'],
      items: [
        { _username: 'Dickerson', level: 0, lastupdate: '2020-07-17' },
        { _username: 'Larsen', level: 1, lastupdate: '2020-07-17' },
        { _username: 'Geneva', level: 1, lastupdate: '2020-07-17' },
        { _username: 'Jami', level: 1, lastupdate: '2020-07-17' }
      ],
      newItems: [],
      edit: [],
      deletebrands: [],
      settings: []
    }
  },
  created () {},
  methods: {
    addData () {
      console.log('addData')
      this.newItems = {
        _username: this.$refs.username.localValue,
        password: this.$refs.password.localValue,
        cpassword: this.$refs.cpassword.localValue
      }
      // console.log(this.items)
      // var obj = JSON.parse(this.items)
      this.items.push(this.newItems)
      this.$refs.table.refresh()
      console.log(this.items)
      // console.log(obj)
    },
    onedit (index) {
      console.log(this.items[index].target)
    },
    ondelete (index) {
      delete this.items[index]
      // console.log(this.items)
      console.log(this.items)
      this.$refs.table.refresh()
    },
    updateuser (uusername, ulevel, upassword, ucpassword, index) {
      console.log(this.items[index]._username === this.$refs[uusername].localValue)
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[index]._username === this.$refs[uusername].localValue) {
          this.items[index].level = this.$refs[ulevel].localValue
        }
      }
      this.$refs.table.refresh()
      // const user = 'this.$refs' + '.' + 'uusername' + index + '.' + 'localValue'
      // console.log(JSON.parse(user))
      // console.log(this.$refs[index2])
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
  }
}
</script>
<style scoped>
.align-center {
  text-align: center;
}
</style>
