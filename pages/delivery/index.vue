<template>
  <div class="delivery">
    <logout />
    <nav-bar @click="$router.push('/')" />
    <div class="con-delivery">
      <h2>
        Operaciones de delivery
      </h2>
      <div v-if="!operations" class="con-operations">
        <load block height="147px" class="mt-6" />
        <load block height="147px" class="mt-6" />
        <load block height="147px" class="mt-6" />
      </div>
      <div v-else class="con-operations">
        <div :class="{responsible: operation.responsible_in_id == getUserId, disabled: operation.responsible_in_id !== getUserId && (operation.status_location_delivery_in_id > 1 || operation.status_location_delivery_out_id > 1)}" :key="i" v-for="(operation, i) in operations" class="operation">
          <template v-if="operation.type_operation_user_id == 3 && operation.status_operation_id == 1 && (operation.direction_in !== operation.direction_out)">
            <div @click="handleClickOperation(operation, 'in')">
              <!-- Recogida in -->
              <header>
                <div class="icon-text">
                  <div class="con-icon">
                    <i class='bx bx-trip'></i>
                  </div>
                  <p>
                    Recogida
                  </p>
                </div>
                <div class="info">
                  <h6>
                    Monto
                  </h6>
                  <p>
                    {{ operation.send }} <br>
                    {{ operation.coin_send.coin }}
                  </p>
                </div>
              </header>
              <div class="con-info">
                <div class="info direction">
                  <h6>
                    Dirección
                  </h6>
                  <p>
                    {{ operation.direction_in }}
                  </p>
                </div>
              </div>
            </div>
          </template>
          <template v-if="operation.type_operation_ekambia_id == 3 && operation.status_operation_id == 3">
            <div @click="handleClickOperation(operation, 'out')">
              <!-- Entrega out -->
              <header>
                <div class="icon-text">
                  <div class="con-icon">
                    <i class='bx bx-trip'></i>
                  </div>
                  <p>
                    Entrega
                  </p>
                </div>
                <div class="info">
                  <h6>
                    Monto
                  </h6>
                  <p>
                    {{ operation.received }} <br>
                    {{ operation.coin_received.coin }}
                  </p>
                </div>
              </header>
              <div class="con-info">
                <div class="info direction">
                  <h6>
                    Dirección
                  </h6>
                  <p>
                    {{ operation.direction_out }}
                  </p>
                </div>
              </div>
            </div>
          </template>

          <template v-if="operation.type_operation_user_id == 3 && operation.type_operation_ekambia_id == 3 && (operation.direction_in == operation.direction_out) && operation.status_operation_id == 1">
            <div @click="handleClickOperation(operation, 'in-out')">
              <!-- Entrega y recogida -->
              <header>
                <div class="icon-text">
                  <div class="con-icon">
                    <i class='bx bx-trip'></i>
                  </div>
                  <p>
                    Recoger y entregar
                  </p>
                </div>
                <div class="info">
                  <h6>
                    Monto
                  </h6>
                  <p>
                    {{ operation.received }} <br>
                    {{ operation.coin_received.coin }}
                  </p>
                </div>
              </header>
              <div class="con-info">
                <div class="info direction">
                  <h6>
                    Dirección
                  </h6>
                  <p>
                    {{ operation.direction_out }}
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
import Echo from 'laravel-echo'
@Component({
  layout: 'mobile'
})
export default class delivery extends Vue {
  operations: any = null

  get getUserId() {
    return this.$cookies.get('user_id') || 0
  }

  handleClickOperation(operation, type) {
    console.log(operation)
    let path = '/delivery/operation'
    if (operation[`status_location_delivery_${type == 'out' ? 'out' : 'in' }_id`] == 2) {
      path += '/map'
    } else if (operation[`status_location_delivery_${type == 'out' ? 'out' : 'in' }_id`] == 3) {
      path += '/scan'
    }

    this.$router.push({
      path,
      query: {
        id: operation.id,
        type
      }
    })
  }

  getData() {
    axios.get(`/deliveries`).then(({data}) => {
      console.log(data.info.data)
      this.operations = data.info.data
    })
  }

  ws() {
    (window as any).Pusher = require('pusher-js');

    (window as any).Echo =  new Echo({
        broadcaster: 'pusher',
        key: 'a5e37d3bc65fe2addfe4',
        cluster: 'us2',
        forceTLS: false,
    });

    (window as any).Echo.channel('channel-ekambia').listen('CreatedOperation', (response) => {
      console.log('update - operations -- CreatedOperation')
      this.getData()
    });

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedStatusOperation', (response) => {
      console.log('update - operations -- UpdatedStatusOperation')
      this.getData()
    });

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedStatusLocationDelivery', (response) => {
      console.log('update - operations -- UpdatedStatusLocationDelivery')
      this.getData()
    });

    (window as any).Echo.connector.pusher.connection.bind('connected', () => {
      console.log('connected----------xxx');
    })
  }

  mounted() {
    this.getData()
    this.$bounceClose()
    this.ws()
  }
}
</script>
<style lang="sass" scoped>
.delivery
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  background: -color(gray)
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  .con-delivery
    padding: 15px
    flex: 1
    width: 100%
    h2
      font-size: 1.2rem
      width: 100%
      text-align: center
      padding: 10px
      padding-top: 0px
  .con-operations
    border-top: 1px solid -color(gray)
    overflow: auto
    flex: 1
    max-height: calc(100vh - 100px)
    padding-bottom: 50px
    padding-top: 10px
    width: 100%
    .operation
      padding: 12px
      display: flex
      align-items: center
      justify-content: flex-start
      flex-direction: column
      // border-bottom: 1px solid -color(gray)
      background: #fff
      margin: 12px 0px
      border-radius: 20px
      border: 2px solid transparent
      &.disabled
        pointer-events: none
        opacity: .5
      &.responsible
        border: 2px solid -color(color)
        .con-icon
          background: -color(color)
          color: -color(black)
      header
        display: flex
        align-items: center
        width: 100%
        justify-content: space-between
        .icon-text
          display: flex
          align-items: center
          justify-content: flex-start
          p
            font-weight: bold
            font-size: .8rem
      .con-info
        display: flex
        align-items: flex-start
        justify-content: space-between
        padding: 5px
        padding-top: 10px
        .direction
          padding-right: 10px
          flex: 1
      i
        font-size: 1.5rem
      .con-icon
        min-width: 40px
        height: 40px
        display: flex
        align-items: center
        justify-content: center
        margin-right: 10px
        background: -color(gray)
        border-radius: 10px
      p
        font-size: .9rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
