<template>
  <div>
    <b-container style="border-bottom: solid 3px gray">
      <div>
        Seller
      </div>
      <b-table ref="table" :items="items" :fields="fields" class="mt-3" outlined>
        <template v-slot:cell(target)="data">
          <b-input style="text-align:center" type="text" v-model="items[data.index].target"></b-input>
        </template>
        <template v-slot:cell(function)="data">
          <b-button variant="danger" size="sm" class="mr-2" v-on:click="ondelete (data.index)">
            Delete
          </b-button>
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
      <b-modal id="modal-sell" hide-footer>
        <p class="my-4">Add your Seller</p>
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
export default {
  data () {
    return {
      isactive: [],
      isBusy: false,
      fields: ['_name', 'target', 'date', 'function'],
      items: [
        { _name: 'Dickerson', target: 1100, date: '2020-07-17' },
        { _name: 'Larsen', target: 1200, date: '2020-07-17' },
        { _name: 'Geneva', target: 1200, date: '2020-07-17' },
        { _name: 'Jami', target: 1500, date: '2020-07-17' }
      ],
      newItems: []
    }
  },
  created () {
  },
  methods: {
    addData () {
      console.log('addData')
      this.newItems = {
        _name: this.$refs.brandsname.localValue,
        target: this.$refs.brandstarget.localValue
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
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
