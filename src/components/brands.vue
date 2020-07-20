<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>
        Brands
      </div>
      <b-table ref="table" :items="items" :fields="fields" class="mt-3" outlined>
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
      isBusy: false,
      fields: ['brand', 'target', 'last_update', 'function'],
      items: [
        { brand: 'Dickerson', group: '', target: 1100, last_update: '2020-07-17' },
        { brand: 'Larsen', group: '', target: 1200, last_update: '2020-07-17' },
        { brand: 'Geneva', group: '', target: 1200, last_update: '2020-07-17' },
        { brand: 'Jami', group: '', target: 1500, last_update: '2020-07-17' }
      ],
      newItems: [],
      edit: [],
      deletebrands: []
    }
  },
  created () {
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
      axios.post('http://192.168.43.190:1308/setting/brand/add', this.newItems).then(response => {
        this.items = response.data.data.brand_list
      })
      // console.log(this.items)
      // var obj = JSON.parse(this.items)
      // this.items.push(this.newItems)
      this.$refs.table.refresh()
      // console.log(this.items)
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
      axios.post('http://192.168.43.190:1308/setting/brand/update_sales_target', {
        data: this.edit,
        _method: 'patch'
      }).then(response => {
        console.log(response)
        this.items = response.data.data.brand_list
      })
      this.$refs.table.refresh()
    },
    ondelete (index) {
      // delete this.items[index]
      this.deletebrands = {
        session_id: JSON.parse(sessionStorage.getItem('login')),
        data: {
          brand: this.items[index].brand
        }
      }
      console.log(this.items[index].brand)
      // console.log(this.items)
      axios.post('http://192.168.43.190:1308/setting/brand/delete', {
        data: this.deletebrands,
        _method: 'delete'
      }).then(response => {
        this.items = response.data.data.brand_list
      })
      // axios.delete()
      this.$refs.table.refresh()
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.align-center {
  text-align: center;
}
</style>
