<template>
  <div class="admin">
    <logout />
    <nav-bar />
    <ul class="menu">
      <nuxt-link tag="li" to="/admin/">Operaciones</nuxt-link>
      <nuxt-link tag="li" to="/admin/users">Usuarios</nuxt-link>
      <nuxt-link tag="li" to="/admin/config">Configuración</nuxt-link>
    </ul>
    <div class="con-sub-admin">
      <nuxt-child />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component({
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
})
export default class admin extends Vue {
  users: any = []

  getData() {
    axios.get('/users').then(({data} : any) => {
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
.menu
  display: flex
  align-items: center
  justify-content: center
  margin-top: 10px
  li
    padding: 15px 20px
    background: -color(gray)
    cursor: pointer
    transition: all .25s ease
    &:hover
      background: -color(gray-2)
    &.nuxt-link-exact-active
      background: #000
      color: #fff
    &:last-child
      border-radius: 0px 20px 20px 0px
    &:first-child
      border-radius: 20px 0px 0px 20px
.admin
  width: 100%
.con-sub-admin
  width: 100%
  padding: 20px
  overflow: auto
  max-height: calc(100vh - 102px)
  padding-bottom: 50px
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
