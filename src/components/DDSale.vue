<template>
  <div>
    <div v-for="(salers, index) in saler" :key="index">
      นาย {{salers.name}}
      <br>
      <b-container>
        <b-row>
          <b-col cols="2">
            {{salers.name}}
          </b-col>
          <b-col cols="8">
            <b-progress :value="salers.value" :max="salers.max" height="3rem" show-progress animated></b-progress>
          </b-col>
          <b-col cols="2">
            {{salers.max}}
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <br>
        <div v-for="(salersss, index) in sale" :key="index">
          <div v-for="(ss, index) in salersss.sale_value" :key="index">
            bbb{{ss.no}}
          </div>
        </div>
        <br>
        <table class="table">
          <thead>
            <tr class="table-active">
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>abcd</th>
              <th>20</th>
            </tr>
          </tbody>
        </table>
      </b-container>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      sale: [
        {
          name: 'a',
          value: 20,
          max: 100,
          sale_value: [
            {
              no: 1,
              name: 'aaaaa',
              price: 200
            }
          ]
        },
        {
          name: 'b',
          value: 10,
          max: 100
        }
      ],
      saler: []
    }
  },
  metaInfo () {
    return {
      title: 'Detail Saler ' + this.$route.params.name,
      titleTemplate: '%s - MYC'
    }
  },
  mounted () {
    console.log(this.$route.params.name)
    console.log(this.sale[1].name)
    this.salers()
  },
  methods: {
    salers () {
      for (let i = 0; i < this.sale.length; i++) {
        if (this.$route.params.name === this.sale[i].name) {
          this.saler = [{
            name: this.sale[i].name,
            value: this.sale[i].value,
            max: this.sale[i].max
          }
          ]
        }
      }
      console.log(this.saler)
    }
  }
}
</script>
<style>
</style>
