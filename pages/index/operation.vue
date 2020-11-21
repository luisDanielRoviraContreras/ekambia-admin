<template>
  <div class="operation">
    <nav-bar back @click="$router.push('/')" />
    <div v-if="data && user" class="con-operation">
      <div v-if="data.type_operation_user_id == 1" class="con-1 con">
        <h2>
          Transferencia entrante
        </h2>
        <c-input readonly class="mt-6" v-model="data.source_account.alias">
          Banco
        </c-input>
        <c-input readonly class="mt-6" v-model="data.send">
          Monto transferido
        </c-input>
        <c-input readonly class="mt-6" v-model="data.coin_send.coin">
          Moneda
        </c-input>
        <c-input v-if="data.num_reference" readonly class="mt-6" v-model="data.num_reference">
          Numero de referencia
        </c-input>
        <input-file not-x v-if="presignedUrl" class="mt-6" :value="`${presignedUrl}`">
          Comprobante transferencia bancaria
        </input-file>
        <div class="con-switch">
          <c-switch v-model="hasCheck" /> <p>Listo! transferencia verificada</p>
        </div>
        <Button v-if="data.type_operation_ekambia_id !== 1" @click="handleVerifica" :disabled="!hasCheck" class="mt-6" block yellow>
          Verificar
        </Button>
      </div>
      <div v-if="data.type_operation_ekambia_id == 1" class="con-2 con">
        <h2>
          Transferencia ekambia saliente
        </h2>
        <c-input readonly class="mt-6" v-model="data.destination_account.alias">
          Banco
        </c-input>
        <c-input readonly class="mt-6" v-model="data.destination_account.account_number">
          Numero de cuenta
        </c-input>
        <c-input readonly class="mt-6" v-model="data.received">
          Monto a transferir
        </c-input>
        <c-input readonly class="mt-6" v-model="data.coin_received.coin">
          Moneda
        </c-input>

        <divider>
          Datos del usuario
        </divider>

        <c-input readonly class="mt-6" v-model="user.firstName">
          Nombre
        </c-input>
        <c-input readonly class="mt-6" v-model="user.LastName">
          Apellidos
        </c-input>
        <c-input readonly class="mt-6" v-model="user.dni">
          Documento de identidad
        </c-input>
        <Button @click="handleClick" :disabled="data.type_operation_user_id == 1 ? !hasCheck : false" class="mt-6" block yellow>
          Transferencia realizada
        </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class operation extends Vue {
  hasCheck: boolean = false
  data: any = null
  presignedUrl: any = null
  user: any = null

  handleVerifica() {
    this.$dialog({
      title: 'Verificar transferencia',
      text: 'Estas seguro de verificar esta transferencia?',
      success: () => {
        axios.post(`statusoperation-update/${this.$route.query.id}`, {
          status_operation_id: 3
        }).then(() => {
          this.$router.push('/')
        })
      }
    })
  }

  handleClick() {
    this.$dialog({
      title: 'Transferencia realizada?',
      text: 'Estas seguro de que la transferencia fue realizada con éxito?',
      success: () => {
        axios.post(`statusoperation-update/${this.$route.query.id}`, {
          status_operation_id: 4
        }).then(() => {
          this.$router.push('/')
        })
      }
    })
  }

  getData() {
    axios.get(`/operador-operation-show/${this.$route.query.id}`).then(({data}) => {
      console.log(data)
      this.data = data.info.operation
      this.presignedUrl = data.info.presignedUrl
      this.user = data.info.user

      // axios.get(`/user-show/${data.info.operation.user_id}`).then((user) => {
      //   console.log(user.data.info)
      //   this.user = user.data.info
      // })
    })
  }

  mounted() {
    this.getData()
  }
}
</script>
<style lang="sass" scoped>
.con-switch
  display: flex
  align-items: center
  justify-content: flex-start
  padding: 15px 10px
  p
    font-size: .85rem
    padding: 0px 10px
    font-weight: bold
.operation
  display: flex
  align-items: center
  justify-content: flex-start
  width: 100%
  height: 100vh
  background: -color(bg)
  flex-direction: column
.con-operation
  padding: 20px
  max-width: 1000px
  width: 100%
  display: flex
  align-items: flex-start
  justify-content: center
  .con
    width: 50%
    padding: 0px 20px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
