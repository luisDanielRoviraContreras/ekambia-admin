<template>
  <div class="operation">
    <nav-bar not-padding back @click="$router.push('/delivery/')" />
    <div v-if="data" class="con-info">
      <div v-if="$route.query.type == 'out' || $route.query.type == 'in-out'" class="info">
        <b>
          Monto a entregar
        </b>
        <p>
          {{ data.received }} {{ data.coin_received.coin }}
        </p>
      </div>
      <div v-if="$route.query.type == 'out' || $route.query.type == 'in-out'" class="con-switch">
        <c-switch v-model="hasMoney" /> <p>Ya tengo el dinero para entregar</p>
      </div>
      <div v-if="$route.query.type == 'in' || $route.query.type == 'in-out'" class="info">
        <b>
          Monto a recoger
        </b>
        <p>
          {{ data.send }} {{ data.coin_send.coin }}
        </p>
      </div>
      <div v-if="$route.query.type == 'in' || $route.query.type == 'in-out'" class="con-switch">
        <c-switch v-model="hasCollect" /> <p>Listo! ya se cuanto recoger</p>
      </div>
      <div class="info d">
        <b>
          Dirección
        </b>
        <p class="address">
          {{ data[`direction_${this.$route.query.type == 'in' ? 'in' : 'out' }`] }}
        </p>
      </div>
      <div class="info">
        <b>
          Distancia
        </b>
        <p>
          {{ distance }}
        </p>
      </div>
      <div class="info">
        <b>
          Duración estimada
        </b>
        <p>
          {{ duration }}
        </p>
      </div>
    </div>
    <div v-else class="con-info">
      <load class="mt-6" />
      <load class="mt-6" />
      <load class="mt-6" />
      <load class="mt-6" height="100px" />
      <load class="mt-6" />
      <load class="mt-6" />
    </div>

    <Button @click="handleNext" :disabled="isDisabled" yellow block>
      Comenzar entrega
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { gmapApi } from 'gmap-vue';
import axios from '~/plugins/axios'
@Component({
  layout: 'mobile'
})
export default class operation extends Vue {

  from: any = "Ctra. Navacerrada, s / n, 28400 Collado Villalba, Madrid, España"
  to: any = "Rafael alberti 13, collado villalba, españa"

  distance: any = null
  duration: any = null
  hasMoney: boolean = false
  hasCollect: boolean = false
  data: any = null

  get isDisabled() {
    const type = this.$route.query.type
    if (type == 'in-out') {
      return !this.hasCollect || !this.hasMoney
    } else if (type == 'in') {
      return !this.hasCollect
    } else {
      return !this.hasMoney
    }
  }

  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      this.data = data.info
      console.log(this.data)
      this.getMap(this.data[`direction_${this.$route.query.type == 'out' ? 'out' : 'in' }`])
    })
  }

  getMap(to) {
    this.$gmapApiPromiseLazy().then(() => {
      const google = gmapApi()
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({'address': this.from}, ([results1], status) => {
        geocoder.geocode({'address': to}, ([results2], status) => {
          this.calcRoute(results1.geometry.location, results2.geometry.location, google)
        })
      })
    })
  }

  mounted() {
    this.getOperation()
  }

  handleNext() {
    axios.post(`status-location-${this.$route.query.type == 'out' ? 'out' : 'in' }-delivery-update/${this.$route.query.id}`, {
      [`status_location_delivery_${this.$route.query.type == 'out' ? 'out' : 'in' }_id`]: 2,
    }).then(() => {
      this.$router.push({
        path: '/delivery/operation/map',
        query: {
          ...this.$route.query
        }
      })
      console.log('paso en update')
    })
  }

  calcRoute(start, end, google) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC
    };



    directionsService.route(request, (result, status) => {
      if (status == 'OK') {
        var route = result.routes[0].legs[0]

        this.duration = route.duration.text
        this.distance = route.distance.text

        console.log(route)
      }
    });
    // directionsRenderer.setMap(this.$refs.map.$mapObject)
  }
}
</script>
<style lang="sass" scoped>
.operation
  width: 100%
  padding: 15px
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  .con-info
    flex: 1
    width: 100%
    .info
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
      padding: 20px
      background: -color(gray)
      border-radius: 20px
      margin-top: 20px
      font-size: .9rem
      &.d
        flex-direction: column
        align-items: flex-start
      p
        font-weight: bold
      .address
        font-weight: normal
        font-size: .9rem
    .con-switch
      display: flex
      align-items: center
      justify-content: flex-start
      padding: 15px 10px
      p
        font-size: .85rem
        padding: 0px 10px
        font-weight: bold

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
