<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>
        Brands
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
          <b-button variant="danger" size="sm" class="mr-2" v-b-modal="'brands-modal-delete' + data.item.brand">
            Delete
          </b-button>
            <b-modal :id="'brands-modal-delete' + data.item.brand" hide-footer>
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
                      <b-button variant="danger" v-on:click="ondelete (data.item.brand)">Confirm</b-button>
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </b-modal>
          <b-button variant="primary" size="sm" class="mr-2" v-on:click="onedit (data.item.brand, data.item.sales_target)">
            Edit
          </b-button>
        </template>
      </b-table>
      <div>
        <b-button style="width:100%" v-b-modal.modal-brands>Add Data</b-button>
        <br>
        <br>
      </div>
      <b-modal id="modal-brands" size="xl" hide-footer>
        <div class="align-center">
          <p style="font-weight: bold;font-size:20px;" class="my-4">Add your brands</p>
        </div>
        <div>
          <b-container>
            <b-row>
              <b-col>
                <div>
                  Name
                </div>
                <b-input ref="brandsname" type="text"></b-input>
              </b-col>
              <b-col>
                Brands group
                <b-input ref="brandsgroup" type="text"></b-input>
              </b-col>
              <b-col>
                <div>
                  Target
                </div>
                <b-input ref="brandstarget" type="text"></b-input>
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
      filter: null,
      isBusy: false,
      fields: [{ key: 'brand', sortable: true }, { key: 'sales_target', sortable: false }, { key: 'last_update', sortable: true }, { key: 'function', sortable: false }],
      items: [],
      newItems: [],
      edit: [],
      deletebrands: [],
      settings: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15]
    }
  },
  beforeCreate () {},
  created () {},
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
        this.items = response.data.data.brand_list
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
          brand: this.$refs.brandsname.localValue,
          group: this.$refs.brandsgroup.localValue,
          sales_target: this.$refs.brandstarget.localValue
        }
      }
      console.log(this.newItems)
      axios.post('http://192.168.10.2:1308/setting/brand/add', this.newItems).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('Add brand fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.brand_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
          this.$refs.brandsname.localValue = ''
          this.$refs.brandsgroup.localValue = ''
          this.$refs.brandstarget.localValue = ''
        }
      })
    },
    onedit (indexbrand, indexsale) {
      this.edit = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          brand: indexbrand,
          sales_target: indexsale
        }
      }
      console.log(this.edit)
      axios('http://192.168.10.2:1308/setting/brand/update_sales_target', {
        data: this.edit,
        method: 'patch'
      }).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('Update Brands sales target fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.brand_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
        }
      })
    },
    ondelete (index) {
      this.deletebrands = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          brand: index
        }
      }
      axios('http://192.168.10.2:1308/setting/brand/delete', {
        data: this.deletebrands,
        method: 'delete'
      }).then(response => {
        if (response.data.error_code === 201) {
          console.log('Session not found.')
        } else if (response.data.error_code === 202) {
          console.log('Permission denied.')
        } else if (response.data.error_code === 303) {
          console.log('Delete brand fail.')
        } else if (response.data.error_code === 0) {
          this.items = response.data.data.brand_list
          this.totalRows = this.items.length
          this.$refs.table.refresh()
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
