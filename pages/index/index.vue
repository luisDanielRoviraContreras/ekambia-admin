<template>
  <div class="operador">
    <logout />
    <nav-bar />
    <h2>
      Operaciones
    </h2>
    <div v-if="!operations" class="con-operations">
      <load block />
    </div>
    <div v-else-if="operations.length == 0" class="con-operations not-found">
      No hay operaciones por procesar
    </div>
    <div v-else class="con-operations">
      <div @click="handleClickOperation(operation)" :key="i" v-for="(operation, i) in operations" class="operation">
        <div class="text bank">
          <i class='bx bx-transfer' ></i>
        </div>
        <div class="text">
          <h6>
            Id
          </h6>
          <p>
            {{ operation.id }}
          </p>
        </div>
        <div class="text">
          <h6>
            Comprobante
          </h6>
          <p>
            {{ operation.num_reference }}
          </p>
        </div>
        <div class="text">
          <h6>
            Monto transferido
          </h6>
          <p>
            {{ operation.send }}
          </p>
        </div>
        <div class="text">
          <h6>
            Monto a enviar
          </h6>
          <p>
            {{ operation.received }}
          </p>
        </div>
        <div class="text">
          <h6>
            Tipo de cambio
          </h6>
          <p>
            {{ operation.exchange_type }}
          </p>
        </div>
        <div class="text">
          <h6>
            Fecha
          </h6>
          <p>
            {{ operation.datex }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
import Echo from 'laravel-echo'
@Component
export default class operador extends Vue {
  operations: any = null

  handleClickOperation(operation: any) {
    this.$router.push({
      path: '/operation/',
      query: {
        id: operation.id
      }
    })
  }

  getData() {
    axios.get(`/operador-operation`).then(({data}) => {
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

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedStatusOperation', (response) => {
      console.log('update - operations -- UpdatedStatusOperation')
      this.getData()
    });

    (window as any).Echo.connector.pusher.connection.bind('connected', () => {
      console.log('connected----------xxx');
    })
  }

  mounted() {
    this.getData()
    this.ws()
  }
}
</script>
<style lang="sass" scoped>
.operador
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  h2
    padding: 20px
.con-operations
  width: 100%
  max-width: 1000px
  max-height: 100vh
  overflow: auto
  &.not-found
    background: -color('bg')
    padding: 20px
    border-radius: 20px
    text-align: center
    font-weight: bold
    font-size: 1rem
    color: rgba(0,0,0,.6)
  .operation
    background: -color(bg)
    margin: 14px 0px
    border-radius: 20px
    display: flex
    align-items: center
    justify-content: flex-start
    margin-right: 10px
    .text
      padding: 10px
      flex: 1
      &.bank
        flex: none
        border-right: 2px solid -color(gray)
        font-size: 1.3rem
        min-width: 56px
        display: flex
        align-items: center
        justify-content: center
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
