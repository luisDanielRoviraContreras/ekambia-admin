<template>
  <div ref="page" class="index page">
      index
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Mutation, Action } from 'vuex-class'
import axios from '~/plugins/axios'
@Component({
  name: 'index',
  // middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
})
export default class indexPage extends Vue {
  mounted() {
    this.$bounceClose()
  }
}
</script>
<style lang="sass">

</style>
