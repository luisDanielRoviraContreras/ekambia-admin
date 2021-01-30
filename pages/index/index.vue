<template>
  <div class="operador">
    <logout />
    <nav-bar />
    <div class="con-btns">
      <nuxt-link tag="button" to="/">
        Transferencia <span v-if="transfer > 0">{{ transfer }}</span>
      </nuxt-link>
      <nuxt-link tag="button" to="/office">
        En Oficina <span v-if="office > 0">{{ office }}</span>
      </nuxt-link>
      <nuxt-link tag="button" to="/ref">
        Referidos <span v-if="office > 0">{{ office }}</span>
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
  transfer: any = 0
  office: any = 0

  getTotal() {
    axios.get('/countoperationstotal').then(({data}) => {
      this.transfer = data.info.totaloptransfer
      this.office = data.info.totalopffice
    })

  }
  mounted() {
    this.getTotal();

    (window as any).Pusher = require('pusher-js');

    (window as any).Echo =  new Echo({
        broadcaster: 'pusher',
        key: 'a5e37d3bc65fe2addfe4',
        cluster: 'us2',
        forceTLS: false,
    });

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedOperationNew', (response) => {
      this.transfer = response.info.totaloptransfer
      this.office = response.info.totalopffice
    });

    (window as any).Echo.connector.pusher.connection.bind('connected', () => {
      console.log('connected----------xxx');
    })
  }
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
    position: relative
    span
      position: absolute
      top: -6px
      background: -color(color)
      color: #000
      min-width: 20px
      border-radius: 7px
      font-weight: bold
      font-size: .85rem
      padding: 2px 0px
      right: -4px
      box-shadow: 0px 5px 10px 0px rgba(0,0,0,.05)
    &:hover
      background: #fff
    &.nuxt-link-exact-active
      background: #000
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
