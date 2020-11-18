<template>
  <div class="socket">

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Echo from 'laravel-echo'
import axios from '~/plugins/axios'
import { State, Action } from 'vuex-class'
@Component
export default class name extends Vue {
  mounted() {
    (window as any).Pusher = require('pusher-js');

    (window as any).Echo =  new Echo({
        broadcaster: 'pusher',
        key: 'a5e37d3bc65fe2addfe4',
        cluster: 'us2',
        forceTLS: false,
    });

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedStatusOperation', (response) => {
      console.log('update - operations -- UpdatedStatusOperation')
    });

    (window as any).Echo.channel('channel-ekambia').listen('UpdatedStatusLocationDelivery', (response) => {
      console.log('update - operations -- UpdatedStatusLocationDelivery')
    });

    (window as any).Echo.connector.pusher.connection.bind('connected', () => {
      console.log('connected----------xxx');
    })
  }
}
</script>
<style lang="sass" scoped>
// responsive

// @media (max-width: 812px), (pointer:none), (pointer:coarse)
</style>
