<template>
  <div class="operations">
    <header class="header">
      <c-input block v-model="search" @input="handleInput" type="text">
        Buscar operación por (Nombre, apellido o cedula)
      </c-input>
    </header>
    <div class="con-operations">
      <div @click="handleClickOperation(operation)" class="operation" v-for="(operation, i) in operations" :key="i" >
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
        <div class="text" >
          <h6>
            Nombre
          </h6>
          <span>
            <template v-if="operation.user">
              {{ operation.user.firstName }}
            </template>
            <template v-if="operation.user">
              {{ operation.user.lastName }}
            </template>
          </span>
        </div>
        <div class="text" >
          <h6>
            Enviá
          </h6>
          <span>
            {{ operation.send }}
            {{ operation.coin_send.coin }}
          </span>
        </div>
        <div class="text" >
          <h6>
            Recibe
          </h6>
          <span>
            {{ operation.received }}
            {{ operation.coin_received.coin }}
          </span>
        </div>
        <div class="text" >
          <h6>
            Fecha
          </h6>
          <span>
            {{ operation.datex.split('-')[2] }}-{{ operation.datex.split('-')[1] }}-{{ operation.datex.split('-')[0] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class operations extends Vue {
  search: any = ''
  operations: any = []

  handleClickOperation(operation: any) {
    console.log(operation)
    if (operation.type_operation_user_id == 1) {
      this.$router.push({
        path: '/operation/',
        query: {
          id: operation.id,
          admin: 'true'
        }
      })
    } else {
      this.$router.push({
        path: '/office-show/',
        query: {
          id: operation.id,
          admin: 'true'
        }
      })
    }
  }

  handleInput(val: any) {
    this.getData(val)
  }

  getData(val: any = '') {
    axios.post('/user-operation-search', {
      value: val
    }).then(({data} : any) => {
      console.log(data.info)
      this.operations = data.info.data
    })
  }

  getAllData(val: any = '') {
    axios.get('/all-operation').then(({data} : any) => {
      console.log('data.info')
      console.log(data.info)
      this.operations = data.info.data
    })
  }

  mounted() {
    this.getAllData()
  }
}
</script>
<style lang="sass" scoped>
.operations
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
.header
  display: flex
  align-items: center
  justify-content: center
  max-width: 1200px
  width: 100%
.con-operations
  width: 100%
  max-width: 1200px
  .operation
   width: 100%
   background: -color(gray)
   margin-top: 15px
   border-radius: 20px
   cursor: pointer
   transition: all .25s ease
   display: flex
   align-items: center
   justify-content: flex-start
   overflow: hidden
   &:hover
     background: -color(gray-2)
   .text
     padding: 14px
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
     span
       font-size: .9rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
