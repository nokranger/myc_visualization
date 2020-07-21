<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>
        Seller
      </div>
      <b-table ref="table" :items="items" :fields="fields" class="mt-3" head-variant="dark" table-variant="primary" striped bordered hover fixed outlined>
        <template v-slot:cell(sales_target)="data">
          <b-input style="text-align:center" type="text" v-model="items[data.index].sales_target"></b-input>
        </template>
        <template v-slot:cell(function)="data">
          <b-button
            variant="danger"
            size="sm"
            class="mr-2"
            v-b-modal="'sale-modal-delete' + data.index"
          >Delete</b-button>
          <b-modal :id="'sale-modal-delete' + data.index" hide-footer>
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
      fields: ['code', 'name', 'sales_target', 'function'],
      items: [
        { code: 'Dickerson', name: 1100, sales_target: '2020-07-17' },
        { code: 'Larsen', name: 1200, sales_target: '2020-07-17' },
        { code: 'Geneva', name: 1200, sales_target: '2020-07-17' },
        { code: 'Jami', name: 1500, sales_target: '2020-07-17' }
      ],
      newItems: [],
      edit: [],
      deleteseller: [],
      settings: []
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
          code: this.$refs.sellercode.localValue,
          name: this.$refs.sellername.localValue,
          target: this.$refs.sellertarget.localValue
        }
      }
      axios.post('http://192.168.43.190:1308/setting/saler/add', this.newItems).then(response => {
        this.items = response.data.data.saler_list
        this.$refs.table.refresh()
      })
      // console.log(this.newItems)
      // var obj = JSON.parse(this.items)
      // this.items.push(this.newItems)
      // this.$refs.table.refresh()
      // console.log(this.items)
      // console.log(obj)
    },
    onedit (index) {
      console.log(this.items[index].sales_target)
      this.edit = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          code: this.items[index].code,
          sales_target: this.items[index].sales_target
        }
      }
      // console.log(this.edit)
      axios.post('http://192.168.43.190:1308/setting/saler/update_sales_target', {
        data: this.edit,
        _method: 'patch'
      }).then(response => {
        this.items = response.data.data.saler_list
        this.$refs.table.refresh()
      })
    },
    ondelete (index) {
      // delete this.items[index]
      // console.log(this.items)
      // console.log(this.items)
      this.deleteseller = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          code: this.items[index].code
        }
      }
      axios.post('http://192.168.43.190:1308/setting/saler/delete', {
        data: this.deleteseller,
        _method: 'delete'
      }).then(response => {
        this.items = response.data.data.saler_list
        this.$refs.table.refresh()
      })
    }
  },
  mounted () {
    this.settings = {
      session_id: JSON.parse(sessionStorage.getItem('login')),
      data: {}
    }
    axios.post('http://192.168.43.190:1308/setting', this.settings).then(response => {
      this.items = response.data.data.saler_list
      this.$refs.table.refresh()
    })
  }
}
</script>
<style>
</style>
