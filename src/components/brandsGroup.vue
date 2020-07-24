<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>
        Brands group
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
        <!-- <template v-slot:cell(target)="data">
          <b-input style="text-align:center" type="text" v-model="items[data.index].target"></b-input>
        </template> -->
        <template v-slot:cell(function)="data">
          <b-button variant="danger" size="sm" class="mr-2" v-b-modal="'brandsG-modal-delete' + data.item.brand">
            Delete
          </b-button>
            <b-modal :id="'brandsG-modal-delete' + data.item.brand" hide-footer>
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
          <!-- <b-button variant="primary" size="sm" class="mr-2" v-on:click="onedit (data.index)">
            Edit
          </b-button> -->
        </template>
      </b-table>
      <div>
        <b-button style="width:100%" v-b-modal.modal-brands-group>Add Data</b-button>
        <br>
        <br>
      </div>
      <b-modal id="modal-brands-group" hide-footer>
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
                <b-input ref="brandsGname" type="text"></b-input>
              </b-col>
              <b-col>
                <div>
                  Brands group
                </div>
                <b-input ref="brandGroup" type="text"></b-input>
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
      isBusy: false,
      fields: ['Brand', 'Brand Group', 'function'],
      items: [],
      newItems: [],
      deletebrands: [],
      settings: [],
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15]
    }
  },
  created () {
  },
  methods: {
    addData () {
      console.log('addData')
      this.newItems = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          brand: this.$refs.brandsGname.localValue,
          group: this.$refs.brandGroup.localValue
        }
      }
      axios.post('http://192.168.10.2:1308/setting/brand_group/add', this.newItems).then(response => {
        this.items = response.data.data.brand_group_list
        this.totalRows = this.items.length
        this.$refs.table.refresh()
      })
      // console.log(this.newItems)
      // var obj = JSON.parse(this.items)
      // this.items.push(this.newItems)
      // this.$refs.table.refresh()
      // console.log(this.items)
      // console.log(obj)
    },
    ondelete (indexbrand) {
      // delete this.items[index]
      // console.log(this.items)
      // console.log(this.items)
      this.deletebrands = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          brand: indexbrand
        }
      }
      axios('http://192.168.10.2:1308/setting/brand_group/delete', {
        data: this.deletebrands,
        method: 'delete'
      }).then(response => {
        this.items = response.data.data.brand_group_list
        this.totalRows = this.items.length
        this.$refs.table.refresh()
      })
    }
  },
  mounted () {
    this.settings = {
      session_id: JSON.parse(sessionStorage.getItem('login')),
      data: {}
    }
    axios.post('http://192.168.10.2:1308/setting', this.settings).then(response => {
      this.items = response.data.data.brand_group_list
      this.totalRows = this.items.length
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
