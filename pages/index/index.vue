<template>
  <div class="operador">
    <logout />
    <nav-bar />
    <div class="con-btns">
      <nuxt-link tag="button" to="/">
        Transferencia
      </nuxt-link>
      <nuxt-link tag="button" to="/office">
        Presencial
      </nuxt-link>
    </div>
    <div class="con-items">
      <nuxt-child />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
import Echo from 'laravel-echo'
@Component
export default class operador extends Vue {
}
</script>
<style lang="sass" scoped>
.con-btns
  display: flex
  align-items: center
  justify-content: flex-start
  margin: 20px 0px
  button
    min-width: 150px
    margin: 0px 10px
    padding: 13px
    background: transparent
    border: 0px
    font-size: 1rem
    font-weight: bold
    border-radius: 18px
    transition: all .25s ease
    cursor: pointer
    &:hover
      background: -color(bg)
    &.nuxt-link-exact-active
      background: -color(black)
      color: #fff
.operador
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  h2
    padding: 20px
  .con-items
    width: 100%
    display: flex
    align-items: flex-start
    justify-content: center

// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
