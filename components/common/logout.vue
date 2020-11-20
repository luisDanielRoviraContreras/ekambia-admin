<template>
  <div class="logout">
    <button @click="handleClick">
      <i class='bx bx-exit'></i>
    </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from '~/plugins/axios'
@Component
export default class logout extends Vue {
  handleClick() {
    this.$dialog({
      title: '¿Estas seguro de cerrar la sesión?',
      success: () => {
        axios.post('/logout-admin').then(() => {
          this.$cookies.set('token', '')
          this.$cookies.set('authenticated', false)
          this.$nextTick(() => {
            this.$router.push('/login/')
          })
        }).catch((err) => {
          this.$notification({
            title: 'Oops! Algo salió mal',
            text: err.response.data.message.toString()
          })
        })
      }
    })
  }
}
</script>
<style lang="sass" scoped>
.logout
  position: absolute
  right: 0px
  z-index: 20000
  button
    width: 50px
    height: 50px
    font-size: 1.5rem
    margin: 10px
    background: transparent
    border: 2px solid -color(black)
    border-radius: 16px
    cursor: pointer
// responsive

@media (max-width: 812px)
  .logout
    button
      width: 45px
      height: 45px
      margin: 0px
      border-radius: 0px 0px 0px 15px
      border-right: 0px
      border-top: 0px
</style>
