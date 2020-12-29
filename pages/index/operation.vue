<template>
  <div class="operation">
    <nav-bar back @click="$router.push('/')" />
    <view-image @close="srcView = null" v-if="srcView" :src="srcView" />
    <div v-if="data && user" class="con-operation">
      <div v-if="data.type_operation_user_id == 1" class="con-1 con">
        <h2>
          Transferencia entrante
        </h2>
        <!-- <c-input readonly class="mt-6" v-model="data.source_account.alias">
          Banco
        </c-input> -->
        <c-input readonly class="mt-6" v-model="data.send">
          Monto transferido
        </c-input>
        <c-input readonly class="mt-6" v-model="data.coin_send.coin">
          Moneda
        </c-input>
        <c-input v-if="data.num_reference" readonly class="mt-6" v-model="data.num_reference">
          Numero de referencia
        </c-input>
        <input-file @click="handleClickView" readonly not-x v-if="presignedUrl" class="mt-6" :value="`${presignedUrl}`">
          Comprobante transferencia bancaria
        </input-file>
        <template v-if="data.status_operation_id < 3">
          <div class="con-switch">
            <c-switch v-model="hasCheck" /> <p>Listo! transferencia verificada</p>
          </div>
          <Button @click="handleVerifica" :disabled="isVerified ? isVerified : !hasCheck" class="mt-6" block yellow>
            Verificar
          </Button>
        </template>
        <template v-else>
          <div class="con-switch">
            <c-switch checked="true" /> <p>Listo! transferencia verificada</p>
          </div>
          <Button :disabled="true" class="mt-6" block yellow>
            Verificada
          </Button>
        </template>
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
        <c-input readonly class="mt-6" v-model="user.lastName">
          Apellidos
        </c-input>
        <c-input readonly class="mt-6" v-model="user.dni">
          Documento de identidad
        </c-input>
        <Button v-if="data.status_operation_id >= 3" @click="handleClick" class="mt-6" block yellow>
          Transferencia realizada
        </Button>
        <Button v-else @click="handleClick" :disabled="data.type_operation_user_id == 1 ? !isVerified : false" class="mt-6" block yellow>
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
  isVerified: boolean = false
  data: any = null
  presignedUrl: any = null
  user: any = null
  srcView: any = null

  handleClickView(val) {
    console.log(val)
    this.srcView = val
  }

  handleVerifica() {
    this.$dialog({
      title: 'Verificar transferencia',
      text: '¿Estas seguro de verificar esta transferencia?',
      textCancel: 'No',
      textSuccess: 'Si, seguro',
      success: () => {
        axios.post(`statusoperation-update/${this.$route.query.id}`, {
          status_operation_id: 3
        }).then(() => {
          this.isVerified = true
          if (this.data.type_operation_ekambia_id !== 1) {
            this.$router.push('/')
          }
        })
      }
    })
  }

  handleClick() {
    this.$dialog({
      title: '¿Transferencia realizada?',
      text: '¿Estas seguro de que la transferencia fue realizada con éxito?',
      textCancel: 'No',
      textSuccess: 'Sí',
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
