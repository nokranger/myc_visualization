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
          <!-- <b-input></b-input> -->
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
            <div class="align-center">
              <p style="font-weight: bold;font-size:20px;" class="my-4">Update Location</p>
            </div>
            <div>
              <b-container>
                <b-row>
                  <b-col>
                    <div>Customers code</div>
                    <b-input :ref="'cus_code' + data.index" type="text" v-model="items[data.index].Code" readonly></b-input>
                  </b-col>
                  <b-col>
                    <div>Latitude</div>
                    <b-input :ref="'uplat' + data.index" type="text"></b-input>
                  </b-col>
                  <b-col>
                    <div>Longtitude</div>
                    <b-input :ref="'uplng' + data.index" type="text"></b-input>
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
                      <b-button variant="success" v-on:click="updatecustomer ('cus_code' + data.index, 'uplat' + data.index, 'uplng' + data.index, data.index)">Update</b-button>
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
                <!-- <div id="aa" v-for="(item, index) in items" :key="index">
                  {{index}}
                </div> -->
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
                <!-- <div>
                  Date
                </div>
                <b-input type="date"></b-input>-->
                <div>
                  <div style="margin-top:-1px;">
                    <br />
                  </div>
                  <b-button variant="success" v-on:click="addData ()">Add data</b-button>
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
      fields: ['Code', 'Latitude', 'Longtitude', 'function'],
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
  created () {
    // for (let i = 0; i < this.cus_location_list.length; i++) {
    //   // console.log('lllllllllllllll')
    //   if (this.cus_location_list[i].Code === this.cus_name_list[i].CustomerCode) {
    //     // console.log('sssssssssssssssssss')
    //     this.new_cus[i] = {
    //       code: this.cus_location_list[i].Code,
    //       name: this.cus_name_list[i].Name,
    //       latitude: this.cus_location_list[i].Latitude,
    //       longtitude: this.cus_location_list[i].Longtitude
    //     }
    //   }
    //   // this.new_cus = {}
    // }
    this.settings = {
      session_id: JSON.parse(sessionStorage.getItem('login')),
      data: {}
    }
    axios.post('http://192.168.10.2:1308/setting', this.settings).then(response => {
      this.items = response.data.data.cus_location_list
      this.totalRows = this.items.length
      this.cus_name_location = response.data.data.cus_name_list
    })
    // console.log(this.items)
  },
  methods: {
    addData () {
      console.log('addData')
      // console.log(this.$refs.customerscodes.localValue)
      this.newItems = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          cus_code: this.$refs.customerscodes.localValue,
          lat: this.$refs.latitude.localValue,
          lng: this.$refs.longtitude.localValue
        }
      }
      console.log(this.newItems)
      axios.post('http://192.168.10.2:1308/setting/cus_location/add', this.newItems).then(response => {
        // console.log(response)
        this.items = response.data.data.cus_location_list
        // for (let i = 0; i < this.cus_code_location.length; i++) {
        //   // console.log('lllllllllllllll')
        //   if (this.this.cus_code_location[i].Code === this.cus_name_location[i].CustomerCode) {
        //     // console.log('sssssssssssssssssss')
        //     this.new_cus[i] = {
        //       customers_code: this.this.cus_code_locationt[i].Code,
        //       name: this.cus_name_location[i].Name,
        //       latitude: this.this.cus_code_locationt[i].Latitude,
        //       longtitude: this.this.cus_code_locationt[i].Longtitude
        //     }
        //   }
        //   // this.new_cus = {}
        // }
        this.$refs.table.refresh()
      })
    },
    onedit (index) {
      // console.log(this.items[index].target)
    },
    ondelete (index) {
      // delete this.items[index]
      // console.log(this.items)
      // console.log(this.items)
      this.deletecustomer = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          cus_code: this.items[index].Code
        }
      }
      console.log(this.deletecustomer)

      axios('http://192.168.10.2:1308/setting/cus_location/delete', {
        data: this.deletecustomer,
        method: 'post'
      }).then(response => {
        // console.log(response)
        this.items = response.data.data.cus_location_list
        // for (let i = 0; i < this.cus_code_location.length; i++) {
        //   // console.log('lllllllllllllll')
        //   if (this.this.cus_code_location[i].Code === this.cus_name_location[i].CustomerCode) {
        //     // console.log('sssssssssssssssssss')
        //     this.new_cus[i] = {
        //       customers_code: this.this.cus_code_locationt[i].Code,
        //       name: this.cus_name_location[i].Name,
        //       latitude: this.this.cus_code_locationt[i].Latitude,
        //       longtitude: this.this.cus_code_locationt[i].Longtitude
        //     }
        //   }
        //   // this.new_cus = {}
        // }
        this.$refs.table.refresh()
      })
    },
    updatecustomer (customCode, uplat, uplng, index) {
      // console.log(this.items[index].customers_code === this.$refs[customCode].localValue)
      // for (let i = 0; i < this.items.length; i++) {
      //   if (this.items[index].customers_code === this.$refs[customCode].localValue) {
      //     this.items[index].latitude = this.$refs[uplat].localValue
      //   }
      // }
      this.edit = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          cus_code: this.$refs[customCode].localValue,
          lat: this.$refs[uplat].localValue,
          lng: this.$refs[uplng].localValue
        }
      }
      axios('http://192.168.10.2:1308/setting/cus_location/update_location', {
        data: this.edit,
        method: 'patch'
      }).then(response => {
        this.items = response.data.data.cus_location_list
        // for (let i = 0; i < this.cus_code_location.length; i++) {
        //   // console.log('lllllllllllllll')
        //   if (this.this.cus_code_location[i].Code === this.cus_name_location[i].CustomerCode) {
        //     // console.log('sssssssssssssssssss')
        //     this.new_cus[i] = {
        //       customers_code: this.this.cus_code_locationt[i].Code,
        //       name: this.cus_name_location[i].Name,
        //       latitude: this.this.cus_code_locationt[i].Latitude,
        //       longtitude: this.this.cus_code_locationt[i].Longtitude
        //     }
        //   }
        //   // this.new_cus = {}
        // }
        this.$refs.table.refresh()
      })
    }
  },
  mounted () {
    // console.log('cus', this.new_cus)
    // console.log(typeof (this.new_cus))

  }
}
</script>
<style scoped>
.align-center {
  text-align: center;
}
</style>
