<template>
 <div v-if="admin == 0">
    <h1>Menu</h1>
    <b-container fluid="xl">
      <br>
      <b-container>
        <b-row>
          <b-col v-if="sales === 1">
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/sale"><h5>Sale</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
          <b-col v-if="management === 2">
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/management"><h5>Management</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
          <b-col v-if="marketing === 3">
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/marketing"><h5>Marketing</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
   <div v-else-if="admin == 1">
    <h1>Menu</h1>
    <b-container fluid="xl">
      <br>
      <b-container>
        <b-row>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/sale"><h5>Sale</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/management"><h5>Management</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
          <b-col>
            <div class="card">
              <!-- <img src="https://i.imgur.com/pdfcCXr.png" class="card-img-top" alt="map ckb"> -->
              <br>
              <div class="card-body">
                <!-- <h5 class="card-title"><i class="fa fa-location-arrow" aria-hidden="true"></i> {{titleOA}}</h5> -->
                <!-- <p class="card-text">{{detailOA}}</p><br> -->
                <a href="/marketing"><h5>Marketing</h5></a>
                <!-- <p>ลากิจ - อนุสรณ์ - ยังไม่อนุมัติ</p> -->
                <div class="align-right">
                  <!-- <button class="button"><a class="linkmap" target="_blank" v-bind:href="linkOA"><img style="width:50px;height:50px;" src="https://i.imgur.com/JKjVDrz.png" alt="map ckb"></a></button> -->
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      purchase: '',
      management: '',
      accounting: '',
      marketing: '',
      sales: '',
      admin: ''
    }
  },
  beforeCreate () {
    var localjwt = sessionStorage.getItem('login')
    if (localjwt !== null) {
      // location.replace('/sale')
    } else {
      location.replace('/')
    }
  },
  mounted () {
    if (sessionStorage.getItem('level') === '0') {
      this.admin = 1
      console.log('adminlogin')
    } else if (sessionStorage.getItem('level') === '1') {
      // this.local = JSON.parse(sessionStorage.login)
      this.admin = 0
      console.log('null')
      // this.sales = 1
      // this.management = 2
      // this.marketing = 3
      for (let i = 0; i < 10; i++) {
        if (('sales0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.sales = 1
          console.log('this is sales0' + i)
        } else if (('accounting0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
        } else if (('purchase0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
        } else if (('management0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.management = 2
        } else if (('marketing0' + i) === JSON.parse(sessionStorage.getItem('username'))) {
          this.marketing = 3
        }
      }
      console.log('admin login')
      this.local = sessionStorage.getItem('login')
    }
  },
  metaInfo () {
    return {
      title: 'Dashboard',
      titleTemplate: '%s - MYC'
    }
  }
}
</script>
<style scope>
</style>
