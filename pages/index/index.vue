<template>
  <div class="operador">
    <logout />
    <nav-bar />
    <div class="con-btns">
      <Button @click="$router.push('/')" :yellow="$route.name == 'index-index'"  >
        Transferencia
      </Button>
      <Button @click="$router.push('/office')" :yellow="$route.name == 'index-index-office'" >
        Presencial
      </Button>
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
