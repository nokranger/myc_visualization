<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>Customer location</div>
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
            v-b-modal="'modal-delete-location' + data.item.Code"
          >Delete</b-button>
          <b-modal :id="'modal-delete-location' + data.item.Code" hide-footer>
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
                    <b-button variant="danger" v-on:click="ondelete (data.item.Code)">Confirm</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-modal>
          <b-button
            variant="primary"
            size="sm"
            class="mr-2"
            v-b-modal="'modal-edit-location' + data.item.Code"
          >Edit</b-button>
          <b-modal :id="'modal-edit-location' + data.item.Code" size="xl" hide-footer>
            <div class="align-center">
              <p style="font-weight: bold;font-size:20px;" class="my-4">Update Location</p>
            </div>
            <div>
              <b-container>
                <b-row>
                  <b-col>
                    <div>Customers code</div>
                    <b-input :ref="'cus_code' + data.item.Code" type="text" v-model="data.item.Code" readonly></b-input>
                  </b-col>
                  <b-col>
                    <div>Latitude</div>
                    <b-input :ref="'uplat' + data.item.Code" type="text"></b-input>
                  </b-col>
                  <b-col>
                    <div>Longtitude</div>
                    <b-input :ref="'uplng' + data.item.Code" type="text"></b-input>
                  </b-col>
                  <b-col>
                    <div>
                      <div style="margin-top:-1px;">
                        <br />
                      </div>
                      <b-button variant="success" v-on:click="updatecustomer ('cus_code' + data.item.Code, 'uplat' + data.item.Code, 'uplng' + data.item.Code, data.item.Code)">Update</b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </b-modal>
        </template>
      </b-table>
      <div>
        <b-button style="width:100%" v-b-modal.modal-location>Add Customer</b-button>
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
                <div>
                  Customers
                </div>
                <b-input list="customberscode" ref="customerscodes" type="text"></b-input>
                <b-datalist id="customberscode">
                  <option v-for="(item, index) in cus_name_location" :key="index" :value="item.No_">{{item.Name}}</option>
                </b-datalist>
              </b-col>
              <b-col>
                <div>Latitude</div>
                <b-input ref="latitude" type="text"></b-input>
              </b-col>
              <b-col>
                <div>Longtitude</div>
                <b-input ref="longtitude" type="text"></b-input>
              </b-col>
              <b-col>
                <div>
                  <div style="margin-top:-1px;">
                    <br />
                  </div>
                  <b-button variant="success" v-on:click="addData ()">Add Data</b-button>
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
      fields: [{ key: 'Code', sortable: true }, 'Latitude', 'Longtitude', 'function'],
      items: [],
      newItems: [],
      edit: [],
      deletecustomer: [],
      settings: [],
      cus_code_location: [],
      cus_name_location: [],
      cus_location_list: [],
      new_cus: [],
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
        console.log('get customer location fail.')
      } else if (response.data.error_code === 0) {
        this.items = response.data.data.cus_location_list
        this.cus_name_location = response.data.data.cus_name_list
        this.totalRows = this.items.length
        this.$refs.table.refresh()
      }
    })
  },
  beforeUpdate () {},
  updated () {},
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    addData () {
      this.newItems = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          cus_code: this.$refs.customerscodes.localValue,
          lat: this.$refs.latitude.localValue,
          lng: this.$refs.longtitude.localValue
        }
      }
      axios.post('http://192.168.10.2:1308/setting/cus_location/add', this.newItems).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('add customer location fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.cus_location_list
          this.cus_name_location = response.data.data.cus_name_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
          this.$refs.customerscodes.localValue = ''
          this.$refs.latitude.localValue = ''
          this.$refs.longtitude.localValue = ''
        }
      })
    },
    onedit (index) {
    },
    ondelete (index) {
      this.deletecustomer = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          cus_code: index
        }
      }
      axios('http://192.168.10.2:1308/setting/cus_location/delete', {
        data: this.deletecustomer,
        method: 'post'
      }).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('delete customer location fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.cus_location_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
        }
      })
    },
    updatecustomer (customCode, uplat, uplng, index) {
      this.edit = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          cus_code: this.$refs[customCode].localValue,
          lat: this.$refs[uplat].localValue,
          lng: this.$refs[uplng].localValue
        }
      }
      console.log(this.edit)
      axios('http://192.168.10.2:1308/setting/cus_location/update_location', {
        data: this.edit,
        method: 'patch'
      }).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('update customer location fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.cus_location_list
          this.$refs.table.refresh()
          this.$refs[uplat].localValue = ''
          this.$refs[uplng].localValue = ''
        }
      })
    }
  }
}
</script>
<style scoped>
.align-center {
  text-align: center;
}
</style>
