<template>
  <div>
    <div v-for="(salers, index) in saler" :key="index">
      <!-- นาย {{salers.name}} -->
      <br>
      <b-container>
        <b-row>
          <b-col cols="2">
            {{salers.name}}
          </b-col>
          <b-col cols="8">
            <!-- <b-progress :value="salers.value" :max="salers.max" height="3rem" show-progress animated></b-progress> -->
            <b-progress :max="salers.max" height="3rem" show-progress animated>
              <b-progress-bar :value="salers.value" :label="`${((salers.value))}`"></b-progress-bar>
            </b-progress>
          </b-col>
          <b-col cols="2">
            <!-- {{salers.max}} -->
            Total
          </b-col>
        </b-row>
      </b-container>
      <b-container>
        <br>
        <br>
        <table class="table">
          <thead>
            <tr class="table-active">
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(salersss, index) in saler[index].sale_value" :key="index" :class="index % 2 === 0 ? 'table-primary' : 'table-active'">
                <th>{{index + 1}}</th>
                <th>{{salersss.name}}</th>
                <th>{{salersss.price}}</th>
            </tr>
          </tbody>
        </table>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      sales: [],
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
      title: 'Detail Seller ' + this.$route.params.name,
      titleTemplate: '%s - MYC'
    }
  },
  mounted () {
    // setInterval(this.timer, 900000)
    console.log(this.$route.params.name)
    // console.log(this.sale[1].name)
    // console.log(this.$route.params.name)
    if (sessionStorage.getItem('login') === null) {
      location.replace('/')
      // console.log('testL')
    }
    // this.salers()
    this.getSale()
  },
  methods: {
    salers () {
      for (let i = 0; i < this.sale.length; i++) {
        // console.log(this.sale.length)
        if (this.$route.params.name === this.sale[i].name) {
          this.saler = [{
            name: this.sale[i].name,
            value: this.sale[i].value,
            max: this.sale[i].max
          }
          ]
        }
      }
      // console.log(this.saler)
    },
    getSale () {
      // let ss = []
      axios.all([axios.get('http://192.168.1.46:1308/sales')]).then(axios.spread((resSale) => {
        console.log(resSale)
        this.sales = {
          max: resSale.data.data.sales_target,
          value: resSale.data.data.total_sales,
          saler_list: resSale.data.data.saler_list
        }
        // this.sales = resSale.data.result
        for (let i = 0; i < this.sales.saler_list.length; i++) {
          if (this.$route.params.name === this.sales.saler_list[i].code) {
            console.log('yes')
            this.saler = [{
              name: this.sales.saler_list[i].name,
              value: this.sales.saler_list[i].sales_values,
              max: this.sales.saler_list[i].sales_target,
              sale_value: this.sales.saler_list[i].sales_value_list.map((saleItem) => {
                return {
                  name: saleItem.name,
                  price: saleItem.value
                }
              })
            }]
          }
        }
        console.log(this.saler)
        // this.saler.push(ss)
        // console.log(this.sales[1].sale_value)
        // console.log(this.saler)
        // this.sales = resSale.data.result.map((data, i) => {
        //   return {
        //     name: data.name,
        //     value: data.value,
        //     max: data.max,
        //     sale_value: [
        //       {
        //         no: data.sale_value[i].no,
        //         name: data.sale_value[i].name,
        //         price: data.sale_value[i].price
        //       }
        //     ]
        //   }
        // })
        // console.log(this.sales)
      }))
    },
    timer () {
      console.log('end')
      sessionStorage.removeItem('login')
      sessionStorage.removeItem('jwt')
      window.location.reload()
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
div {
  font-family: 'Kanit', sans-serif;
  font-size: 30px;
}
</style>
