<template>
  <div>
    Saler
    <b-container>
      <b-row>
        <b-col cols="2">total</b-col>
        <b-col cols="8">
          <div>
            <b-progress :value="value" :max="max" height="3rem" show-progress animated></b-progress>
          </div>
        </b-col>
        <b-col cols="2">max</b-col>
      </b-row>
      <div v-for="(sales, index) in sale" :key="index">
        <br>
        <b-container>
          <b-row>
            <b-col cols="2">
              {{sales.name}}
            </b-col>
            <b-col cols="8">
              <router-link :to="'/sale/' + sales.name">
              <b-progress :value="sales.value" :max="sales.max" height="3rem" show-progress animated></b-progress>
              </router-link>
            </b-col>
            <b-col cols="2">
              {{sales.max}}
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 45,
      max: 100,
      sale: [
        {
          name: 'a',
          value: 20,
          max: 100
        },
        {
          name: 'b',
          value: 10,
          max: 100
        }
      ]
    }
  },
  metaInfo () {
    return {
      title: 'Saler',
      titleTemplate: '%s - MYC'
    }
  }
}
</script>
<style scoped>
</style>
