<template>
  <div class="app">
    <Nuxt />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
@Component
export default class name extends Vue {
  setHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    setTimeout(function () {
      window.scrollTo(0, 1)
    }, 0)
  }

  webSocket() {
    // Crea una nueva conexión.
    const socket = new WebSocket('ws://localhost:8080');

    // Abre la conexión
    socket.addEventListener('open', function (event) {
        socket.send('Hello Server!');
    });

    // Escucha por mensajes
    socket.addEventListener('message', function (event) {
        console.log('Message from server', event.data);
    });
  }

  mounted () {
    this.setHeight()

    window.addEventListener('resize', this.setHeight)

    this.webSocket()
  }
}
</script>
<style lang="sass">
  .app
    overflow: hidden
</style>
