<template>
  <div>
    <b-container>
      <b-table :items="items" :fields="fields" :busy="isBusy" class="mt-3" outlined>
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      <template v-slot:cell(AAAA)="">
        <b-button size="sm" class="mr-2" type="submit">
          Not Approve
        </b-button>
        <b-button size="sm" class="mr-2">
          Approved
        </b-button>
      </template>
      <template v-slot:cell(age)="data">
        <b-input type="text" v-model="items[data.index].age"></b-input>
      </template>
      </b-table>
      <b-button style="width:100%" v-b-modal.modal-1>Add Data</b-button>
      <b-modal id="modal-1" hide-footer>
        <p class="my-4">Add your brands</p>
        <div>
          <b-container>
            <b-row>
              <b-col>
                <div>
                  Name
                </div>
                <b-input type="text"></b-input>
              </b-col>
              <b-col>
                <div>
                  Target
                </div>
                <b-input type="text"></b-input>
              </b-col>
              <b-col>
                <!-- <div>
                  Date
                </div>
                <b-input type="date"></b-input> -->
                <div>
                  <div  style="margin-top:-1px;">
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
      isBusy: false,
      fields: ['first_name', 'last_name', 'age', 'AAAA'],
      items: [
        { first_name: 'Dickerson', last_name: 'MacDonald', age: 11 },
        { first_name: 'Larsen', last_name: 'Shaw', age: 12 },
        { first_name: 'Geneva', last_name: 'Wilson', age: 120 },
        { first_name: 'Jami', last_name: 'Carney', age: 15 }
      ]
    }
  },
  methods: {
    toggleBusy () {
      this.isBusy = !this.isBusy
    },
    addData () {
      console.log('addData')
    }
  }
}
</script>
<style>
</style>
