<template>
  <div class="user">
    <nav-bar @click="$router.push('/admin/users')" back />
    <div class="con-user">
      <div class="div1 div">
        <c-input :danger="!form.firstName && send" class="mt-6" v-model="form.firstName">
          Nombres
        </c-input>
        <Alert :open="!form.firstName && send">
          Este campo es requerido
        </Alert>

        <c-input :danger="!form.tel && send" class="mt-6" v-model="form.tel">
          Teléfono
        </c-input>
        <Alert :open="!form.tel && send">
          Este campo es requerido
        </Alert>

        <c-input type="password" :danger="!form.password && send" class="mt-6" v-model="form.password">
          Contraseña
        </c-input>
        <Alert :open="!form.password && send">
          Este campo es requerido
        </Alert>
      </div>
      <div class="div2 div">
        <c-input :danger="!form.lastName && send" class="mt-6" v-model="form.lastName">
          Apellidos
        </c-input>
        <Alert :open="!form.lastName && send">
          Este campo es requerido
        </Alert>

        <c-input :danger="!form.email && send" class="mt-6" v-model="form.email">
          Correo
        </c-input>
        <Alert :open="!form.email && send">
          Este campo es requerido
        </Alert>

        <Select :danger="!form.office_id && send" placeholder="Oficina" block class="mt-6" v-model="form.office_id">
          <Option v-for="(office, i) in offices" :key="i" :value="office.id" :text="office.name" />
        </Select>
        <Alert :open="!form.office_id && send">
          Este campo es requerido
        </Alert>

        <Select :danger="!form.roles && send" placeholder="Tipo de usuario" block class="mt-6" v-model="form.roles">
          <Option v-for="(role, i) in roles" :key="i" :value="role.name" :text="role.name" />
        </Select>
         <Alert :open="!form.roles && send">
          Este campo es requerido
        </Alert>
      </div>
    </div>
    <Button :loading="loading" @click="createUser" yellow class="mt-6 btn">
      Crear usuario
    </Button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class user extends Vue {
  form: any = {
    firstName: '',
    lastName: '',
    tel: '',
    email: '',
    office_id: '',
    roles: '',
    password: ''
  }
  operations: any = null
  offices: any = null
  roles: any = null
  send: boolean = false
  loading: boolean = false

  getData() {
    axios.get(`/users/create`).then(({data} : any) => {
      this.offices = data.info.offices
      this.roles = data.info.roles
    })
  }

  createUser() {
    this.send = true
    if (!this.form.firstName || !this.form.lastName || !this.form.password) {
      return
    }
    this.loading = true
    axios.post(`/users`, {
      ...this.form
    }).then((res : any) => {
      console.log(res)
      this.loading = false
      this.$notification({
        title: 'Usuario Creado',
        text: 'Usuario creado con exitosamente'
      })
      this.$router.push('/admin/users')
    }).catch((err: any) => {
      this.$notification({
        title: 'Oops! Algo salió mal',
        text: err.response.data.message.toString()
      })
      this.loading = false
    })
  }

  mounted() {
    this.getData()
  }
}
</script>
<style lang="sass" scoped>
.user
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  /deep/
    .btn
      min-width: 300px
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
