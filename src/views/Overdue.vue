<template>
  <div>
    Overdue
    <b-container>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <b-progress :value="value" :max="max" height="3rem" show-progress animated></b-progress>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 20,
      max: 100
    }
  },
  metaInfo () {
    return {
      title: 'Overdue',
      titleTemplate: '%s - MYC'
    }
  }
}
</script>
<style>
</style>
