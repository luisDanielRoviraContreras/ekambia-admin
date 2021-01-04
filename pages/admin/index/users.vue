<template>
  <div class="users">
    <header class="header">
      <c-input block v-model="search" @input="handleInput" type="text">
        Buscar usuario
      </c-input>
      <Button class="ml-3" @click="$router.push('/admin/user/create')">
        Crear usuario
      </Button>
    </header>
    <div class="con-users">
      <div @click="handleClickUser(user.id)" class="user" v-for="(user, i) in users" :key="i">
        <div class="text">
          <h6>
            Nombre
          </h6>
          <span>
            {{ user.firstName }}
          </span>
        </div>
        <div class="text">
          <h6>
            Apellido
          </h6>
          <span>
            {{ user.lastName }}
          </span>
        </div>
        <div class="text">
          <h6>Teléfono</h6>
          <span>
            {{ user.tel }}
          </span>
        </div>
        <div class="text">
          <h6>
            Correo
          </h6>
          <span>
            {{ user.email }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
})
export default class users extends Vue {
  search: any = ''
  users: any = []

  handleClickUser(id) {
    this.$router.push({
      path: '/admin/user',
      query: {
        id
      }
    })
  }

  handleInput(val: any) {
    // console.log(val)
    // this.getData(val)
    if (this.search) {
      axios.post('/search-user', {
        value: this.search
      }).then(({data} : any) => {
        console.log('users')
        console.log(data.info.data)
        this.users = data.info.data
      })
    } else {
      this.getData()
    }

  }

  getData() {
    axios.get('/users').then(({data} : any) => {
      console.log('users')
      console.log(data.info.data)
      this.users = data.info.data
    })
  }

  mounted() {
    this.getData()
    this.$bounceClose()
  }
}
</script>
<style lang="sass" scoped>
.header
  display: flex
  align-items: center
  justify-content: center
  max-width: 800px
  width: 100%
  /deep/
    .button
      min-width: 200px
.users
  width: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
.con-users
  width: 100%
  max-width: 800px
  .user
    display: flex
    align-items: center
    justify-content: flex-start
    width: 100%
    margin-top: 15px
    background: -color('gray')
    border-radius: 20px
    cursor: pointer
    transition: all .25s ease
    &:hover
      background: -color(gray-2)
    .text
      padding: 15px
      flex: 1
      span
        font-size: .9rem
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
