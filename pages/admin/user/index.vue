<template>
  <div class="user">
    <nav-bar @click="$router.push('/admin/users')" back />
    <div v-if="data" class="con-user">
      <div class="div1 div">
        <c-input :readonly="!edit" class="mt-6" v-model="data.firstName">
          Nombres
        </c-input>
        <c-input :readonly="!edit" class="mt-6" v-model="data.tel">
          Teléfono
        </c-input>
      </div>
      <div class="div2 div">
        <c-input :readonly="!edit" class="mt-6" v-model="data.lastName">
          Apellido
        </c-input>
        <c-input :readonly="!edit" class="mt-6" v-model="data.email">
          Correo
        </c-input>
      </div>
    </div>
    <div v-if="!edit" class="btns mt-6">
      <Button @click="handleDeleteUser">
        Eliminar
      </Button>
      <Button yellow @click="edit = true">
        Editar
      </Button>
    </div>
    <div v-else class="btns mt-6">
      <Button @click="edit = false">
        Cancelar
      </Button>
      <Button yellow @click="handleUpdateUser">
        Actualizar
      </Button>
    </div>
    <h3 class="mt-6 mb-3">
      Operaciones procesadas
    </h3>
    <div v-if="!operations" class="con-operations">
      <load block />
    </div>
    <div v-else-if="operations.length == 0" class="con-operations not-found">
      No hay operaciones
    </div>
    <div v-else class="con-operations">
      <div @click="handleClickOperation(operation)" :key="i" v-for="(operation, i) in operations" class="operation">
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
@Component
export default class user extends Vue {
  data: any = null
  operations: any = null
  edit: boolean = false

  handleUpdateUser() {
    axios.post(`/users-update/${this.$route.query.id}`, {
      ...this.data,
      roles: 1
    }).then((res : any) => {
      console.log(res)
      this.edit = false
      this.$notification({
        title: 'Actualización exitosa',
        text: 'Datos guardados con éxito'
      })
    })
  }

  handleDeleteUser() {
    this.$dialog({
      title: 'Estas seguro de eliminar este usuario?',
      success: () => {
        axios.post(`/users-delete/${this.$route.query.id}`).then((res : any) => {
          console.log(res)
        })
      }
    })
  }

  getData() {
    axios.get(`/users/${this.$route.query.id}`).then(({data} : any) => {
      console.log(data)
      this.data = {
        ...data.info.user
      }
    })
    axios.get(`/responsible-operation/${this.$route.query.id}`).then(({data} : any) => {
      this.operations = data.info.data
    })
  }

  handleClickOperation(operation: any) {
    this.$router.push({
      path: '/operation/',
      query: {
        id: operation.id,
        admin: 'true',
        prev: 'true'
      }
    })
  }

  mounted() {
    this.getData()
  }
}
</script>
<style lang="sass" scoped>
.btns
  display: flex
  align-items: center
  justify-content: center
  /deep/
    .button
      min-width: 300px
      margin: 0px 10px
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
.user
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  .con-user
    width: 100%
    max-width: 1000px
    display: flex
    align-items: flex-start
    justify-content: center
    .div
      flex: 1
      padding: 10px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
