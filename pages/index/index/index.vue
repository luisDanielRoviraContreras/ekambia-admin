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
        <div class="text bank">
          <i v-if="operation.type_operation_ekambia_id == 1 && operation.type_operation_user_id == 1" class='bx bx-transfer' ></i>
          <i v-else-if="operation.type_operation_ekambia_id == 1" class='bx bx-down-arrow-alt'></i>
          <i v-else-if="operation.type_operation_user_id == 1" class='bx bx-up-arrow-alt' ></i>
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
  max-width: 1000px
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
    transition: all .25s ease
    cursor: pointer
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
