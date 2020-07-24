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
        <template v-slot:cell(target)="data">
          <b-input style="text-align:center" type="text" v-model="items[data.index].target"></b-input>
        </template>
        <template v-slot:cell(function)="data">
          <b-button variant="danger" size="sm" class="mr-2" v-b-modal="'brands-modal-delete' + data.index">
            Delete
          </b-button>
            <b-modal :id="'brands-modal-delete' + data.index" hide-footer>
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
          <b-button variant="primary" size="sm" class="mr-2" v-on:click="onedit (data.index)">
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
                <!-- <div>
                  Date
                </div>
                <b-input type="date"></b-input> -->
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
      fields: [{ key: 'brand', sortable: true }, { key: 'target', sortable: false }, { key: 'last_update', sortable: true }, { key: 'function', sortable: false }],
      items: [
        { brand: 'Dickerson', group: '', target: 1100, last_update: '2020-07-16' },
        { brand: 'Larsen', group: '', target: 1200, last_update: '2020-07-15' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Jami', group: '', target: 1500, last_update: '2020-07-13' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-14' }
      ],
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
  created () {
    // console.log(this.items)
  },
  methods: {
    addData () {
      console.log('addData')
      // console.log(this.$$refs.brandsgroup.localValue)
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
        this.items = response.data.data.brand_list
        this.$refs.table.refresh()
      })
    },
    onedit (index) {
      console.log(this.items[index].target)
      this.edit = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          brand: this.items[index].brand,
          group: this.items[index].target
        }
      }
      console.log(this.edit)
      axios('http://192.168.10.2:1308/setting/brand/update_sales_target', {
        data: this.edit,
        method: 'patch'
      }).then(response => {
        console.log(response)
        this.items = response.data.data.brand_list
        this.$refs.table.refresh()
      })
    },
    ondelete (index) {
      // delete this.items[index]
      this.deletebrands = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          brand: this.items[index].brand
        }
      }
      // console.log(this.items[index].brand)
      // console.log(this.items)
      axios('http://192.168.10.2:1308/setting/brand/delete', {
        data: this.deletebrands,
        method: 'delete'
      }).then(response => {
        this.items = response.data.data.brand_list
        // delete this.items[index]
        this.$refs.table.refresh()
      })
      // axios.delete()
      // this.$refs.table.refresh()
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    this.totalRows = this.items.length
    this.settings = {
      session_id: JSON.parse(sessionStorage.getItem('login')),
      data: {}
    }
    axios.post('http://192.168.10.2:1308/setting', this.settings).then(response => {
      this.items = response.data.data.brand_list
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
