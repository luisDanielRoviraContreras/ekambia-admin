<template>
  <div ref="page" class="index page">
    <nuxt-child />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Mutation, Action } from 'vuex-class'

@Component({
  name: 'index',
  middleware: 'authenticated',
  layout: ({ isMobile }) => isMobile ? 'mobile' : 'default',
})
export default class indexPage extends Vue {
  mounted() {
    this.$bounceClose()
  }
}
</script>
<style lang="sass">
.page
  background: -color(gray)
  width: 100%
  height: 100vh
  position: relative
</style>
