<template>
 <div>
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
                <a href="/accounting"><h5>Accounting</h5></a>
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
    return {}
  },
  beforeCreate () {
    var localjwt = sessionStorage.getItem('login')
    if (localjwt !== null) {
      // location.replace('/sale')
    } else {
      location.replace('/')
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
