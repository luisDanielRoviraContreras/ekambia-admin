<template>
  <div class="operation">
    <nav-bar absolute back @click="$route.query.admin ? $router.push('/admin/') : $router.push('/office')" />
    <div v-if="data && user" class="con-operation">
      <div class="con-2 con">
        <h2>
          Operación en oficina
        </h2>

        <divider>
          Datos de operación
        </divider>
        <c-input readonly class="mt-6" :value="`${data.received} ${data.coin_received.coin}`">
          Monto a entregar
        </c-input>
        <c-input readonly class="mt-6" :value="`${data.send} ${data.coin_send.coin}`">
          Monto a recibir
        </c-input>
        <c-input v-if="data.source_funds" readonly class="mt-6" v-model="data.source_funds">
          Origen de los fondos
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
        <c-input readonly class="mt-6" v-model="user.email">
          Correo electrónico
        </c-input>

        <template v-if="data.status_operation_id < 4">
        <div v-if="data.type_operation_user_id == 2" class="con-switch">
          <c-switch v-model="hasGet" /> <p>Dinero recibido y verificado</p>
        </div>
        <div v-if="data.type_operation_ekambia_id == 2" class="con-switch">
          <c-switch  v-model="hasSend" /> <p>Dinero entregado al cliente</p>
        </div>
        <template v-if="(data.type_operation_user_id == 2 && data.type_operation_ekambia_id == 2) ? hasGet && hasSend : hasGet || hasSend ">
          <divider>
            Código de la operación
          </divider>
          <c-input center class="mt-6" v-model="code">
            Código
          </c-input>
        </template>
          <Button v-if="data.type_operation_user_id == 2 && data.type_operation_ekambia_id == 2" @click="handleCheck" :disabled="!hasSend || !hasGet || !code" class="mt-6" block yellow>
            Finalizar Operación
          </Button>
          <Button v-else-if="data.type_operation_user_id == 2" @click="handleCheck" :disabled="!hasGet || !code" class="mt-6" block yellow>
            Verificar
          </Button>
          <Button v-else-if="data.type_operation_ekambia_id == 2" @click="handleCheck" :disabled="!hasSend || !code" class="mt-6" block yellow>
            Finalizar Operación
          </Button>
          <Button v-if="data.status_operation_id < 4" @click="handleClickRechazar" class="mt-6" block>
            Rechazar Operación
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
  hasGet: boolean = false
  hasSend: boolean = false
  data: any = null
  presignedUrl: any = null
  user: any = null
  code: any = null

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

  handleClick() {
    this.$dialog({
      title: 'Código de verificación',
      text: 'Ingresa el código de verificación proporcionado por el usuario',
      input: true,
      center: true,
      code: true,
      placeholder: 'Código de 4 dígitos',
      textSuccess: 'Verificar',
      success: (val) => {

      }
    })
  }

  handleCheck() {
    axios.post(`codecheck/${this.$route.query.id}`, {
      code_check: this.code
    }).then(({data}: any) => {
      if (data.message == 'Código inválido') {
        this.$notification({
          title: 'Código invalido',
          text: 'El código proporcionado no es valido para esta operación, revisa el código e intenta de nuevo'
        })
      } else {
        this.$notification({
          title: 'Verificación exitosa',
          text: 'Operación finalizada con éxito'
        })
        let id = 3
        if (this.data.status_operation_id == 1 && this.data.type_operation_ekambia_id == 2) {
          id = 4
        }
        if (this.data.status_operation_id == 3 && this.data.type_operation_ekambia_id == 2) {
          id = 4
        }
        axios.post(`statusoperation-update/${this.$route.query.id}`, {
          status_operation_id:  id
        }).then(() => {
          this.$route.query.admin ? this.$router.push('/admin/') : this.$router.push('/office')
          // this.$router.push('/office')
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
    h2
      text-align: center
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
