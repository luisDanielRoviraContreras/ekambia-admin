<template>
  <div class="online-table">
    <div class="con-search">
      <input v-model="search" @input="handleSearch" placeholder="Buscar operación por cedula de identidad" type="text">
    </div>
    <div v-if="!operations" class="con-operations">
      <load block />
    </div>
    <div v-else-if="operations.length == 0" class="con-operations not-found">
      No hay operaciones por procesar
    </div>
    <div v-else class="con-operations">
      <div @click="handleClickOperation(operation)" :key="i" v-for="(operation, i) in operations" class="operation" :class="{ responsible: operation.responsible_in_id == getUserId }">
        <div :class="[`status${operation.status_operation_id}`]" class="text">
          <h6>
            Estatus
          </h6>
          <span v-if="operation.status_operation_id == 1">
            Pagando
          </span>
          <span v-if="operation.status_operation_id == 2">
            Verificando
          </span>
          <span v-if="operation.status_operation_id == 3">
            Recibiendo
          </span>
          <span v-if="operation.status_operation_id == 4">
            Finalizada
          </span>
          <span v-if="operation.status_operation_id == 5">
            Denegada
          </span>
        </div>
        <div class="text bank">
          <i title="Verificar y transferir" v-if="operation.type_operation_ekambia_id == 1 && operation.type_operation_user_id == 1" class='bx bx-transfer' ></i>
          <i title="Transferencia saliente" v-else-if="operation.type_operation_ekambia_id == 1" class='bx bx-down-arrow-alt'></i>
          <i title="Revisar transferencia" v-else-if="operation.type_operation_user_id == 1" class='bx bx-up-arrow-alt' ></i>
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
            {{ operation.coin_send.coin }}
          </p>
        </div>
        <div class="text">
          <h6>
            Monto a enviar
          </h6>
          <p>
            {{ operation.received }}
            {{ operation.coin_received.coin }}
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
            {{ operation.datex.split('-')[2] }}-{{ operation.datex.split('-')[1] }}-{{ operation.datex.split('-')[0] }}
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
export default class operadorTable extends Vue {
  operations: any = null
  search: any = null

  get getUserId() {
    return this.$cookies.get('user_id') || 0
  }

  handleSearch() {
    if (this.search) {
      console.log(this.search)
      axios.post(`/operador-search`, {
        value: this.search
      }).then(({data}) => {
        this.operations = data.info.data
      })
    } else {
      this.getData()
    }
  }

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
      console.log(data)
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
.con-search
  width: 100%
  padding: 10px 0px
  max-width: 1200px
  input
    width: 100%
    padding: 14px 20px
    border: 0px
    border-radius: 15px
    &::placeholder
      color: rgba(0,0,0,.4)

.online-table
  width: 100%
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
.con-operations
  width: 100%
  max-width: 1200px
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
    transition: all .25s ease
    cursor: pointer
    overflow: hidden
    &.disabled
      pointer-events: none
      opacity: .5
    &.responsible
      border: 2px solid -color(color)
      .con-icon
        background: -color(color)
        color: -color(black)
    &:hover
      background: -color(gray)
    .text
      padding: 10px
      flex: 1
      &.status1
       background: #5197f8
       color: #fff
       max-width: 100px
      &.status2
        background: #fb8137
        color: #fff
        max-width: 100px
      &.status3
        background: #6d44ff
        color: #fff
        max-width: 100px
      &.status4
        background: #00d34f
        color: #fff
        max-width: 100px
      &.status5
        background: #f6525d
        color: #fff
        max-width: 100px
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
