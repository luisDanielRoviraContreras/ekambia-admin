<template>
  <div class="operations">
    <header class="header">
      <c-input block v-model="search" @input="handleInput" type="text">
        Buscar operación
      </c-input>
    </header>
    <div class="con-operations">
      <div @click="handleClickOperation(operation)" class="operation" v-for="(operation, i) in operations" :key="i" >
        <div class="text" >
          <h6>
            Nombre
          </h6>
          <span>
            {{ operation.user.firstName }}
            {{ operation.user.lastName }}
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
            {{ operation.datex }}
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
    this.$router.push({
      path: '/admin/operation',
      query: {
        id: operation.id
      }
    })
  }

  handleInput(val: any) {
    console.log(val)
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
  max-width: 700px
  width: 100%
.con-operations
  width: 100%
  max-width: 700px
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
   &:hover
     background: -color(gray-2)
   .text
     padding: 15px
     flex: 1
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
