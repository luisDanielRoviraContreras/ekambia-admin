<template>
  <div class="operation">
    <nav-bar v-if="!$route.query.prev" absolute back @click="$route.query.admin ? $router.push('/admin/') : $router.push('/')" />
    <nav-bar v-else absolute back @click="$router.go(-1)" />
    <view-image @close="srcView = null" v-if="srcView" :src="srcView" />
    <div v-if="data && user" class="con-operation">
      <div v-if="data.type_operation_ekambia_id == 1" class="con-2 con">
        <h2>
          Transferencia ekambia saliente
        </h2>
        <c-input readonly class="mt-6" v-model="data.bank.name">
          Banco
        </c-input>
        <c-input readonly class="mt-6" v-model="data.account.account_number">
          Numero de cuenta
        </c-input>
        <c-input readonly class="mt-6" v-model="data.amount">
          Monto a transferir
        </c-input>
        <c-input readonly class="mt-6" value="Guaranies">
          Moneda
        </c-input>


        <template v-if="!user.company">
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
        </template>
        <template v-else>
          <divider>
            Datos de la empresa
          </divider>
          <c-input readonly class="mt-6" v-model="user.company.business_name">
            Nombre
          </c-input>
          <c-input readonly class="mt-6" v-model="user.company.representative_name">
            Representante legal
          </c-input>
          <c-input readonly class="mt-6" v-model="user.company.ruc">
            RUC
          </c-input>
        </template>

        <template v-if="true">
          <Button @click="handleClick" class="mt-6" block yellow>
            Transferencia realizada
          </Button>
        </template>
        <template v-else>
          <footer class="mt-6">
            <h3>
              Operación Finalizada
            </h3>
          </footer>
        </template>
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

  handleClickRechazar() {
    this.$dialog({
      title: 'Rechazar operación',
      text: '¿Estas seguro de rechazar esta operación?',
      textCancel: 'No',
      textSuccess: 'Si, seguro',
      success: () => {
        axios.post(`statusoperation-update/${this.$route.query.id}`, {
          status_operation_id: 5
        }).then(() => {
          this.$router.push('/')
        })
      }
    })
  }

  handleClickView(val) {
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
        axios.post(`statuscharge-update/${this.$route.query.id}`, {
          status_charge_id: 2
        }).then(() => {
          this.$router.push('/ref/')
        })
      }
    })
  }

  getData() {
    axios.get(`/charge-show/${this.$route.query.id}`).then(({data}) => {
      console.log(data)
      this.data = data.info
      this.user = data.info.user
    })
  }

  mounted() {
    this.getData()
  }
}
</script>
<style lang="sass" scoped>
footer
  width: 100%
  display: flex
  padding: 20px
  align-items: center
  justify-content: center
  background: -color(gray)
  border-radius: 20px
  pointer-events: none
  user-select: none
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
  overflow: auto
  padding-bottom: 40px
  padding-top: 70px
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
