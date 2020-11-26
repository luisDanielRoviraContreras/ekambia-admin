<template>
  <div class="maps">
    <nav-bar back absolute @click="$router.push('/delivery/')" />
    <tracking :lng="lng" :lat="lat" :ll="ll" v-if="data" :to="data[`direction_${this.$route.query.type == 'out' ? 'out' : 'in' }`]" :from="from">
      <div v-if="user" class="con-user">
        <div class="user">
          <div class="avatar">
            <i class='bx bx-user' ></i>
          </div>
          <p>
            {{ this.user.firstName }}
            <span>
              {{ this.user.dni }}
            </span>
          </p>
        </div>
        <a :href="`tel:${this.user.tel}`" class="call">
          <i class='bx bxs-phone' ></i>
        </a>
      </div>
      <Button @click="handleClick" block yellow>
        Ya estoy en el lugar de entrega
      </Button>
    </tracking>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class maps extends Vue {
  data: any = null
  user: any = null

  position: any = null

  from: any = "Ctra. Navacerrada, s / n, 28400 Collado Villalba, Madrid, España"

  ll: any = false
  lng: any = null
  lat: any = null

  updatePosition() {
    const onUbicacionConcedida = position => {
      this.position = position.coords.latitude
      axios.post(`location-${this.$route.query.type == 'out' ? 'out' : 'in' }-delivery-update/${this.$route.query.id}`, {
        [`lat_${this.$route.query.type == 'out' ? 'out' : 'in' }`]: position.coords.latitude,
        [`lon_${this.$route.query.type == 'out' ? 'out' : 'in' }`]: position.coords.longitude
      }).then(({data}: any) => {
        this.ll = true
        this.lat = position.coords.latitude
        this.lng = position.coords.longitude
      })
    }

    const onErrorDeUbicacion = err => {
      console.log("Error obteniendo ubicación: ", err);
    }
    // Solicitar
    // (navigator as any).geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);

    // (navigator as any).geolocation.watchPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud)
    setInterval(() => {
      (navigator as any).geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, {
          enableHighAccuracy: true,
          maximumAge: 3000,
          timeout: 3000
      })
    }, 3000)
  }

  getOperation() {
    axios.get(`/operation-show/${this.$route.query.id}`).then(({data}: any) => {
      this.data = data.info
      this.getUser(this.data.user_id)
    })
  }

  getUser(id) {
    axios.get(`/user-show/${id}`).then(({ data }: any) => {
      this.user = data.info
    })
  }

  mounted() {
    this.getOperation()
    this.updatePosition()
  }

  handleClick() {
    this.$dialog({
      title: '¿Estas seguro de estar en el lugar de entrega?',
      textCancel: 'No',
      textSuccess: 'Si',
      success: () => {
        axios.post(`status-location-${this.$route.query.type == 'out' ? 'out' : 'in' }-delivery-update/${this.$route.query.id}`, {
          [`status_location_delivery_${this.$route.query.type == 'out' ? 'out' : 'in' }_id`]: 3,
        }).then(() => {
          console.log('paso en update')
          this.$router.push({
            path: '/delivery/operation/scan',
            query: { ...this.$route.query }
          })
        })
      }
    })
  }
}
</script>
<style lang="sass">
.maps
  .navbar-mobile
    padding-right: 10px
    z-index: 10000
    .right
      background: #fff
      height: 45px
      padding: 0px 10px
      margin-top: 10px
      border-radius: 10px
      box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
      img
        height: 20px

    .back-btn
      background: #fff !important
      border-radius: 10px
      width: 45px
      height: 45px
      margin-top: 10px
      box-shadow: 0px 5px 25px 0px rgba(0,0,0,.05)
      svg
        width: 22px
</style>
<style lang="sass">
.con-user
  position: relative
  display: flex
  align-items: center
  justify-content: space-between
  padding: 10px
  border-bottom: 1px solid -color(gray)
  margin-bottom: 10px
  .user
    display: flex
    align-items: center
    justify-content: center
    .avatar
      width: 50px
      height: 50px
      border-radius: 50%
      background: -color(gray)
      display: flex
      align-items: center
      justify-content: center
      margin-right: 5px
      i
        font-size: 1.7rem

  /deep/p
    font-size: 1.1rem !important
    display: flex
    align-items: flex-start
    justify-content: center
    flex-direction: column
    span
      opacity: .7
      font-size: .9rem
  .call
    width: 50px
    height: 50px
    display: flex
    align-items: center
    justify-content: center
    border-radius: 16px
    border: 0px
    background: -color(black)
    color: #fff
    i
      font-size: 1.6rem
</style>
