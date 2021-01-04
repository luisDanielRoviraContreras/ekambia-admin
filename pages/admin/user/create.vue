<template>
  <div class="user">
    <nav-bar @click="$router.push('/admin/users')" back />
    <div class="con-user">
      <div class="div1 div">
        <c-input class="mt-6" v-model="form.firstName">
          Nombres
        </c-input>
        <c-input class="mt-6" v-model="form.tel">
          Teléfono
        </c-input>
        <c-input class="mt-6" v-model="form.password">
          Contraseña
        </c-input>
      </div>
      <div class="div2 div">
        <c-input class="mt-6" v-model="form.lastName">
          Apellidos
        </c-input>
        <c-input class="mt-6" v-model="form.email">
          Correo
        </c-input>
        <Select placeholder="Oficina" block class="mt-6" v-model="form.office_id">
          <Option v-for="(office, i) in offices" :key="i" :value="office.id" :text="office.name" />
        </Select>
        <Select placeholder="Tipo de usuario" block class="mt-6" v-model="form.roles">
          <Option v-for="(role, i) in roles" :key="i" :value="role.name" :text="role.name" />
        </Select>
      </div>
    </div>
    <Button @click="createUser" yellow class="mt-6 btn">
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

  getData() {
    axios.get(`/users/create`).then(({data} : any) => {
      console.log(data)
      this.offices = data.info.offices
      this.roles = data.info.roles
    })
  }

  createUser() {
    console.log(this.form)
    axios.post(`/users`, {
      ...this.form
    }).then((res : any) => {
      console.log(res)
      this.$notification({
        title: 'Usuario Creado',
        text: 'Usuario creado con exitosamente'
      })
      this.$router.push('/admin/users')
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
