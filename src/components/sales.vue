<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>
        Seller
      </div>
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
        <template v-slot:cell(sales_target)="data">
          <b-input style="text-align:center" type="text" v-model="data.item.sales_target"></b-input>
        </template>
        <template v-slot:cell(function)="data">
          <b-button
            variant="danger"
            size="sm"
            class="mr-2"
            v-b-modal="'sale-modal-delete' + data.item.code"
          >Delete</b-button>
          <b-modal :id="'sale-modal-delete' + data.item.code" hide-footer>
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
                    <b-button variant="danger" v-on:click="ondelete (data.item.code, data.item.sales_target)">Confirm</b-button>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-modal>
          <b-button variant="primary" size="sm" class="mr-2" v-on:click="onedit (data.item.code, data.item.sales_target)">
            Edit
          </b-button>
        </template>
      </b-table>
      <div>
        <b-button style="width:100%" v-b-modal.modal-sell>Add Data</b-button>
        <br>
        <br>
      </div>
      <b-modal id="modal-sell" size="xl" hide-footer>
        <p class="my-4">Add your Seller</p>
        <div>
          <b-container>
            <b-row>
              <b-col>
                <div>
                  Code
                </div>
                <b-input ref="sellercode" type="text"></b-input>
              </b-col>
              <b-col>
                <div>
                  Name
                </div>
                <b-input ref="sellername" type="text"></b-input>
              </b-col>
              <b-col>
                <div>
                  Target
                </div>
                <b-input ref="sellertarget" type="text"></b-input>
              </b-col>
              <b-col>
                <div>
                  <div style="margin-top:-1px;">
                    <br>
                  </div>
                  <b-button v-on:click="addData ()">Add Data</b-button>
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
      fields: [{
        key: 'code',
        sortable: true
      },
      {
        key: 'name',
        sortable: true
      },
      {
        key: 'sales_target',
        sortable: true
      }, 'function'],
      items: [],
      newItems: [],
      edit: [],
      deleteseller: [],
      settings: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15]
    }
  },
  beforeCreate () {},
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
        console.log('get brand fail.')
      } else if (response.data.error_code === 0) {
        this.items = response.data.data.saler_list
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
          code: this.$refs.sellercode.localValue,
          name: this.$refs.sellername.localValue,
          sales_target: this.$refs.sellertarget.localValue
        }
      }
      axios.post('http://192.168.10.2:1308/setting/saler/add', this.newItems).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('Add seller fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.saler_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
          this.$refs.sellercode.localValue = ''
          this.$refs.sellername.localValue = ''
          this.$refs.sellertarget.localValue = ''
        }
      })
    },
    onedit (indexcode, indexsale) {
      this.edit = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          code: indexcode,
          sales_target: indexsale
        }
      }
      axios('http://192.168.10.2:1308/setting/saler/update_sales_target', {
        data: this.edit,
        method: 'patch'
      }).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('Update seller fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.saler_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
        }
      })
    },
    ondelete (indexcode, indexsale) {
      this.deleteseller = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          code: indexcode
        }
      }
      axios('http://192.168.10.2:1308/setting/saler/delete', {
        data: this.deleteseller,
        method: 'post'
      }).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('Delete seller fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.saler_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
        }
      })
    }
  }
}
</script>
<style>
</style>
